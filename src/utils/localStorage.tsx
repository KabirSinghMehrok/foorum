import type { User, Post } from './mockData';

// Auth related localStorage functions
export const saveAuthUser = (user: User): void => {
  localStorage.setItem('foorum_auth_user', JSON.stringify(user));
};

export const getAuthUser = (): User | null => {
  const userStr = localStorage.getItem('foorum_auth_user');
  if (userStr) {
    try {
      return JSON.parse(userStr);
    } catch (error) {
      console.error('Error parsing auth user from localStorage:', error);
      return null;
    }
  }
  return null;
};

export const removeAuthUser = (): void => {
  localStorage.removeItem('foorum_auth_user');
};

// Posts related localStorage functions
export const savePosts = (posts: Post[]): void => {
  localStorage.setItem('foorum_posts', JSON.stringify(posts));
};

export const getPosts = (): Post[] => {
  const postsStr = localStorage.getItem('foorum_posts');
  if (postsStr) {
    try {
      return JSON.parse(postsStr);
    } catch (error) {
      console.error('Error parsing posts from localStorage:', error);
      return [];
    }
  }
  return [];
};

export const addPost = (post: Post): void => {
  const existingPosts = getPosts();
  const updatedPosts = [post, ...existingPosts];
  savePosts(updatedPosts);
};

// Generate unique ID for posts
export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};