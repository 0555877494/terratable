import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, X, ShoppingBag, Heart, MessageCircle, 
  ArrowUp, Keyboard, Sparkles, Headphones
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface UnifiedFABProps {
  onBackToTop?: () => void;
  onKeyboardShortcuts?: () => void;
  onWhatsNew?: () => void;
  onLiveChat?: () => void;
  showBackToTop?: boolean;
}

export default function UnifiedFAB({ 
  onBackToTop, 
  onKeyboardShortcuts, 
  onWhatsNew, 
  onLiveChat,
  showBackToTop = false 
}: UnifiedFABProps) {
  const [isOpen, setIsOpen] = useState(false);

  const actions = [
    {
      icon: <Heart className="w-4 h-4" />,
      label: 'Wishlist',
      href: '/wishlist',
      color: 'bg-rose-500 hover:bg-rose-600',
      type: 'link' as const
    },
    {
      icon: <ShoppingBag className="w-4 h-4" />,
      label: 'Cart',
      href: '/cart',
      color: 'bg-amber-500 hover:bg-amber-600',
      type: 'link' as const
    },
    {
      icon: <Headphones className="w-4 h-4" />,
      label: 'Support',
      href: '/support',
      color: 'bg-emerald-500 hover:bg-emerald-600',
      type: 'link' as const
    },
    {
      icon: <MessageCircle className="w-4 h-4" />,
      label: 'Live Chat',
      color: 'bg-blue-500 hover:bg-blue-600',
      type: 'action' as const,
      action: onLiveChat
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: "What's New",
      color: 'bg-purple-500 hover:bg-purple-600',
      type: 'action' as const,
      action: onWhatsNew
    },
    {
      icon: <Keyboard className="w-4 h-4" />,
      label: 'Shortcuts',
      color: 'bg-stone-600 hover:bg-stone-700 dark:bg-stone-700 dark:hover:bg-stone-600',
      type: 'action' as const,
      action: onKeyboardShortcuts
    },
  ];

  // Add Back to Top only when scrolled
  const allActions = showBackToTop ? [
    {
      icon: <ArrowUp className="w-4 h-4" />,
      label: 'Top',
      color: 'bg-gradient-to-br from-terra-600 to-wine-600 hover:from-terra-700 hover:to-wine-700',
      type: 'action' as const,
      action: onBackToTop
    },
    ...actions
  ] : actions;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-2">
      <AnimatePresence>
        {isOpen && (
          <>
            {allActions.map((action, index) => (
              <motion.div
                key={action.label}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0, y: 20 }}
                transition={{ 
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 260,
                  damping: 20
                }}
                className="flex items-center gap-2"
              >
                {action.type === 'link' ? (
                  <Link to={action.href!} onClick={() => setIsOpen(false)}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 ${action.color} text-white rounded-full shadow-lg flex items-center justify-center`}
                      title={action.label}
                    >
                      {action.icon}
                    </motion.button>
                  </Link>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => {
                      action.action?.();
                      setIsOpen(false);
                    }}
                    className={`w-10 h-10 ${action.color} text-white rounded-full shadow-lg flex items-center justify-center`}
                    title={action.label}
                  >
                    {action.icon}
                  </motion.button>
                )}
                <motion.span
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="px-2 py-1 bg-white dark:bg-stone-800 rounded-md shadow-md text-xs font-semibold text-stone-900 dark:text-stone-100 whitespace-nowrap"
                >
                  {action.label}
                </motion.span>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>

      {/* Main FAB Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 gradient-bg text-white rounded-full shadow-xl flex items-center justify-center"
        animate={{ rotate: isOpen ? 45 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {isOpen ? <X className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
      </motion.button>
    </div>
  );
}
