import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Calendar, CreditCard, Edit2, Pause, Play, Trash2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface Subscription {
  id: string;
  plan: string;
  status: 'active' | 'paused' | 'cancelled';
  startDate: string;
  nextDelivery: string;
  price: number;
  items: string[];
}

export default function SubscriptionManagement() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadSubscriptions();
    }
  }, [user]);

  const loadSubscriptions = async () => {
    try {
      // In production, this would fetch from a subscriptions table
      // For now, we'll use mock data
      const mockSubscriptions: Subscription[] = [
        {
          id: 'sub-1',
          plan: 'The Explorer',
          status: 'active',
          startDate: '2024-01-15',
          nextDelivery: '2024-02-15',
          price: 49.99,
          items: ['Wildflower Honey', 'Artisan Chocolate', 'Specialty Tea', 'Dried Fruits']
        },
        {
          id: 'sub-2',
          plan: 'The Connoisseur',
          status: 'paused',
          startDate: '2023-11-01',
          nextDelivery: '2024-02-01',
          price: 89.99,
          items: ['Saffron Threads', 'Truffle Oil', 'Aged Vinegar', 'Matcha Powder', 'Artisan Cheese', 'Smoked Salt']
        }
      ];

      setSubscriptions(mockSubscriptions);
    } catch (error) {
      console.error('Error loading subscriptions:', error);
      showToast('error', 'Failed to load subscriptions');
    } finally {
      setLoading(false);
    }
  };

  const handlePauseSubscription = async (subscriptionId: string) => {
    try {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === subscriptionId ? { ...sub, status: 'paused' } : sub
      ));
      showToast('success', 'Subscription paused');
    } catch (error) {
      console.error('Error pausing subscription:', error);
      showToast('error', 'Failed to pause subscription');
    }
  };

  const handleResumeSubscription = async (subscriptionId: string) => {
    try {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === subscriptionId ? { ...sub, status: 'active' } : sub
      ));
      showToast('success', 'Subscription resumed');
    } catch (error) {
      console.error('Error resuming subscription:', error);
      showToast('error', 'Failed to resume subscription');
    }
  };

  const handleCancelSubscription = async (subscriptionId: string) => {
    if (!confirm('Are you sure you want to cancel this subscription?')) return;

    try {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === subscriptionId ? { ...sub, status: 'cancelled' } : sub
      ));
      showToast('success', 'Subscription cancelled');
    } catch (error) {
      console.error('Error cancelling subscription:', error);
      showToast('error', 'Failed to cancel subscription');
    }
  };

  const handleUpdatePlan = async (subscriptionId: string, newPlan: string) => {
    try {
      setSubscriptions(subscriptions.map(sub => 
        sub.id === subscriptionId ? { ...sub, plan: newPlan } : sub
      ));
      showToast('success', 'Subscription plan updated');
    } catch (error) {
      console.error('Error updating plan:', error);
      showToast('error', 'Failed to update plan');
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading subscriptions...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Subscription Management
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Manage your subscription boxes and delivery schedule
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {subscriptions.filter(s => s.status === 'active').length}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Active Subscriptions</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {subscriptions.filter(s => s.status === 'active').reduce((sum, s) => sum + s.price, 0).toFixed(2)}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Monthly Total</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {subscriptions.length}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Total Subscriptions</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Subscriptions List */}
      {subscriptions.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700"
        >
          <Package className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No subscriptions yet
          </h3>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            Start a subscription to receive curated boxes monthly
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.location.href = '/subscriptions'}
            className="px-8 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
          >
            Browse Subscriptions
          </motion.button>
        </motion.div>
      ) : (
        <div className="space-y-6">
          {subscriptions.map((subscription, index) => (
            <motion.div
              key={subscription.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                      {subscription.plan}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      subscription.status === 'active'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : subscription.status === 'paused'
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                        : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                    }`}>
                      {subscription.status}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      Started: {new Date(subscription.startDate).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      Next delivery: {new Date(subscription.nextDelivery).toLocaleDateString()}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold gradient-text">
                    ${subscription.price.toFixed(2)}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">per month</p>
                </div>
              </div>

              {/* Items */}
              <div className="mb-4">
                <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Items in this box:
                </p>
                <div className="flex flex-wrap gap-2">
                  {subscription.items.map((item, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-sm"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-200 dark:border-stone-700">
                {subscription.status === 'active' && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handlePauseSubscription(subscription.id)}
                      className="px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 rounded-lg font-semibold text-sm flex items-center gap-2"
                    >
                      <Pause className="w-4 h-4" />
                      Pause
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleUpdatePlan(subscription.id, 'The Connoisseur')}
                      className="px-4 py-2 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg font-semibold text-sm flex items-center gap-2"
                    >
                      <Edit2 className="w-4 h-4" />
                      Change Plan
                    </motion.button>
                  </>
                )}
                {subscription.status === 'paused' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleResumeSubscription(subscription.id)}
                    className="px-4 py-2 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <Play className="w-4 h-4" />
                    Resume
                  </motion.button>
                )}
                {subscription.status !== 'cancelled' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCancelSubscription(subscription.id)}
                    className="px-4 py-2 bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 rounded-lg font-semibold text-sm flex items-center gap-2"
                  >
                    <Trash2 className="w-4 h-4" />
                    Cancel
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
