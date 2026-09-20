import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Package, Truck, CheckCircle, MapPin } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export default function PublicOrderTracking() {
  const { orders } = useStore();
  const [orderId, setOrderId] = useState('');
  const [trackedOrder, setTrackedOrder] = useState<any>(null);
  const [error, setError] = useState('');

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setTrackedOrder(null);

    const found = orders.find(o => 
      o.id.toLowerCase() === orderId.toLowerCase() ||
      o.id.slice(-6).toLowerCase() === orderId.toLowerCase()
    );

    if (found) {
      setTrackedOrder(found);
    } else {
      setError('Order not found. Please check your order ID and try again.');
    }
  };

  const statusSteps = [
    { status: 'pending', label: 'Order Placed', icon: Package, color: 'amber' },
    { status: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'blue' },
    { status: 'preparing', label: 'Preparing', icon: Package, color: 'purple' },
    { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, color: 'orange' },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'emerald' }
  ];

  const getCurrentStepIndex = (status: string) => {
    return statusSteps.findIndex(step => step.status === status);
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

      {/* Tracking Form */}
      <motion.form
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        onSubmit={handleTrack}
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
                value={orderId}
                onChange={e => setOrderId(e.target.value)}
                placeholder="Enter your order ID (e.g., order-1)"
                className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
              />
            </div>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
            >
              <Search className="w-5 h-5" />
              Track
            </motion.button>
          </div>
          {error && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20 p-3 rounded-xl"
            >
              {error}
            </motion.p>
          )}
          <p className="mt-4 text-xs text-stone-500 dark:text-stone-400">
            💡 Demo order IDs: order-1, order-2, order-3
          </p>
        </div>
      </motion.form>

      {/* Tracking Result */}
      {trackedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-8"
        >
          {/* Order Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 mb-8 pb-6 border-b-2 border-stone-100 dark:border-stone-700">
            <div>
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                Order #{trackedOrder.id.slice(-6).toUpperCase()}
              </h2>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                Placed on {new Date(trackedOrder.createdAt).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </p>
            </div>
            <div className="text-right">
              <p className="text-3xl font-bold gradient-text">${trackedOrder.total.toFixed(2)}</p>
              <p className="text-xs text-stone-500 dark:text-stone-400">{trackedOrder.paymentMethod}</p>
            </div>
          </div>

          {/* Timeline */}
          <div className="mb-8">
            <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-6">
              Delivery Progress
            </h3>
            <div className="space-y-6">
              {statusSteps.map((step, index) => {
                const currentStepIndex = getCurrentStepIndex(trackedOrder.status);
                const isCompleted = index <= currentStepIndex;
                const isCurrent = index === currentStepIndex;
                const Icon = step.icon;

                return (
                  <motion.div
                    key={step.status}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-4"
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center ${
                      isCompleted
                        ? `bg-${step.color}-500 text-white shadow-lg`
                        : 'bg-stone-100 dark:bg-stone-700 text-stone-400'
                    } ${isCurrent ? 'ring-4 ring-amber-200 dark:ring-amber-800' : ''}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="flex-1 pt-2">
                      <p className={`font-semibold ${
                        isCompleted ? 'text-stone-900 dark:text-stone-100' : 'text-stone-400 dark:text-stone-500'
                      }`}>
                        {step.label}
                      </p>
                      {isCurrent && (
                        <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                          {step.status === 'pending' && 'We\'re processing your order...'}
                          {step.status === 'confirmed' && 'Your order has been confirmed!'}
                          {step.status === 'preparing' && 'We\'re preparing your items...'}
                          {step.status === 'out_for_delivery' && 'Your order is on the way!'}
                          {step.status === 'delivered' && 'Your order has been delivered!'}
                        </p>
                      )}
                    </div>
                    {isCompleted && (
                      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Delivery Info */}
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-2xl">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="w-5 h-5 text-amber-600" />
                <h4 className="font-semibold text-stone-800 dark:text-stone-200">Delivery Address</h4>
              </div>
              <p className="text-sm text-stone-600 dark:text-stone-400">{trackedOrder.address}</p>
            </div>
            {trackedOrder.deliveryAgentName && (
              <div className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-2xl">
                <div className="flex items-center gap-2 mb-2">
                  <Truck className="w-5 h-5 text-amber-600" />
                  <h4 className="font-semibold text-stone-800 dark:text-stone-200">Delivery Agent</h4>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400">{trackedOrder.deliveryAgentName}</p>
              </div>
            )}
          </div>

          {/* Order Items */}
          <div>
            <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-3">
              Order Items ({trackedOrder.items.length})
            </h3>
            <div className="space-y-2">
              {trackedOrder.items.map((item: any, index: number) => (
                <motion.div
                  key={item.product.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <p className="font-semibold text-stone-800 dark:text-stone-200 text-sm">
                      {item.product.name}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Qty: {item.quantity} × ${item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <p className="font-bold text-stone-800 dark:text-stone-200">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      )}

      {/* Help Section */}
      {!trackedOrder && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-stone-50 dark:bg-stone-800/50 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-8 text-center"
        >
          <Package className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            Can't find your order?
          </h3>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            Make sure you're using the correct order ID from your confirmation email
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="mailto:hello@terraandtable.com"
              className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
            >
              Contact Support
            </a>
          </div>
        </motion.div>
      )}
    </div>
  );
}
