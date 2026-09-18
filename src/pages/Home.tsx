import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, SlidersHorizontal, ArrowDown, Leaf, Award, Truck, Heart, Star, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { categories } from '../data/products';
import { useStore } from '../contexts/StoreContext';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import RecentlyViewed from '../components/RecentlyViewed';
import Logo from '../components/Logo';

export default function Home() {
  const { products } = useStore();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('default');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const filteredProducts = useMemo(() => {
    let result = products.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.description.toLowerCase().includes(search.toLowerCase()) ||
        p.origin.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });

    switch (sortBy) {
      case 'price-low':
        result = [...result].sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result = [...result].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result = [...result].sort((a, b) => b.rating - a.rating);
        break;
      case 'name':
        result = [...result].sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    return result;
  }, [products, search, activeCategory, sortBy]);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=1920&q=80" 
            alt="Artisan foods" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-stone-950/90 via-stone-900/70 to-stone-950/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-transparent" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-20 right-20 w-32 h-32 rounded-full bg-amber-400/10 blur-3xl"
          />
          <motion.div
            animate={{ y: [10, -15, 10], rotate: [0, -3, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-40 left-20 w-48 h-48 rounded-full bg-rose-400/10 blur-3xl"
          />
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
                className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-semibold text-amber-100 mb-8 shadow-lg"
              >
                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                Premium Artisan Foods
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95] mb-8 text-white"
            >
              Discover the
              <br />
              <span className="gradient-text">Extraordinary</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl sm:text-2xl text-stone-200 max-w-xl mb-12 leading-relaxed font-light"
            >
              Handpicked delicacies from the world's finest producers. Every bite tells a story of tradition, passion, and uncompromising quality.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <a
                href="#products"
                className="group inline-flex items-center justify-center gap-3 px-10 py-5 gradient-bg text-white rounded-full font-bold text-lg shadow-2xl shadow-amber-500/30 hover:shadow-amber-500/50 transition-all hover:-translate-y-1"
              >
                Explore Collection
                <ArrowDown className="w-5 h-5 group-hover:translate-y-1 transition-transform" />
              </a>
              <a
                href="#products"
                className="inline-flex items-center justify-center gap-2 px-10 py-5 glass text-white rounded-full font-bold text-lg hover:bg-white/20 transition-all"
              >
                View Menu
              </a>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="flex flex-wrap items-center gap-8 mt-16 pt-8 border-t border-white/10"
            >
              {[
                { icon: <Leaf className="w-5 h-5" />, text: '100% Organic' },
                { icon: <Award className="w-5 h-5" />, text: 'Award Winning' },
                { icon: <Truck className="w-5 h-5" />, text: 'Free Delivery' },
                { icon: <Heart className="w-5 h-5" />, text: '50k+ Happy Customers' },
              ].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 text-stone-300">
                  <span className="text-amber-400">{badge.icon}</span>
                  <span className="font-medium">{badge.text}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Strip */}
      <section className="relative -mt-20 z-10">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass rounded-3xl shadow-2xl p-8 sm:p-10"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { icon: '🌿', title: 'Farm Fresh', desc: 'Sourced directly from artisan producers' },
                { icon: '✨', title: 'Premium Quality', desc: 'Hand-selected by our experts' },
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
                  <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <h3 className="font-serif font-bold text-stone-800 text-lg mb-2">{feature.title}</h3>
                  <p className="text-sm text-stone-600 leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-5 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold mb-5">
            Our Collection
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-stone-900 mb-5">
            Curated with <span className="gradient-text">Care</span>
          </h2>
          <p className="text-stone-600 text-xl max-w-2xl mx-auto leading-relaxed">
            Each product tells a unique story of heritage, craftsmanship, and exceptional taste.
          </p>
        </motion.div>

        {/* Search & Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="glass rounded-2xl shadow-xl p-6 sm:p-8 mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-5">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search by name, origin, or description..."
                className="w-full pl-14 pr-5 py-4 rounded-xl border-2 border-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none transition-all bg-white text-stone-800 placeholder:text-stone-400 text-lg"
              />
            </div>
            {/* Category Filters */}
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide pb-1">
              <SlidersHorizontal className="w-5 h-5 text-stone-400 flex-shrink-0 hidden sm:block" />
              {categories.map(cat => (
                <motion.button
                  key={cat}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-6 py-3 rounded-xl text-sm font-bold whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'gradient-bg text-white shadow-lg shadow-amber-500/30'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200'
                  }`}
                >
                  {cat}
                </motion.button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Products Grid */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-10">
          <h3 className="font-serif text-2xl font-bold text-stone-800">
            {activeCategory === 'All' ? 'All Delicacies' : activeCategory}
          </h3>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold text-stone-600 bg-stone-100 px-4 py-2 rounded-full">
              {filteredProducts.length} items
            </span>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-5 py-3 rounded-xl border-2 border-stone-200 text-sm font-semibold text-stone-700 bg-white focus:border-amber-400 focus:ring-4 focus:ring-amber-100 outline-none cursor-pointer"
            >
              <option value="default">Sort by: Featured</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="name">Name: A-Z</option>
            </select>
          </div>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} index={index} />
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-24"
            >
              <div className="text-7xl mb-6">🔍</div>
              <p className="text-stone-600 text-xl mb-6">No products found matching your search.</p>
              <button
                onClick={() => { setSearch(''); setActiveCategory('All'); }}
                className="px-8 py-4 gradient-bg text-white rounded-full font-bold shadow-lg shadow-amber-500/30 hover:shadow-xl transition-all"
              >
                Clear all filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Recently Viewed */}
      <RecentlyViewed />

      {/* Testimonial Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-900 py-24">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-6xl mb-8">🍯</div>
            <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white/90 leading-relaxed mb-10 italic font-light">
              "Every product from Terra & Table has transformed my kitchen into a world of flavors I never knew existed."
            </blockquote>
            <div className="flex items-center justify-center gap-4">
              <div className="w-14 h-14 gradient-bg rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">SC</span>
              </div>
              <div className="text-left">
                <p className="text-white font-bold text-lg">Sarah Chen</p>
                <p className="text-stone-400">Food Blogger • San Francisco</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden gradient-bg rounded-3xl p-10 sm:p-16 shadow-2xl"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px]" />
          <div className="relative text-center max-w-2xl mx-auto">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-white mb-5">
              Join the Club
            </h2>
            <p className="text-amber-100 text-xl mb-10 leading-relaxed">
              Get early access to new arrivals, seasonal specials, and exclusive member-only offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-4 focus:ring-white/20 outline-none text-lg"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-amber-700 rounded-xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all"
              >
                Subscribe
              </motion.button>
            </div>
            <p className="text-amber-100/80 text-sm mt-5">No spam, unsubscribe anytime. Join 10,000+ food lovers.</p>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-stone-950 text-stone-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <Logo className="w-12 h-12" />
                <span className="font-serif text-2xl font-bold text-white">Terra & Table</span>
              </div>
              <p className="text-stone-400 text-base max-w-sm leading-relaxed mb-8">
                Curating the world's finest specialty foods since 2020. Every product tells a story of tradition, quality, and passion for exceptional taste.
              </p>
              <div className="flex gap-3">
                {['Instagram', 'Twitter', 'Pinterest'].map(social => (
                  <span key={social} className="px-4 py-2 bg-stone-800 rounded-full text-sm text-stone-400 hover:text-white hover:bg-stone-700 cursor-pointer transition-colors">
                    {social}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-5">Explore</h4>
              <div className="space-y-3 text-stone-400">
                <Link to="/" className="block hover:text-white cursor-pointer transition-colors">All Products</Link>
                <p className="hover:text-white cursor-pointer transition-colors">New Arrivals</p>
                <Link to="/gift-cards" className="block hover:text-white cursor-pointer transition-colors">Gift Cards</Link>
                <Link to="/subscriptions" className="block hover:text-white cursor-pointer transition-colors">Subscriptions</Link>
                <Link to="/blog" className="block hover:text-white cursor-pointer transition-colors">Recipes & Blog</Link>
                <Link to="/about" className="block hover:text-white cursor-pointer transition-colors">Our Story</Link>
                <p className="hover:text-white cursor-pointer transition-colors">Blog</p>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-white text-lg mb-5">Support</h4>
              <div className="space-y-3 text-stone-400">
                <p className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</p>
                <Link to="/contact" className="block hover:text-white cursor-pointer transition-colors">Contact Us</Link>
                <p className="hover:text-white cursor-pointer transition-colors">FAQ</p>
                <p className="hover:text-white cursor-pointer transition-colors">Privacy Policy</p>
              </div>
            </div>
          </div>
          <div className="border-t border-stone-800 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-stone-500">
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
