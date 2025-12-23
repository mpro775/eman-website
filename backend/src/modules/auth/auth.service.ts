import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);

    if (!user) {
      throw new UnauthorizedException('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      loginDto.password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('البريد الإلكتروني أو كلمة المرور غير صحيحة');
    }

    const tokens = await this.generateTokens(user);

    // Save refresh token
    const refreshTokens = [...user.refreshTokens, tokens.refreshToken];
    await this.usersService.updateRefreshTokens(user._id.toString(), refreshTokens);

    return {
      message: 'تم تسجيل الدخول بنجاح',
      data: {
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
        ...tokens,
      },
    };
  }

  async logout(userId: string, refreshToken: string) {
    const user = await this.usersService.findById(userId);

    if (user) {
      const refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);
      await this.usersService.updateRefreshTokens(userId, refreshTokens);
    }

    return {
      message: 'تم تسجيل الخروج بنجاح',
      data: null,
    };
  }

  async refreshTokens(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('jwt.refreshSecret'),
      });

      const user = await this.usersService.findById(payload.sub);

      if (!user || !user.refreshTokens.includes(refreshToken)) {
        throw new UnauthorizedException('توكن غير صالح');
      }

      // Remove old refresh token
      const refreshTokens = user.refreshTokens.filter((token) => token !== refreshToken);

      // Generate new tokens
      const tokens = await this.generateTokens(user);

      // Save new refresh token
      refreshTokens.push(tokens.refreshToken);
      await this.usersService.updateRefreshTokens(user._id.toString(), refreshTokens);

      return {
        message: 'تم تحديث التوكن بنجاح',
        data: tokens,
      };
    } catch (error) {
      throw new UnauthorizedException('توكن غير صالح أو منتهي الصلاحية');
    }
  }

  async changePassword(userId: string, changePasswordDto: ChangePasswordDto) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('المستخدم غير موجود');
    }

    const isPasswordValid = await this.usersService.validatePassword(
      changePasswordDto.currentPassword,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('كلمة المرور الحالية غير صحيحة');
    }

    await this.usersService.updatePassword(userId, changePasswordDto.newPassword);

    // Clear all refresh tokens (force re-login)
    await this.usersService.updateRefreshTokens(userId, []);

    return {
      message: 'تم تغيير كلمة المرور بنجاح',
      data: null,
    };
  }

  async getMe(userId: string) {
    const user = await this.usersService.findById(userId);

    if (!user) {
      throw new UnauthorizedException('المستخدم غير موجود');
    }

    return {
      message: 'تم جلب معلومات المستخدم بنجاح',
      data: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  }

  private async generateTokens(user: any) {
    const payload = {
      email: user.email,
      sub: user._id.toString(),
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.accessSecret'),
      expiresIn: this.configService.get<any>('jwt.accessExpiration'),
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('jwt.refreshSecret'),
      expiresIn: this.configService.get<any>('jwt.refreshExpiration'),
    });

    return {
      accessToken,
      refreshToken,
    };
  }
}

