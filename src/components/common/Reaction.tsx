import React, { useState, useRef, useEffect } from 'react';

interface ReactionProps {
  emoji?: 'skull' | 'laugh' | 'sad' | 'peace' | null;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  isEditable?: boolean;
  onEmojiChange?: (emoji: 'skull' | 'laugh' | 'sad' | 'peace' | null) => void;
}

// Emoji map with unicode characters
const EMOJI_MAP = {
  skull: '💀',
  laugh: '😂',
  sad: '😢',
  peace: '✌️'
} as const;

// Size mapping from 10px to 40px
const SIZE_MAP = {
  sm: '20px',
  md: '30px',
  lg: '40px',
  xl: '50px'
} as const;

// show an emoji based on the string value provided in props
// user can select from a predefined list of emojis
// changes are propagated to the parent
// if the component is editable, then clicking on the emoji opens a tooltip style box with list of emojis in it
const Reaction: React.FC<ReactionProps> = ({
  emoji,
  size = 'md',
  className = '',
  isEditable = true,
  onEmojiChange
}) => {
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const [hoveredEmoji, setHoveredEmoji] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close tooltip
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsTooltipOpen(false);
      }
    };

    if (isTooltipOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isTooltipOpen]);

  const handleEmojiClick = () => {
    if (isEditable) {
      setIsTooltipOpen(!isTooltipOpen);
    }
  };

  const handleEmojiSelect = (selectedEmoji: 'skull' | 'laugh' | 'sad' | 'peace' | null) => {
    onEmojiChange?.(selectedEmoji);
    setIsTooltipOpen(false);
  };

  const currentSize = SIZE_MAP[size];
  const allEmojis: Array<{ key: 'skull' | 'laugh' | 'sad' | 'peace' | null; display: string }> = [
    { key: null, display: '➕' },
    { key: 'skull', display: EMOJI_MAP.skull },
    { key: 'laugh', display: EMOJI_MAP.laugh },
    { key: 'sad', display: EMOJI_MAP.sad },
    { key: 'peace', display: EMOJI_MAP.peace }
  ];

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Main emoji display */}
      <div
        onClick={handleEmojiClick}
        className={`
          flex items-center justify-center p-4
          ${isEditable ? 'cursor-pointer hover:scale-105' : 'cursor-default'}
          transition-transform duration-200 ease-in-out
          ${emoji ? 'bg-gray-100' : 'hover:bg-gray-200 rounded-full'}
          rounded-full
        `}
        style={{
          width: `calc(${currentSize} * 0.6)`,
          height: `calc(${currentSize} * 0.6)`,
          fontSize: emoji ? currentSize : `calc(${currentSize} * 0.6)`
        }}
      >
        {emoji ? EMOJI_MAP[emoji] : '➕'}
      </div>

      {/* Tooltip with emoji options */}
      {isEditable && isTooltipOpen && (
        <div
          className={`
            absolute top-full left-1/2 transform -translate-x-1/2 mt-2
            bg-white border border-gray-200 rounded-lg shadow-lg px-4 py-1
            flex flex-row gap-2 z-50
            animate-in fade-in duration-200 ease-out
          `}
        >
          {allEmojis.map((emojiOption) => (
            <div
              key={emojiOption.key || 'none'}
              onClick={() => handleEmojiSelect(emojiOption.key)}
              onMouseEnter={() => setHoveredEmoji(emojiOption.key || 'none')}
              onMouseLeave={() => setHoveredEmoji(null)}
              className={`
                flex items-center justify-center cursor-pointer
                transition-transform duration-150 ease-in-out
                rounded-full p-4
                ${hoveredEmoji === (emojiOption.key || 'none') ? 'scale-110' : 'hover:bg-gray-50'}
                ${emoji === emojiOption.key ? 'bg-gray-100' : ''}
              `}
              style={{
                width: currentSize,
                height: currentSize,
                fontSize: `calc(${currentSize} * 0.6)`,
                transform: hoveredEmoji === (emojiOption.key || 'none') ? 'scale(1.1)' : 'scale(1)'
              }}
            >
              {emojiOption.key === null ? '➕' : emojiOption.display}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Reaction;