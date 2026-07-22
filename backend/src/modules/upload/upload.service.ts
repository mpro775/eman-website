import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { S3Client, PutObjectCommand, GetObjectCommand } from '@aws-sdk/client-s3';
import * as fs from 'fs';
import * as path from 'path';
import sharp from 'sharp';
import { Readable } from 'stream';

export interface UploadResponse {
  url: string;
  filename: string;
  size: number;
  mimetype: string;
}

export interface FileResponse {
  stream: Readable;
  contentType: string;
  contentLength?: number;
}

@Injectable()
export class UploadService {
  private readonly logger = new Logger(UploadService.name);
  private s3Client: S3Client | null = null;
  private readonly bucketName: string;
  private readonly endpoint: string;
  private readonly publicUrl: string;
  private readonly appUrl: string;

  constructor(private readonly configService: ConfigService) {
    const accessKey = this.configService.get<string>('cloudflare.r2.accessKey');
    const secretKey = this.configService.get<string>('cloudflare.r2.secretKey');
    this.endpoint = this.configService.get<string>('cloudflare.r2.endpoint') || '';
    this.bucketName = this.configService.get<string>('cloudflare.r2.bucket') || 'eman-portfolio-files';
    this.publicUrl = this.configService.get<string>('cloudflare.r2.publicUrl') || '';
    this.appUrl = this.configService.get<string>('app.url') || 'http://localhost:3000';

    if (accessKey && secretKey && this.endpoint) {
      this.s3Client = new S3Client({
        region: 'auto',
        endpoint: this.endpoint,
        credentials: {
          accessKeyId: accessKey,
          secretAccessKey: secretKey,
        },
      });
      this.logger.log('Cloudflare R2 storage initialized.');
    } else {
      this.logger.warn('Cloudflare R2 credentials not provided. Falling back to local file storage.');
    }
  }

  async uploadImage(
    file: Express.Multer.File,
    folder: string = 'projects',
  ): Promise<UploadResponse> {
    if (!file || !file.buffer) {
      throw new BadRequestException('لم يتم تقديم أي ملف للرفع');
    }

    // Process image with Sharp
    let processedBuffer: Buffer = file.buffer;
    let extension = path.extname(file.originalname).toLowerCase();
    let mimetype = file.mimetype;

    try {
      if (file.mimetype.startsWith('image/')) {
        processedBuffer = await sharp(file.buffer)
          .resize(2048, 2048, { fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85 })
          .toBuffer();
        extension = '.webp';
        mimetype = 'image/webp';
      }
    } catch (err) {
      this.logger.warn(`Sharp processing skipped/failed: ${err.message}. Using original file buffer.`);
      processedBuffer = file.buffer;
    }

    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const filename = `${folder}/${uniqueSuffix}${extension}`;

    if (this.s3Client) {
      return this.uploadToR2(filename, processedBuffer, mimetype, file.originalname);
    } else {
      return this.uploadToLocal(filename, processedBuffer, mimetype, file.originalname);
    }
  }

  /**
   * Get a file from R2 storage (used as proxy when no public URL is configured)
   */
  async getFile(key: string): Promise<FileResponse> {
    if (this.s3Client) {
      return this.getFileFromR2(key);
    } else {
      return this.getFileFromLocal(key);
    }
  }

  private async uploadToR2(
    key: string,
    buffer: Buffer,
    mimetype: string,
    originalName: string,
  ): Promise<UploadResponse> {
    try {
      const command = new PutObjectCommand({
        Bucket: this.bucketName,
        Key: key,
        Body: buffer,
        ContentType: mimetype,
      });

      await this.s3Client!.send(command);

      let url: string;
      if (this.publicUrl) {
        // Use the configured public URL (R2.dev subdomain or custom domain)
        url = `${this.publicUrl.replace(/\/$/, '')}/${key}`;
      } else {
        // Fallback: use backend proxy endpoint to serve the file
        url = `${this.appUrl.replace(/\/$/, '')}/api/upload/files/${key}`;
      }

      return {
        url,
        filename: key,
        size: buffer.length,
        mimetype,
      };
    } catch (error) {
      this.logger.error(`Failed to upload to Cloudflare R2: ${error.message}`, error.stack);
      throw new BadRequestException(`فشل رفع الملف إلى Cloudflare R2: ${error.message}`);
    }
  }

  private async getFileFromR2(key: string): Promise<FileResponse> {
    try {
      const command = new GetObjectCommand({
        Bucket: this.bucketName,
        Key: key,
      });

      const response = await this.s3Client!.send(command);

      if (!response.Body) {
        throw new NotFoundException('الملف غير موجود');
      }

      return {
        stream: response.Body as Readable,
        contentType: response.ContentType || 'application/octet-stream',
        contentLength: response.ContentLength,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      this.logger.error(`Failed to get file from R2: ${error.message}`, error.stack);
      throw new NotFoundException('الملف غير موجود');
    }
  }

  private async uploadToLocal(
    filename: string,
    buffer: Buffer,
    mimetype: string,
    originalName: string,
  ): Promise<UploadResponse> {
    try {
      const uploadsDir = path.join(process.cwd(), 'uploads');
      const targetPath = path.join(uploadsDir, filename);
      const targetDir = path.dirname(targetPath);

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true });
      }

      await fs.promises.writeFile(targetPath, buffer);

      const url = `${this.appUrl.replace(/\/$/, '')}/uploads/${filename}`;

      return {
        url,
        filename,
        size: buffer.length,
        mimetype,
      };
    } catch (error) {
      this.logger.error(`Failed to upload to local storage: ${error.message}`, error.stack);
      throw new BadRequestException(`فشل حفظ الملف محلياً: ${error.message}`);
    }
  }

  private async getFileFromLocal(key: string): Promise<FileResponse> {
    const filePath = path.join(process.cwd(), 'uploads', key);

    // Prevent path traversal
    const resolvedPath = path.resolve(filePath);
    const uploadsDir = path.resolve(path.join(process.cwd(), 'uploads'));
    if (!resolvedPath.startsWith(uploadsDir)) {
      throw new BadRequestException('مسار غير صالح');
    }

    if (!fs.existsSync(resolvedPath)) {
      throw new NotFoundException('الملف غير موجود');
    }

    const ext = path.extname(key).toLowerCase();
    const mimeTypes: Record<string, string> = {
      '.webp': 'image/webp',
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.gif': 'image/gif',
    };

    return {
      stream: fs.createReadStream(resolvedPath),
      contentType: mimeTypes[ext] || 'application/octet-stream',
    };
  }
}
