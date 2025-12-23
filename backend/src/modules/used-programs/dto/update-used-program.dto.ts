import { PartialType } from '@nestjs/mapped-types';
import { CreateUsedProgramDto } from './create-used-program.dto';

export class UpdateUsedProgramDto extends PartialType(CreateUsedProgramDto) {}

