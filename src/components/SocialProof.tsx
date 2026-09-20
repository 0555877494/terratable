import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Eye, Users, ShoppingBag } from 'lucide-react';

interface SocialProofProps {
  productId: string;
}

export default function SocialProof({ productId }: SocialProofProps) {
  const [viewers, setViewers] = useState(0);
  const [recentPurchases, setRecentPurchases] = useState(0);
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  useEffect(() => {
    // Simulate random viewers
    const viewerInterval = setInterval(() => {
      setViewers(Math.floor(Math.random() * 15) + 5);
    }, 3000);

    // Simulate recent purchases
    const purchaseInterval = setInterval(() => {
      setRecentPurchases(prev => prev + Math.floor(Math.random() * 2));
    }, 10000);

    // Show social proof notifications
    const names = ['Sarah from NYC', 'Michael from LA', 'Emma from London', 'James from Tokyo', 'Lisa from Paris'];
    const actions = ['just purchased', 'is viewing', 'added to cart'];
    
    const notificationInterval = setInterval(() => {
      const name = names[Math.floor(Math.random() * names.length)];
      const action = actions[Math.floor(Math.random() * actions.length)];
      setNotificationMessage(`${name} ${action} this item`);
      setShowNotification(true);
      
      setTimeout(() => setShowNotification(false), 4000);
    }, 15000);

    return () => {
      clearInterval(viewerInterval);
      clearInterval(purchaseInterval);
      clearInterval(notificationInterval);
    };
  }, [productId]);

  return (
    <>
      {/* Viewers Count */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex items-center gap-4 text-sm"
      >
        <div className="flex items-center gap-2 px-3 py-2 bg-amber-50 dark:bg-amber-900/20 rounded-full">
          <Eye className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          <span className="font-semibold text-amber-700 dark:text-amber-300">
            {viewers} viewing
          </span>
        </div>
        
        {recentPurchases > 0 && (
          <div className="flex items-center gap-2 px-3 py-2 bg-emerald-50 dark:bg-emerald-900/20 rounded-full">
            <ShoppingBag className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            <span className="font-semibold text-emerald-700 dark:text-emerald-300">
              {recentPurchases} bought today
            </span>
          </div>
        )}
      </motion.div>

      {/* Social Proof Notification */}
      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, x: -100, y: 50 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            exit={{ opacity: 0, x: -100, y: 50 }}
            className="fixed bottom-24 left-6 z-40 max-w-sm"
          >
            <div className="bg-white dark:bg-stone-800 rounded-xl shadow-2xl border-2 border-stone-200 dark:border-stone-700 p-4 flex items-center gap-3">
              <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                <Users className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                  {notificationMessage}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400 mt-0.5">
                  Just now
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
