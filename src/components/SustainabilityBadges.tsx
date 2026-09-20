import React from 'react';
import { motion } from 'framer-motion';
import { Leaf, Award, Recycle, Heart, Globe } from 'lucide-react';

interface SustainabilityBadgeProps {
  badges: ('organic' | 'fair-trade' | 'eco-friendly' | 'vegan' | 'sustainable')[];
  size?: 'sm' | 'md' | 'lg';
}

export default function SustainabilityBadges({ badges, size = 'md' }: SustainabilityBadgeProps) {
  const badgeConfig = {
    organic: {
      icon: <Leaf className="w-4 h-4" />,
      label: 'Organic',
      color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
    },
    'fair-trade': {
      icon: <Heart className="w-4 h-4" />,
      label: 'Fair Trade',
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
    },
    'eco-friendly': {
      icon: <Recycle className="w-4 h-4" />,
      label: 'Eco-Friendly',
      color: 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800'
    },
    vegan: {
      icon: <Leaf className="w-4 h-4" />,
      label: 'Vegan',
      color: 'bg-lime-100 dark:bg-lime-900/30 text-lime-700 dark:text-lime-300 border-lime-200 dark:border-lime-800'
    },
    sustainable: {
      icon: <Globe className="w-4 h-4" />,
      label: 'Sustainable',
      color: 'bg-teal-100 dark:bg-teal-900/30 text-teal-700 dark:text-teal-300 border-teal-200 dark:border-teal-800'
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2 text-sm';
      default:
        return 'px-3 py-1.5 text-xs';
    }
  };

  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {badges.map((badge, index) => {
        const config = badgeConfig[badge];
        return (
          <motion.div
            key={badge}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            className={`inline-flex items-center gap-1.5 rounded-full border ${config.color} ${getSizeClasses()} font-semibold`}
          >
            {config.icon}
            <span>{config.label}</span>
          </motion.div>
        );
      })}
    </div>
  );
}
