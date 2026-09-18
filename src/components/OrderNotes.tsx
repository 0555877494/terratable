import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FileText, Edit2, Save } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function OrderNotes() {
  const [notes, setNotes] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const { showToast } = useToast();

  const handleSave = () => {
    setIsEditing(false);
    showToast('success', 'Order notes saved!');
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 gradient-bg rounded-xl flex items-center justify-center">
            <FileText className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100">Order Notes</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">Special instructions for your order</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className="px-4 py-2 text-sm font-semibold gradient-bg text-white rounded-lg shadow-lg flex items-center gap-2"
        >
          {isEditing ? (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          ) : (
            <>
              <Edit2 className="w-4 h-4" />
              Edit
            </>
          )}
        </motion.button>
      </div>

      {isEditing ? (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="Add special instructions, delivery notes, or gift messages..."
            rows={4}
            maxLength={500}
            className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
          />
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-2 text-right">
            {notes.length}/500 characters
          </p>
          <div className="mt-3 p-3 bg-amber-50 dark:bg-amber-900/20 rounded-lg">
            <p className="text-xs text-amber-700 dark:text-amber-300">
              💡 Examples: "Leave at door if not home", "Call before delivery", "This is a gift - please include gift receipt"
            </p>
          </div>
        </motion.div>
      ) : (
        <div className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
          {notes ? (
            <p className="text-stone-700 dark:text-stone-300 whitespace-pre-wrap">{notes}</p>
          ) : (
            <p className="text-stone-400 dark:text-stone-500 italic">No notes added yet</p>
          )}
        </div>
      )}
    </div>
  );
}
