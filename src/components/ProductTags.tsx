import React from 'react';
import { motion } from 'framer-motion';
import { Tag } from 'lucide-react';

interface ProductTagsProps {
  tags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
}

export default function ProductTags({ tags, selectedTags, onTagToggle }: ProductTagsProps) {
  if (tags.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      <div className="flex items-center gap-1 text-sm font-semibold text-stone-600 dark:text-stone-400 mr-2">
        <Tag className="w-4 h-4" />
        Tags:
      </div>
      {tags.map((tag) => {
        const isSelected = selectedTags.includes(tag);
        return (
          <motion.button
            key={tag}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onTagToggle(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
              isSelected
                ? 'gradient-bg text-white shadow-md'
                : 'bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700'
            }`}
          >
            #{tag}
          </motion.button>
        );
      })}
    </div>
  );
}
