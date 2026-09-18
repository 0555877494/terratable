import React from 'react';

export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 200 200" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle with gradient */}
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f59e0b" />
          <stop offset="50%" stopColor="#d97706" />
          <stop offset="100%" stopColor="#b45309" />
        </linearGradient>
        <linearGradient id="leafGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      
      {/* Main circle */}
      <circle cx="100" cy="100" r="95" fill="url(#logoGradient)" />
      
      {/* Stylized T with fork and leaf */}
      <g transform="translate(100, 100)">
        {/* Fork tines (top of T) */}
        <rect x="-35" y="-45" width="8" height="35" rx="4" fill="white" opacity="0.95" />
        <rect x="-15" y="-45" width="8" height="35" rx="4" fill="white" opacity="0.95" />
        <rect x="5" y="-45" width="8" height="35" rx="4" fill="white" opacity="0.95" />
        <rect x="25" y="-45" width="8" height="35" rx="4" fill="white" opacity="0.95" />
        
        {/* Fork base (horizontal bar of T) */}
        <rect x="-40" y="-15" width="78" height="10" rx="5" fill="white" opacity="0.95" />
        
        {/* Fork handle (vertical stem of T) */}
        <rect x="-5" y="-10" width="10" height="55" rx="5" fill="white" opacity="0.95" />
        
        {/* Leaf accent */}
        <path 
          d="M 20 -25 Q 35 -35 40 -20 Q 45 -5 30 0 Q 15 5 10 -10 Q 5 -25 20 -25 Z" 
          fill="url(#leafGradient)" 
          opacity="0.9"
        />
        
        {/* Leaf vein */}
        <path 
          d="M 22 -22 Q 30 -15 32 -5" 
          stroke="white" 
          strokeWidth="1.5" 
          fill="none" 
          opacity="0.6"
        />
      </g>
      
      {/* Outer ring accent */}
      <circle 
        cx="100" 
        cy="100" 
        r="90" 
        stroke="white" 
        strokeWidth="2" 
        fill="none" 
        opacity="0.2"
      />
    </svg>
  );
}
