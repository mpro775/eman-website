import api from './api';

export interface StatTrend {
    value: number;
    isPositive: boolean;
}

export interface StatItem {
    key: string;
    title: string;
    total: number;
    previousTotal: number;
    trend: StatTrend;
}

export interface DashboardStats {
    stats: StatItem[];
    generatedAt: string;
    periodDays: number;
}

interface DashboardStatsResponse {
    message: string;
    data: DashboardStats;
}

export const statsService = {
    /**
     * Get dashboard statistics with real trend calculations
     * @param periodDays - Number of days to compare (default: 30)
     */
    getDashboardStats: async (periodDays: number = 30): Promise<DashboardStats> => {
        const response = await api.get<DashboardStatsResponse>('/stats/dashboard', {
            params: { periodDays },
        });
        return response.data.data;
    },
};
