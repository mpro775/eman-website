import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContactMessage, MessageStatus } from './schemas/contact-message.schema';
import { CreateMessageDto } from './dto/create-message.dto';
import { createPaginatedResponse } from '../../common/utils/pagination.util';

@Injectable()
export class ContactService {
  constructor(
    @InjectModel(ContactMessage.name)
    private contactMessageModel: Model<ContactMessage>,
  ) {}

  async create(
    createMessageDto: CreateMessageDto,
    ipAddress: string,
  ): Promise<ContactMessage> {
    const message = new this.contactMessageModel({
      ...createMessageDto,
      ipAddress,
    });

    const savedMessage = await message.save();
    return savedMessage.populate('selectedService', 'name description icon');
  }

  async findAll(page: number = 1, limit: number = 10, status?: MessageStatus) {
    const query: any = {};

    if (status) {
      query.status = status;
    }

    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      this.contactMessageModel
        .find(query)
        .populate('selectedService', 'name description icon')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .exec(),
      this.contactMessageModel.countDocuments(query),
    ]);

    return createPaginatedResponse(data, total, page, limit);
  }

  async findOne(id: string): Promise<ContactMessage> {
    const message = await this.contactMessageModel
      .findById(id)
      .populate('selectedService', 'name description icon');

    if (!message) {
      throw new NotFoundException('الرسالة غير موجودة');
    }

    return message;
  }

  async updateStatus(id: string, status: MessageStatus): Promise<ContactMessage> {
    const message = await this.contactMessageModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!message) {
      throw new NotFoundException('الرسالة غير موجودة');
    }

    return message;
  }

  async remove(id: string): Promise<void> {
    const result = await this.contactMessageModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('الرسالة غير موجودة');
    }
  }
}

