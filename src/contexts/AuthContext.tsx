import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserRole } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => { success: boolean; message: string };
  signup: (name: string, email: string, password: string, role: UserRole) => { success: boolean; message: string };
  logout: () => void;
  users: User[];
  updateUserRole: (userId: string, role: UserRole) => void;
  deleteUser: (userId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const defaultUsers: User[] = [
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
    return saved ? JSON.parse(saved) : defaultUsers;
  });

  useEffect(() => {
    localStorage.setItem('terra_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    const savedUser = localStorage.getItem('terra_current_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (email: string, password: string) => {
    const found = users.find(u => u.email === email && u.password === password);
    if (found) {
      setUser(found);
      localStorage.setItem('terra_current_user', JSON.stringify(found));
      return { success: true, message: 'Login successful!' };
    }
    return { success: false, message: 'Invalid email or password.' };
  };

  const signup = (name: string, email: string, password: string, role: UserRole) => {
    if (users.find(u => u.email === email)) {
      return { success: false, message: 'Email already registered.' };
    }
    if (role === 'admin') {
      return { success: false, message: 'Admin registration is not allowed.' };
    }
    const newUser: User = {
      id: uuidv4(),
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
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('terra_current_user');
  };

  const updateUserRole = (userId: string, role: UserRole) => {
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role } : u));
  };

  const deleteUser = (userId: string) => {
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
