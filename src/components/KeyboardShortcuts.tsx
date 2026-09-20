import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Keyboard } from 'lucide-react';

export default function KeyboardShortcuts() {
  const [isOpen, setIsOpen] = useState(false);

  const shortcuts = [
    { keys: ['?'], description: 'Show keyboard shortcuts' },
    { keys: ['/'], description: 'Focus search bar' },
    { keys: ['Esc'], description: 'Close modals/menus' },
    { keys: ['C'], description: 'Go to cart' },
    { keys: ['H'], description: 'Go to home' },
    { keys: ['W'], description: 'Go to wishlist' },
    { keys: ['D'], description: 'Toggle dark mode' },
    { keys: ['↑'], description: 'Previous product' },
    { keys: ['↓'], description: 'Next product' },
    { keys: ['Enter'], description: 'View selected product' },
  ];

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === '?' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  return (
    <>
      {/* Help Button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 left-6 z-40 w-10 h-10 bg-stone-800 dark:bg-stone-700 text-white rounded-full shadow-lg flex items-center justify-center hover:bg-stone-900 dark:hover:bg-stone-600 transition-colors print:hidden"
        title="Keyboard shortcuts (?)"
      >
        <Keyboard className="w-4 h-4" />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white dark:bg-stone-800 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="sticky top-0 bg-white dark:bg-stone-800 border-b-2 border-stone-200 dark:border-stone-700 p-6 flex items-center justify-between z-10">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                    <Keyboard className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                      Keyboard Shortcuts
                    </h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Navigate faster with keyboard
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-stone-600 dark:text-stone-400" />
                </button>
              </div>

              {/* Shortcuts List */}
              <div className="p-6 space-y-3">
                {shortcuts.map((shortcut, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
                  >
                    <span className="text-stone-700 dark:text-stone-300 font-medium">
                      {shortcut.description}
                    </span>
                    <div className="flex gap-2">
                      {shortcut.keys.map((key, keyIndex) => (
                        <kbd
                          key={keyIndex}
                          className="px-3 py-1.5 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-600 rounded-lg text-sm font-mono font-bold text-stone-900 dark:text-stone-100 shadow-sm"
                        >
                          {key}
                        </kbd>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Footer */}
              <div className="p-6 border-t-2 border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50">
                <p className="text-sm text-stone-600 dark:text-stone-400 text-center">
                  Press <kbd className="px-2 py-1 bg-white dark:bg-stone-800 border border-stone-200 dark:border-stone-600 rounded text-xs font-mono font-bold">?</kbd> anytime to show this help
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
