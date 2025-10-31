import React, { useState } from 'react';

interface ToggleButtonProps {
  icon: string;
  alt: string;
  onClick?: (isActive: boolean) => void;
  defaultActive?: boolean;
  className?: string;
}

const ToggleButton: React.FC<ToggleButtonProps> = ({
  icon,
  alt,
  onClick,
  defaultActive = false,
  className = ''
}) => {
  const [isActive, setIsActive] = useState(defaultActive);

  const handleClick = () => {
    const newActiveState = !isActive;
    setIsActive(newActiveState);
    if (onClick) {
      onClick(newActiveState);
    }
  };

  const baseClasses = 'inline-flex items-center justify-center p-2 rounded-md transition-all duration-200 focus:outline-none';

  const activeClasses = isActive
    ? 'bg-white shadow'
    : 'bg-transparent hover:bg-gray-100';

  const classes = `${baseClasses} ${activeClasses} ${className}`.trim().replace(/\s+/g, ' ');

  return (
    <button
      type="button"
      onClick={handleClick}
      className={classes}
      aria-pressed={isActive}
      title={alt}
    >
      <img
        src={icon}
        alt={alt}
        className="w-4 h-4"
      />
    </button>
  );
};

export default ToggleButton;