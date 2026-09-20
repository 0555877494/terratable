import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, ShoppingBag, Heart, Gift } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const hasSeenOnboarding = localStorage.getItem('terra_onboarding_seen');
    if (!hasSeenOnboarding) {
      setTimeout(() => setIsOpen(true), 1000);
    }
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    localStorage.setItem('terra_onboarding_seen', 'true');
  };

  const steps = [
    {
      icon: <Sparkles className="w-12 h-12" />,
      title: 'Welcome to Terra & Table!',
      description: 'Discover the world\'s finest artisan foods, curated with care and delivered to your door.',
      color: 'from-amber-500 to-orange-500'
    },
    {
      icon: <ShoppingBag className="w-12 h-12" />,
      title: 'Shop with Confidence',
      description: 'Browse our curated collection, read reviews, and add items to your cart. Use the search and filters to find exactly what you\'re looking for.',
      color: 'from-emerald-500 to-teal-500'
    },
    {
      icon: <Heart className="w-12 h-12" />,
      title: 'Save Your Favorites',
      description: 'Build your wishlist to save products you love. Get notified when prices drop and share with friends.',
      color: 'from-rose-500 to-pink-500'
    },
    {
      icon: <Gift className="w-12 h-12" />,
      title: 'Earn Rewards',
      description: 'Join our loyalty program to earn points on every purchase. Unlock exclusive benefits and discounts.',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md"
          onClick={handleClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-stone-800 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden"
          >
            {/* Progress Bar */}
            <div className="h-1 bg-stone-200 dark:bg-stone-700">
              <motion.div
                className="h-full gradient-bg"
                initial={{ width: 0 }}
                animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>

            {/* Content */}
            <div className="p-8 text-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', delay: 0.2 }}
                    className={`w-24 h-24 mx-auto mb-6 bg-gradient-to-br ${steps[currentStep].color} rounded-full flex items-center justify-center text-white shadow-xl`}
                  >
                    {steps[currentStep].icon}
                  </motion.div>

                  {/* Title */}
                  <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                    {steps[currentStep].title}
                  </h2>

                  {/* Description */}
                  <p className="text-stone-600 dark:text-stone-400 text-lg leading-relaxed mb-8">
                    {steps[currentStep].description}
                  </p>
                </motion.div>
              </AnimatePresence>

              {/* Navigation */}
              <div className="flex items-center justify-between">
                <button
                  onClick={handleClose}
                  className="text-sm text-stone-500 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 transition-colors"
                >
                  Skip
                </button>

                <div className="flex gap-2">
                  {steps.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all ${
                        index === currentStep
                          ? 'gradient-bg w-8'
                          : 'bg-stone-300 dark:bg-stone-600'
                      }`}
                    />
                  ))}
                </div>

                {currentStep < steps.length - 1 ? (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setCurrentStep(currentStep + 1)}
                    className="px-6 py-2 gradient-bg text-white rounded-xl font-semibold shadow-lg flex items-center gap-2"
                  >
                    Next
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className="px-6 py-2 gradient-bg text-white rounded-xl font-semibold shadow-lg"
                  >
                    Get Started
                  </motion.button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
