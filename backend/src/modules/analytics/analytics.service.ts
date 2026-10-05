import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { createHmac } from 'crypto';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { AnalyticsEvent } from './schemas/analytics-event.schema';
import { TrackEventDto } from './dto/track-event.dto';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';

interface CountResult {
  count: number;
}

interface TotalResult {
  total: number;
}

interface JourneyResult {
  entries: Array<{ label: string; views: number }>;
  exits: Array<{ label: string; views: number }>;
}

interface BreakdownResult {
  label: string;
  views: number;
  visitors: number;
  sessions: number;
}

interface TimelineResult {
  date: string;
  views: number;
  visitors: number;
}

interface EventResult {
  type: string;
  count: number;
}

@Injectable()
export class AnalyticsService {
  constructor(
    @InjectModel(AnalyticsEvent.name)
    private readonly eventModel: Model<AnalyticsEvent>,
    private readonly config: ConfigService,
  ) {}

  private hash(value: string) {
    const secret =
      this.config.get<string>('JWT_SECRET') ||
      this.config.get<string>('jwt.secret') ||
      'analytics';
    return createHmac('sha256', secret).update(value).digest('hex');
  }

  private decodeHeader(value: string | string[] | undefined) {
    try {
      return decodeURIComponent(String(value || ''));
    } catch {
      return String(value || '');
    }
  }

  private parseAgent(userAgent = '') {
    const device = /bot|crawler|spider/i.test(userAgent)
      ? 'bot'
      : /ipad|tablet/i.test(userAgent)
        ? 'tablet'
        : /mobile|android|iphone/i.test(userAgent)
          ? 'mobile'
          : 'desktop';
    const browser = /edg/i.test(userAgent)
      ? 'Edge'
      : /firefox/i.test(userAgent)
        ? 'Firefox'
        : /chrome|crios/i.test(userAgent)
          ? 'Chrome'
          : /safari/i.test(userAgent)
            ? 'Safari'
            : 'Other';
    const os = /windows/i.test(userAgent)
      ? 'Windows'
      : /iphone|ipad|ios/i.test(userAgent)
        ? 'iOS'
        : /android/i.test(userAgent)
          ? 'Android'
          : /mac os|macintosh/i.test(userAgent)
            ? 'macOS'
            : /linux/i.test(userAgent)
              ? 'Linux'
              : 'Other';
    return { device, browser, os };
  }

  private getAttribution(dto: TrackEventDto) {
    const campaign = dto.campaign || {};
    if (campaign.utm_source)
      return {
        source: String(campaign.utm_source).slice(0, 100),
        medium: String(campaign.utm_medium || 'campaign').slice(0, 100),
      };
    if (!dto.referrer) return { source: 'Direct', medium: 'direct' };
    try {
      const host = new URL(dto.referrer).hostname.replace(/^www\./, '');
      if (/google\.|bing\.|yahoo\.|duckduckgo\./i.test(host))
        return { source: host, medium: 'organic' };
      if (
        /instagram\.|facebook\.|tiktok\.|linkedin\.|twitter\.|x\.com|youtube\./i.test(
          host,
        )
      )
        return { source: host, medium: 'social' };
      return { source: host, medium: 'referral' };
    } catch {
      return { source: 'Unknown', medium: 'unknown' };
    }
  }

  async track(
    dto: TrackEventDto,
    headers: Record<string, string | string[] | undefined>,
  ) {
    if (dto.path.startsWith('/admin') || dto.path.startsWith('/api')) return;
    const userAgent = String(headers['user-agent'] || '');
    const agent = this.parseAgent(userAgent);
    if (agent.device === 'bot') return;
    const attribution = this.getAttribution(dto);
    const occurredAt = new Date();
    const visitorId = this.hash(dto.visitorId);
    const sessionId = this.hash(dto.sessionId);

    if (dto.type === 'page_view') {
      const duplicate = await this.eventModel.exists({
        type: 'page_view',
        sessionId,
        path: dto.path,
        occurredAt: { $gte: new Date(Date.now() - 3000) },
      });
      if (duplicate) return;
    }

    await this.eventModel.create({
      ...agent,
      ...attribution,
      type: dto.type,
      visitorId,
      sessionId,
      path: dto.path.split('?')[0].slice(0, 500),
      title: dto.title,
      referrer: dto.referrer?.slice(0, 1000),
      language: dto.language,
      durationMs: dto.durationMs || 0,
      target: dto.target,
      campaignName: dto.campaign?.utm_campaign
        ? String(dto.campaign.utm_campaign).slice(0, 120)
        : undefined,
      campaignContent: dto.campaign?.utm_content
        ? String(dto.campaign.utm_content).slice(0, 120)
        : undefined,
      campaignTerm: dto.campaign?.utm_term
        ? String(dto.campaign.utm_term).slice(0, 120)
        : undefined,
      country: String(
        headers['cf-ipcountry'] || headers['x-vercel-ip-country'] || '',
      ).slice(0, 80),
      city: this.decodeHeader(
        headers['cf-ipcity'] || headers['x-vercel-ip-city'],
      ).slice(0, 100),
      occurredAt,
      expiresAt: new Date(occurredAt.getTime() + 400 * 86400000),
    });
  }

