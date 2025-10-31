import React from 'react';
import ToggleButton from '../common/ToggleButton';
import Select from '../common/Select';
import BoldIcon from '../../assets/icons/bold.svg';
import ItalicIcon from '../../assets/icons/italic.svg';
import UnderlineIcon from '../../assets/icons/underline.svg';
import ListNumberIcon from '../../assets/icons/list-number.svg';
import ListIcon from '../../assets/icons/list.svg';
import QuoteIcon from '../../assets/icons/quote.svg';
import CodeIcon from '../../assets/icons/code.svg';

interface ToolBarProps {
  onBoldToggle?: (isActive: boolean) => void;
  onItalicToggle?: (isActive: boolean) => void;
  onUnderlineToggle?: (isActive: boolean) => void;
  className?: string;
}

const ToolBar: React.FC<ToolBarProps> = ({
  onBoldToggle,
  onItalicToggle,
  onUnderlineToggle,
  className = ''
}) => {
  const formatOptions = [
    { value: 'paragraph', label: 'Paragraph' },
    { value: 'heading1', label: 'Heading 1' },
    { value: 'heading2', label: 'Heading 2' },
    { value: 'heading3', label: 'Heading 3' },
    { value: 'quote', label: 'Quote' },
    { value: 'code', label: 'Code Block' }
  ];

  const handleFormatChange = (value: string) => {
    console.log('Format changed to:', value);
  };

  return (
    <div className={`flex items-center space-x-3 rounded-lg p-1 bg-gray-100 ${className}`}>
      <div className="w-32">
        <Select
          options={formatOptions}
          placeholder="Paragraph"
          onChange={handleFormatChange}
        />
      </div>
      <div className="flex items-center space-x-1">
        <ToggleButton
          icon={BoldIcon}
          alt="Bold"
          onClick={onBoldToggle}
        />
        <ToggleButton
          icon={ItalicIcon}
          alt="Italic"
          onClick={onItalicToggle}
        />
        <ToggleButton
          icon={UnderlineIcon}
          alt="Underline"
          onClick={onUnderlineToggle}
        />
        <div className='h-6 w-px bg-gray-300 mx-2'></div>
        <ToggleButton
          icon={ListIcon}
          alt="List"
          onClick={onUnderlineToggle}
        />
        <ToggleButton
          icon={ListNumberIcon}
          alt="List Number"
          onClick={onUnderlineToggle}
        />
        <div className='h-6 w-px bg-gray-300 mx-2'></div>
        <ToggleButton
          icon={QuoteIcon}
          alt="Quote"
          onClick={onUnderlineToggle}
        />
        <ToggleButton
          icon={CodeIcon}
          alt="Code"
          onClick={onUnderlineToggle}
        />
      </div>
    </div>
  );
};

export default ToolBar;