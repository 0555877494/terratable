import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, X, ShoppingBag, Heart, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function FloatingActionButton() {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <Heart className="w-5 h-5" />,
      label: 'Wishlist',
      href: '/wishlist',
      color: 'bg-rose-500 hover:bg-rose-600'
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: 'Cart',
      href: '/cart',
      color: 'bg-amber-500 hover:bg-amber-600'
    },
    {
      icon: <MessageCircle className="w-5 h-5" />,
      label: 'Support',
      href: '/support',
      color: 'bg-emerald-500 hover:bg-emerald-600'
    }
  ];

  return (
    <div className="fixed bottom-24 right-6 z-40 flex flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen && (
          <>
            {actions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ 
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }}
                className="flex items-center gap-3"
              >
                <motion.span
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="px-3 py-2 bg-white dark:bg-stone-800 rounded-lg shadow-lg text-sm font-semibold text-stone-900 dark:text-stone-100"
                >
                  {action.label}
                </motion.span>
                <Link to={action.href}>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className={`w-12 h-12 ${action.color} text-white rounded-full shadow-xl flex items-center justify-center`}
                  >
                    {action.icon}
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 gradient-bg text-white rounded-full shadow-2xl flex items-center justify-center"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <X className="w-6 h-6" /> : <Plus className="w-6 h-6" />}
      </motion.button>
    </div>
  );
}
