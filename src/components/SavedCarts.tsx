import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Clock, Trash2, ShoppingBag, Check } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { CartItem } from '../types';

interface SavedCart {
  id: string;
  name: string;
  items: CartItem[];
  savedAt: string;
  total: number;
}

export default function SavedCarts() {
  const { cart, clearCart, addToCart } = useStore();
  const { showToast } = useToast();
  const [savedCarts, setSavedCarts] = useState<SavedCart[]>([]);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [cartName, setCartName] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('terra_saved_carts');
    if (saved) {
      setSavedCarts(JSON.parse(saved));
    }
  }, []);

  const handleSaveCart = () => {
    if (!cartName.trim()) {
      showToast('error', 'Please enter a name for your cart');
      return;
    }

    if (cart.length === 0) {
      showToast('error', 'Your cart is empty');
      return;
    }

    const newSavedCart: SavedCart = {
      id: Date.now().toString(),
      name: cartName,
      items: [...cart],
      savedAt: new Date().toISOString(),
      total: cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0)
    };

    const updated = [newSavedCart, ...savedCarts];
    setSavedCarts(updated);
    localStorage.setItem('terra_saved_carts', JSON.stringify(updated));
    
    showToast('success', `Cart "${cartName}" saved successfully!`);
    setCartName('');
    setShowSaveModal(false);
  };

  const handleLoadCart = (savedCart: SavedCart) => {
    if (cart.length > 0) {
      if (!confirm('Loading this cart will replace your current cart. Continue?')) {
        return;
      }
      clearCart();
    }

    savedCart.items.forEach(item => {
      for (let i = 0; i < item.quantity; i++) {
        addToCart(item.product);
      }
    });

    showToast('success', `Cart "${savedCart.name}" loaded!`);
  };

  const handleDeleteCart = (id: string) => {
    const updated = savedCarts.filter(c => c.id !== id);
    setSavedCarts(updated);
    localStorage.setItem('terra_saved_carts', JSON.stringify(updated));
    showToast('success', 'Saved cart deleted');
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
            <Save className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">Saved Carts</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">Save your carts for later</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowSaveModal(true)}
          disabled={cart.length === 0}
          className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Save className="w-4 h-4" />
          Save Current Cart
        </motion.button>
      </div>

      {/* Save Modal */}
      <AnimatePresence>
        {showSaveModal && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
          >
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Cart Name
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={cartName}
                onChange={e => setCartName(e.target.value)}
                placeholder="e.g., Holiday Shopping, Weekly Groceries"
                className="flex-1 px-4 py-2.5 rounded-lg border-2 border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSaveCart}
                className="px-6 py-2.5 gradient-bg text-white rounded-lg font-semibold shadow-lg"
              >
                Save
              </motion.button>
              <button
                onClick={() => {
                  setShowSaveModal(false);
                  setCartName('');
                }}
                className="px-4 py-2.5 border-2 border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-lg font-semibold hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Carts List */}
      {savedCarts.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-3" />
          <p className="text-stone-500 dark:text-stone-400">No saved carts yet</p>
          <p className="text-sm text-stone-400 dark:text-stone-500 mt-1">
            Save your current cart to load it later
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {savedCarts.map((savedCart, index) => (
            <motion.div
              key={savedCart.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl border-2 border-stone-200 dark:border-stone-600"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                    {savedCart.name}
                  </h4>
                  <div className="flex items-center gap-3 text-sm text-stone-500 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {new Date(savedCart.savedAt).toLocaleDateString()}
                    </span>
                    <span>•</span>
                    <span>{savedCart.items.length} items</span>
                    <span>•</span>
                    <span className="font-semibold text-amber-600 dark:text-amber-400">
                      ${savedCart.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                {savedCart.items.slice(0, 5).map((item, idx) => (
                  <img
                    key={idx}
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                  />
                ))}
                {savedCart.items.length > 5 && (
                  <div className="w-12 h-12 rounded-lg bg-stone-200 dark:bg-stone-600 flex items-center justify-center text-xs font-semibold text-stone-600 dark:text-stone-300 flex-shrink-0">
                    +{savedCart.items.length - 5}
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleLoadCart(savedCart)}
                  className="flex-1 py-2 gradient-bg text-white rounded-lg font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  Load Cart
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDeleteCart(savedCart.id)}
                  className="px-4 py-2 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg font-semibold text-sm hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
