import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const Avatar: React.FC<AvatarProps> = ({
  src,
  alt = 'User avatar',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
    xl: 'w-12 h-12'
  };

  const baseClasses = 'rounded-full object-cover bg-gray-200';
  
  const classes = `${baseClasses} ${sizeClasses[size]} ${className}`.trim();

  return (
    <img
      src={src || '/dummy/avtar1.jpeg'}
      alt={alt}
      className={classes}
    />
  );
};

export default Avatar;