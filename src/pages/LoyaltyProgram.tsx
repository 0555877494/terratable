import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, Gift, Star, TrendingUp, ShoppingBag, Crown, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function LoyaltyProgram() {
  const { user } = useAuth();
  const { showToast } = useToast();

  // Mock loyalty data
  const [loyaltyData] = useState({
    points: 2450,
    tier: 'Gold',
    nextTier: 'Platinum',
    pointsToNextTier: 550,
    totalSpent: 1245.50,
    totalOrders: 28,
    memberSince: '2023-06-15'
  });

  const tiers = [
    {
      name: 'Bronze',
      minPoints: 0,
      color: 'from-amber-600 to-amber-800',
      icon: <Award className="w-8 h-8" />,
      benefits: ['5% cashback', 'Early access to sales', 'Birthday reward']
    },
    {
      name: 'Silver',
      minPoints: 1000,
      color: 'from-stone-400 to-stone-600',
      icon: <Star className="w-8 h-8" />,
      benefits: ['7% cashback', 'Free shipping', 'Priority support', 'Exclusive products']
    },
    {
      name: 'Gold',
      minPoints: 2000,
      color: 'from-amber-400 to-amber-600',
      icon: <Crown className="w-8 h-8" />,
      benefits: ['10% cashback', 'Free express shipping', 'VIP support', 'Exclusive products', 'Monthly gifts']
    },
    {
      name: 'Platinum',
      minPoints: 5000,
      color: 'from-purple-500 to-purple-700',
      icon: <Zap className="w-8 h-8" />,
      benefits: ['15% cashback', 'Free express shipping', '24/7 VIP support', 'All exclusive products', 'Monthly gifts', 'Early access to new products']
    }
  ];

  const currentTier = tiers.find(t => t.name === loyaltyData.tier)!;
  const nextTier = tiers.find(t => t.name === loyaltyData.nextTier);

  const rewards = [
    { id: 1, name: '$10 Off', points: 500, icon: <Gift className="w-6 h-6" /> },
    { id: 2, name: '$25 Off', points: 1000, icon: <Gift className="w-6 h-6" /> },
    { id: 3, name: '$50 Off', points: 2000, icon: <Gift className="w-6 h-6" /> },
    { id: 4, name: 'Free Shipping', points: 300, icon: <ShoppingBag className="w-6 h-6" /> },
    { id: 5, name: 'Exclusive Product', points: 1500, icon: <Star className="w-6 h-6" /> },
    { id: 6, name: 'Mystery Box', points: 2500, icon: <Gift className="w-6 h-6" /> }
  ];

  const recentActivity = [
    { id: 1, action: 'Earned points', description: 'Order #1234', points: 125, date: '2024-01-20' },
    { id: 2, action: 'Redeemed reward', description: '$25 Off', points: -1000, date: '2024-01-18' },
    { id: 3, action: 'Earned points', description: 'Order #1233', points: 89, date: '2024-01-15' },
    { id: 4, action: 'Earned points', description: 'Referral bonus', points: 200, date: '2024-01-12' },
    { id: 5, action: 'Earned points', description: 'Order #1232', points: 156, date: '2024-01-10' }
  ];

  const handleRedeem = (rewardName: string, points: number) => {
    if (loyaltyData.points < points) {
      showToast('error', 'Not enough points for this reward');
      return;
    }
    showToast('success', `Reward "${rewardName}" redeemed successfully!`);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Award className="w-4 h-4" /> Loyalty Program
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Welcome to the <span className="gradient-text">{loyaltyData.tier}</span> Club
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg">
          Earn points on every purchase and unlock exclusive rewards
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Points Balance', value: loyaltyData.points.toLocaleString(), icon: <Star className="w-6 h-6" />, color: 'from-amber-500 to-orange-500' },
          { label: 'Total Spent', value: `$${loyaltyData.totalSpent.toFixed(2)}`, icon: <ShoppingBag className="w-6 h-6" />, color: 'from-emerald-500 to-emerald-600' },
          { label: 'Total Orders', value: loyaltyData.totalOrders, icon: <TrendingUp className="w-6 h-6" />, color: 'from-blue-500 to-blue-600' },
          { label: 'Member Since', value: new Date(loyaltyData.memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }), icon: <Award className="w-6 h-6" />, color: 'from-purple-500 to-purple-600' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
          >
            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{stat.value}</p>
            <p className="text-sm text-stone-500 dark:text-stone-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Tier Progress */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className={`bg-gradient-to-br ${currentTier.color} rounded-3xl p-8 text-white mb-10 relative overflow-hidden`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
              {currentTier.icon}
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold">{currentTier.name} Tier</h2>
              <p className="text-white/80">You're enjoying {currentTier.benefits.length} exclusive benefits</p>
            </div>
          </div>

          {nextTier && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Progress to {nextTier.name}</span>
                <span className="text-sm font-bold">
                  {loyaltyData.pointsToNextTier} points to go
                </span>
              </div>
              <div className="w-full h-3 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${((loyaltyData.points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          )}

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {currentTier.benefits.map((benefit, i) => (
              <div key={i} className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl px-4 py-3">
                <Star className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm font-medium">{benefit}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Tiers Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-10"
      >
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
          All Tiers
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className={`bg-white dark:bg-stone-800 rounded-2xl border-2 p-5 ${
                tier.name === loyaltyData.tier
                  ? 'border-amber-400 dark:border-amber-600 shadow-lg'
                  : 'border-stone-200 dark:border-stone-700'
              }`}
            >
              <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${tier.color} flex items-center justify-center text-white mb-3 mx-auto`}>
                {tier.icon}
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 text-center mb-1">
                {tier.name}
              </h3>
              <p className="text-xs text-stone-500 dark:text-stone-400 text-center mb-3">
                {tier.minPoints}+ points
              </p>
              <ul className="space-y-1.5">
                {tier.benefits.slice(0, 3).map((benefit, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                    <Star className="w-3 h-3 text-amber-500 flex-shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Rewards */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
            Redeem Rewards
          </h2>
          <div className="space-y-3">
            {rewards.map((reward, index) => (
              <motion.div
                key={reward.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-4 flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-100 dark:bg-amber-900/30 rounded-xl flex items-center justify-center text-amber-600">
                    {reward.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100">{reward.name}</h3>
                    <p className="text-sm text-stone-500 dark:text-stone-400">{reward.points} points</p>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleRedeem(reward.name, reward.points)}
                  disabled={loyaltyData.points < reward.points}
                  className={`px-5 py-2 rounded-xl font-bold text-sm transition-all ${
                    loyaltyData.points >= reward.points
                      ? 'gradient-bg text-white shadow-lg hover:shadow-xl'
                      : 'bg-stone-100 dark:bg-stone-700 text-stone-400 cursor-not-allowed'
                  }`}
                >
                  {loyaltyData.points >= reward.points ? 'Redeem' : 'Locked'}
                </motion.button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
            Recent Activity
          </h2>
          <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden">
            {recentActivity.map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.05 }}
                className={`flex items-center justify-between p-4 ${
                  index !== recentActivity.length - 1 ? 'border-b border-stone-200 dark:border-stone-700' : ''
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity.points > 0
                      ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                      : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                  }`}>
                    {activity.points > 0 ? <TrendingUp className="w-5 h-5" /> : <Gift className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                      {activity.action}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {activity.description} • {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <span className={`font-bold ${
                  activity.points > 0 ? 'text-emerald-600' : 'text-red-600'
                }`}>
                  {activity.points > 0 ? '+' : ''}{activity.points}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* How It Works */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-12 bg-stone-50 dark:bg-stone-800/50 rounded-3xl p-8"
      >
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
          How It Works
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { step: '1', title: 'Shop & Earn', desc: 'Earn 1 point for every $1 spent on any purchase', icon: <ShoppingBag className="w-8 h-8" /> },
            { step: '2', title: 'Climb Tiers', desc: 'Reach new tiers to unlock better benefits and rewards', icon: <TrendingUp className="w-8 h-8" /> },
            { step: '3', title: 'Redeem Rewards', desc: 'Use your points for discounts, free shipping, and more', icon: <Gift className="w-8 h-8" /> }
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 gradient-bg rounded-full flex items-center justify-center text-white">
                {item.icon}
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">{item.title}</h3>
              <p className="text-sm text-stone-600 dark:text-stone-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
