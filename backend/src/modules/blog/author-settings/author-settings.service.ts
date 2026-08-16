import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthorSettings } from './schemas/author-settings.schema';
import { UpdateAuthorSettingsDto } from './dto/update-author-settings.dto';

const DEFAULT_SETTINGS = {
  name: 'إيمان جميل',
  title: 'كاتب ومتخصص في التكنولوجيا والذكاء الاصطناعي',
  image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
  buttonText: 'عرض المزيد من المقالات',
  buttonLink: '/blog',
  isEnabled: true,
};

@Injectable()
export class AuthorSettingsService {
  constructor(
    @InjectModel(AuthorSettings.name)
    private authorSettingsModel: Model<AuthorSettings>,
  ) {}

  async getSettings(): Promise<AuthorSettings> {
    let settings = await this.authorSettingsModel.findOne().exec();
    if (!settings) {
      settings = await this.authorSettingsModel.create(DEFAULT_SETTINGS);
    }
    return settings;
  }

  async updateSettings(dto: UpdateAuthorSettingsDto): Promise<AuthorSettings> {
    let settings = await this.authorSettingsModel.findOne().exec();
    if (!settings) {
      settings = await this.authorSettingsModel.create({
        ...DEFAULT_SETTINGS,
        ...dto,
      });
    } else {
      Object.assign(settings, dto);
      await settings.save();
    }
    return settings;
  }
}
