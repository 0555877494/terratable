import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, MessageCircle, X } from 'lucide-react';

export default function GiftMessage() {
  const [isOpen, setIsOpen] = useState(false);
  const [recipientName, setRecipientName] = useState('');
  const [message, setMessage] = useState('');
  const [includeGiftWrap, setIncludeGiftWrap] = useState(false);

  const presetMessages = [
    'Happy Birthday! 🎂',
    'Congratulations! 🎉',
    'Thank you! 💝',
    'Enjoy! 🎁',
    'With love ❤️',
  ];

  if (!isOpen) {
    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(true)}
        className="w-full p-4 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-xl text-stone-600 dark:text-stone-400 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex items-center justify-center gap-2"
      >
        <Gift className="w-5 h-5" />
        <span className="font-semibold">Add a gift message</span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-amber-200 dark:border-amber-800 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100">Gift Message</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">Add a personal touch</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors"
        >
          <X className="w-5 h-5 text-stone-500" />
        </button>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
            Recipient Name
          </label>
          <input
            type="text"
            value={recipientName}
            onChange={e => setRecipientName(e.target.value)}
            placeholder="Who is this gift for?"
            className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
            <MessageCircle className="w-4 h-4 inline mr-1" />
            Your Message
          </label>
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Write a heartfelt message..."
            rows={3}
            maxLength={200}
            className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
          />
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1 text-right">
            {message.length}/200 characters
          </p>
        </div>

        {/* Preset Messages */}
        <div>
          <p className="text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">Quick messages:</p>
          <div className="flex flex-wrap gap-2">
            {presetMessages.map((preset, idx) => (
              <motion.button
                key={idx}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMessage(preset)}
                className="px-3 py-1.5 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-full text-xs font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/30 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
              >
                {preset}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Gift Wrap Option */}
        <label className="flex items-center gap-3 p-4 bg-amber-50 dark:bg-amber-900/20 rounded-xl cursor-pointer">
          <input
            type="checkbox"
            checked={includeGiftWrap}
            onChange={e => setIncludeGiftWrap(e.target.checked)}
            className="w-5 h-5 accent-amber-500"
          />
          <div className="flex-1">
            <p className="font-semibold text-stone-900 dark:text-stone-100">Add Gift Wrapping</p>
            <p className="text-xs text-stone-600 dark:text-stone-400">Beautiful packaging with ribbon (+$4.99)</p>
          </div>
        </label>

        {/* Preview */}
        {(recipientName || message) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800"
          >
            <p className="text-xs text-amber-700 dark:text-amber-300 font-semibold mb-2">Preview:</p>
            {recipientName && (
              <p className="text-sm font-bold text-stone-900 dark:text-stone-100 mb-1">
                Dear {recipientName},
              </p>
            )}
            {message && (
              <p className="text-sm text-stone-700 dark:text-stone-300 italic">
                "{message}"
              </p>
            )}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
