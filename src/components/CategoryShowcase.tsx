import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface Category {
  id: string;
  name: string;
  description: string;
  image: string;
  productCount: number;
  color: string;
}

const categories: Category[] = [
  {
    id: 'pantry',
    name: 'Pantry Essentials',
    description: 'Honey, vinegar, and kitchen staples',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82571?w=600&h=400&fit=crop',
    productCount: 24,
    color: 'from-amber-500 to-orange-500'
  },
  {
    id: 'beverages',
    name: 'Premium Beverages',
    description: 'Matcha, tea, and artisanal drinks',
    image: 'https://images.unsplash.com/photo-1515823064-d6e0c0461669?w=600&h=400&fit=crop',
    productCount: 18,
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'spices',
    name: 'Exotic Spices',
    description: 'Saffron, rare spices from around the world',
    image: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&h=400&fit=crop',
    productCount: 32,
    color: 'from-red-500 to-rose-500'
  },
  {
    id: 'confections',
    name: 'Artisan Confections',
    description: 'Chocolate, sweets, and desserts',
    image: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=600&h=400&fit=crop',
    productCount: 28,
    color: 'from-purple-500 to-pink-500'
  },
  {
    id: 'oils',
    name: 'Premium Oils',
    description: 'Truffle oil, olive oil, and more',
    image: 'https://images.unsplash.com/photo-1474979266404-7f28a9b0cfdc?w=600&h=400&fit=crop',
    productCount: 15,
    color: 'from-yellow-500 to-amber-500'
  },
  {
    id: 'gifts',
    name: 'Gift Collections',
    description: 'Curated gift sets for every occasion',
    image: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=400&fit=crop',
    productCount: 12,
    color: 'from-pink-500 to-rose-500'
  }
];

export default function CategoryShowcase() {
  return (
    <section className="py-20 bg-gradient-to-b from-stone-50 to-white dark:from-stone-900 dark:to-stone-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-12">
            <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Shop by Category
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
              Explore our curated collections of the world's finest artisan foods
            </p>
          </div>
        </ScrollReveal>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category, index) => (
            <ScrollReveal key={category.id} delay={index * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                {/* Background Image */}
                <div className="absolute inset-0">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity`} />
                </div>

                {/* Content */}
                <div className="relative h-full flex flex-col justify-end p-6 text-white">
                  <h3 className="font-serif text-2xl font-bold mb-2">
                    {category.name}
                  </h3>
                  <p className="text-white/90 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-semibold">
                      {category.productCount} products
                    </span>
                    <motion.div
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-1 text-sm font-semibold"
                    >
                      Shop Now
                      <ArrowRight className="w-4 h-4" />
                    </motion.div>
                  </div>
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>

        {/* View All Button */}
        <ScrollReveal delay={0.6}>
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 gradient-bg text-white rounded-full font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl transition-all hover:-translate-y-1"
            >
              View All Categories
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
