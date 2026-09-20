import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Plus, Trash2, Check, Shield } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface PaymentMethod {
  id: string;
  type: 'visa' | 'mastercard' | 'amex';
  last4: string;
  expiryMonth: string;
  expiryYear: string;
  isDefault: boolean;
}

export default function SavedPaymentMethods() {
  const { showToast } = useToast();
  const [methods, setMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2025',
      isDefault: true
    },
    {
      id: '2',
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '06',
      expiryYear: '2026',
      isDefault: false
    }
  ]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newCard, setNewCard] = useState({
    number: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    name: ''
  });

  const handleAddCard = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCard.number || !newCard.expiryMonth || !newCard.expiryYear || !newCard.cvv || !newCard.name) {
      showToast('error', 'Please fill in all fields');
      return;
    }
    
    const cardType = newCard.number.startsWith('4') ? 'visa' : 'mastercard';
    const newMethod: PaymentMethod = {
      id: Date.now().toString(),
      type: cardType as any,
      last4: newCard.number.slice(-4),
      expiryMonth: newCard.expiryMonth,
      expiryYear: newCard.expiryYear,
      isDefault: methods.length === 0
    };
    
    setMethods([...methods, newMethod]);
    setNewCard({ number: '', expiryMonth: '', expiryYear: '', cvv: '', name: '' });
    setShowAddForm(false);
    showToast('success', 'Payment method added successfully!');
  };

  const handleDelete = (id: string) => {
    setMethods(methods.filter(m => m.id !== id));
    showToast('success', 'Payment method removed');
  };

  const handleSetDefault = (id: string) => {
    setMethods(methods.map(m => ({ ...m, isDefault: m.id === id })));
    showToast('success', 'Default payment method updated');
  };

  const getCardIcon = (type: string) => {
    switch (type) {
      case 'visa': return '💳';
      case 'mastercard': return '💳';
      case 'amex': return '💳';
      default: return '💳';
    }
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
            <CreditCard className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">Saved Payment Methods</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">Manage your payment methods</p>
          </div>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowAddForm(!showAddForm)}
          className="px-4 py-2 gradient-bg text-white rounded-lg font-semibold text-sm shadow-lg flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New
        </motion.button>
      </div>

      {/* Add Card Form */}
      {showAddForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          onSubmit={handleAddCard}
          className="mb-6 p-5 bg-stone-50 dark:bg-stone-700/50 rounded-xl space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Card Number
            </label>
            <input
              type="text"
              value={newCard.number}
              onChange={e => setNewCard({ ...newCard, number: e.target.value.replace(/\D/g, '').slice(0, 16) })}
              placeholder="1234 5678 9012 3456"
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none font-mono"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Cardholder Name
            </label>
            <input
              type="text"
              value={newCard.name}
              onChange={e => setNewCard({ ...newCard, name: e.target.value })}
              placeholder="John Doe"
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Month
              </label>
              <input
                type="text"
                value={newCard.expiryMonth}
                onChange={e => setNewCard({ ...newCard, expiryMonth: e.target.value.slice(0, 2) })}
                placeholder="MM"
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-center font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Year
              </label>
              <input
                type="text"
                value={newCard.expiryYear}
                onChange={e => setNewCard({ ...newCard, expiryYear: e.target.value.slice(0, 4) })}
                placeholder="YYYY"
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-center font-mono"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                CVV
              </label>
              <input
                type="text"
                value={newCard.cvv}
                onChange={e => setNewCard({ ...newCard, cvv: e.target.value.replace(/\D/g, '').slice(0, 4) })}
                placeholder="123"
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-center font-mono"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
            >
              Add Card
            </motion.button>
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-6 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      {/* Saved Methods */}
      <div className="space-y-3">
        {methods.map((method, index) => (
          <motion.div
            key={method.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
              method.isDefault
                ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                : 'border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-700/50'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="text-3xl">{getCardIcon(method.type)}</div>
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-bold text-stone-900 dark:text-stone-100 capitalize">
                    {method.type} •••• {method.last4}
                  </p>
                  {method.isDefault && (
                    <span className="px-2 py-0.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Expires {method.expiryMonth}/{method.expiryYear}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!method.isDefault && (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSetDefault(method.id)}
                  className="px-3 py-1.5 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-sm font-semibold hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                >
                  Set Default
                </motion.button>
              )}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDelete(method.id)}
                className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>

      {methods.length === 0 && !showAddForm && (
        <div className="text-center py-8">
          <CreditCard className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-3" />
          <p className="text-stone-500 dark:text-stone-400 mb-4">No saved payment methods</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowAddForm(true)}
            className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
          >
            Add Your First Card
          </motion.button>
        </div>
      )}

      {/* Security Note */}
      <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl border border-emerald-200 dark:border-emerald-800">
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-emerald-600 dark:text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200 mb-1">
              Secure & Encrypted
            </p>
            <p className="text-xs text-emerald-700 dark:text-emerald-300">
              Your payment information is encrypted and securely stored. We never store your full card number or CVV.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
