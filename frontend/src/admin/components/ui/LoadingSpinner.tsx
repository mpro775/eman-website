interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const LoadingSpinner = ({ size = 'md', className = '' }: LoadingSpinnerProps) => {
  const sizeClasses = {
    sm: 'w-5 h-5 border-2',
    md: 'w-10 h-10 border-3',
    lg: 'w-16 h-16 border-4',
  };
  
  return (
    <div className={`flex justify-center items-center p-5 ${className}`}>
      <div
        className={`${sizeClasses[size]} border-[color:var(--color-admin-border)] border-t-[color:var(--color-admin-accent-blue)] rounded-full animate-spin`}
      />
    </div>
  );
};
