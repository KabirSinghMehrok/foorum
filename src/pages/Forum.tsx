import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import Button from '../components/common/Button';
import Avatar from '../components/common/Avatar';
import PostEditor from '../components/feed/PostEditor';
import PostCard from '../components/feed/PostCard';
import LoginModal from '../components/auth/LoginModal';
import SignupModal from '../components/auth/SignupModal';
import { getPosts } from '../utils/localStorage';
import type { Post } from '../utils/mockData';

const Forum: React.FC = () => {
  const { user, logout } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [preservedContent, setPreservedContent] = useState('');

  useEffect(() => {
    loadPosts();
  }, []);

  // Handle login modal close
  const handleLoginModalClose = () => {
    setShowLoginModal(false);
    // Don't clear preserved content here - let user keep typing if they cancel
  };

  // Clear preserved content when user successfully logs in
  useEffect(() => {
    if (user && showLoginModal) {
      setShowLoginModal(false);
      // Keep preserved content so user can continue editing
    }
  }, [user, showLoginModal]);

  const loadPosts = () => {
    const allPosts = getPosts();
    // Sort posts by timestamp (newest first)
    const sortedPosts = allPosts.sort((a, b) => {
      // For now, we'll use a simple sort since timestamps are strings like "5 mins ago"
      // In a real app, you'd use proper date objects
      return a.id > b.id ? -1 : 1;
    });
    setPosts(sortedPosts);
  };

  const handlePostCreated = () => {
    loadPosts();
    setPreservedContent(''); // Clear preserved content after successful post
  };

  const handleLoginRequired = (content: string) => {
    setPreservedContent(content);
    setShowLoginModal(true);
  };

  const handleSwitchToSignup = () => {
    setShowLoginModal(false);
    setShowSignupModal(true);
  };

  const handleSwitchToLogin = () => {
    setShowSignupModal(false);
    setShowLoginModal(true);
  };

  const handleLogout = () => {
    logout();
    setPreservedContent(''); // Clear preserved content on logout
  };

  return (
    <div className="min-h-screen w-screen bg-white">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-[1600px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">F</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">foo-rum</h1>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-3">
              {user ? (
                <div className="flex items-center space-x-3">
                  <Avatar
                    src={user.avatar}
                    alt={user.name}
                    size="sm"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden sm:block">
                    {user.name}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleLogout}
                    className="text-gray-600 hover:text-gray-900"
                  >
                    Logout
                  </Button>
                </div>
              ) : (
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => setShowLoginModal(true)}
                >
                  Login
                </Button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Post Editor - Always show, but require login for interactions */}
        <PostEditor
          onPostCreated={handlePostCreated}
          onLoginRequired={handleLoginRequired}
          loginRequiredInteractions={{
            textInput: true,
            postButton: true,
            toolbarButtons: true,
            mediaButtons: true
          }}
          preservedContent={preservedContent}
        />

        {/* Posts Feed */}
        <div className="space-y-4 mt-4">
          {posts.length > 0 ? (
            posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">No posts yet</div>
              <div className="text-gray-400 text-sm">
                {user ? 'Be the first to share something!' : 'Login to see and create posts'}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Modals */}
      <LoginModal
        isOpen={showLoginModal}
        onClose={handleLoginModalClose}
        onSwitchToSignup={handleSwitchToSignup}
      />

      <SignupModal
        isOpen={showSignupModal}
        onClose={() => setShowSignupModal(false)}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </div>
  );
};

export default Forum;