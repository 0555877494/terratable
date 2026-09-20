import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, CheckCircle, XCircle, Clock } from 'lucide-react';

interface ProductAvailabilityProps {
  productId: string;
  userRegion?: string;
}

export default function ProductAvailability({ productId, userRegion }: ProductAvailabilityProps) {
  // Mock availability data by region
  const availability = {
    'US': { available: true, estimatedDays: 2, stock: 45 },
    'CA': { available: true, estimatedDays: 5, stock: 23 },
    'UK': { available: true, estimatedDays: 7, stock: 12 },
    'GH': { available: true, estimatedDays: 10, stock: 8 },
    'EU': { available: true, estimatedDays: 6, stock: 30 },
    'ASIA': { available: false, estimatedDays: 0, stock: 0 },
  };

  const region = userRegion || 'US';
  const data = availability[region as keyof typeof availability];

  if (!data.available) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl"
      >
        <XCircle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0" />
        <div>
          <p className="font-semibold text-red-800 dark:text-red-200">
            Not available in your region
          </p>
          <p className="text-sm text-red-600 dark:text-red-400">
            This product is currently not shipped to {region}
          </p>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl"
    >
      <CheckCircle className="w-6 h-6 text-emerald-600 dark:text-emerald-400 flex-shrink-0" />
      <div className="flex-1">
        <p className="font-semibold text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <MapPin className="w-4 h-4" />
          Available in {region}
        </p>
        <div className="flex items-center gap-4 mt-1 text-sm text-emerald-700 dark:text-emerald-300">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {data.estimatedDays} day delivery
          </span>
          <span>•</span>
          <span>{data.stock} in stock</span>
        </div>
      </div>
    </motion.div>
  );
}
