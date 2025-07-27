import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  completedLabs: string[];
  registeredAt: string;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (labId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading user from localStorage
    const savedUser = localStorage.getItem('devopsforall_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email && password) {
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: email === 'admin@devopsforall.com' ? 'admin' : 'user',
        completedLabs: JSON.parse(localStorage.getItem('completed_labs') || '[]'),
        registeredAt: new Date().toISOString(),
      };
      setUser(mockUser);
      localStorage.setItem('devopsforall_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (email && password && name) {
      const mockUser: User = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name,
        role: 'user',
        completedLabs: [],
        registeredAt: new Date().toISOString(),
      };
      setUser(mockUser);
      localStorage.setItem('devopsforall_user', JSON.stringify(mockUser));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devopsforall_user');
  };

  const updateProgress = (labId: string) => {
    if (user && !user.completedLabs.includes(labId)) {
      const updatedUser = {
        ...user,
        completedLabs: [...user.completedLabs, labId],
      };
      setUser(updatedUser);
      localStorage.setItem('devopsforall_user', JSON.stringify(updatedUser));
      localStorage.setItem('completed_labs', JSON.stringify(updatedUser.completedLabs));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProgress }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}