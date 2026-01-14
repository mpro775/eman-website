import { useEffect, useState } from 'react';
import { FiFolder, FiFileText, FiMail, FiStar, FiCode, FiUsers, FiSettings } from 'react-icons/fi';
import { StatsCard } from '../components/ui/StatsCard';
import { Card } from '../components/ui/Card';
import { LoadingSpinner } from '../components/ui/LoadingSpinner';
import { statsService } from '../../services/stats.service';
import type { StatItem } from '../../services/stats.service';

interface StatData {
  title: string;
  value: number;
  icon: React.ReactNode;
  color: 'blue' | 'green' | 'purple' | 'orange';
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

// Map stats keys to icons and colors
const STAT_CONFIG: Record<string, { icon: React.ReactNode; color: 'blue' | 'green' | 'purple' | 'orange' }> = {
  projects: { icon: <FiFolder />, color: 'blue' },
  posts: { icon: <FiFileText />, color: 'green' },
  messages: { icon: <FiMail />, color: 'orange' },
  testimonials: { icon: <FiStar />, color: 'purple' },
  programs: { icon: <FiCode />, color: 'blue' },
  subscribers: { icon: <FiUsers />, color: 'green' },
  services: { icon: <FiSettings />, color: 'orange' },
};

export const Dashboard = () => {
  const [stats, setStats] = useState<StatData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const dashboardStats = await statsService.getDashboardStats(30);

        // Transform backend stats to UI format
        const transformedStats: StatData[] = dashboardStats.stats.map((stat: StatItem) => {
          const config = STAT_CONFIG[stat.key] || { icon: <FiFolder />, color: 'blue' as const };
          const baseData = {
            title: stat.title,
            value: stat.total,
            icon: config.icon,
            color: config.color,
          };
          // Only include trend if there's actual change
          if (stat.trend.value > 0) {
            return { ...baseData, trend: stat.trend };
          }
          return baseData;
        });

        setStats(transformedStats);
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1
          className="text-4xl font-bold text-[color:var(--color-admin-text-primary)] mb-2"
          style={{ animation: 'slideUp 0.3s ease-out' }}
        >
          لوحة التحكم
        </h1>
        <p
          className="text-base text-[color:var(--color-admin-text-muted)]"
          style={{ animation: 'slideUp 0.4s ease-out' }}
        >
          مرحباً بك، استعرض إحصائيات موقعك
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              animation: `slideUp ${0.2 + index * 0.1}s ease-out`
            }}
          >
            <StatsCard
              title={stat.title}
              value={stat.value}
              icon={stat.icon}
              color={stat.color}
              {...(stat.trend && { trend: stat.trend })}
            />
          </div>
        ))}
      </div>

      {/* Quick Actions Section */}
      <div style={{ animation: 'slideUp 1s ease-out' }}>
        <h2 className="text-2xl font-bold text-[color:var(--color-admin-text-primary)] mb-4">
          إجراءات سريعة
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card hover gradient className="cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#4a9eff] to-[#6b5eff] flex items-center justify-center text-white text-xl">
                <FiFolder />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[color:var(--color-admin-text-primary)] mb-1">
                  إضافة مشروع جديد
                </h3>
                <p className="text-sm text-[color:var(--color-admin-text-muted)] m-0">
                  أضف مشروع جديد إلى معرض أعمالك
                </p>
              </div>
            </div>
          </Card>

          <Card hover gradient className="cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#10b981] to-[#059669] flex items-center justify-center text-white text-xl">
                <FiFileText />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[color:var(--color-admin-text-primary)] mb-1">
                  كتابة مقال
                </h3>
                <p className="text-sm text-[color:var(--color-admin-text-muted)] m-0">
                  شارك أفكارك مع جمهورك
                </p>
              </div>
            </div>
          </Card>

          <Card hover gradient className="cursor-pointer">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#9d4edd] to-[#7b2cbf] flex items-center justify-center text-white text-xl">
                <FiMail />
              </div>
              <div>
                <h3 className="text-base font-semibold text-[color:var(--color-admin-text-primary)] mb-1">
                  عرض الرسائل
                </h3>
                <p className="text-sm text-[color:var(--color-admin-text-muted)] m-0">
                  تحقق من رسائل العملاء الجديدة
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

