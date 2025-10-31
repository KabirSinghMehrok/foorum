import React, { useState } from 'react';
import Reaction from './Reaction';

const ReactionTest: React.FC = () => {
  const [selectedEmoji, setSelectedEmoji] = useState<'skull' | 'laugh' | 'sad' | 'peace' | null>(null);

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-2xl font-bold mb-6">Reaction Component Test</h1>

      {/* Different sizes */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Different Sizes (Non-editable)</h2>
        <div className="flex items-center gap-4">
          <div className="text-center">
            <Reaction emoji="laugh" size="sm" />
            <p className="text-xs mt-1">Small (10px)</p>
          </div>
          <div className="text-center">
            <Reaction emoji="skull" size="md" />
            <p className="text-xs mt-1">Medium (20px)</p>
          </div>
          <div className="text-center">
            <Reaction emoji="sad" size="lg" />
            <p className="text-xs mt-1">Large (30px)</p>
          </div>
          <div className="text-center">
            <Reaction emoji="peace" size="xl" />
            <p className="text-xs mt-1">XL (40px)</p>
          </div>
        </div>
      </div>

      {/* Editable with state */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Editable Reaction (Click to change)</h2>
        <div className="flex items-center gap-4">
          <Reaction
            emoji={selectedEmoji}
            size="lg"
            isEditable={true}
            onEmojiChange={setSelectedEmoji}
          />
          <p className="text-sm">
            Current selection: {selectedEmoji ? selectedEmoji : 'none'}
          </p>
        </div>
      </div>

      {/* Empty state */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Empty State (Plus sign placeholder)</h2>
        <div className="flex items-center gap-4">
          <Reaction
            emoji={null}
            size="md"
            isEditable={true}
            onEmojiChange={(emoji) => console.log('Selected:', emoji)}
          />
          <p className="text-sm">Click the plus sign to add a reaction</p>
        </div>
      </div>

      {/* All emojis showcase */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">All Available Emojis</h2>
        <div className="flex items-center gap-4">
          <Reaction emoji="skull" size="md" />
          <Reaction emoji="laugh" size="md" />
          <Reaction emoji="sad" size="md" />
          <Reaction emoji="peace" size="md" />
        </div>
      </div>
    </div>
  );
};

export default ReactionTest;