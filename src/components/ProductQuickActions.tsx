import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Share2, Eye, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

interface ProductQuickActionsProps {
  product: Product;
  onQuickView: () => void;
}

export default function ProductQuickActions({ product, onQuickView }: ProductQuickActionsProps) {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const { showToast } = useToast();

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast('info', 'Removed from wishlist');
    } else {
      addToWishlist(product.id);
      showToast('success', 'Added to wishlist!');
    }
  };

  const handleShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const shareData = {
      title: product.name,
      text: `Check out ${product.name} on Terra & Table!`,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
        showToast('success', 'Shared successfully!');
      } else {
        navigator.clipboard.writeText(window.location.href);
        showToast('success', 'Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  };

  const actions = [
    {
      icon: <Heart className="w-5 h-5" />,
      label: 'Wishlist',
      onClick: handleWishlist,
      active: inWishlist,
      activeColor: 'fill-rose-500 text-rose-500',
      inactiveColor: 'text-stone-600 dark:text-stone-400'
    },
    {
      icon: <Eye className="w-5 h-5" />,
      label: 'Quick View',
      onClick: onQuickView,
      active: false,
      activeColor: '',
      inactiveColor: 'text-stone-600 dark:text-stone-400'
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      label: 'Share',
      onClick: handleShare,
      active: false,
      activeColor: '',
      inactiveColor: 'text-stone-600 dark:text-stone-400'
    },
    {
      icon: <ShoppingBag className="w-5 h-5" />,
      label: 'Add to Cart',
      onClick: handleAddToCart,
      active: false,
      activeColor: '',
      inactiveColor: 'text-stone-600 dark:text-stone-400'
    }
  ];

  return (
    <div className="flex gap-2">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.05 }}
          whileHover={{ scale: 1.1, y: -2 }}
          whileTap={{ scale: 0.9 }}
          onClick={action.onClick}
          title={action.label}
          className={`w-10 h-10 rounded-full flex items-center justify-center transition-all shadow-md hover:shadow-lg ${
            action.active
              ? `${action.activeColor} bg-white dark:bg-stone-800`
              : `${action.inactiveColor} bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-stone-800`
          }`}
        >
          {action.icon}
        </motion.button>
      ))}
    </div>
  );
}
