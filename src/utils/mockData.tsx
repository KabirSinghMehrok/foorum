export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  avatar: string;
}

export interface Post {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
  likes: number;
  comments: number;
  shares: number;
  emoji?: 'skull' | 'laugh' | 'sad' | 'peace' | null;
}

// Test accounts as specified
export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Demo User',
    email: 'demo@example.com',
    password: 'password123',
    avatar: '/dummy/avtar1.jpeg'
  },
  {
    id: '2',
    name: 'Test User',
    email: 'test@user.com',
    password: 'testpass',
    avatar: '/dummy/avtar2.jpeg'
  }
];

export const mockPosts: Post[] = [
  {
    id: '1',
    userId: '3',
    content: '😊 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    timestamp: '5 mins ago',
    likes: 12,
    comments: 3,
    shares: 1,
    emoji: 'laugh'
  },
  {
    id: '2',
    userId: '4',
    content: '👍 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    timestamp: '1 mins ago',
    likes: 8,
    comments: 2,
    shares: 0,
    emoji: 'peace'
  },
  {
    id: '3',
    userId: '5',
    content: '💀 Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    timestamp: '2 mins ago',
    likes: 15,
    comments: 5,
    shares: 2,
    emoji: 'skull'
  }
];

// Helper function to get user by ID
export const getUserById = (userId: string): User | undefined => {
  return mockUsers.find(user => user.id === userId);
};

// Helper function to get user by email
export const getUserByEmail = (email: string): User | undefined => {
  return mockUsers.find(user => user.email === email);
};

// Helper function to validate login
export const validateLogin = (email: string, password: string): User | null => {
  const user = getUserByEmail(email);
  if (user && user.password === password) {
    return user;
  }
  return null;
};

// Helper function to check if email exists
export const emailExists = (email: string): boolean => {
  return mockUsers.some(user => user.email === email);
};