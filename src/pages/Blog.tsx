import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Users, Heart, ArrowRight, ChefHat } from 'lucide-react';
import { Link } from 'react-router-dom';

const recipes = [
  {
    id: 1,
    title: 'Tuscan Honey Glazed Salmon',
    excerpt: 'A perfect balance of sweet and savory with our premium wildflower honey',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop',
    time: '30 mins',
    servings: 4,
    difficulty: 'Easy',
    category: 'Main Course',
    featured: true
  },
  {
    id: 2,
    title: 'Matcha Latte Art',
    excerpt: 'Master the art of the perfect ceremonial-grade matcha latte',
    image: 'https://images.unsplash.com/photo-1536256263959-770b48d82b0a?w=600&h=400&fit=crop',
    time: '10 mins',
    servings: 1,
    difficulty: 'Medium',
    category: 'Beverages',
    featured: false
  },
  {
    id: 3,
    title: 'Saffron Risotto',
    excerpt: 'Creamy Italian rice elevated with premium Persian saffron threads',
    image: 'https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop',
    time: '45 mins',
    servings: 6,
    difficulty: 'Medium',
    category: 'Main Course',
    featured: true
  },
  {
    id: 4,
    title: 'Dark Chocolate Truffles',
    excerpt: 'Indulgent homemade truffles with single-origin Ecuadorian chocolate',
    image: 'https://images.unsplash.com/photo-1548741487-18d363dc4769?w=600&h=400&fit=crop',
    time: '2 hours',
    servings: 20,
    difficulty: 'Hard',
    category: 'Desserts',
    featured: false
  },
  {
    id: 5,
    title: 'Truffle Pasta',
    excerpt: 'Simple yet luxurious pasta with black truffle infused olive oil',
    image: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?w=600&h=400&fit=crop',
    time: '20 mins',
    servings: 2,
    difficulty: 'Easy',
    category: 'Main Course',
    featured: true
  },
  {
    id: 6,
    title: 'Balsamic Strawberry Salad',
    excerpt: 'Fresh summer salad with aged balsamic and seasonal strawberries',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop',
    time: '15 mins',
    servings: 4,
    difficulty: 'Easy',
    category: 'Salads',
    featured: false
  }
];

const categories = ['All', 'Main Course', 'Beverages', 'Desserts', 'Salads'];

export default function Blog() {
  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredRecipes = selectedCategory === 'All'
    ? recipes
    : recipes.filter(r => r.category === selectedCategory);

  const featuredRecipe = recipes.find(r => r.featured);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <ChefHat className="w-4 h-4" /> Recipes & Stories
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Culinary <span className="gradient-text">Inspiration</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Discover recipes, cooking tips, and stories from our artisan producers around the world
        </p>
      </motion.div>

      {/* Featured Recipe */}
      {featuredRecipe && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <div className="relative bg-white dark:bg-stone-800 rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group">
            <div className="grid md:grid-cols-2">
              <div className="relative h-64 md:h-auto overflow-hidden">
                <img
                  src={featuredRecipe.image}
                  alt={featuredRecipe.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full">
                  Featured Recipe
                </div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <span className="text-sm font-semibold text-amber-600 dark:text-amber-400 mb-2">
                  {featuredRecipe.category}
                </span>
                <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
                  {featuredRecipe.title}
                </h2>
                <p className="text-stone-600 dark:text-stone-400 mb-6">
                  {featuredRecipe.excerpt}
                </p>
                <div className="flex items-center gap-6 mb-6 text-sm text-stone-600 dark:text-stone-400">
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>{featuredRecipe.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>{featuredRecipe.servings} servings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <ChefHat className="w-4 h-4" />
                    <span>{featuredRecipe.difficulty}</span>
                  </div>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2 w-fit"
                >
                  View Recipe <ArrowRight className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-wrap gap-3 mb-8"
      >
        {categories.map(category => (
          <motion.button
            key={category}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setSelectedCategory(category)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === category
                ? 'gradient-bg text-white shadow-lg shadow-amber-500/30'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {category}
          </motion.button>
        ))}
      </motion.div>

      {/* Recipes Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredRecipes.map((recipe, index) => (
          <motion.div
            key={recipe.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + index * 0.1 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-stone-800 rounded-2xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 group"
          >
            <div className="relative h-48 overflow-hidden">
              <img
                src={recipe.image}
                alt={recipe.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute top-3 right-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg"
                >
                  <Heart className="w-5 h-5 text-stone-600" />
                </motion.button>
              </div>
              <div className="absolute bottom-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-stone-700">
                {recipe.category}
              </div>
            </div>
            <div className="p-5">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-2 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                {recipe.title}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">
                {recipe.excerpt}
              </p>
              <div className="flex items-center gap-4 text-xs text-stone-500 dark:text-stone-400 mb-4">
                <div className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{recipe.time}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  <span>{recipe.servings}</span>
                </div>
                <div className="flex items-center gap-1">
                  <ChefHat className="w-3.5 h-3.5" />
                  <span>{recipe.difficulty}</span>
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full py-2.5 border-2 border-amber-300 dark:border-amber-600 text-amber-700 dark:text-amber-400 rounded-xl text-sm font-bold hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors flex items-center justify-center gap-2"
              >
                Read More <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Newsletter CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 sm:p-12 text-white text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <ChefHat className="w-12 h-12 mx-auto mb-4" />
          <h2 className="font-serif text-3xl sm:text-4xl font-bold mb-4">
            Get Weekly Recipes
          </h2>
          <p className="text-white/90 mb-6">
            Subscribe to our newsletter and receive exclusive recipes, cooking tips, and special offers every week.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-xl bg-white/20 border-2 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-4 focus:ring-white/20 outline-none"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-white text-amber-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Subscribe
            </motion.button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
