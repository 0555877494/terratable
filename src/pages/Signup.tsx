import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Truck, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('customer');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);

    setTimeout(() => {
      const result = signup(name, email, password, role);
      if (result.success) {
        if (role === 'delivery') navigate('/delivery');
        else navigate('/customer');
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-sage-50 via-cream-100 to-terra-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <div className="bg-white rounded-3xl shadow-xl border border-terra-100 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-14 h-14 bg-gradient-to-br from-sage-500 to-sage-700 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white font-bold text-xl">T</span>
            </motion.div>
            <h1 className="font-serif text-2xl font-bold text-terra-900">Create Account</h1>
            <p className="text-terra-500 text-sm mt-1">Join our community of food lovers</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-terra-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terra-400" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-terra-200 focus:border-terra-400 focus:ring-2 focus:ring-terra-100 outline-none transition-all"
                  placeholder="John Doe"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-terra-700 mb-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terra-400" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-terra-200 focus:border-terra-400 focus:ring-2 focus:ring-terra-100 outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-terra-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-terra-400" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-10 pr-10 py-3 rounded-xl border border-terra-200 focus:border-terra-400 focus:ring-2 focus:ring-terra-100 outline-none transition-all"
                  placeholder="Min. 6 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-terra-400 hover:text-terra-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-terra-700 mb-2">I want to</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('customer')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === 'customer' ? 'border-terra-500 bg-terra-50' : 'border-terra-100 hover:border-terra-200'}`}
                >
                  <ShoppingBag className={`w-6 h-6 ${role === 'customer' ? 'text-terra-600' : 'text-terra-400'}`} />
                  <span className={`text-sm font-medium ${role === 'customer' ? 'text-terra-700' : 'text-terra-500'}`}>Shop & Order</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole('delivery')}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${role === 'delivery' ? 'border-sage-500 bg-sage-50' : 'border-terra-100 hover:border-terra-200'}`}
                >
                  <Truck className={`w-6 h-6 ${role === 'delivery' ? 'text-sage-600' : 'text-terra-400'}`} />
                  <span className={`text-sm font-medium ${role === 'delivery' ? 'text-sage-700' : 'text-terra-500'}`}>Deliver Orders</span>
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-sage-600 text-white rounded-xl font-medium hover:bg-sage-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-sm text-terra-500 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-terra-600 font-medium hover:text-terra-700">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
