import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { AuthorSettingsService } from './author-settings.service';
import { UpdateAuthorSettingsDto } from './dto/update-author-settings.dto';
import { Public } from '../../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../../common/guards/jwt-auth.guard';

@Controller('blog/author')
export class AuthorSettingsController {
  constructor(private readonly authorSettingsService: AuthorSettingsService) {}

  @Public()
  @Get()
  async getSettings() {
    const settings = await this.authorSettingsService.getSettings();
    return {
      message: 'تم جلب إعدادات الكاتب بنجاح',
      data: settings,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateSettings(@Body() dto: UpdateAuthorSettingsDto) {
    const settings = await this.authorSettingsService.updateSettings(dto);
    return {
      message: 'تم تحديث إعدادات الكاتب بنجاح',
      data: settings,
    };
  }
}
