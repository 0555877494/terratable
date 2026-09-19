import React from 'react';
import { motion } from 'framer-motion';

interface AnimatedTextProps {
  text: string;
  className?: string;
  delay?: number;
  animation?: 'fade' | 'slide' | 'typewriter' | 'bounce';
}

export default function AnimatedText({ 
  text, 
  className = '',
  delay = 0,
  animation = 'fade'
}: AnimatedTextProps) {
  const getAnimation = () => {
    switch (animation) {
      case 'slide':
        return {
          initial: { opacity: 0, x: -50 },
          animate: { opacity: 1, x: 0 },
          transition: { duration: 0.6, delay }
        };
      case 'typewriter':
        return {
          initial: { width: 0 },
          animate: { width: 'auto' },
          transition: { duration: 1, delay }
        };
      case 'bounce':
        return {
          initial: { opacity: 0, y: -50 },
          animate: { 
            opacity: 1, 
            y: 0,
            transition: {
              type: 'spring',
              stiffness: 260,
              damping: 20,
              delay
            }
          }
        };
      default: // fade
        return {
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          transition: { duration: 0.6, delay }
        };
    }
  };

  if (animation === 'typewriter') {
    return (
      <motion.div
        className={`overflow-hidden ${className}`}
        {...getAnimation()}
      >
        <span className="inline-block whitespace-nowrap">{text}</span>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      {...getAnimation()}
    >
      {text}
    </motion.div>
  );
}

// Word-by-word animation
interface AnimatedWordsProps {
  text: string;
  className?: string;
  delay?: number;
}

export function AnimatedWords({ text, className = '', delay = 0 }: AnimatedWordsProps) {
  const words = text.split(' ');

  return (
    <motion.div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.5,
            delay: delay + index * 0.1,
          }}
          className="inline-block mr-2"
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
