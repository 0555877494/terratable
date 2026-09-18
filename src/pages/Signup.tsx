import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Truck, ShoppingBag, Sparkles } from 'lucide-react';
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-sage-50 via-cream-100 to-terra-50" />
      <div className="absolute inset-0">
        <div className="absolute top-20 right-20 w-72 h-72 bg-sage-200/40 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-terra-200/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-gold-200/20 rounded-full blur-[80px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative w-full max-w-md"
      >
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-terra-200/30 border border-white/50 p-8 sm:p-10">
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
              className="relative w-16 h-16 bg-gradient-to-br from-sage-500 via-sage-600 to-terra-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-sage-500/30"
            >
              <Sparkles className="w-7 h-7 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-terra-900 mb-2">Join the Family</h1>
            <p className="text-terra-500">Start your artisan food journey today</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              className="mb-5 p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 flex items-center gap-2"
            >
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs">!</span>
              </div>
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-terra-700 mb-2">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-terra-400 group-focus-within:text-terra-600 transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none transition-all bg-white/50 text-terra-800 placeholder:text-terra-400"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-terra-700 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-terra-400 group-focus-within:text-terra-600 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-3.5 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none transition-all bg-white/50 text-terra-800 placeholder:text-terra-400"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-terra-700 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-terra-400 group-focus-within:text-terra-600 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-11 pr-11 py-3.5 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none transition-all bg-white/50 text-terra-800 placeholder:text-terra-400"
                  placeholder="Min. 6 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-terra-400 hover:text-terra-600 transition-colors">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-semibold text-terra-700 mb-3">How will you use Terra & Table?</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRole('customer')}
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                    role === 'customer'
                      ? 'border-terra-400 bg-gradient-to-b from-terra-50 to-cream-50 shadow-lg shadow-terra-100/50'
                      : 'border-terra-100 hover:border-terra-200 hover:bg-terra-25'
                  }`}
                >
                  {role === 'customer' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 bg-terra-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-[10px]">✓</span>
                    </motion.div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role === 'customer' ? 'bg-terra-100' : 'bg-terra-50'}`}>
                    <ShoppingBag className={`w-6 h-6 ${role === 'customer' ? 'text-terra-600' : 'text-terra-400'}`} />
                  </div>
                  <div className="text-center">
                    <span className={`text-sm font-semibold block ${role === 'customer' ? 'text-terra-800' : 'text-terra-600'}`}>
                      Shop & Order
                    </span>
                    <span className="text-[11px] text-terra-400">Browse & buy</span>
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRole('delivery')}
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                    role === 'delivery'
                      ? 'border-sage-400 bg-gradient-to-b from-sage-50 to-cream-50 shadow-lg shadow-sage-100/50'
                      : 'border-terra-100 hover:border-terra-200 hover:bg-terra-25'
                  }`}
                >
                  {role === 'delivery' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-5 h-5 bg-sage-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-[10px]">✓</span>
                    </motion.div>
                  )}
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${role === 'delivery' ? 'bg-sage-100' : 'bg-sage-50'}`}>
                    <Truck className={`w-6 h-6 ${role === 'delivery' ? 'text-sage-600' : 'text-terra-400'}`} />
                  </div>
                  <div className="text-center">
                    <span className={`text-sm font-semibold block ${role === 'delivery' ? 'text-sage-800' : 'text-terra-600'}`}>
                      Deliver Orders
                    </span>
                    <span className="text-[11px] text-terra-400">Earn & deliver</span>
                  </div>
                </motion.button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-sage-600 via-sage-700 to-terra-700 text-white rounded-xl font-semibold text-base shadow-xl shadow-sage-500/20 hover:shadow-2xl hover:shadow-sage-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-6"
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
            <Link to="/login" className="text-terra-700 font-semibold hover:text-terra-900 transition-colors">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
