import type{ ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  hover?: boolean;
  gradient?: boolean;
}

export const Card = ({ children, className = '', onClick, hover = false, gradient = false }: CardProps) => {
  return (
    <div
      className={`glass-effect rounded-2xl p-6 transition-all duration-300 
        ${gradient ? 'bg-gradient-to-br from-[rgba(74,158,255,0.08)] to-[rgba(157,78,221,0.08)]' : ''}
        shadow-[0_8px_32px_rgba(0,0,0,0.4),0_2px_8px_rgba(74,158,255,0.1)]
        ${
        hover ? 'hover:shadow-[0_12px_48px_rgba(0,0,0,0.5),0_4px_16px_rgba(74,158,255,0.2)] hover:-translate-y-1 hover:scale-[1.02]' : ''
      } ${onClick ? 'cursor-pointer' : ''} ${className}`}
      onClick={onClick}
      style={{
        animation: 'slideUp 0.4s ease-out'
      }}
    >
      {children}
    </div>
  );
};
