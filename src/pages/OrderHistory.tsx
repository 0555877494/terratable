import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Package, Calendar, DollarSign, RotateCcw, Eye, Download } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { Link } from 'react-router-dom';

export default function OrderHistory() {
  const { user } = useAuth();
  const { getOrdersForUser, reorder } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date-desc');

  if (!user) return null;

  let orders = getOrdersForUser(user.id);

  // Apply filters
  if (searchQuery) {
    orders = orders.filter(o => 
      o.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      o.items.some(item => item.product.name.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  if (statusFilter !== 'all') {
    orders = orders.filter(o => o.status === statusFilter);
  }

  if (dateFilter !== 'all') {
    const now = new Date();
    const filterDate = new Date();
    if (dateFilter === '7days') filterDate.setDate(now.getDate() - 7);
    if (dateFilter === '30days') filterDate.setDate(now.getDate() - 30);
    if (dateFilter === '90days') filterDate.setDate(now.getDate() - 90);
    orders = orders.filter(o => new Date(o.createdAt) >= filterDate);
  }

  // Sort
  if (sortBy === 'date-desc') orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  if (sortBy === 'date-asc') orders.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  if (sortBy === 'total-desc') orders.sort((a, b) => b.total - a.total);
  if (sortBy === 'total-asc') orders.sort((a, b) => a.total - b.total);

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    confirmed: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    preparing: 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300',
    out_for_delivery: 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300',
    delivered: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  };

  const totalSpent = getOrdersForUser(user.id).reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Order History
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          View and manage all your past orders
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: getOrdersForUser(user.id).length, icon: <Package className="w-5 h-5" />, color: 'from-amber-500 to-orange-500' },
          { label: 'Total Spent', value: `$${totalSpent.toFixed(0)}`, icon: <DollarSign className="w-5 h-5" />, color: 'from-emerald-500 to-emerald-600' },
          { label: 'Delivered', value: getOrdersForUser(user.id).filter(o => o.status === 'delivered').length, icon: <Calendar className="w-5 h-5" />, color: 'from-blue-500 to-blue-600' },
          { label: 'Active', value: getOrdersForUser(user.id).filter(o => o.status !== 'delivered').length, icon: <Package className="w-5 h-5" />, color: 'from-purple-500 to-purple-600' },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
          >
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white mb-3`}>
              {stat.icon}
            </div>
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{stat.value}</p>
            <p className="text-sm text-stone-500 dark:text-stone-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-stone-500" />
          <h3 className="font-semibold text-stone-900 dark:text-stone-100">Filters</h3>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search orders..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
            />
          </div>
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="confirmed">Confirmed</option>
            <option value="preparing">Preparing</option>
            <option value="out_for_delivery">Out for Delivery</option>
            <option value="delivered">Delivered</option>
          </select>
          <select
            value={dateFilter}
            onChange={e => setDateFilter(e.target.value)}
            className="px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
          >
            <option value="all">All Time</option>
            <option value="7days">Last 7 Days</option>
            <option value="30days">Last 30 Days</option>
            <option value="90days">Last 90 Days</option>
          </select>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
          >
            <option value="date-desc">Newest First</option>
            <option value="date-asc">Oldest First</option>
            <option value="total-desc">Highest Total</option>
            <option value="total-asc">Lowest Total</option>
          </select>
        </div>
      </motion.div>

      {/* Orders List */}
      {orders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700"
        >
          <Package className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No orders found
          </h3>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            {searchQuery || statusFilter !== 'all' || dateFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Start shopping to see your orders here'}
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 gradient-bg text-white rounded-full font-bold shadow-lg"
          >
            <Package className="w-4 h-4" />
            Start Shopping
          </Link>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[order.status]}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold gradient-text">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">{order.paymentMethod}</p>
                </div>
              </div>

              {/* Items Preview */}
              <div className="flex flex-wrap gap-2 mb-4">
                {order.items.slice(0, 4).map(item => (
                  <div key={item.product.id} className="flex items-center gap-2 px-3 py-1.5 bg-stone-50 dark:bg-stone-700/50 rounded-lg">
                    <img src={item.product.image} alt="" className="w-8 h-8 rounded object-cover" />
                    <span className="text-xs font-medium text-stone-700 dark:text-stone-300">
                      {item.product.name} ×{item.quantity}
                    </span>
                  </div>
                ))}
                {order.items.length > 4 && (
                  <div className="flex items-center px-3 py-1.5 bg-stone-50 dark:bg-stone-700/50 rounded-lg">
                    <span className="text-xs font-medium text-stone-500">+{order.items.length - 4} more</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100 dark:border-stone-700">
                <Link
                  to="/order-tracking"
                  className="flex items-center gap-1.5 px-4 py-2 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-sm font-semibold hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </Link>
                {order.status === 'delivered' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => reorder(order.id)}
                    className="flex items-center gap-1.5 px-4 py-2 gradient-bg text-white rounded-lg text-sm font-semibold shadow-lg"
                  >
                    <RotateCcw className="w-4 h-4" />
                    Reorder
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center gap-1.5 px-4 py-2 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-sm font-semibold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
                >
                  <Download className="w-4 h-4" />
                  Invoice
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
