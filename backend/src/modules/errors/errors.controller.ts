import { Controller, Post, Body, HttpCode, HttpStatus, Logger } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('Errors')
@Controller('errors')
export class ErrorsController {
  private readonly logger = new Logger(ErrorsController.name);

  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Log client errors' })
  logError(@Body() errorPayload: Record<string, any>) {
    this.logger.warn(
      `[Client Error Logged]: ${errorPayload?.message || 'No message'} | URL: ${errorPayload?.url || 'N/A'}`,
    );
    return {
      success: true,
      message: 'Error logged successfully',
    };
  }
}
