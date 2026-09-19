import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, CheckCircle, Gift, Sparkles } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function Newsletter() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const interests = [
    { id: 'recipes', label: 'Recipes & Cooking Tips', icon: '🍳' },
    { id: 'new-arrivals', label: 'New Product Alerts', icon: '✨' },
    { id: 'exclusive', label: 'Exclusive Offers', icon: '🎁' },
    { id: 'stories', label: 'Artisan Stories', icon: '📖' },
    { id: 'seasonal', label: 'Seasonal Collections', icon: '🌸' },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      showToast('error', 'Please enter your email address');
      return;
    }
    if (selectedInterests.length === 0) {
      showToast('error', 'Please select at least one interest');
      return;
    }
    setIsSubscribed(true);
    showToast('success', 'Welcome to the Terra & Table family! 🎉');
  };

  const toggleInterest = (id: string) => {
    setSelectedInterests(prev =>
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  if (isSubscribed) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl shadow-emerald-500/30"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            You're In! 🎉
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            Welcome to the Terra & Table family!
          </p>
          <p className="text-stone-500 dark:text-stone-500 mb-6">
            Check your inbox for a special welcome gift
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5 border-2 border-amber-200 dark:border-amber-800 mb-6">
            <Gift className="w-8 h-8 mx-auto mb-2 text-amber-600" />
            <p className="text-sm font-semibold text-amber-800 dark:text-amber-200">
              Your 15% discount code:
            </p>
            <p className="text-2xl font-bold gradient-text mt-1">WELCOME15</p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setIsSubscribed(false);
              setEmail('');
              setSelectedInterests([]);
            }}
            className="px-8 py-3 gradient-bg text-white rounded-full font-bold shadow-lg"
          >
            Back to Newsletter
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Sparkles className="w-4 h-4" />
          Newsletter
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Join Our <span className="gradient-text">Community</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Get exclusive recipes, early access to new products, and special offers delivered to your inbox
        </p>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid sm:grid-cols-3 gap-4 mb-10"
      >
        {[
          { icon: '🎁', title: '15% Off', desc: 'Welcome discount' },
          { icon: '✨', title: 'Early Access', desc: 'New products first' },
          { icon: '📖', title: 'Exclusive Content', desc: 'Recipes & stories' },
        ].map((benefit, i) => (
          <div key={i} className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5 text-center">
            <div className="text-4xl mb-2">{benefit.icon}</div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1">{benefit.title}</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">{benefit.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Signup Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-8"
      >
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              <Mail className="w-4 h-4" />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
            />
          </div>

          {/* Interests */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
              What are you interested in? (Select all that apply)
            </label>
            <div className="grid sm:grid-cols-2 gap-3">
              {interests.map(interest => (
                <motion.button
                  key={interest.id}
                  type="button"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleInterest(interest.id)}
                  className={`flex items-center gap-3 p-4 rounded-xl border-2 transition-all ${
                    selectedInterests.includes(interest.id)
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                      : 'border-stone-200 dark:border-stone-700 hover:border-amber-300'
                  }`}
                >
                  <span className="text-2xl">{interest.icon}</span>
                  <span className={`font-semibold text-sm ${
                    selectedInterests.includes(interest.id)
                      ? 'text-amber-700 dark:text-amber-300'
                      : 'text-stone-700 dark:text-stone-300'
                  }`}>
                    {interest.label}
                  </span>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl transition-all"
          >
            Subscribe & Get 15% Off
          </motion.button>

          <p className="text-xs text-stone-500 dark:text-stone-400 text-center">
            By subscribing, you agree to receive marketing emails. Unsubscribe anytime.
          </p>
        </form>
      </motion.div>
    </div>
  );
}
