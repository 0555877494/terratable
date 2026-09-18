import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cookie, X, Shield, Settings } from 'lucide-react';

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState({
    necessary: true,
    analytics: false,
    marketing: false,
    functional: false,
  });

  useEffect(() => {
    const consent = localStorage.getItem('terra_cookie_consent');
    if (!consent) {
      setTimeout(() => setIsVisible(true), 2000);
    }
  }, []);

  const acceptAll = () => {
    setPreferences({ necessary: true, analytics: true, marketing: true, functional: true });
    localStorage.setItem('terra_cookie_consent', JSON.stringify({ ...preferences, analytics: true, marketing: true, functional: true }));
    setIsVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem('terra_cookie_consent', JSON.stringify(preferences));
    setIsVisible(false);
  };

  const rejectAll = () => {
    setPreferences({ necessary: true, analytics: false, marketing: false, functional: false });
    localStorage.setItem('terra_cookie_consent', JSON.stringify({ necessary: true, analytics: false, marketing: false, functional: false }));
    setIsVisible(false);
  };

  if (!isVisible) return null;

  const cookieTypes = [
    { key: 'necessary', label: 'Necessary', desc: 'Required for the website to function', required: true },
    { key: 'functional', label: 'Functional', desc: 'Remember your preferences', required: false },
    { key: 'analytics', label: 'Analytics', desc: 'Help us improve the site', required: false },
    { key: 'marketing', label: 'Marketing', desc: 'Personalized offers', required: false },
  ];

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 100, opacity: 0 }}
        className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white dark:bg-stone-900 border-t-2 border-stone-200 dark:border-stone-700 shadow-2xl"
      >
        <div className="max-w-6xl mx-auto">
          {!showSettings ? (
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-3 flex-shrink-0">
                <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
                  <Cookie className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold text-stone-900 dark:text-stone-100">We use cookies 🍪</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400">
                    To enhance your experience and analyze site traffic
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-2 md:ml-auto">
                <button
                  onClick={() => setShowSettings(true)}
                  className="px-4 py-2 text-sm font-semibold text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg transition-colors flex items-center gap-1"
                >
                  <Settings className="w-4 h-4" /> Customize
                </button>
                <button
                  onClick={rejectAll}
                  className="px-4 py-2 text-sm font-semibold text-stone-700 dark:text-stone-300 border-2 border-stone-200 dark:border-stone-700 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  Reject All
                </button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={acceptAll}
                  className="px-6 py-2 text-sm font-bold gradient-bg text-white rounded-lg shadow-lg"
                >
                  Accept All
                </motion.button>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-amber-600" />
                  Cookie Preferences
                </h3>
                <button onClick={() => setShowSettings(false)} className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mb-4">
                {cookieTypes.map(type => (
                  <label
                    key={type.key}
                    className={`flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      preferences[type.key as keyof typeof preferences]
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                        : 'border-stone-200 dark:border-stone-700'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={preferences[type.key as keyof typeof preferences]}
                      onChange={e => setPreferences({ ...preferences, [type.key]: e.target.checked })}
                      disabled={type.required}
                      className="mt-1 w-4 h-4 accent-amber-500"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-stone-900 dark:text-stone-100">
                        {type.label}
                        {type.required && <span className="text-xs text-amber-600 ml-2">(Required)</span>}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">{type.desc}</p>
                    </div>
                  </label>
                ))}
              </div>
              <div className="flex gap-3">
                <button onClick={acceptSelected} className="flex-1 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg">
                  Save Preferences
                </button>
                <button onClick={acceptAll} className="px-6 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold">
                  Accept All
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
