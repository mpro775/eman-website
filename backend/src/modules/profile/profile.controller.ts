import {
  Controller,
  Get,
  Put,
  Body,
  UseGuards,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { Public } from '../../common/decorators/public.decorator';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Public()
  @Get()
  async getProfile() {
    const profile = await this.profileService.getProfile();
    return {
      message: 'تم جلب الملف الشخصي بنجاح',
      data: profile,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  async updateProfile(@Body() updateProfileDto: UpdateProfileDto) {
    const profile = await this.profileService.updateProfile(updateProfileDto);
    return {
      message: 'تم تحديث الملف الشخصي بنجاح',
      data: profile,
    };
  }
}

