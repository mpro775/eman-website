import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Post,
  Query,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { Public } from '../../common/decorators/public.decorator';
import { AnalyticsService } from './analytics.service';
import { TrackEventDto } from './dto/track-event.dto';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analytics: AnalyticsService) {}

  @Public()
  @Post('track')
  @HttpCode(204)
  @Throttle({ default: { ttl: 60000, limit: 60 } })
  async track(
    @Body() dto: TrackEventDto,
    @Headers() headers: Record<string, string | string[] | undefined>,
  ) {
    await this.analytics.track(dto, headers);
  }

  @Get('report')
  async report(
    @Query() query: AnalyticsQueryDto,
  ): Promise<{ message: string; data: unknown }> {
    return {
      message: 'تم جلب تحليلات الزيارات بنجاح',
      data: await this.analytics.report(query),
    };
  }

  @Get('live')
  async live(): Promise<{ message: string; data: unknown }> {
    return {
      message: 'تم جلب الزيارات المباشرة بنجاح',
      data: await this.analytics.live(),
    };
  }
}
