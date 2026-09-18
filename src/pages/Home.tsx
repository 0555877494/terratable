import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowDown, Leaf, Award, Truck, Heart } from 'lucide-react';
import { Product } from '../types';
import { categories } from '../data/products';
import { useStore } from '../contexts/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';

export default function Home() {
  const { products } = useStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.origin.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, activeCategory]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background layers */}
        <div className="absolute inset-0 bg-gradient-to-br from-cream-50 via-terra-50 to-sage-50" />
        <div className="absolute inset-0">
          <div className="absolute top-20 -left-20 w-[500px] h-[500px] bg-terra-200/30 rounded-full blur-[100px] animate-pulse-soft" />
          <div className="absolute bottom-20 -right-20 w-[600px] h-[600px] bg-sage-200/30 rounded-full blur-[100px] animate-pulse-soft" style={{ animationDelay: '1.5s' }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gold-200/20 rounded-full blur-[80px]" />
        </div>

        {/* Floating food elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[15%] right-[10%] w-20 h-20 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shadow-2xl shadow-terra-300/30 rotate-12"
          >
            <img src="https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            animate={{ y: [10, -15, 10], rotate: [0, -3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[20%] left-[8%] w-16 h-16 sm:w-24 sm:h-24 rounded-2xl overflow-hidden shadow-2xl shadow-sage-300/30 -rotate-12"
          >
            <img src="https://images.unsplash.com/photo-1515823064-d6e0c0461669?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
          </motion.div>
          <motion.div
            animate={{ y: [-8, 12, -8], rotate: [0, 4, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[60%] right-[5%] w-14 h-14 sm:w-20 sm:h-20 rounded-2xl overflow-hidden shadow-2xl shadow-wine-200/30 rotate-6"
          >
            <img src="https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&h=200&fit=crop" alt="" className="w-full h-full object-cover" />
          </motion.div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
          <div className="max-w-3xl">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.span
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 backdrop-blur-md border border-terra-100 rounded-full text-sm font-medium text-terra-700 mb-8 shadow-sm"
              >
                <span className="w-2 h-2 bg-sage-400 rounded-full animate-pulse" />
                Artisan Foods • Delivered Fresh
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.9] mb-6"
            >
              <span className="text-terra-900">Savor the</span>
              <br />
              <span className="bg-gradient-to-r from-terra-600 via-wine-600 to-terra-700 bg-clip-text text-transparent">
                Extraordinary
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg sm:text-xl text-terra-600 max-w-lg mb-10 leading-relaxed"
            >
              Handpicked delicacies from the world's finest producers. 
              Every bite tells a story of tradition, passion, and uncompromising quality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#products"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-terra-600 via-terra-700 to-wine-700 text-white rounded-full font-semibold text-lg shadow-xl shadow-terra-500/25 hover:shadow-2xl hover:shadow-terra-500/40 transition-all hover:-translate-y-1"
              >
                Explore Collection
                <ArrowDown className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-terra-200 text-terra-700 rounded-full font-semibold text-lg hover:bg-white hover:border-terra-300 hover:shadow-lg transition-all"
              >
                View Menu
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap items-center gap-6 mt-12 pt-8 border-t border-terra-100/50"
            >
              {[
                { icon: <Leaf className="w-4 h-4" />, text: '100% Organic' },
                { icon: <Award className="w-4 h-4" />, text: 'Award Winning' },
                { icon: <Truck className="w-4 h-4" />, text: 'Free Delivery' },
                { icon: <Heart className="w-4 h-4" />, text: '50k+ Happy Customers' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-terra-600">
                  <span className="text-terra-500">{badge.icon}</span>
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="relative -mt-8 z-10">
        <div className="max-w-5xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl border border-white/50 shadow-2xl shadow-terra-200/20 p-6 sm:p-8"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
              {[
                { icon: '🌿', title: 'Farm Fresh', desc: 'Sourced directly from artisan producers worldwide' },
                { icon: '✨', title: 'Premium Quality', desc: 'Every item hand-selected by our experts' },
                { icon: '🚀', title: 'Express Delivery', desc: 'Fresh to your door in 24-48 hours' },
                { icon: '💝', title: 'Gift Ready', desc: 'Beautiful packaging for every occasion' },
              ].map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-center group"
                >
                  <div className="text-3xl sm:text-4xl mb-3 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-semibold text-terra-800 text-sm sm:text-base mb-1">{feature.title}</h3>
                  <p className="text-xs sm:text-sm text-terra-500 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 bg-terra-100 text-terra-700 rounded-full text-sm font-medium mb-4">
            Our Collection
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-terra-900 mb-4">
            Curated with <span className="text-terra-600">Care</span>
          </h2>
          <p className="text-terra-500 text-lg max-w-md mx-auto">
            Each product tells a unique story of heritage, craftsmanship, and exceptional taste.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl shadow-terra-100/50 border border-terra-100/50 p-4 sm:p-6 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-terra-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, origin, or description..."
                className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none transition-all bg-cream-50/50 text-terra-800 placeholder:text-terra-400"
              />
            </div>
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              <SlidersHorizontal className="w-4 h-4 text-terra-400 flex-shrink-0 hidden sm:block" />
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-gradient-to-r from-terra-600 to-terra-700 text-white shadow-lg shadow-terra-500/20'
                      : 'bg-terra-50 text-terra-600 hover:bg-terra-100'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="flex items-center justify-between mb-8">
          <h3 className="font-serif text-xl font-semibold text-terra-800">
            {activeCategory === 'All' ? 'All Delicacies' : activeCategory}
          </h3>
          <span className="text-sm text-terra-500 bg-terra-50 px-3 py-1 rounded-full">
            {filteredProducts.length} items
          </span>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-terra-500 text-lg mb-4">No products found matching your search.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="px-6 py-3 bg-terra-100 text-terra-700 rounded-full font-medium hover:bg-terra-200 transition-colors"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Testimonial / CTA Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-terra-900 via-terra-800 to-wine-900">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-terra-600/20 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-wine-600/20 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-5xl mb-6">🍯</div>
            <blockquote className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white/90 leading-relaxed mb-8 italic">
              "Every product from Terra & Table has transformed my kitchen into a world of flavors I never knew existed."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-terra-400 to-wine-500 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">SC</span>
              </div>
              <div className="text-left">
                <p className="text-white font-medium">Sarah Chen</p>
                <p className="text-terra-300 text-sm">Food Blogger • San Francisco</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden bg-gradient-to-r from-cream-100 via-terra-50 to-sage-50 rounded-3xl p-8 sm:p-12 border border-terra-100"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-terra-200/30 rounded-full blur-[80px]" />
          <div className="relative text-center max-w-lg mx-auto">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-terra-900 mb-3">
              Join the Club
            </h2>
            <p className="text-terra-600 mb-8">
              Get early access to new arrivals, seasonal specials, and exclusive member-only offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3.5 rounded-xl bg-white border border-terra-200 focus:border-terra-400 focus:ring-4 focus:ring-terra-50 outline-none text-terra-800 placeholder:text-terra-400"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-terra-500/25 transition-all"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-xs text-terra-400 mt-3">No spam, unsubscribe anytime. Join 10,000+ food lovers.</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-terra-950 text-terra-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 bg-gradient-to-br from-terra-500 to-wine-600 rounded-xl flex items-center justify-center">
                  <span className="text-white font-bold">T</span>
                </div>
                <span className="font-serif text-xl font-bold text-white">Terra & Table</span>
              </div>
              <p className="text-terra-400 text-sm max-w-sm leading-relaxed mb-6">
                Curating the world's finest specialty foods since 2020. Every product tells a story of tradition, quality, and passion for exceptional taste.
              </p>
              <div className="flex gap-3">
                {['Instagram', 'Twitter', 'Pinterest'].map(social => (
                  <span key={social} className="px-3 py-1.5 bg-terra-900 rounded-full text-xs text-terra-400 hover:text-white hover:bg-terra-800 cursor-pointer transition-colors">
                    {social}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Explore</h4>
              <div className="space-y-3 text-sm text-terra-400">
                <p className="hover:text-white cursor-pointer transition-colors">All Products</p>
                <p className="hover:text-white cursor-pointer transition-colors">New Arrivals</p>
                <p className="hover:text-white cursor-pointer transition-colors">Gift Sets</p>
                <p className="hover:text-white cursor-pointer transition-colors">Our Story</p>
                <p className="hover:text-white cursor-pointer transition-colors">Blog</p>
              </div>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <div className="space-y-3 text-sm text-terra-400">
                <p className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</p>
                <p className="hover:text-white cursor-pointer transition-colors">Contact Us</p>
                <p className="hover:text-white cursor-pointer transition-colors">FAQ</p>
                <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
              </div>
            </div>
          </div>
          <div className="border-t border-terra-800 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-terra-500">
            <p>© 2024 Terra & Table. Crafted with love.</p>
            <p>hello@terraandtable.com • +1 (555) 123-4567</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
