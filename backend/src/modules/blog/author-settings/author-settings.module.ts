import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthorSettings, AuthorSettingsSchema } from './schemas/author-settings.schema';
import { AuthorSettingsService } from './author-settings.service';
import { AuthorSettingsController } from './author-settings.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: AuthorSettings.name, schema: AuthorSettingsSchema },
    ]),
  ],
  controllers: [AuthorSettingsController],
  providers: [AuthorSettingsService],
  exports: [AuthorSettingsService],
})
export class AuthorSettingsModule {}
