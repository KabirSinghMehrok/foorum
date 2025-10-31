import React, { useState } from 'react';
import Avatar from '../common/Avatar';
import Button from '../common/Button';
import type { Post } from '../../utils/mockData';
import { getUserById } from '../../utils/mockData';
import AnimatedHeart from '../../assets/animated-icons/animated-heart.gif';
import AnimatedChat from '../../assets/animated-icons/animated-chat.gif';
import AnimatedShare from '../../assets/animated-icons/animated-send.gif';
import StaticHeart from '../../assets/animated-icons/heart.svg';
import StaticChat from '../../assets/animated-icons/chat.svg';
import StaticShare from '../../assets/animated-icons/share.svg';

interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = ({ post }) => {
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);
  const author = getUserById(post.userId);

  const handleLike = () => {
    console.log('Function not implemented - Like post:', post.id);
  };

  const handleComment = () => {
    console.log('Function not implemented - Comment on post:', post.id);
  };

  const handleShare = () => {
    console.log('Function not implemented - Share post:', post.id);
  };

  // Helper function to get the appropriate icon source
  const getIconSrc = (buttonType: string, animatedSrc: string, staticSrc: string) => {
    return hoveredButton === buttonType ? animatedSrc : staticSrc;
  };

  if (!author) {
    return null; // Don't render if author not found
  }

  return (
    <div className="bg-gray-100 rounded-lg p-2 mb-4">
      <div className="p-2 bg-white rounded-lg border border-gray-200">
        {/* Header */}
        <div className="flex items-center mb-3">
          <Avatar
            src={author.avatar}
            alt={author.name}
            size="md"
          />
          <div className="ml-3 flex-1">
            <h3 className="font-semibold text-gray-900 text-sm">
              {author.name}
            </h3>
            <p className="text-gray-500 text-xs">
              {post.timestamp}
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="mb-3">
          <p className="text-gray-800 text-sm leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center space-x-1 pt-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLike}
          className="flex items-center space-x-1 text-gray-600 hover:font-bold"
          onMouseEnter={() => setHoveredButton('like')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <img
            src={getIconSrc('like', AnimatedHeart, StaticHeart)}
            alt="Like"
            className="w-4 h-4"
            key={hoveredButton === 'like' ? 'animated-heart' : 'static-heart'}
          />
          <span className="text-xs">{post.likes}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleComment}
          className="flex items-center space-x-1 text-gray-600 hover:font-bold"
          onMouseEnter={() => setHoveredButton('comment')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <img
            src={getIconSrc('comment', AnimatedChat, StaticChat)}
            alt="Comment"
            className="w-4 h-4"
            key={hoveredButton === 'comment' ? 'animated-chat' : 'static-chat'}
          />
          <span className="text-xs">{post.comments}</span>
        </Button>

        <Button
          variant="ghost"
          size="sm"
          onClick={handleShare}
          className="flex items-center space-x-1 text-gray-600 hover:font-bold"
          onMouseEnter={() => setHoveredButton('share')}
          onMouseLeave={() => setHoveredButton(null)}
        >
          <img
            src={getIconSrc('share', AnimatedShare, StaticShare)}
            alt="Share"
            className="w-4 h-4"
            key={hoveredButton === 'share' ? 'animated-share' : 'static-share'}
          />
        </Button>
      </div>
    </div>
  );
};

export default PostCard;