import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Share2, Copy, Check, Facebook, Twitter, Mail, Link } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function WishlistSharing() {
  const { wishlist, products } = useStore();
  const { showToast } = useToast();
  const [copied, setCopied] = useState(false);

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));
  const wishlistUrl = `${window.location.origin}/wishlist/shared/${btoa(JSON.stringify(wishlist))}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(wishlistUrl);
    setCopied(true);
    showToast('success', 'Wishlist link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(wishlistUrl)}`;
    window.open(url, '_blank');
  };

  const shareToTwitter = () => {
    const text = `Check out my wishlist on Terra & Table! ${wishlistProducts.length} amazing products`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(wishlistUrl)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = 'Check out my wishlist on Terra & Table!';
    const body = `Hi!\n\nI thought you might like these products from my wishlist:\n\n${wishlistProducts.map(p => `- ${p.name} ($${p.price.toFixed(2)})`).join('\n')}\n\nView my full wishlist: ${wishlistUrl}\n\nBest regards!`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = url;
  };

  if (wishlistProducts.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
          <Share2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Share Your Wishlist
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {wishlistProducts.length} items in your wishlist
          </p>
        </div>
      </div>

      {/* Share Link */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
          Wishlist Link
        </label>
        <div className="flex gap-2">
          <div className="flex-1 px-4 py-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl border-2 border-stone-200 dark:border-stone-600 text-sm text-stone-600 dark:text-stone-400 truncate">
            {wishlistUrl}
          </div>
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

      {/* Wishlist Preview */}
      <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-700">
        <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
          Wishlist Preview
        </h4>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {wishlistProducts.slice(0, 5).map(product => (
            <div
              key={product.id}
              className="flex items-center gap-3 p-2 bg-stone-50 dark:bg-stone-700/50 rounded-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                  {product.name}
                </p>
                <p className="text-xs text-stone-500 dark:text-stone-400">
                  ${product.price.toFixed(2)}
                </p>
              </div>
            </div>
          ))}
          {wishlistProducts.length > 5 && (
            <p className="text-sm text-stone-500 dark:text-stone-400 text-center py-2">
              +{wishlistProducts.length - 5} more items
            </p>
          )}
        </div>
      </div>

      {/* Privacy Note */}
      <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-800 rounded-xl">
        <p className="text-xs text-amber-700 dark:text-amber-300">
          🔒 Your wishlist is shared publicly via the link. Anyone with the link can view your wishlist.
        </p>
      </div>
    </div>
  );
}
