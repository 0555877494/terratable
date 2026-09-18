import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
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
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-gradient-to-br from-terra-50 via-cream-100 to-sage-50">
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
              className="w-14 h-14 bg-gradient-to-br from-terra-500 to-terra-700 rounded-2xl flex items-center justify-center mx-auto mb-4"
            >
              <span className="text-white font-bold text-xl">T</span>
            </motion.div>
            <h1 className="font-serif text-2xl font-bold text-terra-900">Welcome Back</h1>
            <p className="text-terra-500 text-sm mt-1">Sign in to your account</p>
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
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-terra-400 hover:text-terra-600">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <motion.button
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-terra-600 text-white rounded-xl font-medium hover:bg-terra-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>Sign In <ArrowRight className="w-4 h-4" /></>
              )}
            </motion.button>
          </form>

          {/* Demo accounts */}
          <div className="mt-6 p-4 bg-cream-100 rounded-xl">
            <p className="text-xs font-medium text-terra-600 mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs text-terra-500">
              <p><span className="font-medium">Admin:</span> admin@terra.com / admin123</p>
              <p><span className="font-medium">Customer:</span> sarah@email.com / customer123</p>
              <p><span className="font-medium">Delivery:</span> marcus@email.com / delivery123</p>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-sm text-terra-500 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-terra-600 font-medium hover:text-terra-700">Create one</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
