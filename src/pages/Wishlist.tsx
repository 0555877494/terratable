import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2 } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import WishlistSharing from '../components/WishlistSharing';
import ProductComparisonTool from '../components/ProductComparisonTool';

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

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-terra-800 flex items-center gap-3">
          <Heart className="w-8 h-8 text-wine-500 fill-wine-500" />
          My Wishlist
        </h1>
        <p className="text-terra-500 mt-2">{wishlistProducts.length} saved items</p>
      </motion.div>

      {/* Wishlist Sharing & Comparison */}
      {wishlistProducts.length >= 2 && (
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          <WishlistSharing />
          <ProductComparisonTool />
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {wishlistProducts.map((product, index) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-2xl border border-terra-100/50 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3]">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
              <button
                onClick={() => handleRemove(product.id, product.name)}
                className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors shadow-sm"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>
            <div className="p-5">
              <h3 className="font-serif font-semibold text-terra-900 text-lg mb-2">{product.name}</h3>
              <p className="text-sm text-terra-500 mb-3">{product.origin}</p>
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold bg-gradient-to-r from-terra-700 to-wine-700 bg-clip-text text-transparent">
                  ${product.price.toFixed(2)}
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAddToCart(product)}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-terra-600 to-terra-700 text-white rounded-full text-sm font-semibold shadow-lg shadow-terra-500/20 hover:shadow-xl transition-all"
                >
                  <ShoppingBag className="w-4 h-4" /> Add to Cart
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
