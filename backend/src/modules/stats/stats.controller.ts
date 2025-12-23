import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { StatsService, DashboardStats } from './stats.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('stats')
@UseGuards(JwtAuthGuard)
export class StatsController {
    constructor(private readonly statsService: StatsService) { }

    /**
     * Get dashboard statistics
     * @param periodDays - Number of days to compare (default: 30)
     */
    @Get('dashboard')
    async getDashboardStats(@Query('periodDays') periodDays?: string) {
        const days = periodDays ? parseInt(periodDays, 10) : 30;
        const stats = await this.statsService.getDashboardStats(days);
        return {
            message: 'تم جلب الإحصائيات بنجاح',
            data: stats,
        };
    }
}
