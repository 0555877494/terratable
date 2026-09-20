import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, DollarSign, Check } from 'lucide-react';
import { useI18n, languageNames, currencyNames, currencySymbols } from '../contexts/I18nContext';
import type { Language, Currency } from '../contexts/I18nContext';

export default function LanguageCurrencySwitcher() {
  const { language, currency, setLanguage, setCurrency } = useI18n();
  const [isOpen, setIsOpen] = useState(false);

  const languages: Language[] = ['en', 'es', 'fr', 'zh', 'ar'];
  const currencies: Currency[] = ['USD', 'EUR', 'GBP', 'GHS', 'JPY'];

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 rounded-full bg-white/80 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-600 transition-all text-sm font-semibold text-stone-700 dark:text-stone-300"
      >
        <Globe className="w-4 h-4" />
        <span>{languageNames[language]}</span>
        <span className="text-stone-400">|</span>
        <DollarSign className="w-4 h-4" />
        <span>{currencySymbols[currency]}</span>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              className="absolute right-0 mt-2 w-72 bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border border-stone-200 dark:border-stone-700 py-3 z-50 overflow-hidden"
            >
              {/* Language Section */}
              <div className="px-4 py-2 border-b border-stone-100 dark:border-stone-700">
                <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Language
                </p>
                <div className="space-y-1">
                  {languages.map(lang => (
                    <button
                      key={lang}
                      onClick={() => {
                        setLanguage(lang);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        language === lang
                          ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 font-semibold'
                          : 'hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span>{languageNames[lang]}</span>
                      {language === lang && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>

              {/* Currency Section */}
              <div className="px-4 py-2">
                <p className="text-xs font-bold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-2">
                  Currency
                </p>
                <div className="space-y-1">
                  {currencies.map(curr => (
                    <button
                      key={curr}
                      onClick={() => {
                        setCurrency(curr);
                        setIsOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-all ${
                        currency === curr
                          ? 'bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 font-semibold'
                          : 'hover:bg-stone-50 dark:hover:bg-stone-700 text-stone-700 dark:text-stone-300'
                      }`}
                    >
                      <span>
                        {currencySymbols[curr]} {currencyNames[curr]}
                      </span>
                      {currency === curr && <Check className="w-4 h-4" />}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
