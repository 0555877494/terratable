import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, Sparkles } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import WishlistSharing from '../components/WishlistSharing';
import ProductComparisonTool from '../components/ProductComparisonTool';
import ProductCardEnhanced from '../components/ProductCardEnhanced';
import PriceDropAlerts from '../components/PriceDropAlerts';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Wishlist() {
  const { wishlist, products, removeFromWishlist, addToCart } = useStore();
  const { showToast } = useToast();

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart!`);
  };

  const handleRemove = (productId: string, productName: string) => {
    removeFromWishlist(productId);
    showToast('info', `${productName} removed from wishlist`);
  };

  if (wishlistProducts.length === 0) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            💝
          </motion.div>
          <h2 className="font-serif text-3xl text-terra-800 mb-3">Your wishlist is empty</h2>
          <p className="text-terra-500 mb-8 max-w-sm mx-auto">Save your favorite products to buy them later</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-full font-semibold shadow-xl shadow-terra-500/20 hover:shadow-2xl transition-all hover:-translate-y-0.5">
            <ShoppingBag className="w-4 h-4" /> Start Shopping
          </Link>
        </motion.div>
      </div>
    );
  }

  const handleAddAllToCart = () => {
    wishlistProducts.forEach(product => {
      addToCart(product);
    });
    showToast('success', `Added ${wishlistProducts.length} items to cart!`);
  };

  const totalWishlistValue = wishlistProducts.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <Breadcrumbs />
      <PriceDropAlerts />
      
      <div className="max-w-7xl mx-auto px-4 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-4">
            <div>
              <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-3">
                <Heart className="w-10 h-10 text-rose-500 fill-rose-500" />
                My Wishlist
              </h1>
              <p className="text-stone-600 dark:text-stone-400 mt-2">
                {wishlistProducts.length} saved items • Total value: <span className="font-bold gradient-text">${totalWishlistValue.toFixed(2)}</span>
              </p>
            </div>
            {wishlistProducts.length > 1 && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleAddAllToCart}
                className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all flex items-center gap-2"
              >
                <ShoppingBag className="w-5 h-5" />
                Add All to Cart
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Wishlist Sharing & Comparison */}
        {wishlistProducts.length >= 2 && (
          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <WishlistSharing />
            <ProductComparisonTool />
          </div>
        )}

        {/* Price Drop Alerts */}
        {wishlistProducts.length > 0 && (
          <div className="mb-8">
            <PriceDropAlerts />
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistProducts.map((product, index) => (
            <ProductCardEnhanced
              key={product.id}
              product={product}
              onViewDetails={() => {}}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
