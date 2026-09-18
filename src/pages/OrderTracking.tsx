import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, Phone, Truck, CheckCircle, Clock, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';

export default function OrderTracking() {
  const { user } = useAuth();
  const { getOrdersForUser } = useStore();
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  if (!user) return null;

  const orders = getOrdersForUser(user.id);
  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const selectedOrder = orders.find(o => o.id === selectedOrderId);

  const statusSteps = [
    { status: 'pending', label: 'Order Placed', icon: Clock, color: 'amber' },
    { status: 'confirmed', label: 'Confirmed', icon: CheckCircle, color: 'blue' },
    { status: 'preparing', label: 'Preparing', icon: Package, color: 'purple' },
    { status: 'out_for_delivery', label: 'Out for Delivery', icon: Truck, color: 'orange' },
    { status: 'delivered', label: 'Delivered', icon: CheckCircle, color: 'emerald' }
  ];

  const getCurrentStepIndex = (status: string) => {
    return statusSteps.findIndex(step => step.status === status);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Track Your Orders
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Real-time updates on your deliveries
        </p>
      </motion.div>

      {activeOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <Package className="w-20 h-20 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No Active Orders
          </h2>
          <p className="text-stone-500 dark:text-stone-400">
            You don't have any orders being delivered right now
          </p>
        </motion.div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Orders List */}
          <div className="lg:col-span-1 space-y-3">
            <h2 className="font-semibold text-stone-800 dark:text-stone-200 mb-3">
              Active Orders ({activeOrders.length})
            </h2>
            {activeOrders.map((order, index) => {
              const currentStep = getCurrentStepIndex(order.status);
              return (
                <motion.button
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setSelectedOrderId(order.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${
                    selectedOrderId === order.id
                      ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20 shadow-lg'
                      : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-amber-300'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <p className="font-semibold text-stone-800 dark:text-stone-200">
                        Order #{order.id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'delivered' ? 'bg-emerald-100 text-emerald-700' :
                      order.status === 'out_for_delivery' ? 'bg-orange-100 text-orange-700' :
                      'bg-amber-100 text-amber-700'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400">
                    <Package className="w-4 h-4" />
                    <span>{order.items.length} items</span>
                    <span className="text-stone-300 dark:text-stone-600">•</span>
                    <span className="font-semibold">${order.total.toFixed(2)}</span>
                  </div>
                  {/* Mini progress bar */}
                  <div className="mt-3 flex gap-1">
                    {statusSteps.map((_, i) => (
                      <div
                        key={i}
                        className={`flex-1 h-1 rounded-full ${
                          i <= currentStep ? 'bg-amber-500' : 'bg-stone-200 dark:bg-stone-700'
                        }`}
                      />
                    ))}
                  </div>
                </motion.button>
              );
            })}
          </div>

          {/* Tracking Details */}
          <div className="lg:col-span-2">
            {selectedOrder ? (
              <motion.div
                key={selectedOrder.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-6"
              >
                {/* Order Header */}
                <div className="flex items-start justify-between mb-6 pb-6 border-b-2 border-stone-100 dark:border-stone-700">
                  <div>
                    <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                      Order #{selectedOrder.id.slice(-6).toUpperCase()}
                    </h2>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      Placed on {new Date(selectedOrder.createdAt).toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold gradient-text">${selectedOrder.total.toFixed(2)}</p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">{selectedOrder.paymentMethod}</p>
                  </div>
                </div>

                {/* Tracking Timeline */}
                <div className="mb-8">
                  <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-4">
                    Delivery Progress
                  </h3>
                  <div className="space-y-4">
                    {statusSteps.map((step, index) => {
                      const currentStepIndex = getCurrentStepIndex(selectedOrder.status);
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
                              ? `bg-${step.color}-500 text-white`
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
                    <p className="text-sm text-stone-600 dark:text-stone-400">{selectedOrder.address}</p>
                  </div>
                  {selectedOrder.deliveryAgentName && (
                    <div className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-2xl">
                      <div className="flex items-center gap-2 mb-2">
                        <Truck className="w-5 h-5 text-amber-600" />
                        <h4 className="font-semibold text-stone-800 dark:text-stone-200">Delivery Agent</h4>
                      </div>
                      <p className="text-sm text-stone-600 dark:text-stone-400">{selectedOrder.deliveryAgentName}</p>
                    </div>
                  )}
                </div>

                {/* Order Items */}
                <div>
                  <h3 className="font-semibold text-stone-800 dark:text-stone-200 mb-3">
                    Order Items ({selectedOrder.items.length})
                  </h3>
                  <div className="space-y-2">
                    {selectedOrder.items.map((item, index) => (
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
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white dark:bg-stone-800 rounded-3xl border-2 border-stone-200 dark:border-stone-700 p-12 text-center"
              >
                <Package className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
                <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
                  Select an Order
                </h3>
                <p className="text-stone-500 dark:text-stone-400">
                  Click on an order to view tracking details
                </p>
              </motion.div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
