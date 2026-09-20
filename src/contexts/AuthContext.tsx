import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { supabase, shouldUseSupabase } from '../lib/supabase';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<{ success: boolean; message: string }>;
  logout: () => void;
  users: User[];
  updateUserRole: (userId: string, role: UserRole) => void;
  deleteUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo users for fallback (when Supabase is not configured)
const demoUsers: User[] = [
  {
    id: 'admin-1',
    name: 'Admin User',
    email: 'admin@terra.com',
    password: 'admin123',
    role: 'admin',
    phone: '+1 555-0100',
    address: '100 Market St, San Francisco',
    joinedDate: '2024-01-01'
  },
  {
    id: 'customer-1',
    name: 'Sarah Mitchell',
    email: 'sarah@email.com',
    password: 'customer123',
    role: 'customer',
    phone: '+1 555-0201',
    address: '42 Oak Avenue, Portland',
    joinedDate: '2024-03-15'
  },
  {
    id: 'delivery-1',
    name: 'Marcus Johnson',
    email: 'marcus@email.com',
    password: 'delivery123',
    role: 'delivery',
    phone: '+1 555-0301',
    address: '78 Elm Street, Portland',
    joinedDate: '2024-02-20'
  }
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('terra_users');
    return saved ? JSON.parse(saved) : demoUsers;
  });

  // Initialize auth state from Supabase session
  useEffect(() => {
    if (shouldUseSupabase()) {
      // Check for existing session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          loadUserProfile(session.user.id);
        }
      });

      // Listen for auth changes
      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (event, session) => {
          if (event === 'SIGNED_IN' && session?.user) {
            await loadUserProfile(session.user.id);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          }
        }
      );

      return () => subscription.unsubscribe();
    } else {
      // Fallback to localStorage
      const savedUser = localStorage.getItem('terra_current_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('terra_users', JSON.stringify(users));
  }, [users]);

  // Load user profile from Supabase
  const loadUserProfile = async (userId: string) => {
    const { data: profile } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single();

    if (profile) {
      const user: User = {
        id: profile.id,
        name: profile.full_name || '',
        email: profile.email,
        password: '', // Not needed with Supabase auth
        role: profile.role as UserRole,
        phone: profile.phone,
        address: profile.address,
        joinedDate: profile.created_at?.split('T')[0] || new Date().toISOString().split('T')[0]
      };
      setUser(user);
    }
  };

  const login = async (email: string, password: string) => {
    if (shouldUseSupabase()) {
      // Use Supabase auth
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        await loadUserProfile(data.user.id);
        return { success: true, message: 'Login successful!' };
      }

      return { success: false, message: 'Login failed' };
    } else {
      // Fallback to demo users
      const found = users.find(u => u.email === email && u.password === password);
      if (found) {
        setUser(found);
        localStorage.setItem('terra_current_user', JSON.stringify(found));
        return { success: true, message: 'Login successful!' };
      }
      return { success: false, message: 'Invalid email or password.' };
    }
  };

  const signup = async (name: string, email: string, password: string, role: UserRole) => {
    if (role === 'admin') {
      return { success: false, message: 'Admin registration is not allowed.' };
    }

    if (shouldUseSupabase()) {
      // Use Supabase auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: name,
            role: role,
          },
        },
      });

      if (error) {
        return { success: false, message: error.message };
      }

      if (data.user) {
        // Update profile with role
        await supabase
          .from('profiles')
          .update({ role })
          .eq('id', data.user.id);

        await loadUserProfile(data.user.id);
        return { success: true, message: 'Account created successfully!' };
      }

      return { success: false, message: 'Signup failed' };
    } else {
      // Fallback to localStorage
      if (users.find(u => u.email === email)) {
        return { success: false, message: 'Email already registered.' };
      }

      const newUser: User = {
        id: Date.now().toString(),
        name,
        email,
        password,
        role,
        joinedDate: new Date().toISOString().split('T')[0]
      };

      setUsers(prev => [...prev, newUser]);
      setUser(newUser);
      localStorage.setItem('terra_current_user', JSON.stringify(newUser));
      return { success: true, message: 'Account created successfully!' };
    }
  };

  const logout = async () => {
    if (shouldUseSupabase()) {
      await supabase.auth.signOut();
    }
    setUser(null);
    localStorage.removeItem('terra_current_user');
  };

  const updateUserRole = async (userId: string, role: UserRole) => {
    if (shouldUseSupabase()) {
      await supabase
        .from('profiles')
        .update({ role })
        .eq('id', userId);
    }
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
  };

  const deleteUser = async (userId: string) => {
    if (shouldUseSupabase()) {
      // Note: This only deletes the profile, not the auth user
      // To delete auth user, you need to use Supabase admin API
      await supabase
        .from('profiles')
        .delete()
        .eq('id', userId);
    }
    setUsers(prev => prev.filter(u => u.id !== userId));
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, users, updateUserRole, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
