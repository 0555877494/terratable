import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Truck, Gift } from 'lucide-react';

export default function AnnouncementBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentMessage, setCurrentMessage] = useState(0);

  const messages = [
    { icon: <Sparkles className="w-4 h-4" />, text: 'Flash Sale: 20% off all Pantry items! Use code: GOLD20', highlight: 'GOLD20' },
    { icon: <Truck className="w-4 h-4" />, text: 'Free shipping on orders over $50', highlight: '$50' },
    { icon: <Gift className="w-4 h-4" />, text: 'New customer? Get 10% off with code: WELCOME10', highlight: 'WELCOME10' },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage(prev => (prev + 1) % messages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        exit={{ y: -100 }}
        className="gradient-bg text-white py-1.5 px-4 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-3 text-sm font-semibold">
          {messages[currentMessage].icon}
          <span>{messages[currentMessage].text}</span>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-white/20 rounded-full transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </motion.div>
    </AnimatePresence>
  );
}
