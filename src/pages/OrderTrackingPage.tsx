import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Phone, Truck, CheckCircle, Clock, AlertCircle, Copy } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import OrderTimelineVisual from '../components/OrderTimelineVisual';
import ShippingProgressTracker from '../components/ShippingProgressTracker';

export default function OrderTrackingPage() {
  const { orders } = useStore();
  const { showToast } = useToast();
  const [searchId, setSearchId] = useState('');
  const [foundOrder, setFoundOrder] = useState<any>(null);
  const [error, setError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setFoundOrder(null);

    const searchLower = searchId.toLowerCase().trim();
    const found = orders.find(o => 
      o.id.toLowerCase() === searchLower ||
      o.id.slice(-6).toLowerCase() === searchLower
    );

    if (found) {
      setFoundOrder(found);
    } else {
      setError('Order not found. Please check the order ID and try again.');
    }
  };

  const handleCopyOrderId = (orderId: string) => {
    navigator.clipboard.writeText(orderId);
    showToast('success', 'Order ID copied!');
  };

  const getStatusSteps = () => {
    if (!foundOrder) return [];
    return [
      { label: 'Order Placed', icon: <Clock className="w-5 h-5" />, date: new Date(foundOrder.createdAt).toLocaleString() },
      { label: 'Confirmed', icon: <CheckCircle className="w-5 h-5" />, date: '' },
      { label: 'Preparing', icon: <Package className="w-5 h-5" />, date: '' },
      { label: 'Out for Delivery', icon: <Truck className="w-5 h-5" />, date: '' },
      { label: 'Delivered', icon: <MapPin className="w-5 h-5" />, date: '' }
    ];
  };

  const getCurrentStep = () => {
    if (!foundOrder) return 0;
    const statusMap: Record<string, number> = {
      'pending': 0,
      'confirmed': 1,
      'preparing': 2,
      'out_for_delivery': 3,
      'delivered': 4
    };
    return statusMap[foundOrder.status] || 0;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Package className="w-4 h-4" />
          Order Tracking
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Track Your <span className="gradient-text">Order</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg max-w-2xl mx-auto">
          Enter your order ID to see real-time status updates
        </p>
      </motion.div>

      {/* Search Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleSearch}
        className="mb-10"
      >
        <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
          <label className="block text-sm font-bold text-stone-700 dark:text-stone-300 mb-3">
            Order ID
          </label>
          <div className="flex gap-3">
            <div className="relative flex-1">
              <Package className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
              <input
                type="text"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
                placeholder="Enter your order ID (e.g., order-1)"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none transition-all"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
            >
              Track
            </motion.button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl flex items-center gap-2"
            >
              <AlertCircle className="w-4 h-4" />
              {error}
            </motion.p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="text-xs text-stone-500 dark:text-stone-400">Demo IDs:</span>
            {orders.slice(0, 3).map(order => (
              <button
                key={order.id}
                type="button"
                onClick={() => setSearchId(order.id)}
                className="text-xs px-2 py-1 bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-400 rounded-full hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors"
              >
                {order.id}
              </button>
            ))}
          </div>
        </div>
      </motion.form>

      {/* Order Details */}
      {foundOrder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-6"
        >
          {/* Order Header */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
            <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                    Order #{foundOrder.id.slice(-6).toUpperCase()}
                  </h2>
                  <button
                    onClick={() => handleCopyOrderId(foundOrder.id)}
                    className="p-1.5 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-lg transition-colors"
                    title="Copy order ID"
                  >
                    <Copy className="w-4 h-4 text-stone-500" />
                  </button>
                </div>
                <p className="text-sm text-stone-500 dark:text-stone-400">
                  Placed on {new Date(foundOrder.createdAt).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
              <div className="text-right">
                <p className="text-3xl font-bold gradient-text">${foundOrder.total.toFixed(2)}</p>
                <p className="text-xs text-stone-500 dark:text-stone-400">{foundOrder.paymentMethod}</p>
              </div>
            </div>

            {/* Status Badge */}
            <div className="flex items-center gap-3 mb-6">
              <span className={`px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-2 ${
                foundOrder.status === 'delivered'
                  ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                  : foundOrder.status === 'out_for_delivery'
                  ? 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300'
                  : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
              }`}>
                {foundOrder.status === 'delivered' ? <CheckCircle className="w-4 h-4" /> :
                 foundOrder.status === 'out_for_delivery' ? <Truck className="w-4 h-4" /> :
                 <Clock className="w-4 h-4" />}
                {foundOrder.status.replace('_', ' ')}
              </span>
            </div>

            {/* Shipping Progress */}
            <ShippingProgressTracker
              currentStep={getCurrentStep()}
              totalSteps={5}
              steps={getStatusSteps()}
            />
          </div>

          {/* Delivery Info */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5">
              <div className="flex items-center gap-2 mb-3">
                <MapPin className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                <h3 className="font-semibold text-stone-900 dark:text-stone-100">Delivery Address</h3>
              </div>
              <p className="text-stone-600 dark:text-stone-400">{foundOrder.address}</p>
            </div>
            {foundOrder.deliveryAgentName && (
              <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Truck className="w-5 h-5 text-amber-600 dark:text-amber-400" />
                  <h3 className="font-semibold text-stone-900 dark:text-stone-100">Delivery Agent</h3>
                </div>
                <p className="text-stone-600 dark:text-stone-400">{foundOrder.deliveryAgentName}</p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Order Items ({foundOrder.items.length})
            </h3>
            <div className="space-y-3">
              {foundOrder.items.map((item: any, index: number) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-4 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold text-stone-900 dark:text-stone-100">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
              <div className="flex justify-between items-center">
                <span className="font-bold text-stone-900 dark:text-stone-100">Total</span>
                <span className="text-2xl font-bold gradient-text">
                  ${foundOrder.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Need Help */}
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-2xl p-6 text-white text-center">
            <Phone className="w-8 h-8 mx-auto mb-3" />
            <h3 className="font-serif text-xl font-bold mb-2">Need Help?</h3>
            <p className="text-white/90 mb-4">
              Contact our support team for any questions about your order
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="/support"
                className="px-6 py-2.5 bg-white text-amber-600 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
              >
                Contact Support
              </a>
              <a
                href="mailto:hello@terraandtable.com"
                className="px-6 py-2.5 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/30 transition-all"
              >
                Email Us
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}
