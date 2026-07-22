import {
  Controller,
  Post,
  Get,
  Param,
  Res,
  UseInterceptors,
  UploadedFile,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags, ApiOperation, ApiConsumes, ApiBody } from '@nestjs/swagger';
import { Response } from 'express';
import { UploadService, UploadResponse } from './upload.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Upload')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Public()
  @Post('image')
  @UseInterceptors(
    FileInterceptor('file', {
      limits: {
        fileSize: 10 * 1024 * 1024, // 10 MB limit
      },
      fileFilter: (req, file, callback) => {
        if (!file.mimetype.match(/^image\/(jpeg|jpg|png|webp|gif)$/i)) {
          return callback(
            new BadRequestException(
              'نوع الملف غير مدعوم. الأنواع المدعومة: PNG, JPG, WEBP, GIF',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  @ApiOperation({ summary: 'Upload image file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
        folder: {
          type: 'string',
          example: 'projects',
        },
      },
    },
  })
  async uploadImage(
    @UploadedFile() file: Express.Multer.File,
    @Body('folder') folder?: string,
  ): Promise<UploadResponse> {
    if (!file) {
      throw new BadRequestException('لم يتم تقديم أي ملف للرفع');
    }
    return this.uploadService.uploadImage(file, folder || 'projects');
  }

  @Public()
  @Get('files/*')
  @ApiOperation({ summary: 'Get uploaded file (proxy for R2 storage)' })
  async getFile(
    @Param() params: Record<string, string>,
    @Res() res: Response,
  ): Promise<void> {
    // Extract the wildcard path - NestJS puts it in params['0'] for wildcard routes
    const key = params['0'] || params['*'];

    if (!key) {
      throw new BadRequestException('مسار الملف مطلوب');
    }

    const fileResponse = await this.uploadService.getFile(key);

    res.setHeader('Content-Type', fileResponse.contentType);
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    if (fileResponse.contentLength) {
      res.setHeader('Content-Length', fileResponse.contentLength);
    }

    fileResponse.stream.pipe(res);
  }
}
