import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Truck, MapPin, Calculator, Package } from 'lucide-react';

interface ShippingCalculatorProps {
  cartTotal: number;
}

export default function ShippingCalculator({ cartTotal }: ShippingCalculatorProps) {
  const [country, setCountry] = useState('US');
  const [zipCode, setZipCode] = useState('');
  const [showResult, setShowResult] = useState(false);

  const shippingRates = {
    US: { standard: 7.99, express: 15.99, overnight: 29.99, freeThreshold: 50 },
    CA: { standard: 12.99, express: 24.99, overnight: 44.99, freeThreshold: 75 },
    UK: { standard: 19.99, express: 39.99, overnight: 69.99, freeThreshold: 100 },
    GH: { standard: 14.99, express: 29.99, overnight: 49.99, freeThreshold: 60 },
    OTHER: { standard: 24.99, express: 49.99, overnight: 89.99, freeThreshold: 150 },
  };

  const calculateShipping = () => {
    const rate = shippingRates[country as keyof typeof shippingRates] || shippingRates.OTHER;
    const isFree = cartTotal >= rate.freeThreshold;
    
    return {
      standard: isFree ? 0 : rate.standard,
      express: isFree ? rate.standard : rate.express,
      overnight: isFree ? rate.standard : rate.overnight,
      freeShipping: isFree,
    };
  };

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    setShowResult(true);
  };

  const shipping = calculateShipping();

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
          <Truck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100">Shipping Calculator</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">Estimate delivery costs</p>
        </div>
      </div>

      <form onSubmit={handleCalculate} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
            <MapPin className="w-4 h-4 inline mr-1" />
            Country
          </label>
          <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
          >
            <option value="US">United States</option>
            <option value="CA">Canada</option>
            <option value="UK">United Kingdom</option>
            <option value="GH">Ghana</option>
            <option value="OTHER">Other International</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
            <Package className="w-4 h-4 inline mr-1" />
            ZIP/Postal Code (Optional)
          </label>
          <input
            type="text"
            value={zipCode}
            onChange={(e) => setZipCode(e.target.value)}
            placeholder="Enter ZIP code"
            className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
          />
        </div>

        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
        >
          <Calculator className="w-5 h-5" />
          Calculate Shipping
        </motion.button>
      </form>

      {showResult && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-6 space-y-3"
        >
          {shipping.freeShipping && (
            <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl">
              <p className="text-emerald-700 dark:text-emerald-300 font-bold text-center">
                🎉 You qualify for FREE shipping!
              </p>
            </div>
          )}

          <div className="space-y-2">
            <div className="flex justify-between items-center p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
              <div>
                <p className="font-semibold text-stone-900 dark:text-stone-100">Standard Shipping</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">5-7 business days</p>
              </div>
              <p className="font-bold text-stone-900 dark:text-stone-100">
                {shipping.standard === 0 ? 'FREE' : `$${shipping.standard.toFixed(2)}`}
              </p>
            </div>

            <div className="flex justify-between items-center p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
              <div>
                <p className="font-semibold text-stone-900 dark:text-stone-100">Express Shipping</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">2-3 business days</p>
              </div>
              <p className="font-bold text-stone-900 dark:text-stone-100">
                ${shipping.express.toFixed(2)}
              </p>
            </div>

            <div className="flex justify-between items-center p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
              <div>
                <p className="font-semibold text-stone-900 dark:text-stone-100">Overnight Shipping</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">Next business day</p>
              </div>
              <p className="font-bold text-stone-900 dark:text-stone-100">
                ${shipping.overnight.toFixed(2)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
