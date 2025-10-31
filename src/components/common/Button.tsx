import React from 'react';
import type { ReactNode } from 'react';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'ghost' | 'icon' | 'toolbar';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  icon?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon
}) => {
  const baseClasses = 'inline-flex items-center justify-center font-medium rounded-lg transition-colors';

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300',
    ghost: 'bg-transparent text-gray-600 hover:bg-gray-100 hover:rounded-md hover:bg-gray-200',
    icon: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-700 rounded-full rounded-md hover:bg-gray-100',
    toolbar: 'bg-transparent text-gray-600 hover:bg-gray-100 border border-gray-300'
  };

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-2 text-sm',
    lg: 'px-4 py-2 text-base'
  };

  const iconSizeClasses = {
    sm: 'p-1',
    md: 'p-2',
    lg: 'p-2'
  };

  const disabledClasses = 'opacity-50 cursor-not-allowed';

  const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${variant === 'icon' ? iconSizeClasses[size] : sizeClasses[size]}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim().replace(/\s+/g, ' ');

  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      disabled={disabled}
      className={classes}
    >
      {icon && (
        <img
          src={icon}
          alt=""
          className={`${variant === 'icon' ? 'w-4 h-4' : 'w-4 h-4 mr-2'}`}
        />
      )}
      {variant !== 'icon' && children}
      {variant === 'icon' && !icon && children}
    </button>
  );
};

export default Button;