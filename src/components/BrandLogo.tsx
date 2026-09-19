import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  variant?: 'primary' | 'white' | 'icon';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  animated?: boolean;
}

export default function Logo({ 
  variant = 'primary', 
  size = 'md', 
  className = '',
  animated = false 
}: LogoProps) {
  const sizes = {
    sm: { width: 32, height: 32, text: 'text-sm' },
    md: { width: 48, height: 48, text: 'text-base' },
    lg: { width: 64, height: 64, text: 'text-lg' },
    xl: { width: 96, height: 96, text: 'text-xl' },
  };

  const currentSize = sizes[size];

  const colors = {
    primary: {
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      text: 'text-stone-900',
      leaf: '#22c55e',
    },
    white: {
      gradient: 'from-white via-white to-white',
      text: 'text-white',
      leaf: '#86efac',
    },
    icon: {
      gradient: 'from-amber-500 via-orange-500 to-red-500',
      text: 'text-stone-900',
      leaf: '#22c55e',
    },
  };

  const currentColors = colors[variant];

  const LogoIcon = () => (
    <svg
      width={currentSize.width}
      height={currentSize.height}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#22c55e" />
          <stop offset="100%" stopColor="#16a34a" />
        </linearGradient>
      </defs>
      
      {/* Background Circle */}
      <circle cx="50" cy="50" r="48" fill="url(#logoGradient)" />
      
      {/* Fork Design */}
      <g transform="translate(50, 50)">
        {/* Fork Tines */}
        <rect x="-18" y="-25" width="4" height="20" rx="2" fill="white" opacity="0.95" />
        <rect x="-8" y="-25" width="4" height="20" rx="2" fill="white" opacity="0.95" />
        <rect x="2" y="-25" width="4" height="20" rx="2" fill="white" opacity="0.95" />
        <rect x="12" y="-25" width="4" height="20" rx="2" fill="white" opacity="0.95" />
        
        {/* Fork Base */}
        <rect x="-20" y="-8" width="40" height="5" rx="2.5" fill="white" opacity="0.95" />
        
        {/* Fork Handle */}
        <rect x="-2.5" y="-5" width="5" height="30" rx="2.5" fill="white" opacity="0.95" />
        
        {/* Leaf Accent */}
        <path 
          d="M 10 -15 Q 20 -20 22 -10 Q 24 0 15 2 Q 6 4 5 -5 Q 4 -14 10 -15 Z" 
          fill="url(#leafGradient)" 
          opacity="0.9"
        />
        
        {/* Leaf Vein */}
        <path 
          d="M 12 -13 Q 16 -8 17 -2" 
          stroke="white" 
          strokeWidth="1" 
          fill="none" 
          opacity="0.6"
        />
      </g>
      
      {/* Outer Ring */}
      <circle 
        cx="50" 
        cy="50" 
        r="46" 
        stroke="white" 
        strokeWidth="1.5" 
        fill="none" 
        opacity="0.2"
      />
    </svg>
  );

  if (variant === 'icon') {
    return animated ? (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 20 }}
      >
        <LogoIcon />
      </motion.div>
    ) : (
      <LogoIcon />
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {animated ? (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 20 }}
        >
          <LogoIcon />
        </motion.div>
      ) : (
        <LogoIcon />
      )}
      
      {(variant === 'primary' || variant === 'white') && (
        <div className="flex flex-col">
          <span className={`font-serif font-bold ${currentSize.text} ${currentColors.text} leading-tight`}>
            Terra & Table
          </span>
          <span className={`text-xs ${currentColors.text} opacity-70 tracking-wider uppercase`}>
            Artisan Marketplace
          </span>
        </div>
      )}
    </div>
  );
}
