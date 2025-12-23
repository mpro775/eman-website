import React from 'react';

interface ContainerProps {
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'canvas';
  className?: string;
  padding?: boolean;
}

const Container: React.FC<ContainerProps> = ({
  children,
  size = 'xl',
  className = '',
  padding = true,
}) => {
  const sizeClasses = {
    sm: 'max-w-screen-sm',
    md: 'max-w-screen-md',
    lg: 'max-w-screen-lg',
    xl: 'max-w-screen-xl',
    full: 'max-w-full',
    canvas: 'max-w-[1444px]', // Canvas design size: 1444px x 918px
  };

  const paddingClasses = padding ? 'px-4 sm:px-6 lg:px-8' : '';

  const classes = [
    'w-full',
    'mx-auto',
    sizeClasses[size],
    paddingClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <div className={classes}>{children}</div>;
};

export default Container;

