import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  Query,
  UseGuards,
  Request,
  Ip,
} from '@nestjs/common';
import { Throttle } from '@nestjs/throttler';
import { ContactService } from './contact.service';
import { CreateMessageDto } from './dto/create-message.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { MessageStatus } from './schemas/contact-message.schema';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) { }

  @Public()
  @Throttle({ default: { ttl: 3600000, limit: 3 } }) // 3 messages per hour
  @Post()
  async create(@Body() createMessageDto: CreateMessageDto, @Ip() ip: string) {
    const message = await this.contactService.create(createMessageDto, ip);
    return {
      message: 'تم إرسال رسالتك بنجاح',
      data: message,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages')
  async findAll(
    @Query('page') page?: number,
    @Query('limit') limit?: number,
    @Query('status') status?: MessageStatus,
  ) {
    const result = await this.contactService.findAll(page, limit, status);
    return {
      message: 'تم جلب الرسائل بنجاح',
      data: result,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get('messages/:id')
  async findOne(@Param('id') id: string) {
    const message = await this.contactService.findOne(id);
    return {
      message: 'تم جلب الرسالة بنجاح',
      data: message,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Patch('messages/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    const message = await this.contactService.updateStatus(
      id,
      updateStatusDto.status,
    );
    return {
      message: 'تم تحديث حالة الرسالة بنجاح',
      data: message,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Delete('messages/:id')
  async remove(@Param('id') id: string) {
    await this.contactService.remove(id);
    return {
      message: 'تم حذف الرسالة بنجاح',
      data: null,
    };
  }
}