  private range(query: AnalyticsQueryDto) {
    const to = query.to ? new Date(query.to) : new Date();
    if (query.to) to.setHours(23, 59, 59, 999);
    const days = Number(query.days || 30);
    const from = query.from
      ? new Date(query.from)
      : new Date(to.getTime() - (days - 1) * 86400000);
    from.setHours(0, 0, 0, 0);
    const length = Math.max(
      1,
      Math.ceil((to.getTime() - from.getTime()) / 86400000),
    );
    const previousFrom = new Date(from.getTime() - length * 86400000);
    return { from, to, previousFrom };
  }

  private async core(from: Date, to: Date) {
    const match = { occurredAt: { $gte: from, $lte: to } };
    const [pageViews, sessions, visitors, engagement, goals] =
      await Promise.all([
        this.eventModel.countDocuments({ ...match, type: 'page_view' }),
        this.eventModel.distinct('sessionId', match),
        this.eventModel.distinct('visitorId', match),
        this.eventModel.aggregate<TotalResult>([
          { $match: { ...match, type: 'engagement' } },
          { $group: { _id: null, total: { $sum: '$durationMs' } } },
        ]),
        this.eventModel.countDocuments({
          ...match,
          type: {
            $in: [
              'contact_click',
              'contact_submit',
              'newsletter_subscribe',
              'external_click',
            ],
          },
        }),
      ]);
    return {
      pageViews,
      sessions: sessions.length,
      visitors: visitors.length,
      engagementMs: engagement[0]?.total || 0,
      goals,
    };
  }

  private async breakdown(
    field: string,
    from: Date,
    to: Date,
    type = 'page_view',
    limit = 10,
  ) {
    return this.eventModel.aggregate<BreakdownResult>([
      { $match: { occurredAt: { $gte: from, $lte: to }, type } },
      {
        $group: {
          _id: { $ifNull: [`$${field}`, 'Unknown'] },
          views: { $sum: 1 },
          visitors: { $addToSet: '$visitorId' },
          sessions: { $addToSet: '$sessionId' },
        },
      },
      {
        $project: {
          _id: 0,
          label: '$_id',
          views: 1,
          visitors: { $size: '$visitors' },
          sessions: { $size: '$sessions' },
        },
      },
      { $sort: { views: -1 } },
      { $limit: limit },
    ]);
  }

  async live() {
    const now = new Date();
    const since = new Date(now.getTime() - 5 * 60 * 1000);
    const match = { occurredAt: { $gte: since, $lte: now } };

    const [activeVisitorIds, pageViews, goalEvents, topPages, recentEvents] =
      await Promise.all([
        this.eventModel.distinct('visitorId', match),
        this.eventModel.countDocuments({ ...match, type: 'page_view' }),
        this.eventModel.countDocuments({
          ...match,
          type: {
            $in: [
              'contact_click',
              'contact_submit',
              'newsletter_subscribe',
              'external_click',
            ],
          },
        }),
        this.eventModel.aggregate<{ path: string; views: number }>([
          { $match: { ...match, type: 'page_view' } },
          { $group: { _id: '$path', views: { $sum: 1 } } },
          { $sort: { views: -1 } },
          { $limit: 6 },
          { $project: { _id: 0, path: '$_id', views: 1 } },
        ]),
        this.eventModel
          .find(match)
          .sort({ occurredAt: -1 })
          .limit(12)
          .select('type path source device country occurredAt -_id')
          .lean(),
      ]);

    return {
      generatedAt: now,
      windowMinutes: 5,
      activeVisitors: activeVisitorIds.length,
      pageViews,
      goalEvents,
      topPages,
      recentEvents,
    };
  }

