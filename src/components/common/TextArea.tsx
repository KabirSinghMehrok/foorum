import React from 'react';

interface TextAreaProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
  className?: string;
  disabled?: boolean;
  maxLength?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  value,
  onChange,
  placeholder = '',
  rows = 4,
  className = '',
  disabled = false,
  maxLength
}) => {
  const baseClasses = 'w-full px-3 py-2 rounded-lg focus:outline-none focus:border-transparent resize-none text-slate-700';

  const classes = `${baseClasses} ${className}`.trim();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  };

  return (
    <textarea
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      rows={rows}
      className={classes}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
};

export default TextArea;