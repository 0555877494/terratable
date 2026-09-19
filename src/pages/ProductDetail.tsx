import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingBag, Heart, Share2, Minus, Plus, Truck, Shield, RotateCcw, Check } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import ProductImageGallery from '../components/ProductImageGallery';
import ProductQuickStats from '../components/ProductQuickStats';
import ProductVariants from '../components/ProductVariants';
import StockCountdown from '../components/StockCountdown';
import SocialProof from '../components/SocialProof';
import SustainabilityBadges from '../components/SustainabilityBadges';
import ProductReviews from '../components/ProductReviews';
import ProductQA from '../components/ProductQA';
import PriceHistory from '../components/PriceHistory';
import ProductRecommendations from '../components/ProductRecommendations';
import ProductAvailabilityChecker from '../components/ProductAvailabilityChecker';
import Breadcrumbs from '../components/Breadcrumbs';
import BackToTop from '../components/BackToTop';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { products, addToCart, addToWishlist, removeFromWishlist, isInWishlist, addToRecentlyViewed } = useStore();
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState('');

  const product = products.find(p => p.id === id);

  useEffect(() => {
    if (product) {
      addToRecentlyViewed(product.id);
    }
  }, [product]);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Product Not Found
          </h1>
          <p className="text-stone-600 dark:text-stone-400 mb-6">
            The product you're looking for doesn't exist.
          </p>
          <Link
            to="/"
            className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const inWishlist = isInWishlist(product.id);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product);
    }
    showToast('success', `Added ${quantity} × ${product.name} to cart!`);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(product.id);
      showToast('info', 'Removed from wishlist');
    } else {
      addToWishlist(product.id);
      showToast('success', 'Added to wishlist!');
    }
  };

  // Mock variants for demo
  const variants = [
    { id: 'small', name: 'Small', price: product.price, stock: 10 },
    { id: 'medium', name: 'Medium', price: product.price * 1.2, stock: 15 },
    { id: 'large', name: 'Large', price: product.price * 1.5, stock: 8 },
  ];

  // Mock images for gallery
  const productImages = [
    product.image,
    product.image,
    product.image,
    product.image
  ];

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <Breadcrumbs />
      <BackToTop />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-semibold">Back</span>
        </motion.button>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column - Images */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProductImageGallery 
              images={productImages} 
              productName={product.name} 
            />
          </motion.div>

          {/* Right Column - Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="flex flex-col"
          >
            {/* Origin & Category */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-sm font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider">
                {product.origin}
              </span>
              <span className="text-stone-300 dark:text-stone-600">•</span>
              <span className="text-sm font-semibold text-stone-600 dark:text-stone-400">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.floor(product.rating)
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-stone-200 dark:fill-stone-700 text-stone-200 dark:text-stone-700'
                    }`}
                  />
                ))}
              </div>
              <span className="text-lg font-bold text-stone-800 dark:text-stone-200">
                {product.rating}
              </span>
              <span className="text-stone-400">
                ({product.reviews} reviews)
              </span>
            </div>

            {/* Social Proof */}
            <div className="mb-6">
              <SocialProof productId={product.id} />
            </div>

            {/* Description */}
            <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Sustainability Badges */}
            {product.badge && (
              <div className="mb-6">
                <SustainabilityBadges 
                  badges={['organic', 'fair-trade', 'eco-friendly']} 
                  size="md" 
                />
              </div>
            )}

            {/* Quick Stats */}
            <div className="mb-6">
              <ProductQuickStats product={product} />
            </div>

            {/* Stock Countdown */}
            {product.stock && product.stock <= 10 && (
              <div className="mb-6">
                <StockCountdown 
                  initialStock={product.stock} 
                  productName={product.name} 
                />
              </div>
            )}

            {/* Product Variants */}
            <div className="mb-6">
              <ProductVariants
                variants={variants}
                selectedVariant={selectedVariant}
                onSelectVariant={setSelectedVariant}
                variantType="size"
              />
            </div>

            {/* Price */}
            <div className="mb-6">
              <div className="flex items-baseline gap-3 mb-2">
                <span className="text-5xl font-bold gradient-text">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-2xl text-stone-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>
              {product.originalPrice && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
                  You save ${(product.originalPrice - product.price).toFixed(2)} ({product.discount}% off)
                </p>
              )}
            </div>

            {/* Quantity Selector */}
            <div className="mb-6">
              <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                Quantity
              </label>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 bg-stone-100 dark:bg-stone-700 rounded-full px-4 py-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                  >
                    <Minus className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                  </button>
                  <span className="w-12 text-center font-bold text-stone-900 dark:text-stone-100 text-lg">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                  >
                    <Plus className="w-4 h-4 text-stone-700 dark:text-stone-300" />
                  </button>
                </div>
                <span className="text-sm text-stone-500 dark:text-stone-400">
                  Total: <span className="font-bold text-stone-900 dark:text-stone-100">
                    ${(product.price * quantity).toFixed(2)}
                  </span>
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 mb-8">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleAddToCart}
                className="flex-1 py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl transition-all flex items-center justify-center gap-3"
              >
                <ShoppingBag className="w-6 h-6" />
                Add to Cart
              </motion.button>
              
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleWishlist}
                className={`p-4 border-2 rounded-xl transition-all ${
                  inWishlist
                    ? 'border-rose-500 bg-rose-50 dark:bg-rose-900/20'
                    : 'border-stone-200 dark:border-stone-700 hover:bg-stone-50 dark:hover:bg-stone-700'
                }`}
              >
                <Heart className={`w-6 h-6 ${inWishlist ? 'fill-rose-500 text-rose-500' : 'text-stone-500'}`} />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="p-4 border-2 border-stone-200 dark:border-stone-700 rounded-xl hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              >
                <Share2 className="w-6 h-6 text-stone-500" />
              </motion.button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                <Truck className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">Free Shipping</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">On orders over $50</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">Secure Checkout</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">100% protected</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                <RotateCcw className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">Easy Returns</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">30-day policy</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                <Check className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">Quality Guaranteed</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Premium products</p>
                </div>
              </div>
            </div>

            {/* Product Details */}
            <div className="pt-6 border-t border-stone-200 dark:border-stone-700">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                Product Details
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-stone-500 dark:text-stone-400 mb-1">Origin</p>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">{product.origin}</p>
                </div>
                <div>
                  <p className="text-stone-500 dark:text-stone-400 mb-1">Weight</p>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">{product.weight}</p>
                </div>
                <div>
                  <p className="text-stone-500 dark:text-stone-400 mb-1">Category</p>
                  <p className="font-semibold text-stone-900 dark:text-stone-100">{product.category}</p>
                </div>
                <div>
                  <p className="text-stone-500 dark:text-stone-400 mb-1">Availability</p>
                  <p className="font-semibold text-emerald-600 dark:text-emerald-400">
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Additional Sections */}
        <div className="space-y-12">
          {/* Price History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <PriceHistory productId={product.id} currentPrice={product.price} />
          </motion.div>

          {/* Availability Checker */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ProductAvailabilityChecker 
              productId={product.id} 
              productName={product.name} 
            />
          </motion.div>

          {/* Reviews */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ProductReviews 
              productId={product.id} 
              productName={product.name} 
            />
          </motion.div>

          {/* Q&A */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ProductQA 
              productId={product.id} 
              productName={product.name} 
            />
          </motion.div>

          {/* Recommendations */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <ProductRecommendations 
              currentProductId={product.id}
              category={product.category}
              limit={4}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
