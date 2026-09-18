import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, Truck, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { UserRole } from '../types';
import Logo from '../components/Logo';

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
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=1920&q=80" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/90 via-stone-900/80 to-emerald-950/70" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative w-full max-w-md"
      >
        <div className="glass rounded-3xl shadow-2xl p-10">
          {/* Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0, rotate: 180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
              className="relative mx-auto mb-6"
            >
              <Logo className="w-20 h-20" />
            </motion.div>
            <h1 className="font-serif text-4xl font-bold text-stone-900 mb-3">Join the Family</h1>
            <p className="text-stone-600 text-lg">Start your artisan food journey today</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              className="mb-6 p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl text-sm text-rose-700 flex items-center gap-3"
            >
              <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">!</span>
              </div>
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Full Name</label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all bg-white text-stone-800 placeholder:text-stone-400 text-base"
                  placeholder="Your full name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all bg-white text-stone-800 placeholder:text-stone-400 text-base"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-emerald-600 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-stone-200 focus:border-emerald-400 focus:ring-4 focus:ring-emerald-100 outline-none transition-all bg-white text-stone-800 placeholder:text-stone-400 text-base"
                  placeholder="Min. 6 characters"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-3">How will you use Terra & Table?</label>
              <div className="grid grid-cols-2 gap-3">
                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRole('customer')}
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                    role === 'customer'
                      ? 'border-amber-400 bg-amber-50 shadow-lg shadow-amber-500/20'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {role === 'customer' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 gradient-bg rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-bold">✓</span>
                    </motion.div>
                  )}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${role === 'customer' ? 'gradient-bg' : 'bg-stone-100'}`}>
                    <ShoppingBag className={`w-7 h-7 ${role === 'customer' ? 'text-white' : 'text-stone-400'}`} />
                  </div>
                  <div className="text-center">
                    <span className={`text-sm font-bold block ${role === 'customer' ? 'text-amber-800' : 'text-stone-600'}`}>
                      Shop & Order
                    </span>
                    <span className="text-[11px] text-stone-500">Browse & buy</span>
                  </div>
                </motion.button>

                <motion.button
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setRole('delivery')}
                  className={`relative flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all ${
                    role === 'delivery'
                      ? 'border-emerald-400 bg-emerald-50 shadow-lg shadow-emerald-500/20'
                      : 'border-stone-200 hover:border-stone-300'
                  }`}
                >
                  {role === 'delivery' && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-2 right-2 w-6 h-6 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs font-bold">✓</span>
                    </motion.div>
                  )}
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${role === 'delivery' ? 'bg-gradient-to-br from-emerald-500 to-emerald-600' : 'bg-stone-100'}`}>
                    <Truck className={`w-7 h-7 ${role === 'delivery' ? 'text-white' : 'text-stone-400'}`} />
                  </div>
                  <div className="text-center">
                    <span className={`text-sm font-bold block ${role === 'delivery' ? 'text-emerald-800' : 'text-stone-600'}`}>
                      Deliver Orders
                    </span>
                    <span className="text-[11px] text-stone-500">Earn & deliver</span>
                  </div>
                </motion.button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-br from-emerald-500 to-amber-600 text-white rounded-xl font-bold text-lg shadow-2xl shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-70 mt-7"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Create Account <ArrowRight className="w-5 h-5" /></>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className="text-center text-stone-600 mt-7">
            Already have an account?{' '}
            <Link to="/login" className="text-amber-700 font-bold hover:text-amber-800 transition-colors">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
