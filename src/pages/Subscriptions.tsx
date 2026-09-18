import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Package, Check, Star, ArrowRight, Sparkles, Gift, Clock } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

const boxes = [
  {
    id: 'explorer',
    name: 'The Explorer',
    price: 49.99,
    frequency: 'monthly',
    description: 'A curated selection of 4-5 artisan foods from around the world',
    image: 'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=400&h=300&fit=crop',
    items: ['Wildflower Honey', 'Artisan Chocolate', 'Specialty Tea', 'Dried Fruits'],
    color: 'from-amber-500 to-orange-500',
    badge: 'Most Popular'
  },
  {
    id: 'connoisseur',
    name: 'The Connoisseur',
    price: 89.99,
    frequency: 'monthly',
    description: 'Premium selection of 6-7 luxury foods for the discerning palate',
    image: 'https://images.unsplash.com/photo-1495195134817-aeb325a55b65?w=400&h=300&fit=crop',
    items: ['Saffron Threads', 'Truffle Oil', 'Aged Vinegar', 'Matcha Powder', 'Artisan Cheese', 'Smoked Salt'],
    color: 'from-rose-500 to-red-500',
    badge: 'Best Value'
  },
  {
    id: 'taster',
    name: 'The Taster',
    price: 29.99,
    frequency: 'monthly',
    description: 'Perfect introduction with 3 handpicked specialty items',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=400&h=300&fit=crop',
    items: ['Specialty Spice', 'Artisan Snack', 'Unique Beverage'],
    color: 'from-emerald-500 to-teal-500',
    badge: 'Starter'
  }
];

export default function Subscriptions() {
  const { showToast } = useToast();
  const [selectedBox, setSelectedBox] = useState<string | null>(null);
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (boxId: string) => {
    setSelectedBox(boxId);
  };

  const confirmSubscription = () => {
    setSubscribed(true);
    showToast('success', 'Subscription activated! Your first box ships next week.');
  };

  if (subscribed) {
    const box = boxes.find(b => b.id === selectedBox);
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <Check className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            Welcome to the Club! 🎉
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            You're now subscribed to <strong>{box?.name}</strong>
          </p>
          <p className="text-stone-500 dark:text-stone-500 mb-6">
            Your first box ships next week. Get ready for an amazing culinary journey!
          </p>
          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-2xl p-5 border-2 border-amber-200 dark:border-amber-800 mb-6">
            <p className="text-sm text-stone-600 dark:text-stone-400">Next billing date</p>
            <p className="text-xl font-bold text-stone-800 dark:text-stone-200">
              {new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { setSubscribed(false); setSelectedBox(null); }}
            className="px-8 py-3 gradient-bg text-white rounded-full font-bold shadow-lg"
          >
            Back to Subscriptions
          </motion.button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Package className="w-4 h-4" /> Subscription Boxes
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Curated Boxes, <span className="gradient-text">Delivered Monthly</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Let our experts surprise you with the world's finest artisan foods. Cancel anytime, no commitments.
        </p>
      </motion.div>

      {/* Benefits */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
      >
        {[
          { icon: <Sparkles className="w-5 h-5" />, title: 'Curated by Experts', desc: 'Handpicked selections' },
          { icon: <Gift className="w-5 h-5" />, title: 'Exclusive Items', desc: 'Members-only products' },
          { icon: <Clock className="w-5 h-5" />, title: 'Cancel Anytime', desc: 'No commitments' },
          { icon: <Star className="w-5 h-5" />, title: 'Save 20%', desc: 'vs buying individually' },
        ].map((benefit, i) => (
          <div key={i} className="text-center p-4 bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700">
            <div className="w-10 h-10 mx-auto mb-2 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center text-amber-600">
              {benefit.icon}
            </div>
            <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-sm">{benefit.title}</h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">{benefit.desc}</p>
          </div>
        ))}
      </motion.div>

      {/* Subscription Boxes */}
      <div className="grid md:grid-cols-3 gap-6">
        {boxes.map((box, index) => (
          <motion.div
            key={box.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.15 }}
            whileHover={{ y: -8 }}
            className="bg-white dark:bg-stone-800 rounded-3xl overflow-hidden card-shadow hover:card-shadow-hover transition-all duration-300 relative"
          >
            {/* Badge */}
            <div className={`absolute top-4 right-4 z-10 px-3 py-1 bg-gradient-to-r ${box.color} text-white text-xs font-bold rounded-full shadow-lg`}>
              {box.badge}
            </div>

            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img src={box.image} alt={box.name} className="w-full h-full object-cover" />
              <div className={`absolute inset-0 bg-gradient-to-t ${box.color} opacity-40`} />
            </div>

            {/* Content */}
            <div className="p-6">
              <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                {box.name}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm mb-4">{box.description}</p>

              {/* Items */}
              <div className="mb-5">
                <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  What's Inside:
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {box.items.map(item => (
                    <span key={item} className="px-2.5 py-1 bg-stone-100 dark:bg-stone-700 rounded-full text-xs font-medium text-stone-700 dark:text-stone-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2 mb-5">
                <span className="text-3xl font-bold gradient-text">${box.price}</span>
                <span className="text-stone-500 dark:text-stone-400 text-sm">/{box.frequency}</span>
              </div>

              {/* Subscribe Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => handleSubscribe(box.id)}
                className={`w-full py-3.5 bg-gradient-to-r ${box.color} text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2`}
              >
                Subscribe Now <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* FAQ */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 max-w-3xl mx-auto"
      >
        <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 text-center mb-8">
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            { q: 'Can I cancel anytime?', a: 'Yes! You can cancel your subscription at any time with no penalties or fees.' },
            { q: 'When will my box arrive?', a: 'Boxes ship on the 1st of each month and typically arrive within 3-5 business days.' },
            { q: 'Can I customize my box?', a: 'While boxes are curated by our experts, you can note any dietary restrictions or preferences.' },
            { q: 'Is shipping included?', a: 'Yes! Free shipping is included with all subscription boxes.' },
          ].map((faq, i) => (
            <details key={i} className="group bg-white dark:bg-stone-800 rounded-2xl border border-stone-200 dark:border-stone-700 overflow-hidden">
              <summary className="flex items-center justify-between p-5 cursor-pointer font-semibold text-stone-800 dark:text-stone-200 hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors">
                {faq.q}
                <ArrowRight className="w-4 h-4 transition-transform group-open:rotate-90" />
              </summary>
              <div className="px-5 pb-5 text-stone-600 dark:text-stone-400">
                {faq.a}
              </div>
            </details>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
