import React, { useState, useRef, useEffect } from 'react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectProps {
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

const Select: React.FC<SelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Select an option',
  className = '',
  disabled = false
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');
  const selectRef = useRef<HTMLDivElement>(null);

  // Find the selected option
  const selectedOption = options.find(option => option.value === selectedValue);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case 'Escape':
          setIsOpen(false);
          break;
        case 'ArrowDown':
          event.preventDefault();
          // Focus next option logic could be added here
          break;
        case 'ArrowUp':
          event.preventDefault();
          // Focus previous option logic could be added here
          break;
        case 'Enter':
          event.preventDefault();
          // Select focused option logic could be added here
          break;
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
    }
  };

  const handleOptionSelect = (option: SelectOption) => {
    setSelectedValue(option.value);
    setIsOpen(false);
    if (onChange) {
      onChange(option.value);
    }
  };

  const baseClasses = 'relative inline-block w-full';
  const triggerClasses = `
    flex items-center justify-between w-full px-3 py-2 text-sm
    bg-white border border-gray-300 rounded-md shadow-sm
    transition-colors duration-200
    ${disabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : 'cursor-pointer hover:border-gray-400'}
    ${isOpen ? 'ring-2 ring-blue-500 border-blue-500' : ''}
  `.trim().replace(/\s+/g, ' ');

  const dropdownClasses = `
    absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg
    max-h-60 overflow-auto
    ${isOpen ? 'block' : 'hidden'}
  `.trim().replace(/\s+/g, ' ');

  return (
    <div ref={selectRef} className={`${baseClasses} ${className}`}>
      {/* Trigger */}
      <div
        onClick={handleToggle}
        className={triggerClasses}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        tabIndex={disabled ? -1 : 0}
      >
        <span className={selectedOption ? 'text-gray-900' : 'text-gray-500'}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        {/* Dropdown Arrow */}
        <svg
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${disabled ? 'text-gray-400' : 'text-gray-600'}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>

      {/* Dropdown Options */}
      <div className={dropdownClasses} role="listbox">
        {options.map((option) => (
          <div
            key={option.value}
            onClick={() => handleOptionSelect(option)}
            className={`
              px-3 py-2 text-sm cursor-pointer transition-colors duration-150
              hover:bg-gray-100
              ${selectedValue === option.value ? 'bg-blue-50 text-blue-700' : 'text-gray-900'}
            `.trim().replace(/\s+/g, ' ')}
            role="option"
            aria-selected={selectedValue === option.value}
            tabIndex={-1}
          >
            {option.label}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Select;