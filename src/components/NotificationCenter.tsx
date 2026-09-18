import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Package, Truck, Gift, Star, X, Check } from 'lucide-react';

interface Notification {
  id: string;
  type: 'order' | 'delivery' | 'promotion' | 'review';
  title: string;
  message: string;
  time: string;
  read: boolean;
  icon: React.ReactNode;
}

export default function NotificationCenter() {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'order',
      title: 'Order Confirmed',
      message: 'Your order #1234 has been confirmed and is being prepared',
      time: '2 minutes ago',
      read: false,
      icon: <Package className="w-5 h-5" />
    },
    {
      id: '2',
      type: 'delivery',
      title: 'Out for Delivery',
      message: 'Your order #1233 is out for delivery and will arrive soon',
      time: '1 hour ago',
      read: false,
      icon: <Truck className="w-5 h-5" />
    },
    {
      id: '3',
      type: 'promotion',
      title: 'Special Offer!',
      message: 'Get 20% off on your next order with code GOLD20',
      time: '3 hours ago',
      read: true,
      icon: <Gift className="w-5 h-5" />
    },
    {
      id: '4',
      type: 'review',
      title: 'Review Reminder',
      message: 'How was your recent purchase? Leave a review and earn 50 points',
      time: '1 day ago',
      read: true,
      icon: <Star className="w-5 h-5" />
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'order': return 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400';
      case 'delivery': return 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400';
      case 'promotion': return 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400';
      case 'review': return 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400';
      default: return 'bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400';
    }
  };

  return (
    <div className="relative">
      {/* Bell Icon */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-3 rounded-full bg-white/80 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all"
      >
        <Bell className="w-5 h-5 text-stone-700 dark:text-stone-300" />
        {unreadCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-red-500 to-red-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-lg"
          >
            {unreadCount}
          </motion.span>
        )}
      </motion.button>

      {/* Notification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-96 bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 z-50 overflow-hidden"
            >
              {/* Header */}
              <div className="px-4 py-3 border-b border-stone-200 dark:border-stone-700 flex items-center justify-between">
                <h3 className="font-bold text-stone-900 dark:text-stone-100">Notifications</h3>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllAsRead}
                    className="text-xs font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
                  >
                    Mark all as read
                  </button>
                )}
              </div>

              {/* Notifications List */}
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="px-4 py-12 text-center">
                    <Bell className="w-12 h-12 mx-auto text-stone-300 dark:text-stone-600 mb-3" />
                    <p className="text-stone-500 dark:text-stone-400 text-sm">No notifications yet</p>
                  </div>
                ) : (
                  <div className="divide-y divide-stone-100 dark:divide-stone-700">
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className={`px-4 py-3 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors ${
                          !notification.read ? 'bg-amber-50/50 dark:bg-amber-900/10' : ''
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${getNotificationColor(notification.type)}`}>
                            {notification.icon}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex-1">
                                <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-1">
                                  {notification.title}
                                </p>
                                <p className="text-xs text-stone-600 dark:text-stone-400 mb-1 line-clamp-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-stone-400 dark:text-stone-500">
                                  {notification.time}
                                </p>
                              </div>
                              <div className="flex items-center gap-1">
                                {!notification.read && (
                                  <button
                                    onClick={() => markAsRead(notification.id)}
                                    className="p-1 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-full transition-colors"
                                    title="Mark as read"
                                  >
                                    <Check className="w-3 h-3 text-stone-500 dark:text-stone-400" />
                                  </button>
                                )}
                                <button
                                  onClick={() => deleteNotification(notification.id)}
                                  className="p-1 hover:bg-stone-200 dark:hover:bg-stone-600 rounded-full transition-colors"
                                  title="Delete"
                                >
                                  <X className="w-3 h-3 text-stone-500 dark:text-stone-400" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {notifications.length > 0 && (
                <div className="px-4 py-3 border-t border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-700/50">
                  <button className="w-full text-center text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors">
                    View all notifications
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
