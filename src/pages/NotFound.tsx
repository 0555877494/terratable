import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-8xl mb-6"
        >
          🍽️
        </motion.div>
        <h1 className="font-serif text-6xl font-bold text-terra-800 mb-4">404</h1>
        <h2 className="font-serif text-2xl text-terra-700 mb-3">Page Not Found</h2>
        <p className="text-terra-500 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-full font-semibold shadow-lg shadow-terra-500/20 hover:shadow-xl transition-all"
          >
            <Home className="w-4 h-4" /> Go Home
          </Link>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-terra-200 text-terra-700 rounded-full font-semibold hover:bg-terra-50 transition-colors"
          >
            <Search className="w-4 h-4" /> Browse Products
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
