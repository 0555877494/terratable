import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import Logo from '../components/Logo';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      // Get user from localStorage or auth context
      const userStr = localStorage.getItem('terra_current_user');
      const user = userStr ? JSON.parse(userStr) : {};
      
      switch (user.role) {
        case 'admin': navigate('/admin'); break;
        case 'delivery': navigate('/delivery'); break;
        default: navigate('/customer'); break;
      }
    } else {
      setError(result.message);
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80" 
          alt="" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-stone-950/90 via-stone-900/80 to-amber-950/70" />
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
              className="relative mx-auto mb-6"
            >
              <Logo className="w-20 h-20" />
            </motion.div>
            <h1 className="font-serif text-4xl font-bold text-stone-900 mb-3">Welcome Back</h1>
            <p className="text-stone-600 text-lg">Sign in to continue your culinary journey</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-6 p-4 bg-rose-50 border-2 border-rose-200 rounded-2xl text-sm text-rose-700 flex items-center gap-3"
            >
              <div className="w-6 h-6 bg-rose-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs font-bold">!</span>
              </div>
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Email Address</label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all bg-white text-stone-800 placeholder:text-stone-400 text-base"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-stone-700 mb-2">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400 group-focus-within:text-amber-600 transition-colors" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  className="w-full pl-12 pr-12 py-4 rounded-xl border-2 border-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all bg-white text-stone-800 placeholder:text-stone-400 text-base"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-6 h-6 border-3 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-5 h-5" /></>
              )}
            </motion.button>
          </form>

          {/* Demo accounts */}
          <div className="mt-7 p-5 bg-amber-50 rounded-2xl border-2 border-amber-200">
            <p className="text-xs font-bold text-amber-800 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full" />
              Quick Demo Access
            </p>
            <div className="space-y-2 text-xs text-stone-700">
              <p className="flex justify-between"><span className="font-bold">Admin:</span> <span className="text-stone-600">admin@terra.com / admin123</span></p>
              <p className="flex justify-between"><span className="font-bold">Customer:</span> <span className="text-stone-600">sarah@email.com / customer123</span></p>
              <p className="flex justify-between"><span className="font-bold">Delivery:</span> <span className="text-stone-600">marcus@email.com / delivery123</span></p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-stone-600 mt-7">
            New here?{' '}
            <Link to="/signup" className="text-amber-700 font-bold hover:text-amber-800 transition-colors">Create an account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
