import React from 'react';
import { motion } from 'framer-motion';
import { Award, Gift, Star, TrendingUp, ShoppingBag, Calendar } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';
import AnimatedProgressBar from './AnimatedProgressBar';

interface LoyaltyDashboardProps {
  points: number;
  tier: string;
  totalSpent: number;
  totalOrders: number;
  memberSince: string;
}

export default function LoyaltyDashboard({ 
  points, 
  tier, 
  totalSpent, 
  totalOrders, 
  memberSince 
}: LoyaltyDashboardProps) {
  const tiers = [
    { name: 'Bronze', minPoints: 0, maxPoints: 999, color: 'from-amber-600 to-amber-800', benefits: 3 },
    { name: 'Silver', minPoints: 1000, maxPoints: 2499, color: 'from-stone-400 to-stone-600', benefits: 5 },
    { name: 'Gold', minPoints: 2500, maxPoints: 4999, color: 'from-amber-400 to-amber-600', benefits: 7 },
    { name: 'Platinum', minPoints: 5000, maxPoints: 999999, color: 'from-purple-500 to-purple-700', benefits: 10 }
  ];

  const currentTier = tiers.find(t => t.name === tier) || tiers[0];
  const nextTier = tiers[tiers.indexOf(currentTier) + 1];
  const pointsToNextTier = nextTier ? nextTier.minPoints - points : 0;
  const progressToNextTier = nextTier 
    ? ((points - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100 
    : 100;

  const recentActivity = [
    { action: 'Earned points', description: 'Order #1234', points: 125, date: '2024-01-20', type: 'earn' },
    { action: 'Redeemed reward', description: '$25 Off', points: -1000, date: '2024-01-18', type: 'redeem' },
    { action: 'Earned points', description: 'Order #1233', points: 89, date: '2024-01-15', type: 'earn' },
    { action: 'Earned points', description: 'Referral bonus', points: 200, date: '2024-01-12', type: 'earn' },
    { action: 'Earned points', description: 'Order #1232', points: 156, date: '2024-01-10', type: 'earn' }
  ];

  return (
    <div className="space-y-6">
      {/* Tier Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`bg-gradient-to-br ${currentTier.color} rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl`}
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <Award className="w-10 h-10" />
            </div>
            <div>
              <h2 className="font-serif text-3xl font-bold">{currentTier.name} Tier</h2>
              <p className="text-white/80">
                {nextTier ? `${pointsToNextTier} points to ${nextTier.name}` : 'Maximum tier reached!'}
              </p>
            </div>
          </div>

          {nextTier && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold">Progress to {nextTier.name}</span>
                <span className="text-sm font-bold">{progressToNextTier.toFixed(0)}%</span>
              </div>
              <div className="w-full h-4 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressToNextTier}%` }}
                  transition={{ duration: 1, delay: 0.5 }}
                  className="h-full bg-white rounded-full"
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Star className="w-6 h-6 mb-2" />
              <p className="text-3xl font-bold">
                <AnimatedCounter value={points} />
              </p>
              <p className="text-sm text-white/80">Points</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <ShoppingBag className="w-6 h-6 mb-2" />
              <p className="text-3xl font-bold">
                <AnimatedCounter value={totalOrders} />
              </p>
              <p className="text-sm text-white/80">Orders</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <TrendingUp className="w-6 h-6 mb-2" />
              <p className="text-3xl font-bold">
                $<AnimatedCounter value={totalSpent} />
              </p>
              <p className="text-sm text-white/80">Total Spent</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <Calendar className="w-6 h-6 mb-2" />
              <p className="text-lg font-bold">
                {new Date(memberSince).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
              </p>
              <p className="text-sm text-white/80">Member Since</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
      >
        <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Your Benefits
        </h3>
        <div className="grid sm:grid-cols-2 gap-3">
          {[
            `${currentTier.name === 'Bronze' ? '5' : currentTier.name === 'Silver' ? '7' : currentTier.name === 'Gold' ? '10' : '15'}% cashback`,
            currentTier.name !== 'Bronze' && 'Free shipping',
            currentTier.name !== 'Bronze' && 'Priority support',
            (currentTier.name === 'Gold' || currentTier.name === 'Platinum') && 'Exclusive products',
            currentTier.name === 'Platinum' && 'Early access to new products',
            currentTier.name === 'Platinum' && 'Birthday gift'
          ].filter(Boolean).map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl"
            >
              <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-emerald-700 dark:text-emerald-300 text-sm">
                {benefit}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
      >
        <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {recentActivity.map((activity, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
            >
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === 'earn'
                    ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600'
                    : 'bg-red-100 dark:bg-red-900/30 text-red-600'
                }`}>
                  {activity.type === 'earn' ? (
                    <TrendingUp className="w-5 h-5" />
                  ) : (
                    <Gift className="w-5 h-5" />
                  )}
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
  );
}
