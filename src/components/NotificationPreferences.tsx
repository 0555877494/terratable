import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Bell, Mail, MessageSquare, ShoppingBag, Gift, TrendingUp } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function NotificationPreferences() {
  const { showToast } = useToast();
  const [preferences, setPreferences] = useState({
    orderUpdates: true,
    promotions: true,
    newProducts: false,
    priceAlerts: true,
    newsletters: true,
    smsNotifications: false
  });

  const handleToggle = (key: keyof typeof preferences) => {
    setPreferences(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSave = () => {
    showToast('success', 'Notification preferences saved!');
  };

  const notifications = [
    {
      key: 'orderUpdates' as const,
      icon: <ShoppingBag className="w-6 h-6" />,
      title: 'Order Updates',
      description: 'Get notified about your order status changes',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
    },
    {
      key: 'promotions' as const,
      icon: <Gift className="w-6 h-6" />,
      title: 'Promotions & Deals',
      description: 'Receive exclusive offers and discount codes',
      color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400'
    },
    {
      key: 'newProducts' as const,
      icon: <TrendingUp className="w-6 h-6" />,
      title: 'New Products',
      description: 'Be the first to know about new arrivals',
      color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
    },
    {
      key: 'priceAlerts' as const,
      icon: <Bell className="w-6 h-6" />,
      title: 'Price Alerts',
      description: 'Get notified when items in your wishlist go on sale',
      color: 'bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400'
    },
    {
      key: 'newsletters' as const,
      icon: <Mail className="w-6 h-6" />,
      title: 'Newsletter',
      description: 'Weekly recipes, tips, and artisan stories',
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
    },
    {
      key: 'smsNotifications' as const,
      icon: <MessageSquare className="w-6 h-6" />,
      title: 'SMS Notifications',
      description: 'Receive important updates via text message',
      color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-600 dark:text-teal-400'
    }
  ];

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
          <Bell className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
            Notification Preferences
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Choose how you want to stay updated
          </p>
        </div>
      </div>

      <div className="space-y-4">
        {notifications.map((notification) => (
          <motion.div
            key={notification.key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
          >
            <div className="flex items-center gap-4 flex-1">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${notification.color}`}>
                {notification.icon}
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-1">
                  {notification.title}
                </h4>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {notification.description}
                </p>
              </div>
            </div>
            
            {/* Toggle Switch */}
            <button
              onClick={() => handleToggle(notification.key)}
              className={`relative w-14 h-8 rounded-full transition-colors ${
                preferences[notification.key]
                  ? 'bg-amber-500'
                  : 'bg-stone-300 dark:bg-stone-600'
              }`}
            >
              <motion.div
                animate={{
                  x: preferences[notification.key] ? 26 : 2
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-1 w-6 h-6 bg-white rounded-full shadow-lg"
              />
            </button>
          </motion.div>
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleSave}
        className="w-full mt-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
      >
        Save Preferences
      </motion.button>
    </div>
  );
}
