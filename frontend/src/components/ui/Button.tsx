import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  icon,
  iconPosition = 'right',
  className = '',
  disabled = false,
  type = 'button',
}) => {
  // Base classes
  const baseClasses = 'inline-flex items-center justify-center gap-2 font-arabic font-medium rounded-full cursor-pointer transition-all duration-300 whitespace-nowrap relative overflow-hidden';

  // Size classes
  const sizeClasses = {
    sm: 'px-5 py-2 text-sm',
    md: 'px-7 py-3 text-base',
    lg: 'px-9 py-4 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'bg-gradient-button text-white border-0 shadow-glow-pink hover:bg-gradient-button-hover hover:shadow-glow-pink-strong hover:-translate-y-0.5 active:translate-y-0',
    secondary: 'bg-accent-pink/10 text-accent-pink border-2 border-accent-pink backdrop-blur-md hover:bg-accent-pink/20 hover:shadow-glow-pink',
    outline: 'bg-transparent text-text-primary border-2 border-white/20 backdrop-blur-sm hover:border-accent-pink hover:text-accent-pink hover:shadow-[0_0_15px_rgba(255,0,128,0.3)]',
  };

  // Disabled classes
  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  // Icon classes
  const iconLeftClasses = 'inline-flex items-center justify-center text-xl -ml-1';
  const iconRightClasses = 'inline-flex items-center justify-center text-xl -mr-1';

  const classes = [
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    disabledClasses,
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled}
      type={type}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ duration: 0.2 }}
    >
      {icon && iconPosition === 'left' && <span className={iconLeftClasses}>{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className={iconRightClasses}>{icon}</span>}
    </motion.button>
  );
};

export default Button;

