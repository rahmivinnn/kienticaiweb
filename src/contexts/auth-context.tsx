'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { api, storeTokens, clearTokens, getTokens } from '@/lib/api-client';
import { handleError, ErrorType, createError, ErrorSeverity } from '@/lib/error-handling';
import { toast } from 'sonner';

interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: 'patient' | 'physiotherapist' | 'admin';
  profilePicture?: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

interface RegisterData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role?: 'patient' | 'physiotherapist' | 'admin';
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        setLoading(true);
        
        // Check if we have tokens
        const { accessToken } = getTokens();
        
        if (accessToken) {
          // Fetch user profile
          await fetchUserProfile();
        } else {
          // If no token, create a demo user for development
          if (process.env.NODE_ENV === 'development') {
            createDemoUser();
          } else {
            setUser(null);
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };
    
    checkAuth();
  }, []);
  
  // Fetch user profile from API
  const fetchUserProfile = async () => {
    try {
      // In a real app, this would be an API call
      // const { data } = await api.get('/auth/profile');
      // setUser(data);
      
      // For demo purposes, create a mock user
      createDemoUser();
    } catch (error) {
      clearTokens();
      setUser(null);
      throw error;
    }
  };
  
  // Create a demo user for development
  const createDemoUser = () => {
    const mockUserData = {
      id: 'user-' + Math.random().toString(36).substring(2, 9),
      firstName: 'Demo',
      lastName: 'User',
      email: 'demo@example.com',
      role: 'patient' as const,
      profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
    };
    
    setUser(mockUserData);
    
    // Store in localStorage for persistence
    localStorage.setItem('user', JSON.stringify(mockUserData));
  };
  
  // Login user
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // const { data } = await api.post('/auth/login', { email, password });
      // const { accessToken, refreshToken, user } = data;
      // storeTokens(accessToken, refreshToken);
      // setUser(user);
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check credentials (very basic demo validation)
      if (email === 'demo@example.com' && password === 'password') {
        // Create mock tokens
        const mockAccessToken = 'mock-token-' + Math.random().toString(36).substring(2, 15);
        const mockRefreshToken = 'mock-refresh-' + Math.random().toString(36).substring(2, 15);
        
        // Store tokens
        storeTokens(mockAccessToken, mockRefreshToken);
        
        // Create mock user
        const mockUserData = {
          id: 'user-' + Math.random().toString(36).substring(2, 9),
          firstName: 'Demo',
          lastName: 'User',
          email: email,
          role: 'patient' as const,
          profilePicture: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop"
        };
        
        // Set user state
        setUser(mockUserData);
        
        // Store in localStorage for persistence
        localStorage.setItem('user', JSON.stringify(mockUserData));
        
        // Show success message
        toast.success('Welcome back!', {
          description: 'You have successfully signed in'
        });
      } else {
        // Simulate authentication error
        throw createError(
          ErrorType.AUTHENTICATION,
          'Invalid email or password',
          ErrorSeverity.ERROR
        );
      }
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Register user
  const register = async (userData: RegisterData) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // const { data } = await api.post('/auth/register', userData);
      // const { accessToken, refreshToken, user } = data;
      // storeTokens(accessToken, refreshToken);
      // setUser(user);
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Create mock tokens
      const mockAccessToken = 'mock-token-' + Math.random().toString(36).substring(2, 15);
      const mockRefreshToken = 'mock-refresh-' + Math.random().toString(36).substring(2, 15);
      
      // Store tokens
      storeTokens(mockAccessToken, mockRefreshToken);
      
      // Create mock user data
      const mockUserData = {
        id: 'user-' + Math.random().toString(36).substring(2, 9),
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        role: userData.role || 'patient' as const,
        profilePicture: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userData.email}`
      };
      
      // Set user state
      setUser(mockUserData);
      
      // Store in localStorage for persistence
      localStorage.setItem('user', JSON.stringify(mockUserData));
      
      // Show success message
      toast.success('Account created!', {
        description: 'Your account has been created successfully'
      });
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Update user profile
  const updateProfile = async (data: Partial<User>) => {
    try {
      setLoading(true);
      
      // In a real app, this would be an API call
      // const { data: updatedUser } = await api.put('/users/profile', data);
      // setUser(updatedUser);
      
      // For demo purposes, simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user state
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        
        // Update in localStorage
        localStorage.setItem('user', JSON.stringify(updatedUser));
        
        // Show success message
        toast.success('Profile updated!', {
          description: 'Your profile has been updated successfully'
        });
      }
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  // Logout user
  const logout = () => {
    // Get user name before removing data
    const userName = user?.firstName || 'User';
    
    // Clear tokens and user data
    clearTokens();
    localStorage.removeItem('user');
    setUser(null);
    
    // Redirect to login
    router.push('/landing');
    
    // Show success message
    toast.success(`Goodbye, ${userName}!`, {
      description: 'You have been logged out successfully'
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
