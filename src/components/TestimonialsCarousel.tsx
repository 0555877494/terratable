import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: 'Sarah Johnson',
    role: 'Food Blogger',
    location: 'New York, USA',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'Terra & Table has completely transformed my cooking! The saffron from Iran is absolutely divine, and the matcha from Japan is the best I\'ve found outside of Kyoto. Every product tells a story.',
    product: 'Premium Saffron & Matcha'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Home Chef',
    location: 'San Francisco, USA',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The truffle olive oil is liquid gold! I use it in everything now. The quality is unmatched, and the shipping was incredibly fast. This is my go-to for specialty ingredients.',
    product: 'Truffle Infused Olive Oil'
  },
  {
    id: 3,
    name: 'Emma Williams',
    role: 'Restaurant Owner',
    location: 'London, UK',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'As a restaurant owner, I need consistent quality. Terra & Table delivers every time. The aged balsamic vinegar is now a staple in my kitchen. My customers love the difference!',
    product: 'Aged Balsamic Vinegar'
  },
  {
    id: 4,
    name: 'David Rodriguez',
    role: 'Chocolate Enthusiast',
    location: 'Madrid, Spain',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The artisan dark chocolate from Ecuador is phenomenal. You can taste the care and craftsmanship in every bite. I\'ve tried chocolates from around the world, and this is top tier.',
    product: 'Artisan Dark Chocolate'
  },
  {
    id: 5,
    name: 'Lisa Park',
    role: 'Tea Connoisseur',
    location: 'Seoul, South Korea',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'The ceremonial matcha is absolutely perfect. Vibrant green color, smooth texture, and that beautiful umami flavor. It\'s clear this is sourced from the best producers in Uji.',
    product: 'Japanese Matcha Powder'
  },
  {
    id: 6,
    name: 'James Thompson',
    role: 'Gift Shop Owner',
    location: 'Toronto, Canada',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    rating: 5,
    text: 'I order gift sets from Terra & Table for my shop regularly. The packaging is beautiful, the products are exceptional, and my customers always come back for more. Highly recommended!',
    product: 'Gift Sets Collection'
  }
];

export default function TestimonialsCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const current = testimonials[currentIndex];

  return (
    <section className="py-20 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-stone-900 dark:to-stone-800">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-lg">
            Join thousands of happy customers who trust Terra & Table
          </p>
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="bg-white dark:bg-stone-800 rounded-3xl shadow-2xl p-8 sm:p-12 relative"
            >
              {/* Quote Icon */}
              <div className="absolute -top-6 left-8">
                <div className="w-12 h-12 gradient-bg rounded-full flex items-center justify-center shadow-lg">
                  <Quote className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(current.rating)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-xl sm:text-2xl text-stone-700 dark:text-stone-300 leading-relaxed mb-8 italic">
                "{current.text}"
              </p>

              {/* Product Mention */}
              <div className="mb-6">
                <span className="inline-block px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold">
                  Purchased: {current.product}
                </span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-16 h-16 rounded-full object-cover border-4 border-amber-200 dark:border-amber-800"
                />
                <div>
                  <p className="font-bold text-lg text-stone-900 dark:text-stone-100">
                    {current.name}
                  </p>
                  <p className="text-stone-600 dark:text-stone-400">
                    {current.role} • {current.location}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-12 h-12 bg-white dark:bg-stone-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ChevronLeft className="w-6 h-6 text-stone-700 dark:text-stone-300" />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-12 h-12 bg-white dark:bg-stone-800 rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
          >
            <ChevronRight className="w-6 h-6 text-stone-700 dark:text-stone-300" />
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrentIndex(index);
                setIsAutoPlaying(false);
                setTimeout(() => setIsAutoPlaying(true), 10000);
              }}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentIndex
                  ? 'gradient-bg w-8'
                  : 'bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500'
              }`}
            />
          ))}
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12"
        >
          {[
            { value: '50K+', label: 'Happy Customers' },
            { value: '4.9/5', label: 'Average Rating' },
            { value: '98%', label: 'Would Recommend' },
            { value: '200+', label: '5-Star Reviews' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <p className="text-3xl sm:text-4xl font-bold gradient-text mb-2">{stat.value}</p>
              <p className="text-sm text-stone-600 dark:text-stone-400">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
