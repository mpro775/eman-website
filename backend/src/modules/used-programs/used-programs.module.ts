import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsedProgramsService } from './used-programs.service';
import { UsedProgramsController } from './used-programs.controller';
import { UsedProgram, UsedProgramSchema } from './schemas/used-program.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: UsedProgram.name, schema: UsedProgramSchema }]),
  ],
  controllers: [UsedProgramsController],
  providers: [UsedProgramsService],
  exports: [UsedProgramsService],
})
export class UsedProgramsModule {}

