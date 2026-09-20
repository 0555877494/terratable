import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, 
  CreditCard, Shield, Truck, Award, Heart, Sparkles
} from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { label: 'All Products', href: '/' },
      { label: 'New Arrivals', href: '/?filter=new' },
      { label: 'Best Sellers', href: '/?filter=bestseller' },
      { label: 'On Sale', href: '/?filter=sale' },
      { label: 'Gift Cards', href: '/gift-cards' },
      { label: 'Subscriptions', href: '/subscriptions' },
      { label: 'Bundles', href: '/bundles' },
    ],
    company: [
      { label: 'About Us', href: '/about' },
      { label: 'Our Producers', href: '/producers' },
      { label: 'Blog & Recipes', href: '/blog' },
      { label: 'Careers', href: '#' },
      { label: 'Press', href: '#' },
      { label: 'Sustainability', href: '#' },
    ],
    support: [
      { label: 'Help Center', href: '/faq' },
      { label: 'Contact Us', href: '/contact' },
      { label: 'Track Order', href: '/track-order' },
      { label: 'Shipping Info', href: '/faq' },
      { label: 'Returns', href: '/return-request' },
      { label: 'Customer Support', href: '/support' },
    ],
    legal: [
      { label: 'Terms of Service', href: '/terms' },
      { label: 'Privacy Policy', href: '/terms' },
      { label: 'Cookie Policy', href: '/terms' },
      { label: 'Accessibility', href: '#' },
    ],
  };

  const paymentMethods = ['Visa', 'Mastercard', 'Amex', 'PayPal', 'Apple Pay', 'MoMo'];

  return (
    <footer className="bg-stone-900 dark:bg-stone-950 text-stone-300 mt-20">
      {/* Newsletter Section */}
      <div className="border-b border-stone-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mb-2">
                Join Our Community
              </h3>
              <p className="text-stone-400">
                Get 15% off your first order + exclusive recipes and artisan stories
              </p>
            </div>
            <div className="flex gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 rounded-xl bg-stone-800 border-2 border-stone-700 text-white placeholder:text-stone-500 focus:border-amber-500 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
              >
                Subscribe
              </motion.button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1 mb-6 lg:mb-0">
            <Link to="/" className="inline-block mb-4">
              <Logo className="w-12 h-12" />
            </Link>
            <p className="text-sm text-stone-400 mb-4 max-w-xs">
              Curating the world's finest specialty foods since 2020. Every product tells a story.
            </p>
            <div className="flex gap-3">
              {[
                { icon: <Facebook className="w-4 h-4" />, href: '#' },
                { icon: <Twitter className="w-4 h-4" />, href: '#' },
                { icon: <Instagram className="w-4 h-4" />, href: '#' },
                { icon: <Youtube className="w-4 h-4" />, href: '#' },
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 bg-stone-800 hover:bg-amber-500 rounded-full flex items-center justify-center transition-colors"
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.href}
                    className="text-sm text-stone-400 hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-stone-400">
                <Mail className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                <a href="mailto:hello@terraandtable.com" className="hover:text-amber-400 transition-colors">
                  hello@terraandtable.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-stone-400">
                <Phone className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                <a href="tel:+15551234567" className="hover:text-amber-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-stone-400">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-amber-500" />
                <span>123 Market St<br />San Francisco, CA 94105</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 pt-8 border-t border-stone-800">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {[
              { icon: <Truck className="w-6 h-6" />, title: 'Free Shipping', desc: 'On orders over $50' },
              { icon: <Shield className="w-6 h-6" />, title: 'Secure Payment', desc: '100% protected' },
              { icon: <Award className="w-6 h-6" />, title: 'Quality Guaranteed', desc: 'Premium products' },
              { icon: <Heart className="w-6 h-6" />, title: '50K+ Customers', desc: 'Happy & loyal' },
            ].map((badge, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-stone-800 rounded-xl flex items-center justify-center text-amber-500 flex-shrink-0">
                  {badge.icon}
                </div>
                <div>
                  <p className="font-semibold text-white text-sm">{badge.title}</p>
                  <p className="text-xs text-stone-400">{badge.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods & Legal */}
        <div className="pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Payment Methods */}
            <div className="flex items-center gap-3">
              <span className="text-xs text-stone-500 uppercase tracking-wider">We accept:</span>
              <div className="flex gap-2">
                {paymentMethods.map((method) => (
                  <div
                    key={method}
                    className="px-3 py-1.5 bg-stone-800 rounded-lg text-xs font-semibold text-stone-300"
                  >
                    {method}
                  </div>
                ))}
              </div>
            </div>

            {/* Legal Links */}
            <div className="flex flex-wrap gap-4 justify-center">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="text-xs text-stone-500 hover:text-amber-400 transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-stone-800 text-center">
          <p className="text-sm text-stone-500">
            © {currentYear} Terra & Table. All rights reserved. Made with{' '}
            <Heart className="w-4 h-4 inline text-rose-500 fill-rose-500" /> for food lovers worldwide.
          </p>
        </div>
      </div>
    </footer>
  );
}
