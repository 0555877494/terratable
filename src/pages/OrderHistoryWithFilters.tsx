import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Filter, Search, Eye, Download, Calendar, DollarSign, Truck } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { supabase } from '../lib/supabase';

export default function OrderHistoryWithFilters() {
  const { user } = useAuth();
  const { getOrdersForUser } = useStore();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    if (user) {
      loadOrders();
    }
  }, [user]);

  const loadOrders = async () => {
    try {
      const userOrders = getOrdersForUser(user!.id);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredOrders = orders.filter(order => {
    // Status filter
    if (statusFilter !== 'all' && order.status !== statusFilter) return false;

    // Date filter
    if (dateFilter !== 'all') {
      const orderDate = new Date(order.createdAt);
      const now = new Date();
      const daysDiff = (now.getTime() - orderDate.getTime()) / (1000 * 60 * 60 * 24);

      if (dateFilter === '7days' && daysDiff > 7) return false;
      if (dateFilter === '30days' && daysDiff > 30) return false;
      if (dateFilter === '90days' && daysDiff > 90) return false;
    }

    // Price range filter
    if (order.total < priceRange[0] || order.total > priceRange[1]) return false;

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesId = order.id.toLowerCase().includes(query);
      const matchesItems = order.items?.some((item: any) => 
        item.product?.name?.toLowerCase().includes(query)
      );
      if (!matchesId && !matchesItems) return false;
    }

    return true;
  });

  const sortedOrders = [...filteredOrders].sort((a, b) => {
    switch (sortBy) {
      case 'date-desc':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'date-asc':
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      case 'total-desc':
        return b.total - a.total;
      case 'total-asc':
        return a.total - b.total;
      default:
        return 0;
    }
  });

  const totalSpent = filteredOrders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = filteredOrders.length > 0 ? totalSpent / filteredOrders.length : 0;

  const handleDownloadInvoice = (order: any) => {
    // In production, this would generate a PDF
    const invoiceData = {
      orderId: order.id,
      date: new Date(order.createdAt).toLocaleDateString(),
      items: order.items,
      total: order.total,
      status: order.status
    };
    
    const blob = new Blob([JSON.stringify(invoiceData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `invoice-${order.id.slice(-6)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading orders...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Order History
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          View and manage all your orders
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {filteredOrders.length}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Total Orders</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                ${totalSpent.toFixed(2)}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Total Spent</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                ${avgOrderValue.toFixed(2)}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Avg. Order</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 mb-6"
      >
        <div className="flex items-center gap-2 mb-4">
          <Filter className="w-5 h-5 text-amber-600" />
          <h3 className="font-bold text-stone-900 dark:text-stone-100">Filters</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Search */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Search
            </label>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Order ID or product..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
              />
            </div>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Status
            </label>
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="preparing">Preparing</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>

          {/* Date Filter */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Date Range
            </label>
            <select
              value={dateFilter}
              onChange={e => setDateFilter(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
            </select>
          </div>

          {/* Sort By */}
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Sort By
            </label>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
            >
              <option value="date-desc">Newest First</option>
              <option value="date-asc">Oldest First</option>
              <option value="total-desc">Highest Total</option>
              <option value="total-asc">Lowest Total</option>
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="mt-4">
          <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
            Price Range: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <div className="flex gap-4">
            <input
              type="range"
              min="0"
              max="1000"
              value={priceRange[1]}
              onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
              className="flex-1 accent-amber-500"
            />
          </div>
        </div>
      </motion.div>

      {/* Orders List */}
      {sortedOrders.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700"
        >
          <Package className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No orders found
          </h3>
          <p className="text-stone-500 dark:text-stone-400">
            {searchQuery || statusFilter !== 'all' || dateFilter !== 'all'
              ? 'Try adjusting your filters'
              : 'Start shopping to see your orders here'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {sortedOrders.map((order, index) => (
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
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      order.status === 'delivered'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                        : order.status === 'cancelled'
                        ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    }`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                    <span className="flex items-center gap-1">
                      <Package className="w-4 h-4" />
                      {order.items?.length || 0} items
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-3xl font-bold gradient-text mb-1">
                    ${order.total.toFixed(2)}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {order.paymentMethod}
                  </p>
                </div>
              </div>

              {/* Items Preview */}
              {order.items && order.items.length > 0 && (
                <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
                  {order.items.slice(0, 4).map((item: any, idx: number) => (
                    <img
                      key={idx}
                      src={item.product?.image}
                      alt={item.product?.name}
                      className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                    />
                  ))}
                  {order.items.length > 4 && (
                    <div className="w-16 h-16 rounded-lg bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-xs font-semibold text-stone-600 dark:text-stone-300 flex-shrink-0">
                      +{order.items.length - 4}
                    </div>
                  )}
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-2 pt-4 border-t border-stone-200 dark:border-stone-700">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => window.location.href = `/order-tracking?id=${order.id}`}
                  className="flex-1 py-2.5 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-semibold text-sm hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  Track Order
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handleDownloadInvoice(order)}
                  className="flex-1 py-2.5 gradient-bg text-white rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Download Invoice
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
