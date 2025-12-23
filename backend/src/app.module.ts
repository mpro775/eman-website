import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProfileModule } from './modules/profile/profile.module';
import { ProjectsModule } from './modules/projects/projects.module';
import { BlogModule } from './modules/blog/blog.module';
import { ServicesModule } from './modules/services/services.module';
import { ContactModule } from './modules/contact/contact.module';
import { TestimonialsModule } from './modules/testimonials/testimonials.module';
import { UsedProgramsModule } from './modules/used-programs/used-programs.module';
import { NewsletterModule } from './modules/newsletter/newsletter.module';
import { StatsModule } from './modules/stats/stats.module';
import { ExperiencesModule } from './modules/experiences/experiences.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import databaseConfig from './config/database.config';
import jwtConfig from './config/jwt.config';
import cloudflareConfig from './config/cloudflare.config';
import appConfig from './config/app.config';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig, jwtConfig, cloudflareConfig, appConfig],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000, // 60 seconds
        limit: 10, // 10 requests per TTL
      },
    ]),
    DatabaseModule,
    UsersModule,
    AuthModule,
    ProfileModule,
    ProjectsModule,
    BlogModule,
    ServicesModule,
    ContactModule,
    TestimonialsModule,
    UsedProgramsModule,
    NewsletterModule,
    StatsModule,
    ExperiencesModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule { }
