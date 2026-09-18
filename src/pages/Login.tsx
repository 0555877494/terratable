import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const result = login(email, password);
      if (result.success) {
        const user = JSON.parse(localStorage.getItem('terra_current_user') || '{}');
        switch (user.role) {
          case 'admin': navigate('/admin'); break;
          case 'delivery': navigate('/delivery'); break;
          default: navigate('/customer'); break;
        }
      } else {
        setError(result.message);
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-16 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-terra-50 via-cream-100 to-wine-50" />
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-terra-200/40 rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-wine-200/30 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-sage-200/30 rounded-full blur-[80px]" />
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
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: 'spring', delay: 0.2, stiffness: 200 }}
              className="relative w-16 h-16 bg-gradient-to-br from-terra-500 via-terra-600 to-wine-700 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-xl shadow-terra-500/30"
            >
              <Sparkles className="w-7 h-7 text-white" />
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 to-transparent" />
            </motion.div>
            <h1 className="font-serif text-3xl font-bold text-terra-900 mb-2">Welcome Back</h1>
            <p className="text-terra-500">Sign in to continue your culinary journey</p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: 'auto' }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              className="mb-5 p-4 bg-red-50 border border-red-100 rounded-2xl text-sm text-red-600 flex items-center gap-2"
            >
              <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-xs">!</span>
              </div>
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
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
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-terra-400 hover:text-terra-600 transition-colors">
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-terra-600 via-terra-700 to-wine-700 text-white rounded-xl font-semibold text-base shadow-xl shadow-terra-500/20 hover:shadow-2xl hover:shadow-terra-500/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 p-4 bg-gradient-to-r from-cream-100 to-terra-50 rounded-2xl border border-terra-100/50">
            <p className="text-xs font-semibold text-terra-600 mb-2.5 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 bg-sage-400 rounded-full" />
              Quick Demo Access
            </p>
            <div className="space-y-1.5 text-xs text-terra-600">
              <p className="flex justify-between"><span className="font-medium">Admin:</span> <span className="text-terra-500">admin@terra.com / admin123</span></p>
              <p className="flex justify-between"><span className="font-medium">Customer:</span> <span className="text-terra-500">sarah@email.com / customer123</span></p>
              <p className="flex justify-between"><span className="font-medium">Delivery:</span> <span className="text-terra-500">marcus@email.com / delivery123</span></p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-terra-500 mt-6">
            New here?{' '}
            <Link to="/signup" className="text-terra-700 font-semibold hover:text-terra-900 transition-colors">Create an account</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
