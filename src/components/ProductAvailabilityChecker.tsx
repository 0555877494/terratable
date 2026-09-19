import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, XCircle, Loader } from 'lucide-react';

interface ProductAvailabilityCheckerProps {
  productId: string;
  productName: string;
}

export default function ProductAvailabilityChecker({ 
  productId, 
  productName 
}: ProductAvailabilityCheckerProps) {
  const [zipCode, setZipCode] = useState('');
  const [checking, setChecking] = useState(false);
  const [result, setResult] = useState<{
    available: boolean;
    deliveryDays: number;
    message: string;
  } | null>(null);

  const handleCheck = () => {
    if (!zipCode || zipCode.length < 5) {
      return;
    }

    setChecking(true);
    
    // Simulate API call
    setTimeout(() => {
      // Mock availability check
      const isAvailable = Math.random() > 0.2; // 80% chance available
      const deliveryDays = Math.floor(Math.random() * 5) + 2; // 2-6 days
      
      setResult({
        available: isAvailable,
        deliveryDays,
        message: isAvailable 
          ? `Available for delivery to ${zipCode}`
          : `Sorry, we don't deliver to ${zipCode} yet`
      });
      setChecking(false);
    }, 1500);
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100">
            Check Availability
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Enter your zip code to check delivery
          </p>
        </div>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={zipCode}
          onChange={e => setZipCode(e.target.value)}
          placeholder="Enter zip code"
          maxLength={10}
          className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
        />
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCheck}
          disabled={checking || zipCode.length < 5}
          className="px-6 py-3 gradient-bg text-white rounded-xl font-semibold shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {checking ? (
            <>
              <Loader className="w-4 h-4 animate-spin" />
              Checking
            </>
          ) : (
            'Check'
          )}
        </motion.button>
      </div>

      {/* Result */}
      {result && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`p-4 rounded-xl border-2 ${
            result.available
              ? 'bg-emerald-50 dark:bg-emerald-900/20 border-emerald-200 dark:border-emerald-800'
              : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
          }`}
        >
          <div className="flex items-start gap-3">
            {result.available ? (
              <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
            ) : (
              <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
            )}
            <div className="flex-1">
              <p className={`font-semibold ${
                result.available
                  ? 'text-emerald-700 dark:text-emerald-300'
                  : 'text-red-700 dark:text-red-300'
              }`}>
                {result.message}
              </p>
              {result.available && (
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                  Estimated delivery: {result.deliveryDays} business days
                </p>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
