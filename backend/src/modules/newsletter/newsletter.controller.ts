import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Ip,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { NewsletterService } from './newsletter.service';
import { SubscribeDto } from './dto/subscribe.dto';
import { UnsubscribeDto } from './dto/unsubscribe.dto';
import { FilterSubscribersDto } from './dto/filter-subscribers.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) { }

  @Public()
  @Throttle({ default: { ttl: 3600000, limit: 3 } }) // 3 requests per hour
  @Post('subscribe')
  async subscribe(@Body() subscribeDto: SubscribeDto, @Ip() ip: string) {
    const subscriber = await this.newsletterService.subscribe(subscribeDto, ip);
    return {
      message: 'تم الاشتراك في النشرة البريدية بنجاح',
      data: subscriber,
    };
  }

  @Public()
  @Post('unsubscribe')
  async unsubscribe(@Body() unsubscribeDto: UnsubscribeDto) {
    const subscriber = await this.newsletterService.unsubscribe(unsubscribeDto);
    return {
      message: 'تم إلغاء الاشتراك من النشرة البريدية بنجاح',
      data: subscriber,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('subscribers')
  async findAll(@Query() filterDto: FilterSubscribersDto) {
    const result = await this.newsletterService.findAll(filterDto);
    return {
      message: 'تم جلب المشتركين بنجاح',
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('subscribers/:id')
  async findOne(@Param('id') id: string) {
    const subscriber = await this.newsletterService.findOne(id);
    return {
      message: 'تم جلب المشترك بنجاح',
      data: subscriber,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('stats')
  async getStats() {
    const stats = await this.newsletterService.getStats();
    return {
      message: 'تم جلب الإحصائيات بنجاح',
      data: stats,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('subscribers/:id')
  async remove(@Param('id') id: string) {
    await this.newsletterService.remove(id);
    return {
      message: 'تم حذف المشترك بنجاح',
      data: null,
    };
  }
}

