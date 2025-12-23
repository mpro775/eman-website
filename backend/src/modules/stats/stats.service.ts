import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '../projects/schemas/project.schema';
import { PostBlog } from '../blog/posts/schemas/post.schema';
import { ContactMessage } from '../contact/schemas/contact-message.schema';
import { Testimonial } from '../testimonials/schemas/testimonial.schema';
import { UsedProgram } from '../used-programs/schemas/used-program.schema';
import { NewsletterSubscriber } from '../newsletter/schemas/newsletter-subscriber.schema';
import { Service } from '../services/schemas/service.schema';

export interface StatItem {
    key: string;
    title: string;
    total: number;
    previousTotal: number;
    trend: {
        value: number;
        isPositive: boolean;
    };
}

export interface DashboardStats {
    stats: StatItem[];
    generatedAt: Date;
    periodDays: number;
}

@Injectable()
export class StatsService {
    constructor(
        @InjectModel(Project.name) private projectModel: Model<Project>,
        @InjectModel(PostBlog.name) private postModel: Model<PostBlog>,
        @InjectModel(ContactMessage.name) private contactModel: Model<ContactMessage>,
        @InjectModel(Testimonial.name) private testimonialModel: Model<Testimonial>,
        @InjectModel(UsedProgram.name) private programModel: Model<UsedProgram>,
        @InjectModel(NewsletterSubscriber.name) private subscriberModel: Model<NewsletterSubscriber>,
        @InjectModel(Service.name) private serviceModel: Model<Service>,
    ) { }

    /**
     * Calculate trend percentage between current and previous period
     */
    private calculateTrend(current: number, previous: number): { value: number; isPositive: boolean } {
        if (previous === 0) {
            return { value: current > 0 ? 100 : 0, isPositive: current >= 0 };
        }

        const percentChange = ((current - previous) / previous) * 100;
        return {
            value: Math.abs(Math.round(percentChange)),
            isPositive: percentChange >= 0,
        };
    }

    /**
     * Count documents created in a date range
     */
    private async countInPeriod(
        model: Model<any>,
        startDate: Date,
        endDate: Date,
    ): Promise<number> {
        return model.countDocuments({
            createdAt: { $gte: startDate, $lt: endDate },
        });
    }

    /**
     * Get dashboard statistics with real trend calculations
     * Compares current period (last N days) with previous period (N days before that)
     */
    async getDashboardStats(periodDays: number = 30): Promise<DashboardStats> {
        const now = new Date();
        const currentPeriodStart = new Date(now);
        currentPeriodStart.setDate(currentPeriodStart.getDate() - periodDays);

        const previousPeriodStart = new Date(currentPeriodStart);
        previousPeriodStart.setDate(previousPeriodStart.getDate() - periodDays);

        // Get all totals in parallel
        const [
            projectsTotal,
            projectsCurrent,
            projectsPrevious,
            postsTotal,
            postsCurrent,
            postsPrevious,
            messagesTotal,
            messagesCurrent,
            messagesPrevious,
            testimonialsTotal,
            testimonialsCurrent,
            testimonialsPrevious,
            programsTotal,
            programsCurrent,
            programsPrevious,
            subscribersTotal,
            subscribersCurrent,
            subscribersPrevious,
            servicesTotal,
            servicesCurrent,
            servicesPrevious,
        ] = await Promise.all([
            // Projects
            this.projectModel.countDocuments(),
            this.countInPeriod(this.projectModel, currentPeriodStart, now),
            this.countInPeriod(this.projectModel, previousPeriodStart, currentPeriodStart),
            // Posts
            this.postModel.countDocuments(),
            this.countInPeriod(this.postModel, currentPeriodStart, now),
            this.countInPeriod(this.postModel, previousPeriodStart, currentPeriodStart),
            // Messages
            this.contactModel.countDocuments(),
            this.countInPeriod(this.contactModel, currentPeriodStart, now),
            this.countInPeriod(this.contactModel, previousPeriodStart, currentPeriodStart),
            // Testimonials
            this.testimonialModel.countDocuments(),
            this.countInPeriod(this.testimonialModel, currentPeriodStart, now),
            this.countInPeriod(this.testimonialModel, previousPeriodStart, currentPeriodStart),
            // Programs
            this.programModel.countDocuments(),
            this.countInPeriod(this.programModel, currentPeriodStart, now),
            this.countInPeriod(this.programModel, previousPeriodStart, currentPeriodStart),
            // Subscribers
            this.subscriberModel.countDocuments(),
            this.countInPeriod(this.subscriberModel, currentPeriodStart, now),
            this.countInPeriod(this.subscriberModel, previousPeriodStart, currentPeriodStart),
            // Services
            this.serviceModel.countDocuments(),
            this.countInPeriod(this.serviceModel, currentPeriodStart, now),
            this.countInPeriod(this.serviceModel, previousPeriodStart, currentPeriodStart),
        ]);

        return {
            stats: [
                {
                    key: 'projects',
                    title: 'المشاريع',
                    total: projectsTotal,
                    previousTotal: projectsPrevious,
                    trend: this.calculateTrend(projectsCurrent, projectsPrevious),
                },
                {
                    key: 'posts',
                    title: 'المقالات',
                    total: postsTotal,
                    previousTotal: postsPrevious,
                    trend: this.calculateTrend(postsCurrent, postsPrevious),
                },
                {
                    key: 'messages',
                    title: 'الرسائل',
                    total: messagesTotal,
                    previousTotal: messagesPrevious,
                    trend: this.calculateTrend(messagesCurrent, messagesPrevious),
                },
                {
                    key: 'testimonials',
                    title: 'الشهادات',
                    total: testimonialsTotal,
                    previousTotal: testimonialsPrevious,
                    trend: this.calculateTrend(testimonialsCurrent, testimonialsPrevious),
                },
                {
                    key: 'programs',
                    title: 'البرامج',
                    total: programsTotal,
                    previousTotal: programsPrevious,
                    trend: this.calculateTrend(programsCurrent, programsPrevious),
                },
                {
                    key: 'subscribers',
                    title: 'المشتركين',
                    total: subscribersTotal,
                    previousTotal: subscribersPrevious,
                    trend: this.calculateTrend(subscribersCurrent, subscribersPrevious),
                },
                {
                    key: 'services',
                    title: 'الخدمات',
                    total: servicesTotal,
                    previousTotal: servicesPrevious,
                    trend: this.calculateTrend(servicesCurrent, servicesPrevious),
                },
            ],
            generatedAt: now,
            periodDays,
        };
    }
}
