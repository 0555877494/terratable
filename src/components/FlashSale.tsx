import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Clock } from 'lucide-react';

export default function FlashSale() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        let { hours, minutes, seconds } = prev;
        
        if (seconds > 0) {
          seconds--;
        } else if (minutes > 0) {
          minutes--;
          seconds = 59;
        } else if (hours > 0) {
          hours--;
          minutes = 59;
          seconds = 59;
        }
        
        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-r from-red-600 via-orange-600 to-red-600 text-white py-1.5 px-4 relative overflow-hidden"
    >
      {/* Animated background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-32 h-32 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-yellow-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
          >
            <Zap className="w-8 h-8 fill-yellow-300 text-yellow-300" />
          </motion.div>
          <div>
            <h3 className="font-bold text-lg sm:text-xl">Flash Sale!</h3>
            <p className="text-sm text-white/90">Up to 50% off selected items</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Clock className="w-5 h-5" />
          <div className="flex gap-2">
            {[
              { value: formatTime(timeLeft.hours), label: 'HRS' },
              { value: formatTime(timeLeft.minutes), label: 'MIN' },
              { value: formatTime(timeLeft.seconds), label: 'SEC' }
            ].map((item, idx) => (
              <div key={idx} className="flex items-center gap-2">
                <div className="bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2 min-w-[60px] text-center">
                  <div className="text-2xl font-bold">{item.value}</div>
                  <div className="text-[10px] uppercase tracking-wider">{item.label}</div>
                </div>
                {idx < 2 && <span className="text-2xl font-bold">:</span>}
              </div>
            ))}
          </div>
        </div>

        <motion.a
          href="#products"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-white text-red-600 px-6 py-2.5 rounded-full font-bold text-sm shadow-lg hover:shadow-xl transition-all"
        >
          Shop Now →
        </motion.a>
      </div>
    </motion.div>
  );
}
