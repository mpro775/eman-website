import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Project, ProjectSchema } from '../projects/schemas/project.schema';
import { PostBlog, PostSchema } from '../blog/posts/schemas/post.schema';
import { ContactMessage, ContactMessageSchema } from '../contact/schemas/contact-message.schema';
import { Testimonial, TestimonialSchema } from '../testimonials/schemas/testimonial.schema';
import { UsedProgram, UsedProgramSchema } from '../used-programs/schemas/used-program.schema';
import { NewsletterSubscriber, NewsletterSubscriberSchema } from '../newsletter/schemas/newsletter-subscriber.schema';
import { Service, ServiceSchema } from '../services/schemas/service.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Project.name, schema: ProjectSchema },
            { name: PostBlog.name, schema: PostSchema },
            { name: ContactMessage.name, schema: ContactMessageSchema },
            { name: Testimonial.name, schema: TestimonialSchema },
            { name: UsedProgram.name, schema: UsedProgramSchema },
            { name: NewsletterSubscriber.name, schema: NewsletterSubscriberSchema },
            { name: Service.name, schema: ServiceSchema },
        ]),
    ],
    controllers: [StatsController],
    providers: [StatsService],
    exports: [StatsService],
})
export class StatsModule { }
