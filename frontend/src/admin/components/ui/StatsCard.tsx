import type { ReactNode } from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: 'blue' | 'green' | 'purple' | 'orange';
}

const colorClasses = {
  blue: {
    gradient: 'from-[#4a9eff] to-[#6b5eff]',
    bg: 'from-[rgba(74,158,255,0.1)] to-[rgba(107,94,255,0.1)]',
    glow: 'rgba(74, 158, 255, 0.3)',
  },
  green: {
    gradient: 'from-[#10b981] to-[#059669]',
    bg: 'from-[rgba(16,185,129,0.1)] to-[rgba(5,150,105,0.1)]',
    glow: 'rgba(16, 185, 129, 0.3)',
  },
  purple: {
    gradient: 'from-[#9d4edd] to-[#7b2cbf]',
    bg: 'from-[rgba(157,78,221,0.1)] to-[rgba(123,44,191,0.1)]',
    glow: 'rgba(157, 78, 221, 0.3)',
  },
  orange: {
    gradient: 'from-[#f59e0b] to-[#d97706]',
    bg: 'from-[rgba(245,158,11,0.1)] to-[rgba(217,119,6,0.1)]',
    glow: 'rgba(245, 158, 11, 0.3)',
  },
};

export const StatsCard = ({ 
  title, 
  value, 
  icon, 
  trend,
  color = 'blue' 
}: StatsCardProps) => {
  const colors = colorClasses[color];

  return (
    <div 
      className="glass-effect rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02] group cursor-pointer overflow-hidden relative"
      style={{
        animation: 'slideUp 0.4s ease-out',
      }}
    >
      {/* Background gradient effect */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br ${colors.bg} opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <p className="text-sm text-[color:var(--color-admin-text-muted)] mb-1 font-medium">
              {title}
            </p>
            <h3 className="text-3xl font-bold text-[color:var(--color-admin-text-primary)] mb-2">
              {value}
            </h3>
            {trend && (
              <div className={`flex items-center gap-1 text-sm font-medium ${
                trend.isPositive ? 'text-[#10b981]' : 'text-[#ef4444]'
              }`}>
                <span>{trend.isPositive ? '↑' : '↓'}</span>
                <span>{Math.abs(trend.value)}%</span>
                <span className="text-xs text-[color:var(--color-admin-text-muted)] mr-1">
                  من الشهر الماضي
                </span>
              </div>
            )}
          </div>
          
          {/* Icon */}
          <div 
            className={`w-14 h-14 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center text-white text-2xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-6`}
            style={{
              boxShadow: `0 8px 16px ${colors.glow}`,
            }}
          >
            {icon}
          </div>
        </div>

        {/* Progress bar (optional visual enhancement) */}
        <div className="h-1 bg-[rgba(77,77,119,0.2)] rounded-full overflow-hidden">
          <div 
            className={`h-full bg-gradient-to-r ${colors.gradient} rounded-full transition-all duration-1000`}
            style={{
              width: '75%',
              animation: 'expandWidth 1s ease-out'
            }}
          />
        </div>
      </div>
    </div>
  );
};
