import React from 'react';

export default function Logo({ className = "w-12 h-12" }: { className?: string }) {
  return (
    <img 
      src="https://image.qwenlm.ai/generated-images/6223a0fa-c537-4c6a-9bbe-3803a7d3f364/_result.png"
      alt="Terra & Table Logo"
      className={className}
    />
  );
}
