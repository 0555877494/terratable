import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles, ArrowRight, Heart, Coffee, Utensils, Wine } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { Link } from 'react-router-dom';

type Step = 'recipient' | 'occasion' | 'budget' | 'taste' | 'results';

export default function GiftFinder() {
  const { products, addToCart } = useStore();
  const { showToast } = useToast();
  const [step, setStep] = useState<Step>('recipient');
  const [answers, setAnswers] = useState({
    recipient: '',
    occasion: '',
    budget: '',
    taste: ''
  });

  const recipients = [
    { id: 'mom', label: 'Mom', icon: '👩', desc: 'For the wonderful mother' },
    { id: 'dad', label: 'Dad', icon: '👨', desc: 'For the amazing father' },
    { id: 'partner', label: 'Partner', icon: '💑', desc: 'For your significant other' },
    { id: 'friend', label: 'Friend', icon: '👫', desc: 'For a dear friend' },
    { id: 'colleague', label: 'Colleague', icon: '💼', desc: 'For a work colleague' },
    { id: 'self', label: 'Myself', icon: '🎁', desc: 'Treat yourself!' }
  ];

  const occasions = [
    { id: 'birthday', label: 'Birthday', icon: '🎂' },
    { id: 'anniversary', label: 'Anniversary', icon: '💍' },
    { id: 'holiday', label: 'Holiday', icon: '🎄' },
    { id: 'thankyou', label: 'Thank You', icon: '🙏' },
    { id: 'justbecause', label: 'Just Because', icon: '💝' },
    { id: 'housewarming', label: 'Housewarming', icon: '🏠' }
  ];

  const budgets = [
    { id: 'under25', label: 'Under $25', range: [0, 25], icon: '💰' },
    { id: '25to50', label: '$25 - $50', range: [25, 50], icon: '💵' },
    { id: '50to100', label: '$50 - $100', range: [50, 100], icon: '💴' },
    { id: 'over100', label: 'Over $100', range: [100, 999], icon: '💎' }
  ];

  const tastes = [
    { id: 'sweet', label: 'Sweet', icon: '🍯', desc: 'Honey, chocolate, desserts' },
    { id: 'savory', label: 'Savory', icon: '🧂', desc: 'Spices, oils, vinegars' },
    { id: 'exotic', label: 'Exotic', icon: '🌶️', desc: 'Rare and unique flavors' },
    { id: 'classic', label: 'Classic', icon: '🍷', desc: 'Timeless favorites' },
    { id: 'healthy', label: 'Healthy', icon: '🍵', desc: 'Organic and natural' },
    { id: 'indulgent', label: 'Indulgent', icon: '🍫', desc: 'Luxury treats' }
  ];

  const getRecommendations = () => {
    let filtered = [...products];

    // Filter by budget
    const budgetRange = budgets.find(b => b.id === answers.budget)?.range || [0, 999];
    filtered = filtered.filter(p => p.price >= budgetRange[0] && p.price <= budgetRange[1]);

    // Filter by taste preference
    if (answers.taste === 'sweet') {
      filtered = filtered.filter(p => p.category === 'Confections' || p.name.toLowerCase().includes('honey') || p.name.toLowerCase().includes('chocolate'));
    } else if (answers.taste === 'savory') {
      filtered = filtered.filter(p => p.category === 'Oils' || p.category === 'Spices' || p.name.toLowerCase().includes('vinegar'));
    } else if (answers.taste === 'exotic') {
      filtered = filtered.filter(p => p.name.toLowerCase().includes('saffron') || p.name.toLowerCase().includes('truffle') || p.badge === 'limited');
    } else if (answers.taste === 'classic') {
      filtered = filtered.filter(p => p.badge === 'bestseller' || p.rating >= 4.7);
    } else if (answers.taste === 'healthy') {
      filtered = filtered.filter(p => p.name.toLowerCase().includes('matcha') || p.category === 'Beverages');
    } else if (answers.taste === 'indulgent') {
      filtered = filtered.filter(p => p.price >= 40 || p.name.toLowerCase().includes('truffle') || p.name.toLowerCase().includes('chocolate'));
    }

    // Sort by rating
    return filtered.sort((a, b) => b.rating - a.rating).slice(0, 4);
  };

  const recommendations = getRecommendations();

  const handleAddToCart = (product: any) => {
    addToCart(product);
    showToast('success', `${product.name} added to cart! Perfect gift choice! 🎁`);
  };

  const resetQuiz = () => {
    setStep('recipient');
    setAnswers({ recipient: '', occasion: '', budget: '', taste: '' });
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-rose-100 dark:bg-rose-900/30 text-rose-800 dark:text-rose-200 rounded-full text-sm font-semibold mb-4">
          <Gift className="w-4 h-4" />
          Gift Finder
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Find the <span className="gradient-text">Perfect Gift</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Answer a few questions and we'll recommend the perfect artisan gift
        </p>
      </motion.div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {['recipient', 'occasion', 'budget', 'taste', 'results'].map((s, i) => (
            <div key={s} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                step === s ? 'gradient-bg text-white' :
                ['recipient', 'occasion', 'budget', 'taste', 'results'].indexOf(step) > i
                  ? 'bg-emerald-500 text-white'
                  : 'bg-stone-200 dark:bg-stone-700 text-stone-500'
              }`}>
                {['recipient', 'occasion', 'budget', 'taste', 'results'].indexOf(step) > i ? '✓' : i + 1}
              </div>
              {i < 4 && (
                <div className={`w-12 sm:w-20 h-1 mx-2 ${
                  ['recipient', 'occasion', 'budget', 'taste', 'results'].indexOf(step) > i
                    ? 'bg-emerald-500'
                    : 'bg-stone-200 dark:bg-stone-700'
                }`} />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quiz Steps */}
      <AnimatePresence mode="wait">
        {step === 'recipient' && (
          <motion.div
            key="recipient"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-8"
          >
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
              Who are you shopping for?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {recipients.map(r => (
                <motion.button
                  key={r.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAnswers({ ...answers, recipient: r.id });
                    setStep('occasion');
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    answers.recipient === r.id
                      ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
                      : 'border-stone-200 dark:border-stone-700 hover:border-rose-300'
                  }`}
                >
                  <div className="text-5xl mb-3">{r.icon}</div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">{r.label}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{r.desc}</p>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {step === 'occasion' && (
          <motion.div
            key="occasion"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-8"
          >
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
              What's the occasion?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {occasions.map(o => (
                <motion.button
                  key={o.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAnswers({ ...answers, occasion: o.id });
                    setStep('budget');
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    answers.occasion === o.id
                      ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
                      : 'border-stone-200 dark:border-stone-700 hover:border-rose-300'
                  }`}
                >
                  <div className="text-5xl mb-3">{o.icon}</div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">{o.label}</p>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setStep('recipient')}
              className="mt-6 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-semibold"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {step === 'budget' && (
          <motion.div
            key="budget"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-8"
          >
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
              What's your budget?
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {budgets.map(b => (
                <motion.button
                  key={b.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAnswers({ ...answers, budget: b.id });
                    setStep('taste');
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    answers.budget === b.id
                      ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
                      : 'border-stone-200 dark:border-stone-700 hover:border-rose-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{b.icon}</div>
                  <p className="font-bold text-stone-900 dark:text-stone-100 text-lg">{b.label}</p>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setStep('occasion')}
              className="mt-6 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-semibold"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {step === 'taste' && (
          <motion.div
            key="taste"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-8"
          >
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6 text-center">
              What flavors do they love?
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {tastes.map(t => (
                <motion.button
                  key={t.id}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    setAnswers({ ...answers, taste: t.id });
                    setStep('results');
                  }}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    answers.taste === t.id
                      ? 'border-rose-400 bg-rose-50 dark:bg-rose-900/20'
                      : 'border-stone-200 dark:border-stone-700 hover:border-rose-300'
                  }`}
                >
                  <div className="text-4xl mb-2">{t.icon}</div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">{t.label}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{t.desc}</p>
                </motion.button>
              ))}
            </div>
            <button
              onClick={() => setStep('budget')}
              className="mt-6 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 font-semibold"
            >
              ← Back
            </button>
          </motion.div>
        )}

        {step === 'results' && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-8"
          >
            <div className="text-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', delay: 0.2 }}
                className="text-6xl mb-4"
              >
                🎁
              </motion.div>
              <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                Perfect Gifts Found!
              </h2>
              <p className="text-stone-600 dark:text-stone-400">
                Based on your preferences, we recommend these artisan products
              </p>
            </div>

            {recommendations.length > 0 ? (
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                {recommendations.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-stone-50 dark:bg-stone-700/50 rounded-2xl overflow-hidden border border-stone-200 dark:border-stone-600"
                  >
                    <img src={product.image} alt={product.name} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <h3 className="font-serif font-bold text-stone-900 dark:text-stone-100 text-lg mb-2">
                        {product.name}
                      </h3>
                      <p className="text-sm text-stone-600 dark:text-stone-400 mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold gradient-text">${product.price.toFixed(2)}</span>
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleAddToCart(product)}
                          className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold text-sm shadow-lg"
                        >
                          Add to Cart
                        </motion.button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-stone-600 dark:text-stone-400 mb-4">
                  No products match your criteria. Try adjusting your preferences!
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={resetQuiz}
                className="px-8 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Start Over
              </motion.button>
              <Link
                to="/cart"
                className="px-8 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg text-center"
              >
                View Cart
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
