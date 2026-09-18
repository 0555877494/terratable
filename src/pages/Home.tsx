import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, ArrowDown } from 'lucide-react';
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
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-terra-50 via-cream-100 to-sage-50">
        <div className="absolute inset-0 opacity-[0.07]">
          <img 
            src="https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=1920&q=80" 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-64 h-64 bg-terra-300 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-sage-300 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-cream-400 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <motion.span 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block px-4 py-1.5 bg-terra-100/80 backdrop-blur-sm text-terra-700 rounded-full text-sm font-medium mb-6"
            >
              ✨ Curated Specialty Foods
            </motion.span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-terra-900 leading-tight mb-6">
              Discover the World's <br className="hidden sm:block" />
              <span className="text-terra-600">Finest Flavors</span>
            </h1>
            <p className="text-lg text-terra-600 max-w-xl mx-auto mb-10">
              From artisanal honey to premium saffron — we source the most exceptional ingredients from around the globe, delivered to your door.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <a href="#products" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-terra-600 text-white rounded-full font-medium hover:bg-terra-700 transition-colors shadow-lg shadow-terra-200/50">
                Shop Collection
              </a>
              <a href="#products" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border-2 border-terra-200 text-terra-700 rounded-full font-medium hover:bg-terra-50 transition-colors">
                Learn More
              </a>
            </motion.div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="flex justify-center mt-12"
          >
            <ArrowDown className="w-5 h-5 text-terra-400 animate-bounce" />
          </motion.div>
        </div>
      </section>

      {/* Features Bar */}
      <section className="bg-white border-b border-terra-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            {[
              { icon: '🌍', title: 'Globally Sourced', desc: 'From 20+ countries' },
              { icon: '🏆', title: 'Premium Quality', desc: 'Hand-selected items' },
              { icon: '🚚', title: 'Fast Delivery', desc: '2-3 business days' },
              { icon: '💚', title: 'Sustainable', desc: 'Eco-friendly packaging' }
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                className="flex flex-col items-center gap-1"
              >
                <span className="text-2xl">{feature.icon}</span>
                <span className="text-sm font-medium text-terra-800">{feature.title}</span>
                <span className="text-xs text-terra-500">{feature.desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Search & Filters */}
      <section id="products" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-lg border border-terra-100 p-4 sm:p-6"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-terra-400" />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search specialty foods, origins, categories..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-terra-200 focus:border-terra-400 focus:ring-2 focus:ring-terra-100 outline-none transition-all bg-cream-50"
              />
            </div>
            {/* Category Filters */}
            <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-1">
              <SlidersHorizontal className="w-4 h-4 text-terra-400 flex-shrink-0" />
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all ${
                    activeCategory === cat
                      ? 'bg-terra-600 text-white shadow-sm'
                      : 'bg-terra-50 text-terra-600 hover:bg-terra-100'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-serif text-2xl font-bold text-terra-800">
            {activeCategory === 'All' ? 'Our Collection' : activeCategory}
          </h2>
          <span className="text-sm text-terra-500">{filteredProducts.length} items</span>
        </div>

        <AnimatePresence mode="popLayout">
          {filteredProducts.length > 0 ? (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} onViewDetails={setSelectedProduct} />
              ))}
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
              <p className="text-terra-500 text-lg">No products found matching your search.</p>
              <button onClick={() => { setSearch(''); setActiveCategory('All'); }} className="mt-3 text-terra-600 font-medium hover:text-terra-700">
                Clear filters
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Newsletter / CTA */}
      <section className="bg-gradient-to-r from-terra-800 to-terra-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="font-serif text-3xl font-bold mb-3">Join Our Community</h2>
            <p className="text-terra-200 max-w-md mx-auto mb-6">
              Be the first to know about new arrivals, seasonal specials, and exclusive offers.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-terra-300 focus:border-white/40 outline-none"
              />
              <button className="px-6 py-3 bg-terra-500 text-white rounded-xl font-medium hover:bg-terra-400 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-terra-950 text-terra-200 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-terra-500 to-terra-700 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">T</span>
                </div>
                <span className="font-serif text-xl font-bold text-white">Terra & Table</span>
              </div>
              <p className="text-terra-400 text-sm max-w-sm">
                Curating the world's finest specialty foods since 2020. Every product tells a story of tradition, quality, and passion.
              </p>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Explore</h4>
              <div className="space-y-2 text-sm text-terra-400">
                <p className="hover:text-white cursor-pointer transition-colors">All Products</p>
                <p className="hover:text-white cursor-pointer transition-colors">New Arrivals</p>
                <p className="hover:text-white cursor-pointer transition-colors">Gift Sets</p>
                <p className="hover:text-white cursor-pointer transition-colors">Our Story</p>
              </div>
            </div>
            <div>
              <h4 className="font-medium text-white mb-3">Support</h4>
              <div className="space-y-2 text-sm text-terra-400">
                <p className="hover:text-white cursor-pointer transition-colors">Shipping Info</p>
                <p className="hover:text-white cursor-pointer transition-colors">Returns Policy</p>
                <p className="hover:text-white cursor-pointer transition-colors">Contact Us</p>
                <p className="hover:text-white cursor-pointer transition-colors">FAQ</p>
              </div>
            </div>
          </div>
          <div className="border-t border-terra-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-terra-500">
            <p>© 2024 Terra & Table. All rights reserved.</p>
            <p>hello@terraandtable.com • +1 (555) 123-4567</p>
          </div>
        </div>
      </footer>

      {/* Product Modal */}
      <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
    </div>
  );
}
