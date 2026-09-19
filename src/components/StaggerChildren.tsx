import React from 'react';
import { motion } from 'framer-motion';

interface StaggerChildrenProps {
  children: React.ReactNode;
  staggerDelay?: number;
  direction?: 'vertical' | 'horizontal' | 'grid';
}

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function StaggerChildren({ 
  children, 
  staggerDelay = 0.1,
  direction = 'vertical'
}: StaggerChildrenProps) {
  const getLayoutClass = () => {
    switch (direction) {
      case 'horizontal':
        return 'flex gap-4';
      case 'grid':
        return 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
      default:
        return 'space-y-4';
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: '-50px' }}
      className={getLayoutClass()}
    >
      {React.Children.map(children, (child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, y: 20 },
            show: { 
              opacity: 1, 
              y: 0,
              transition: {
                delay: index * staggerDelay,
              }
            },
          }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
