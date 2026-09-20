import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Share2, Smartphone } from 'lucide-react';

export default function PWAInstallPrompt() {
  const [isVisible, setIsVisible] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true);
      return;
    }

    // Listen for beforeinstallprompt event
    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      // Show prompt after 30 seconds or on second visit
      const hasVisited = localStorage.getItem('terra_pwa_visited');
      if (!hasVisited) {
        localStorage.setItem('terra_pwa_visited', 'true');
      } else {
        setTimeout(() => setIsVisible(true), 30000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    // Check if dismissed
    const dismissed = localStorage.getItem('terra_pwa_dismissed');
    if (dismissed) {
      const dismissedDate = new Date(dismissed);
      const daysSinceDismissed = (Date.now() - dismissedDate.getTime()) / (1000 * 60 * 60 * 24);
      if (daysSinceDismissed < 7) {
        return;
      }
    }

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;

    if (outcome === 'accepted') {
      setIsInstalled(true);
      setIsVisible(false);
    }

    setDeferredPrompt(null);
  };

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem('terra_pwa_dismissed', new Date().toISOString());
  };

  if (isInstalled || !isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-md w-full mx-4"
      >
        <div className="bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border-2 border-amber-200 dark:border-amber-800 p-6">
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 p-1 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-stone-500" />
          </button>

          <div className="flex items-start gap-4">
            <div className="w-14 h-14 gradient-bg rounded-2xl flex items-center justify-center flex-shrink-0">
              <Smartphone className="w-7 h-7 text-white" />
            </div>

            <div className="flex-1">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                Install Terra & Table
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
                Get the app experience with quick access, offline support, and push notifications
              </p>

              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleInstall}
                  className="flex-1 px-4 py-2.5 gradient-bg text-white rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Install Now
                </motion.button>
                <button
                  onClick={handleDismiss}
                  className="px-4 py-2.5 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-semibold text-sm hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  Later
                </button>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700 grid grid-cols-3 gap-3 text-center">
            <div>
              <div className="w-8 h-8 mx-auto mb-1 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 text-xs">⚡</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">Fast Access</p>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto mb-1 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-xs">📴</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">Offline Mode</p>
            </div>
            <div>
              <div className="w-8 h-8 mx-auto mb-1 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center">
                <span className="text-purple-600 text-xs">🔔</span>
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400">Notifications</p>
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
