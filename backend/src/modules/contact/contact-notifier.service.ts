import { Inject, Injectable, Logger } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { ContactMessage } from './schemas/contact-message.schema';
import notificationsConfig from '../../config/notifications.config';

interface ContactDetails {
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  serviceName?: string;
  budget?: number;
  createdAt: Date;
}

@Injectable()
export class ContactNotifierService {
  private readonly logger = new Logger(ContactNotifierService.name);
  private transporter: nodemailer.Transporter | null = null;

  constructor(
    @Inject(notificationsConfig.KEY)
    private readonly config: ConfigType<typeof notificationsConfig>,
  ) {
    const { email, telegram } = this.config;
    if (email.host && email.user && email.pass && email.to) {
      this.transporter = nodemailer.createTransport({
        host: email.host,
        port: email.port,
        secure: email.secure,
        auth: { user: email.user, pass: email.pass },
      });
    } else {
      this.logger.warn('Email notifications disabled: SMTP is not configured');
    }

    if (!telegram.botToken || !telegram.chatIds.length) {
      this.logger.warn(
        'Telegram notifications disabled: TELEGRAM_BOT_TOKEN/TELEGRAM_CHAT_ID missing',
      );
    }
  }

  /** Sends the message to all configured channels. Never throws. */
  async notify(message: ContactMessage): Promise<void> {
    const details = this.toDetails(message);
    const results = await Promise.allSettled([
      this.sendEmail(details),
      this.sendTelegram(details),
    ]);

    results.forEach((result, i) => {
      if (result.status === 'rejected') {
        const channel = i === 0 ? 'email' : 'telegram';
        this.logger.error(
          `Failed to send ${channel} notification: ${String(result.reason)}`,
        );
      }
    });
  }

  private toDetails(message: ContactMessage): ContactDetails {
    const service = message.selectedService as unknown as
      | { name?: string }
      | undefined;
    return {
      fullName: message.fullName,
      email: message.email,
      phone: message.phone,
      subject: message.subject,
      message: message.message,
      serviceName: service?.name,
      budget: message.budget,
      createdAt: message.createdAt ?? new Date(),
    };
  }

  private rows(d: ContactDetails): [string, string][] {
    const rows: [string, string][] = [
      ['الاسم', d.fullName],
      ['البريد', d.email],
    ];
    if (d.phone) rows.push(['الجوال', d.phone]);
    if (d.serviceName) rows.push(['الخدمة', d.serviceName]);
    if (d.budget !== undefined && d.budget !== null) {
      rows.push(['الميزانية', String(d.budget)]);
    }
    rows.push(['الموضوع', d.subject]);
    return rows;
  }

  private async sendEmail(d: ContactDetails): Promise<void> {
    if (!this.transporter) return;
    const { from, to } = this.config.email;

    const rowsHtml = this.rows(d)
      .map(
        ([label, value]) =>
          `<tr><td style="padding:6px 12px;color:#666;white-space:nowrap">${label}</td><td style="padding:6px 12px">${escapeHtml(value)}</td></tr>`,
      )
      .join('');

    await this.transporter.sendMail({
      from: `"نموذج التواصل" <${from}>`,
      to,
      replyTo: { name: d.fullName, address: d.email },
      subject: `رسالة جديدة من ${d.fullName}: ${d.subject}`,
      text: [
        ...this.rows(d).map(([label, value]) => `${label}: ${value}`),
        '',
        d.message,
      ].join('\n'),
      html: `<div dir="rtl" style="font-family:Tahoma,Arial,sans-serif;font-size:14px;color:#222">
<h2 style="margin:0 0 12px">رسالة جديدة من الموقع</h2>
<table style="border-collapse:collapse;margin-bottom:16px">${rowsHtml}</table>
<div style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(d.message)}</div>
</div>`,
    });
  }

  private async sendTelegram(d: ContactDetails): Promise<void> {
    const { botToken, chatIds } = this.config.telegram;
    if (!botToken || !chatIds.length) return;

    const text = [
      '📩 <b>رسالة جديدة من الموقع</b>',
      '',
      ...this.rows(d).map(
        ([label, value]) => `<b>${label}:</b> ${escapeHtml(value)}`,
      ),
      '',
      escapeHtml(d.message).slice(0, 3500),
    ].join('\n');

    await Promise.all(
      chatIds.map(async (chatId) => {
        const res = await fetch(
          `https://api.telegram.org/bot${botToken}/sendMessage`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chat_id: chatId,
              text,
              parse_mode: 'HTML',
              disable_web_page_preview: true,
            }),
          },
        );
        if (!res.ok) {
          throw new Error(
            `Telegram API ${res.status} for chat ${chatId}: ${await res.text()}`,
          );
        }
      }),
    );
  }
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
