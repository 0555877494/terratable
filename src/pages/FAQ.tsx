import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, ChevronUp, HelpCircle, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

const faqCategories = [
  {
    name: 'Orders & Shipping',
    questions: [
      {
        q: 'How long does delivery take?',
        a: 'Standard delivery takes 2-3 business days. Express delivery (1 business day) is available for select areas. International orders typically arrive within 5-7 business days.'
      },
      {
        q: 'Do you offer free shipping?',
        a: 'Yes! We offer free shipping on all orders over $50 within the continental US. International shipping rates vary by destination.'
      },
      {
        q: 'Can I track my order?',
        a: 'Absolutely! Once your order ships, you\'ll receive a tracking number via email. You can also track your order in your account dashboard under "Order Tracking".'
      },
      {
        q: 'What if my order arrives damaged?',
        a: 'We take great care in packaging, but if anything arrives damaged, please contact us within 48 hours with photos. We\'ll send a replacement or issue a full refund.'
      },
      {
        q: 'Can I change or cancel my order?',
        a: 'You can modify or cancel your order within 1 hour of placing it. After that, please contact our support team and we\'ll do our best to accommodate your request.'
      }
    ]
  },
  {
    name: 'Payments',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept all major credit cards (Visa, Mastercard, Amex), Mobile Money (MTN, Vodafone, AirtelTigo), PayPal, and Apple Pay.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes! We use industry-standard SSL encryption and PCI-compliant payment processing. Your payment details are never stored on our servers.'
      },
      {
        q: 'How does Mobile Money payment work?',
        a: 'Select Mobile Money at checkout, enter your phone number, and you\'ll receive a payment prompt on your phone. Approve the transaction to complete your purchase.'
      },
      {
        q: 'Do you offer payment plans?',
        a: 'For orders over $200, we offer flexible payment plans through our partner services. Select "Payment Plan" at checkout to see your options.'
      }
    ]
  },
  {
    name: 'Returns & Refunds',
    questions: [
      {
        q: 'What is your return policy?',
        a: 'We offer a 30-day return policy for unopened items in original packaging. Perishable items must be reported within 24 hours of delivery.'
      },
      {
        q: 'How do I initiate a return?',
        a: 'Go to your account dashboard, find the order, and click "Return Item". Follow the instructions to generate a return shipping label.'
      },
      {
        q: 'How long do refunds take?',
        a: 'Once we receive your return, refunds are processed within 3-5 business days. Credit card refunds may take an additional 5-7 business days to appear on your statement.'
      },
      {
        q: 'Who pays for return shipping?',
        a: 'We provide free return shipping for defective or incorrect items. For other returns, a $7.99 return shipping fee will be deducted from your refund.'
      }
    ]
  },
  {
    name: 'Account & Loyalty',
    questions: [
      {
        q: 'How does the loyalty program work?',
        a: 'Earn 1 point for every $1 spent. Points can be redeemed for discounts, free shipping, and exclusive products. You\'ll also unlock tier benefits as you earn more points.'
      },
      {
        q: 'What are the loyalty tiers?',
        a: 'Bronze (0-999 points): 5% cashback. Silver (1000-2499): 7% cashback + free shipping. Gold (2500-4999): 10% cashback + VIP perks. Platinum (5000+): 15% cashback + all benefits.'
      },
      {
        q: 'How do I refer friends?',
        a: 'Go to your account dashboard and click "Referral Program". Share your unique link with friends. You\'ll earn $20 for each friend who makes their first purchase!'
      },
      {
        q: 'Can I have multiple shipping addresses?',
        a: 'Yes! You can save multiple addresses in your Address Book and select the preferred one during checkout.'
      }
    ]
  },
  {
    name: 'Products & Subscriptions',
    questions: [
      {
        q: 'Are your products organic?',
        a: 'Many of our products are organic or sustainably sourced. Look for the "Organic" badge on product pages. We prioritize natural, high-quality ingredients.'
      },
      {
        q: 'How do subscription boxes work?',
        a: 'Choose your preferred box (Explorer, Connoisseur, or Taster), and we\'ll curate and ship it to you monthly. You can pause, skip, or cancel anytime.'
      },
      {
        q: 'Can I customize my subscription box?',
        a: 'While our boxes are expertly curated, you can note dietary restrictions or preferences in your account settings, and we\'ll accommodate when possible.'
      },
      {
        q: 'Do you offer gift wrapping?',
        a: 'Yes! Select "Gift Wrap" at checkout for $4.99. We\'ll beautifully package your order with a personalized message card.'
      }
    ]
  }
];

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState('');
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const toggleQuestion = (key: string) => {
    setOpenQuestions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(q => 
      q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      q.a.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })).filter(category => 
    !selectedCategory || category.name === selectedCategory
  ).filter(category => category.questions.length > 0);

  const totalQuestions = filteredCategories.reduce((sum, cat) => sum + cat.questions.length, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <HelpCircle className="w-4 h-4" />
          Frequently Asked Questions
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          How Can We <span className="gradient-text">Help?</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Find answers to common questions about orders, payments, returns, and more
        </p>
      </motion.div>

      {/* Search */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-8"
      >
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for answers..."
            className="w-full pl-14 pr-5 py-4 rounded-2xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all text-lg"
          />
        </div>
      </motion.div>

      {/* Category Filter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-wrap gap-2 mb-8"
      >
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
            !selectedCategory
              ? 'gradient-bg text-white shadow-lg shadow-amber-500/30'
              : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
          }`}
        >
          All Questions
        </button>
        {faqCategories.map(category => (
          <button
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
              selectedCategory === category.name
                ? 'gradient-bg text-white shadow-lg shadow-amber-500/30'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </motion.div>

      {/* Results Count */}
      <p className="text-stone-600 dark:text-stone-400 mb-6">
        Showing <span className="font-bold text-stone-900 dark:text-stone-100">{totalQuestions}</span> questions
      </p>

      {/* FAQ Sections */}
      <div className="space-y-8">
        {filteredCategories.map((category, catIndex) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + catIndex * 0.1 }}
          >
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              {category.name}
            </h2>
            <div className="space-y-3">
              {category.questions.map((faq, qIndex) => {
                const key = `${catIndex}-${qIndex}`;
                const isOpen = openQuestions[key];

                return (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 + catIndex * 0.1 + qIndex * 0.05 }}
                    className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(key)}
                      className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 dark:hover:bg-stone-700/50 transition-colors"
                    >
                      <span className="font-semibold text-stone-900 dark:text-stone-100 pr-4">
                        {faq.q}
                      </span>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <ChevronDown className="w-5 h-5 text-stone-500 flex-shrink-0" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="px-5 pb-5 text-stone-600 dark:text-stone-400 leading-relaxed border-t border-stone-100 dark:border-stone-700 pt-4">
                            {faq.a}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        ))}
      </div>

      {/* No Results */}
      {totalQuestions === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-16"
        >
          <HelpCircle className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No questions found
          </h3>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            Try a different search term or browse all categories
          </p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory(null); }}
            className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
          >
            Clear Filters
          </button>
        </motion.div>
      )}

      {/* Still Need Help */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-16 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-10 text-white text-center relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
        
        <div className="relative z-10 max-w-2xl mx-auto">
          <MessageCircle className="w-12 h-12 mx-auto mb-4" />
          <h2 className="font-serif text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Our support team is here to help! Reach out via live chat, email, or phone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="px-8 py-3 bg-white text-amber-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
            >
              Contact Support
            </Link>
            <a
              href="mailto:hello@terraandtable.com"
              className="px-8 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/30 transition-all"
            >
              Email Us
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
