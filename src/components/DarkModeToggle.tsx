import React from 'react';
import { motion } from 'framer-motion';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export default function DarkModeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative w-14 h-8 rounded-full bg-stone-200 dark:bg-stone-700 transition-colors duration-300"
      aria-label="Toggle dark mode"
    >
      <motion.div
        className="absolute top-1 w-6 h-6 rounded-full bg-white dark:bg-stone-900 shadow-md flex items-center justify-center"
        animate={{
          x: theme === 'dark' ? 28 : 4,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      >
        {theme === 'light' ? (
          <Sun className="w-4 h-4 text-amber-500" />
        ) : (
          <Moon className="w-4 h-4 text-blue-400" />
        )}
      </motion.div>
    </motion.button>
  );
}
