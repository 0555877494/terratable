import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, X, ShoppingBag, Heart, Gift, MessageCircle, CheckCircle, Clock } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { supabase } from '../lib/supabase';

interface Notification {
  id: string;
  type: 'order' | 'wishlist' | 'promotion' | 'support' | 'loyalty';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  link?: string;
}

export default function NotificationCenter() {
  const { user } = useAuth();
  const { cartCount } = useStore();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (user) {
      loadNotifications();
    }
  }, [user]);

  const loadNotifications = async () => {
    // In production, this would fetch from a notifications table
    // For now, we'll create mock notifications based on user activity
    
    const mockNotifications: Notification[] = [
      {
        id: '1',
        type: 'order',
        title: 'Order Shipped!',
        message: 'Your order #12345 has been shipped and is on its way.',
        read: false,
        createdAt: new Date().toISOString(),
        link: '/order-tracking'
      },
      {
        id: '2',
        type: 'promotion',
        title: 'Flash Sale!',
        message: 'Get 20% off on all pantry items. Use code: FLASH20',
        read: false,
        createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
        link: '/promo-codes'
      },
      {
        id: '3',
        type: 'loyalty',
        title: 'Points Earned!',
        message: 'You earned 150 loyalty points from your last purchase.',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
        link: '/loyalty'
      },
      {
        id: '4',
        type: 'wishlist',
        title: 'Price Drop Alert!',
        message: 'An item in your wishlist is now on sale!',
        read: true,
        createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        link: '/wishlist'
      }
    ];

    setNotifications(mockNotifications);
    setUnreadCount(mockNotifications.filter(n => !n.read).length);
  };

  const markAsRead = async (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
    setUnreadCount(0);
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getIcon = (type: string) => {
    switch (type) {
      case 'order': return <ShoppingBag className="w-5 h-5 text-blue-500" />;
      case 'wishlist': return <Heart className="w-5 h-5 text-rose-500" />;
      case 'promotion': return <Gift className="w-5 h-5 text-amber-500" />;
      case 'support': return <MessageCircle className="w-5 h-5 text-emerald-500" />;
      case 'loyalty': return <CheckCircle className="w-5 h-5 text-purple-500" />;
      default: return <Bell className="w-5 h-5 text-stone-500" />;
    }
  };

  const getBgColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-50 dark:bg-blue-900/20';
      case 'wishlist': return 'bg-rose-50 dark:bg-rose-900/20';
      case 'promotion': return 'bg-amber-50 dark:bg-amber-900/20';
      case 'support': return 'bg-emerald-50 dark:bg-emerald-900/20';
      case 'loyalty': return 'bg-purple-50 dark:bg-purple-900/20';
      default: return 'bg-stone-50 dark:bg-stone-700/50';
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 rounded-full bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 hover:border-amber-300 hover:shadow-lg transition-all"
      >
        <Bell className="w-5 h-5 text-stone-700 dark:text-stone-300" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
          >
            {unreadCount}
          </motion.div>
        )}
      </motion.button>

      {/* Notifications Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />

            {/* Panel */}
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="absolute right-0 top-14 w-96 bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden z-50"
            >
              {/* Header */}
              <div className="p-4 border-b-2 border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bell className="w-5 h-5 text-amber-600" />
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">Notifications</h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-300 text-xs font-bold rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-sm text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-600 mb-3" />
                    <p className="text-stone-500 dark:text-stone-400">No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-200 dark:divide-stone-700">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`p-4 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors ${
                          !notification.read ? getBgColor(notification.type) : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(notification.type)}`}>
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                                {notification.title}
                              </h4>
                              {!notification.read && (
                                <div className="w-2 h-2 bg-amber-500 rounded-full flex-shrink-0 mt-1.5" />
                              )}
                            </div>
                            <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-stone-500 dark:text-stone-500 flex items-center gap-1">
                                <Clock className="w-3 h-3" />
                                {new Date(notification.createdAt).toLocaleDateString()}
                              </span>
                              <div className="flex gap-2">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold"
                                  >
                                    Mark as read
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 hover:bg-stone-200 dark:hover:bg-stone-600 rounded transition-colors"
                                >
                                  <X className="w-3 h-3 text-stone-500" />
                                </button>
                              </div>
                            </div>
                            {notification.link && (
                              <a
                                href={notification.link}
                                className="mt-2 inline-block text-xs text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 font-semibold"
                                onClick={() => setIsOpen(false)}
                              >
                                View Details →
                              </a>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-4 border-t-2 border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50">
                <button
                  onClick={() => setIsOpen(false)}
                  className="w-full py-2 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
