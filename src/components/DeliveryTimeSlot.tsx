import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Clock, Calendar, Truck } from 'lucide-react';

export default function DeliveryTimeSlot() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      value: date.toISOString().split('T')[0],
      label: date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }),
      day: date.getDate(),
      weekday: date.toLocaleDateString('en-US', { weekday: 'short' }),
    };
  });

  const timeSlots = [
    { value: '09:00-12:00', label: '9:00 AM - 12:00 PM', icon: '🌅' },
    { value: '12:00-15:00', label: '12:00 PM - 3:00 PM', icon: '☀️' },
    { value: '15:00-18:00', label: '3:00 PM - 6:00 PM', icon: '🌤️' },
    { value: '18:00-21:00', label: '6:00 PM - 9:00 PM', icon: '🌆' },
  ];

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
          <Truck className="w-5 h-5 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100">Delivery Time Slot</h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">Choose when you want to receive your order</p>
        </div>
      </div>

      {/* Date Selection */}
      <div className="mb-5">
        <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
          <Calendar className="w-4 h-4" />
          Select Date
        </label>
        <div className="grid grid-cols-7 gap-2">
          {dates.map(date => (
            <motion.button
              key={date.value}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setSelectedDate(date.value)}
              className={`p-3 rounded-xl text-center transition-all ${
                selectedDate === date.value
                  ? 'gradient-bg text-white shadow-lg'
                  : 'bg-stone-50 dark:bg-stone-700/50 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
              }`}
            >
              <div className="text-xs font-medium">{date.weekday}</div>
              <div className="text-lg font-bold">{date.day}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-3">
            <Clock className="w-4 h-4" />
            Select Time
          </label>
          <div className="grid grid-cols-2 gap-3">
            {timeSlots.map(slot => (
              <motion.button
                key={slot.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedTime(slot.value)}
                className={`p-4 rounded-xl text-left transition-all ${
                  selectedTime === slot.value
                    ? 'gradient-bg text-white shadow-lg'
                    : 'bg-stone-50 dark:bg-stone-700/50 text-stone-700 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-700'
                }`}
              >
                <div className="text-2xl mb-1">{slot.icon}</div>
                <div className="text-sm font-semibold">{slot.label}</div>
              </motion.button>
            ))}
          </div>
        </motion.div>
      )}

      {/* Summary */}
      {selectedDate && selectedTime && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-5 p-4 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl"
        >
          <p className="text-sm text-emerald-700 dark:text-emerald-300 font-semibold">
            ✓ Delivery scheduled for {dates.find(d => d.value === selectedDate)?.label} at {timeSlots.find(t => t.value === selectedTime)?.label}
          </p>
        </motion.div>
      )}
    </div>
  );
}
