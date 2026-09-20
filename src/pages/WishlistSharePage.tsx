import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, Facebook, Twitter, Mail, Heart, X } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { Link } from 'react-router-dom';

export default function WishlistSharePage() {
  const { wishlist, products } = useStore();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));
  const wishlistUrl = `${window.location.origin}/wishlist/shared/${btoa(JSON.stringify(wishlist))}`;
  const totalValue = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(wishlistUrl);
    setCopied(true);
    showToast('success', 'Wishlist link copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(wishlistUrl)}`;
    window.open(url, '_blank');
  };

  const shareToTwitter = () => {
    const text = `Check out my wishlist on Terra & Table! ${wishlistProducts.length} amazing artisan products`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(wishlistUrl)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = 'Check out my wishlist on Terra & Table!';
    const body = `Hi!\n\nI thought you might like these products from my wishlist:\n\n${wishlistProducts.map(p => `- ${p.name} ($${p.price.toFixed(2)})`).join('\n')}\n\nTotal value: $${totalValue.toFixed(2)}\n\nView my full wishlist: ${wishlistUrl}\n\nBest regards!`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <Heart className="w-20 h-20 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            Your Wishlist is Empty
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            Start adding products to share with friends and family
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
          >
            Browse Products
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200 rounded-full text-sm font-semibold mb-4">
          <Share2 className="w-4 h-4" />
          Share Wishlist
        </div>
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          My Wishlist
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          {wishlistProducts.length} items • Total value: <span className="font-bold gradient-text">${totalValue.toFixed(2)}</span>
        </p>
      </motion.div>

      {/* Share Options */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 mb-8"
      >
        <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">Share Your Wishlist</h3>
        
        {/* Share Link */}
        <div className="mb-6">
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
            Wishlist Link
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={wishlistUrl}
              readOnly
              className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400 text-sm"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyLink}
              className={`px-6 py-3 rounded-xl font-semibold shadow-lg flex items-center gap-2 ${
                copied
                  ? 'bg-emerald-500 text-white'
                  : 'gradient-bg text-white'
              }`}
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy
                </>
              )}
            </motion.button>
          </div>
        </div>

        {/* Social Share Buttons */}
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
            Share on Social Media
          </label>
          <div className="grid grid-cols-3 gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareToFacebook}
              className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors"
            >
              <Facebook className="w-5 h-5" />
              Facebook
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareToTwitter}
              className="flex items-center justify-center gap-2 py-3 bg-sky-500 text-white rounded-xl font-semibold shadow-lg hover:bg-sky-600 transition-colors"
            >
              <Twitter className="w-5 h-5" />
              Twitter
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={shareViaEmail}
              className="flex items-center justify-center gap-2 py-3 bg-stone-600 text-white rounded-xl font-semibold shadow-lg hover:bg-stone-700 transition-colors"
            >
              <Mail className="w-5 h-5" />
              Email
            </motion.button>
          </div>
        </div>

        {/* Privacy Note */}
        <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
          <p className="text-xs text-amber-700 dark:text-amber-300">
            🔒 Your wishlist is shared publicly via the link. Anyone with the link can view your wishlist.
          </p>
        </div>
      </motion.div>

      {/* Wishlist Items Preview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
      >
        <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-4">
          Wishlist Items ({wishlistProducts.length})
        </h3>
        <div className="space-y-3">
          {wishlistProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex items-center gap-4 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-stone-900 dark:text-stone-100 truncate">
                  {product.name}
                </p>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  {product.origin}
                </p>
              </div>
              <p className="font-bold gradient-text">
                ${product.price.toFixed(2)}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Total */}
        <div className="mt-4 pt-4 border-t-2 border-stone-200 dark:border-stone-700 flex justify-between items-center">
          <span className="font-bold text-stone-900 dark:text-stone-100">Total Value</span>
          <span className="text-2xl font-bold gradient-text">${totalValue.toFixed(2)}</span>
        </div>
      </motion.div>
    </div>
  );
}
