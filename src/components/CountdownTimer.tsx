import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Clock, Zap } from 'lucide-react';

interface CountdownTimerProps {
  targetDate: string | Date;
  onComplete?: () => void;
  showLabels?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export default function CountdownTimer({ 
  targetDate, 
  onComplete,
  showLabels = true,
  size = 'md'
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();
    
    if (difference > 0) {
      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }

    return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeLeft();
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && 
          newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        onComplete?.();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const getSizeClasses = () => {
    switch (size) {
      case 'sm':
        return { box: 'w-14 h-14', text: 'text-xl', label: 'text-xs' };
      case 'lg':
        return { box: 'w-24 h-24', text: 'text-4xl', label: 'text-sm' };
      default:
        return { box: 'w-20 h-20', text: 'text-3xl', label: 'text-xs' };
    }
  };

  const sizeClasses = getSizeClasses();

  const timeUnits = [
    { value: timeLeft.days, label: 'Days' },
    { value: timeLeft.hours, label: 'Hours' },
    { value: timeLeft.minutes, label: 'Minutes' },
    { value: timeLeft.seconds, label: 'Seconds' },
  ];

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-amber-600 dark:text-amber-400">
        <Zap className="w-5 h-5" />
        {showLabels && <span className="font-semibold text-sm">Ends in:</span>}
      </div>
      
      <div className="flex gap-2">
        {timeUnits.map((unit, index) => (
          <motion.div
            key={unit.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="text-center"
          >
            <div className={`${sizeClasses.box} gradient-bg rounded-xl flex items-center justify-center shadow-lg`}>
              <motion.span
                key={unit.value}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`${sizeClasses.text} font-bold text-white`}
              >
                {String(unit.value).padStart(2, '0')}
              </motion.span>
            </div>
            {showLabels && (
              <span className={`${sizeClasses.label} text-stone-600 dark:text-stone-400 font-semibold mt-1 block`}>
                {unit.label}
              </span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
