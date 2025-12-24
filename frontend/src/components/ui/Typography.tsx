import React from 'react';

interface HeadingProps {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  className?: string;
  glow?: boolean;
  glowColor?: 'pink' | 'cyan';
  gradient?: boolean;
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 1,
  className = '',
  glow = false,
  glowColor = 'pink',
  gradient = false,
}) => {
  const Tag = `h${level}` as React.ElementType;

  const baseClasses = 'font-heading font-bold leading-tight m-0';

  const sizeClasses = {
    1: 'text-4xl sm:text-5xl lg:text-6xl xl:text-7xl tracking-tight',
    2: 'text-3xl sm:text-4xl lg:text-5xl xl:text-6xl tracking-tight',
    3: 'text-2xl sm:text-3xl lg:text-4xl xl:text-5xl',
    4: 'text-xl sm:text-2xl lg:text-3xl xl:text-4xl',
    5: 'text-lg sm:text-xl lg:text-2xl xl:text-3xl',
    6: 'text-base sm:text-lg lg:text-xl xl:text-2xl',
  };

  const glowClasses = glow ? (glowColor === 'pink' ? 'text-glow-pink' : 'text-glow-cyan') : '';
  const gradientClasses = gradient ? 'gradient-text' : '';

  const classes = [
    baseClasses,
    sizeClasses[level],
    glowClasses,
    gradientClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Tag className={classes}>{children}</Tag>;
};

interface TextProps {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
  weight?: 'light' | 'normal' | 'medium' | 'semibold' | 'bold';
  color?: 'primary' | 'secondary' | 'muted' | 'accent';
  className?: string;
  as?: 'p' | 'span' | 'div';
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'base',
  weight = 'normal',
  color = 'primary',
  className = '',
  as: Component = 'p',
}) => {
  const baseClasses = 'font-arabic leading-relaxed m-0';

  const sizeClasses = {
    xs: 'text-xs',
    sm: 'text-sm',
    base: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl',
  };

  const weightClasses = {
    light: 'font-light',
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  };

  const colorClasses = {
    primary: 'text-text-primary',
    secondary: 'text-text-secondary',
    muted: 'text-text-muted',
    accent: 'text-accent-pink',
  };

  const classes = [
    baseClasses,
    sizeClasses[size],
    weightClasses[weight],
    colorClasses[color],
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return <Component className={classes}>{children}</Component>;
};

interface LabelProps {
  children: React.ReactNode;
  className?: string;
  htmlFor?: string;
}

export const Label: React.FC<LabelProps> = ({
  children,
  className = '',
  htmlFor,
}) => {
  const classes = ['font-arabic text-sm font-medium text-text-secondary block mb-2', className]
    .filter(Boolean)
    .join(' ');

  return (
    <label className={classes} htmlFor={htmlFor}>
      {children}
    </label>
  );
};