  async report(query: AnalyticsQueryDto) {
    const { from, to, previousFrom } = this.range(query);
    const [
      current,
      previous,
      timeline,
      sources,
      pages,
      devices,
      browsers,
      countries,
      cities,
      events,
      newVisitors,
      journeys,
      hours,
    ] = await Promise.all([
      this.core(from, to),
      this.core(previousFrom, new Date(from.getTime() - 1)),
      this.eventModel.aggregate<TimelineResult>([
        { $match: { occurredAt: { $gte: from, $lte: to }, type: 'page_view' } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: '%Y-%m-%d',
                date: '$occurredAt',
                timezone: 'Asia/Riyadh',
              },
            },
            views: { $sum: 1 },
            visitors: { $addToSet: '$visitorId' },
          },
        },
        {
          $project: {
            _id: 0,
            date: '$_id',
            views: 1,
            visitors: { $size: '$visitors' },
          },
        },
        { $sort: { date: 1 } },
      ]),
      this.breakdown('source', from, to),
      this.breakdown('path', from, to),
      this.breakdown('device', from, to),
      this.breakdown('browser', from, to),
      this.breakdown('country', from, to),
      this.breakdown('city', from, to),
      this.eventModel.aggregate<EventResult>([
        {
          $match: {
            occurredAt: { $gte: from, $lte: to },
            type: { $ne: 'page_view' },
          },
        },
        { $group: { _id: '$type', count: { $sum: 1 } } },
        { $project: { _id: 0, type: '$_id', count: 1 } },
        { $sort: { count: -1 } },
      ]),
      this.eventModel.aggregate<CountResult>([
        { $match: { occurredAt: { $lte: to }, type: 'page_view' } },
        { $group: { _id: '$visitorId', firstSeen: { $min: '$occurredAt' } } },
        { $match: { firstSeen: { $gte: from } } },
        { $count: 'count' },
      ]),
      this.eventModel.aggregate<JourneyResult>([
        { $match: { occurredAt: { $gte: from, $lte: to }, type: 'page_view' } },
        { $sort: { occurredAt: 1 } },
        {
          $group: {
            _id: '$sessionId',
            entry: { $first: '$path' },
            exit: { $last: '$path' },
          },
        },
        {
          $facet: {
            entries: [
              { $group: { _id: '$entry', views: { $sum: 1 } } },
              { $sort: { views: -1 } },
              { $limit: 8 },
              { $project: { _id: 0, label: '$_id', views: 1 } },
            ],
            exits: [
              { $group: { _id: '$exit', views: { $sum: 1 } } },
              { $sort: { views: -1 } },
              { $limit: 8 },
              { $project: { _id: 0, label: '$_id', views: 1 } },
            ],
          },
        },
      ]),
      this.eventModel.aggregate<BreakdownResult>([
        { $match: { occurredAt: { $gte: from, $lte: to }, type: 'page_view' } },
        {
          $group: {
            _id: { $hour: { date: '$occurredAt', timezone: 'Asia/Riyadh' } },
            views: { $sum: 1 },
            visitors: { $addToSet: '$visitorId' },
            sessions: { $addToSet: '$sessionId' },
          },
        },
        {
          $project: {
            _id: 0,
            label: { $concat: [{ $toString: '$_id' }, ':00'] },
            views: 1,
            visitors: { $size: '$visitors' },
            sessions: { $size: '$sessions' },
          },
        },
        { $sort: { views: -1 } },
        { $limit: 8 },
      ]),
    ]);
    const activeVisitors = (
      await this.eventModel.distinct('visitorId', {
        occurredAt: { $gte: new Date(Date.now() - 5 * 60000) },
      })
    ).length;
    const trend = (value: number, old: number) =>
      old ? Math.round(((value - old) / old) * 100) : value ? 100 : 0;
    return {
      range: { from, to },
      summary: {
        ...current,
        activeVisitors,
        newVisitors: newVisitors[0]?.count || 0,
        returningVisitors: Math.max(
          0,
          current.visitors - (newVisitors[0]?.count || 0),
        ),
        avgEngagementSeconds: current.sessions
          ? Math.round(current.engagementMs / current.sessions / 1000)
          : 0,
        pagesPerSession: current.sessions
          ? Number((current.pageViews / current.sessions).toFixed(1))
          : 0,
        conversionRate: current.sessions
          ? Number(((current.goals / current.sessions) * 100).toFixed(1))
          : 0,
        trends: {
          visitors: trend(current.visitors, previous.visitors),
          sessions: trend(current.sessions, previous.sessions),
          pageViews: trend(current.pageViews, previous.pageViews),
          goals: trend(current.goals, previous.goals),
        },
      },
      timeline,
      sources,
      pages,
      devices,
      browsers,
      countries,
      cities,
      events,
      entryPages: journeys[0]?.entries || [],
      exitPages: journeys[0]?.exits || [],
      activeHours: hours,
    };
  }
}
