import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Package, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function ReturnRequest() {
  const { user } = useAuth();
  const { getOrdersForUser } = useStore();
  const { showToast } = useToast();
  const [selectedOrder, setSelectedOrder] = useState<string>('');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [reason, setReason] = useState('');
  const [comments, setComments] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!user) return null;

  const deliveredOrders = getOrdersForUser(user.id).filter(o => o.status === 'delivered');

  const reasons = [
    'Item damaged or defective',
    'Wrong item received',
    'Item not as described',
    'Changed my mind',
    'Better price available',
    'Other'
  ];

  const handleItemToggle = (itemId: string) => {
    setSelectedItems(prev =>
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedOrder || selectedItems.length === 0 || !reason) {
      showToast('error', 'Please fill in all required fields');
      return;
    }
    setSubmitted(true);
    showToast('success', 'Return request submitted successfully!');
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl"
          >
            <CheckCircle className="w-12 h-12 text-white" />
          </motion.div>
          <h2 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
            Return Request Submitted!
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mb-2">
            We've received your return request
          </p>
          <p className="text-sm text-stone-500 dark:text-stone-500 mb-6">
            You'll receive an email with return instructions within 24 hours
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              setSubmitted(false);
              setSelectedOrder('');
              setSelectedItems([]);
              setReason('');
              setComments('');
            }}
            className="px-8 py-3 gradient-bg text-white rounded-full font-bold shadow-lg"
          >
            Submit Another Return
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const order = deliveredOrders.find(o => o.id === selectedOrder);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <RotateCcw className="w-8 h-8 text-amber-600" />
          <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100">
            Return Request
          </h1>
        </div>
        <p className="text-stone-600 dark:text-stone-400">
          Return items from your delivered orders
        </p>
      </motion.div>

      {deliveredOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700"
        >
          <Package className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No Delivered Orders
          </h3>
          <p className="text-stone-500 dark:text-stone-400">
            You can only return items from delivered orders
          </p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Select Order */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
          >
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
              Select Order *
            </label>
            <select
              value={selectedOrder}
              onChange={e => {
                setSelectedOrder(e.target.value);
                setSelectedItems([]);
              }}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
            >
              <option value="">Choose an order...</option>
              {deliveredOrders.map(order => (
                <option key={order.id} value={order.id}>
                  Order #{order.id.slice(-6).toUpperCase()} - {new Date(order.createdAt).toLocaleDateString()} - ${order.total.toFixed(2)}
                </option>
              ))}
            </select>
          </motion.div>

          {/* Select Items */}
          {order && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
            >
              <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
                Select Items to Return *
              </label>
              <div className="space-y-3">
                {order.items.map(item => (
                  <label
                    key={item.product.id}
                    className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      selectedItems.includes(item.product.id)
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                        : 'border-stone-200 dark:border-stone-700 hover:border-amber-300'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={selectedItems.includes(item.product.id)}
                      onChange={() => handleItemToggle(item.product.id)}
                      className="w-5 h-5 accent-amber-500"
                    />
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-stone-900 dark:text-stone-100">
                        {item.product.name}
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Quantity: {item.quantity} × ${item.product.price.toFixed(2)}
                      </p>
                    </div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </p>
                  </label>
                ))}
              </div>
            </motion.div>
          )}

          {/* Reason */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
          >
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
              Reason for Return *
            </label>
            <select
              value={reason}
              onChange={e => setReason(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
            >
              <option value="">Select a reason...</option>
              {reasons.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </motion.div>

          {/* Comments */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
          >
            <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
              Additional Comments (Optional)
            </label>
            <textarea
              value={comments}
              onChange={e => setComments(e.target.value)}
              placeholder="Tell us more about your return..."
              rows={4}
              className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
            />
          </motion.div>

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 gradient-bg text-white rounded-xl font-bold text-lg shadow-xl shadow-amber-500/30 hover:shadow-2xl transition-all"
          >
            Submit Return Request
          </motion.button>

          {/* Info */}
          <div className="p-5 bg-amber-50 dark:bg-amber-900/20 rounded-xl border-2 border-amber-200 dark:border-amber-800">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800 dark:text-amber-200">
                <p className="font-semibold mb-2">Return Policy:</p>
                <ul className="space-y-1 text-xs">
                  <li>• Items must be returned within 30 days of delivery</li>
                  <li>• Items must be unopened and in original packaging</li>
                  <li>• Refunds are processed within 5-7 business days</li>
                  <li>• Return shipping is free for defective items</li>
                </ul>
              </div>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
