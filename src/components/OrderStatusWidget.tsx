import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, TrendingUp, Clock, Package, Truck, CheckCircle, AlertCircle } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useAuth } from '../contexts/AuthContext';

export default function OrderStatusWidget() {
  const { user } = useAuth();
  const { getOrdersForUser } = useStore();
  const [activeOrders, setActiveOrders] = useState<any[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (user) {
      const orders = getOrdersForUser(user.id);
      const active = orders.filter(o => o.status !== 'delivered');
      setActiveOrders(active);
      
      // Show widget if there are active orders
      if (active.length > 0) {
        setIsVisible(true);
      }
    }
  }, [user, getOrdersForUser]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-amber-500" />;
      case 'confirmed':
        return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'preparing':
        return <Package className="w-5 h-5 text-purple-500" />;
      case 'out_for_delivery':
        return <Truck className="w-5 h-5 text-orange-500" />;
      default:
        return <Clock className="w-5 h-5 text-stone-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800';
      case 'confirmed':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'preparing':
        return 'bg-purple-50 dark:bg-purple-900/20 border-purple-200 dark:border-purple-800';
      case 'out_for_delivery':
        return 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800';
      default:
        return 'bg-stone-50 dark:bg-stone-700/50 border-stone-200 dark:border-stone-600';
    }
  };

  if (!isVisible || activeOrders.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, x: 50 }}
      animate={{ opacity: 1, y: 0, x: 0 }}
      exit={{ opacity: 0, y: 50, x: 50 }}
      className="fixed bottom-24 right-6 z-30 w-80 bg-white dark:bg-stone-800 rounded-2xl shadow-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden"
    >
      {/* Header */}
      <div className="gradient-bg p-4 text-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5" />
            <h3 className="font-bold">Active Orders</h3>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-sm text-white/90 mt-1">
          {activeOrders.length} order{activeOrders.length > 1 ? 's' : ''} in progress
        </p>
      </div>

      {/* Orders List */}
      <div className="p-4 space-y-3 max-h-96 overflow-y-auto">
        {activeOrders.map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`p-3 rounded-xl border-2 ${getStatusColor(order.status)}`}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                {getStatusIcon(order.status)}
                <div>
                  <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                    Order #{order.id.slice(-6).toUpperCase()}
                  </p>
                  <p className="text-xs text-stone-600 dark:text-stone-400 capitalize">
                    {order.status.replace('_', ' ')}
                  </p>
                </div>
              </div>
              <p className="font-bold text-stone-900 dark:text-stone-100 text-sm">
                ${order.total.toFixed(2)}
              </p>
            </div>

            {/* Progress Bar */}
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400 mb-1">
                <span>Progress</span>
                <span>
                  {order.status === 'pending' ? '25%' :
                   order.status === 'confirmed' ? '50%' :
                   order.status === 'preparing' ? '75%' :
                   order.status === 'out_for_delivery' ? '90%' : '100%'}
                </span>
              </div>
              <div className="h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ 
                    width: order.status === 'pending' ? '25%' :
                           order.status === 'confirmed' ? '50%' :
                           order.status === 'preparing' ? '75%' :
                           order.status === 'out_for_delivery' ? '90%' : '100%'
                  }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                  className="h-full gradient-bg rounded-full"
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-stone-200 dark:border-stone-700 bg-stone-50 dark:bg-stone-900/50">
        <a
          href="/order-tracking"
          className="block w-full py-2 text-center text-sm font-semibold text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 transition-colors"
        >
          View All Orders →
        </a>
      </div>
    </motion.div>
  );
}
