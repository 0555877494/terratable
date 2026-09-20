import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Package, DollarSign, CheckCircle } from 'lucide-react';

interface OrderSummaryTimelineProps {
  orders: Array<{
    id: string;
    date: string;
    total: number;
    itemCount: number;
    status: string;
  }>;
}

export default function OrderSummaryTimeline({ orders }: OrderSummaryTimelineProps) {
  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const totalItems = orders.reduce((sum, order) => sum + order.itemCount, 0);
  const completedOrders = orders.filter(o => o.status === 'delivered').length;

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <Calendar className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Order Summary
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Your order history at a glance
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-4 text-center"
        >
          <Package className="w-6 h-6 mx-auto mb-2 text-amber-600 dark:text-amber-400" />
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {orders.length}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">Total Orders</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-4 text-center"
        >
          <DollarSign className="w-6 h-6 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            ${totalSpent.toFixed(0)}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">Total Spent</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-4 text-center"
        >
          <Package className="w-6 h-6 mx-auto mb-2 text-blue-600 dark:text-blue-400" />
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {totalItems}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">Items Purchased</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-4 text-center"
        >
          <CheckCircle className="w-6 h-6 mx-auto mb-2 text-emerald-600 dark:text-emerald-400" />
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {completedOrders}
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">Completed</p>
        </motion.div>
      </div>

      {/* Recent Orders Timeline */}
      <div className="space-y-3">
        <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
          Recent Orders
        </h4>
        {orders.slice(0, 5).map((order, index) => (
          <motion.div
            key={order.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 + index * 0.1 }}
            className="flex items-center gap-4 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
          >
            <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
              <Package className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
                Order #{order.id.slice(-6).toUpperCase()}
              </p>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {new Date(order.date).toLocaleDateString()} • {order.itemCount} items
              </p>
            </div>
            <div className="text-right">
              <p className="font-bold text-stone-900 dark:text-stone-100">
                ${order.total.toFixed(2)}
              </p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${
                order.status === 'delivered'
                  ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300'
                  : 'bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300'
              }`}>
                {order.status}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
