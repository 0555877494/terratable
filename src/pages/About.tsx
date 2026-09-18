import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Heart, Globe, Award, Users, Leaf, Truck } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-terra-50 via-cream-100 to-sage-50 py-20 sm:py-28">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-terra-200/30 rounded-full blur-[80px]" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-sage-200/30 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <span className="inline-block px-4 py-1.5 bg-white/70 backdrop-blur-sm border border-terra-100 rounded-full text-sm font-medium text-terra-700 mb-6">
              Our Story
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-terra-900 mb-6">
              Crafting Culinary <span className="text-terra-600">Experiences</span>
            </h1>
            <p className="text-lg text-terra-600 max-w-2xl mx-auto leading-relaxed">
              Since 2020, we've been on a mission to bring the world's most exceptional specialty foods 
              to your table. Every product in our collection tells a story of tradition, passion, and 
              uncompromising quality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-terra-800 mb-4">Our Values</h2>
          <p className="text-terra-500 max-w-md mx-auto">What drives us every day</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Globe className="w-6 h-6" />, title: 'Global Sourcing', desc: 'We travel the world to find the most authentic and exceptional products from artisan producers in over 20 countries.' },
            { icon: <Award className="w-6 h-6" />, title: 'Premium Quality', desc: 'Every item is hand-selected by our team of food experts. We never compromise on quality, taste, or authenticity.' },
            { icon: <Leaf className="w-6 h-6" />, title: 'Sustainability', desc: 'We partner with producers who share our commitment to sustainable practices and eco-friendly packaging.' },
            { icon: <Heart className="w-6 h-6" />, title: 'Passion', desc: 'Food is our passion. We believe every meal should be an experience, and every ingredient should tell a story.' },
            { icon: <Users className="w-6 h-6" />, title: 'Community', desc: 'We support small-scale producers and help them reach food lovers around the world.' },
            { icon: <Truck className="w-6 h-6" />, title: 'Fresh Delivery', desc: 'Our logistics ensure your specialty foods arrive fresh and in perfect condition, every time.' },
          ].map((value, i) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-2xl border border-terra-100/50 p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="w-12 h-12 bg-gradient-to-br from-terra-100 to-cream-100 rounded-xl flex items-center justify-center text-terra-600 mb-4">
                {value.icon}
              </div>
              <h3 className="font-serif text-lg font-semibold text-terra-800 mb-2">{value.title}</h3>
              <p className="text-sm text-terra-500 leading-relaxed">{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="bg-gradient-to-r from-terra-800 to-wine-800 py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '50K+', label: 'Happy Customers' },
              { value: '200+', label: 'Products' },
              { value: '20+', label: 'Countries' },
              { value: '4.9★', label: 'Average Rating' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <p className="text-3xl sm:text-4xl font-bold mb-1">{stat.value}</p>
                <p className="text-terra-200 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-terra-800 mb-4">Ready to Explore?</h2>
        <p className="text-terra-500 mb-8">Discover our curated collection of the world's finest specialty foods.</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-full font-semibold shadow-xl shadow-terra-500/20 hover:shadow-2xl transition-all hover:-translate-y-0.5"
        >
          Shop Now
        </Link>
      </section>
    </div>
  );
}
