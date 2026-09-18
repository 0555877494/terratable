import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, Package, Truck } from 'lucide-react';

interface OrderTimelineProps {
  status: string;
}

export default function OrderTimeline({ status }: OrderTimelineProps) {
  const steps = [
    { id: 'pending', label: 'Pending', icon: Clock },
    { id: 'confirmed', label: 'Confirmed', icon: CheckCircle },
    { id: 'preparing', label: 'Preparing', icon: Package },
    { id: 'out_for_delivery', label: 'Out for Delivery', icon: Truck },
    { id: 'delivered', label: 'Delivered', icon: CheckCircle }
  ];

  const currentIndex = steps.findIndex(s => s.id === status);

  return (
    <div className="w-full">
      <div className="flex items-center justify-between relative">
        {/* Progress line */}
        <div className="absolute top-5 left-0 right-0 h-0.5 bg-terra-100">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-terra-500 to-sage-500"
          />
        </div>

        {/* Steps */}
        {steps.map((step, index) => {
          const isCompleted = index <= currentIndex;
          const isCurrent = index === currentIndex;
          const Icon = step.icon;

          return (
            <div key={step.id} className="relative flex flex-col items-center z-10">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all ${
                  isCompleted
                    ? 'bg-gradient-to-br from-terra-500 to-sage-500 border-transparent text-white shadow-lg'
                    : 'bg-white border-terra-200 text-terra-400'
                } ${isCurrent ? 'ring-4 ring-terra-100' : ''}`}
              >
                <Icon className="w-5 h-5" />
              </motion.div>
              <span className={`mt-2 text-xs font-medium text-center ${
                isCompleted ? 'text-terra-700' : 'text-terra-400'
              }`}>
                {step.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
