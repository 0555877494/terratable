import React from 'react';
import { motion } from 'framer-motion';
import { Tag, X } from 'lucide-react';

interface ProductFilterTagsProps {
  availableTags: string[];
  selectedTags: string[];
  onTagToggle: (tag: string) => void;
  onClearAll: () => void;
}

export default function ProductFilterTags({ 
  availableTags, 
  selectedTags, 
  onTagToggle,
  onClearAll
}: ProductFilterTagsProps) {
  if (availableTags.length === 0) return null;

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Tag className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-stone-900 dark:text-stone-100">
            Filter by Tags
          </h3>
        </div>
        {selectedTags.length > 0 && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClearAll}
            className="px-3 py-1.5 text-sm font-semibold text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Clear All
          </motion.button>
        )}
      </div>

      <div className="flex flex-wrap gap-2">
        {availableTags.map((tag, index) => {
          const isSelected = selectedTags.includes(tag);
          
          return (
            <motion.button
              key={tag}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.02 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onTagToggle(tag)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                isSelected
                  ? 'gradient-bg text-white shadow-lg shadow-amber-500/30'
                  : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
              }`}
            >
              #{tag}
              {isSelected && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="ml-2 inline-block"
                >
                  ✓
                </motion.span>
              )}
            </motion.button>
          );
        })}
      </div>

      {selectedTags.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl border border-amber-200 dark:border-amber-800"
        >
          <p className="text-sm text-amber-700 dark:text-amber-300">
            <span className="font-semibold">{selectedTags.length}</span> tag{selectedTags.length > 1 ? 's' : ''} selected
          </p>
        </motion.div>
      )}
    </div>
  );
}
