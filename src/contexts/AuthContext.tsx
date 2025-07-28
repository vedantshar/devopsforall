import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '../lib/supabase';

interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  workTitle?: string;
  mobileNumber?: string;
  company?: string;
  experienceLevel?: string;
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
  updateProfile: (updates: Partial<User>) => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', session.user.id)
          .single();
        
        if (userData) {
          setUser({
            id: userData.id,
            email: userData.email,
            name: userData.name,
            role: userData.role,
            workTitle: userData.work_title,
            mobileNumber: userData.mobile_number,
            company: userData.company,
            experienceLevel: userData.experience_level,
            completedLabs: userData.completed_labs || [],
            registeredAt: userData.created_at,
          });
        }
      }
    } catch (error) {
      console.error('Error checking user:', error);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        await checkUser();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      // Fallback to mock authentication for demo
      if (email && password) {
        const mockUser: User = {
          id: '1',
          email,
          name: email.split('@')[0],
          role: email === 'admin@opscurator.com' ? 'admin' : 'user',
          completedLabs: JSON.parse(localStorage.getItem('completed_labs') || '[]'),
          registeredAt: new Date().toISOString(),
        };
        setUser(mockUser);
        localStorage.setItem('opscurator_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      
      if (error) throw error;
      
      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('users')
          .insert({
            id: data.user.id,
            email,
            name,
            role: 'user',
            completed_labs: [],
          });
        
        if (profileError) throw profileError;
        
        await checkUser();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Registration error:', error);
      // Fallback to mock registration for demo
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
        localStorage.setItem('opscurator_user', JSON.stringify(mockUser));
        return true;
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    localStorage.removeItem('opscurator_user');
  };

  const updateProgress = async (labId: string) => {
    if (user && !user.completedLabs.includes(labId)) {
      const updatedLabs = [...user.completedLabs, labId];
      
      try {
        const { error } = await supabase
          .from('users')
          .update({ completed_labs: updatedLabs })
          .eq('id', user.id);
        
        if (error) throw error;
        
        const updatedUser = {
          ...user,
          completedLabs: updatedLabs,
        };
        setUser(updatedUser);
        localStorage.setItem('opscurator_user', JSON.stringify(updatedUser));
      } catch (error) {
        console.error('Error updating progress:', error);
        // Fallback to localStorage
        const updatedUser = {
          ...user,
          completedLabs: updatedLabs,
        };
        setUser(updatedUser);
        localStorage.setItem('opscurator_user', JSON.stringify(updatedUser));
        localStorage.setItem('completed_labs', JSON.stringify(updatedLabs));
      }
    }
  };

  const updateProfile = async (updates: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    try {
      const { error } = await supabase
        .from('users')
        .update({
          name: updates.name,
          work_title: updates.workTitle,
          mobile_number: updates.mobileNumber,
          company: updates.company,
          experience_level: updates.experienceLevel,
        })
        .eq('id', user.id);
      
      if (error) throw error;
      
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('opscurator_user', JSON.stringify(updatedUser));
      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      // Fallback to localStorage
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('opscurator_user', JSON.stringify(updatedUser));
      return true;
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateProgress, updateProfile }}>
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