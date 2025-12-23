import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, SortOrder } from 'mongoose';
import {
  NewsletterSubscriber,
  SubscriberStatus,
} from './schemas/newsletter-subscriber.schema';
import { SubscribeDto } from './dto/subscribe.dto';
import { UnsubscribeDto } from './dto/unsubscribe.dto';
import { FilterSubscribersDto } from './dto/filter-subscribers.dto';
import { createPaginatedResponse } from '../../common/utils/pagination.util';

@Injectable()
export class NewsletterService {
  constructor(
    @InjectModel(NewsletterSubscriber.name)
    private subscriberModel: Model<NewsletterSubscriber>,
  ) {}

  async subscribe(
    subscribeDto: SubscribeDto,
    ipAddress: string,
  ): Promise<NewsletterSubscriber> {
    const email = subscribeDto.email.toLowerCase().trim();

    // Check if already subscribed
    const existingSubscriber = await this.subscriberModel.findOne({ email });

    if (existingSubscriber) {
      if (existingSubscriber.status === SubscriberStatus.SUBSCRIBED) {
        throw new ConflictException('أنت مشترك بالفعل في النشرة البريدية');
      } else {
        // Re-subscribe
        existingSubscriber.status = SubscriberStatus.SUBSCRIBED;
        existingSubscriber.unsubscribedAt = null;
        existingSubscriber.ipAddress = ipAddress;
        return existingSubscriber.save();
      }
    }

    // Create new subscriber
    const subscriber = new this.subscriberModel({
      email,
      status: SubscriberStatus.SUBSCRIBED,
      ipAddress,
    });

    return subscriber.save();
  }

  async unsubscribe(
    unsubscribeDto: UnsubscribeDto,
  ): Promise<NewsletterSubscriber> {
    const email = unsubscribeDto.email.toLowerCase().trim();

    const subscriber = await this.subscriberModel.findOne({ email });

    if (!subscriber) {
      throw new NotFoundException(
        'البريد الإلكتروني غير موجود في قائمة المشتركين',
      );
    }

    if (subscriber.status === SubscriberStatus.UNSUBSCRIBED) {
      throw new BadRequestException('أنت غير مشترك بالفعل في النشرة البريدية');
    }

    subscriber.status = SubscriberStatus.UNSUBSCRIBED;
    subscriber.unsubscribedAt = new Date();

    return subscriber.save();
  }

  async findAll(filterDto: FilterSubscribersDto) {
    const {
      page = 1,
      limit = 10,
      search,
      sortBy = 'createdAt',
      sortOrder = 'desc',
      status,
    } = filterDto;

    const query: Record<string, unknown> = {};

    // Apply status filter
    if (status) {
      query.status = status;
    }

    // Apply search
    if (search) {
      query.email = { $regex: search, $options: 'i' };
    }

    const skip = (page - 1) * limit;
    const sort: Record<string, SortOrder> = {};
    sort[sortBy] = sortOrder === 'asc' ? 1 : -1;

    const [data, total] = await Promise.all([
      this.subscriberModel
        .find(query)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .exec(),
      this.subscriberModel.countDocuments(query),
    ]);

    return createPaginatedResponse(data, total, page, limit);
  }

  async findOne(id: string): Promise<NewsletterSubscriber> {
    const subscriber = await this.subscriberModel.findById(id);

    if (!subscriber) {
      throw new NotFoundException('المشترك غير موجود');
    }

    return subscriber;
  }

  async getStats() {
    const [total, subscribed, unsubscribed] = await Promise.all([
      this.subscriberModel.countDocuments(),
      this.subscriberModel.countDocuments({
        status: SubscriberStatus.SUBSCRIBED,
      }),
      this.subscriberModel.countDocuments({
        status: SubscriberStatus.UNSUBSCRIBED,
      }),
    ]);

    // Get recent subscribers (last 30 days)
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const recentSubscribers = await this.subscriberModel.countDocuments({
      status: SubscriberStatus.SUBSCRIBED,
      createdAt: { $gte: thirtyDaysAgo },
    });

    return {
      total,
      subscribed,
      unsubscribed,
      recentSubscribers,
    };
  }

  async remove(id: string): Promise<void> {
    const result = await this.subscriberModel.findByIdAndDelete(id);

    if (!result) {
      throw new NotFoundException('المشترك غير موجود');
    }
  }
}
