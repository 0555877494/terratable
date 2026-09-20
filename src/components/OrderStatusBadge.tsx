import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Package, Truck, AlertCircle } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: string;
  size?: 'sm' | 'md' | 'lg';
  showIcon?: boolean;
}

export default function OrderStatusBadge({ 
  status, 
  size = 'md',
  showIcon = true 
}: OrderStatusBadgeProps) {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          label: 'Pending',
          icon: <Clock className="w-4 h-4" />,
          color: 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 border-amber-200 dark:border-amber-800'
        };
      case 'confirmed':
        return {
          label: 'Confirmed',
          icon: <CheckCircle className="w-4 h-4" />,
          color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
        };
      case 'preparing':
        return {
          label: 'Preparing',
          icon: <Package className="w-4 h-4" />,
          color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
        };
      case 'out_for_delivery':
        return {
          label: 'Out for Delivery',
          icon: <Truck className="w-4 h-4" />,
          color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 border-orange-200 dark:border-orange-800'
        };
      case 'delivered':
        return {
          label: 'Delivered',
          icon: <CheckCircle className="w-4 h-4" />,
          color: 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          icon: <AlertCircle className="w-4 h-4" />,
          color: 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800'
        };
      default:
        return {
          label: status,
          icon: <Clock className="w-4 h-4" />,
          color: 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 border-stone-200 dark:border-stone-600'
        };
    }
  };

  const config = getStatusConfig();

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return 'px-2 py-1 text-xs';
      case 'lg':
        return 'px-4 py-2 text-base';
      default:
        return 'px-3 py-1.5 text-sm';
    }
  };

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 rounded-full font-semibold border ${config.color} ${getSizeClasses()}`}
    >
      {showIcon && config.icon}
      {config.label}
    </motion.span>
  );
}
