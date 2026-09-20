import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Users, Gift, Copy, CheckCircle, Share2, DollarSign, TrendingUp } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function ReferralProgram() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const referralCode = `TERRA${user.id.slice(-6).toUpperCase()}`;
  const referralLink = `${window.location.origin}/signup?ref=${referralCode}`;

  // Mock referral stats
  const stats = {
    totalReferrals: 12,
    successfulReferrals: 8,
    totalEarned: 160,
    pendingRewards: 40
  };

  const copyReferralLink = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    showToast('success', 'Referral link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const recentReferrals = [
    { name: 'Sarah M.', date: '2024-01-15', status: 'completed', reward: 20 },
    { name: 'James K.', date: '2024-01-12', status: 'completed', reward: 20 },
    { name: 'Maria L.', date: '2024-01-10', status: 'pending', reward: 20 },
    { name: 'David R.', date: '2024-01-08', status: 'completed', reward: 20 },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200 rounded-full text-sm font-semibold mb-4">
          <Users className="w-4 h-4" /> Referral Program
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Invite Friends, <span className="gradient-text">Earn Rewards</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Share Terra & Table with friends and earn $20 for every successful referral. It's that simple!
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Total Referrals', value: stats.totalReferrals, icon: <Users className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
          { label: 'Successful', value: stats.successfulReferrals, icon: <CheckCircle className="w-5 h-5" />, color: 'from-emerald-500 to-emerald-600' },
          { label: 'Total Earned', value: `$${stats.totalEarned}`, icon: <DollarSign className="w-5 h-5" />, color: 'from-amber-500 to-amber-600' },
          { label: 'Pending', value: `$${stats.pendingRewards}`, icon: <TrendingUp className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-5"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{stat.value}</p>
            <p className="text-sm text-stone-500 dark:text-stone-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Referral Link */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white mb-10 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <Share2 className="w-8 h-8" />
            <h2 className="font-serif text-2xl font-bold">Your Referral Link</h2>
          </div>
          <p className="text-white/90 mb-6">
            Share this link with friends and earn $20 for each successful referral!
          </p>
          
          <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4 mb-4">
            <p className="text-xs text-white/70 mb-2">Your referral code:</p>
            <p className="text-2xl font-bold mb-3">{referralCode}</p>
            <div className="flex gap-2">
              <input
                type="text"
                value={referralLink}
                readOnly
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 text-sm"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={copyReferralLink}
                className="px-6 py-3 bg-white text-amber-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-5 h-5" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-5 h-5" />
                    Copy
                  </>
                )}
              </motion.button>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 text-center">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Gift className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold">Friend Gets</p>
              <p className="text-2xl font-bold">10% Off</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <DollarSign className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold">You Earn</p>
              <p className="text-2xl font-bold">$20</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Users className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm font-semibold">No Limit</p>
              <p className="text-2xl font-bold">∞</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10"
      >
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Share Your Link', desc: 'Send your unique referral link to friends and family', icon: <Share2 className="w-6 h-6" /> },
            { step: '2', title: 'Friend Signs Up', desc: 'Your friend creates an account and makes their first purchase', icon: <Users className="w-6 h-6" /> },
            { step: '3', title: 'You Earn $20', desc: 'Once their order is delivered, you earn $20 in rewards', icon: <DollarSign className="w-6 h-6" /> },
          ].map((item, i) => (
            <motion.div
              key={item.step}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + i * 0.1 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 p-6 text-center"
            >
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {item.step}
              </div>
              <div className="w-12 h-12 mx-auto mb-3 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600">
                {item.icon}
              </div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-2">{item.title}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Referrals */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
          Recent Referrals
        </h2>
        <div className="bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
          {recentReferrals.map((referral, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 + index * 0.05 }}
              className={`flex items-center justify-between p-4 ${
                index !== recentReferrals.length - 1 ? 'border-b border-stone-200 dark:border-stone-700' : ''
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center text-white font-bold">
                  {referral.name[0]}
                </div>
                <div>
                  <p className="font-semibold text-stone-800 dark:text-stone-200">{referral.name}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {new Date(referral.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  referral.status === 'completed'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                }`}>
                  {referral.status}
                </span>
                <span className="font-bold text-stone-800 dark:text-stone-200">
                  +${referral.reward}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Terms */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-10 p-6 bg-stone-50 dark:bg-stone-800/50 rounded-2xl border border-stone-200 dark:border-stone-700"
      >
        <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-3">Terms & Conditions</h3>
        <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
          <li>• Rewards are credited after the referred friend's first order is delivered</li>
          <li>• Maximum of 50 referrals per month</li>
          <li>• Rewards can be used for future purchases or withdrawn as cash</li>
          <li>• Referral program subject to change without notice</li>
          <li>• Self-referrals are not eligible for rewards</li>
        </ul>
      </motion.div>
    </div>
  );
}
