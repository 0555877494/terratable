import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, Filter, Search, Eye, Edit2, Truck, CheckCircle, XCircle, Clock } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

export default function AdminOrderManagement() {
  const { showToast } = useToast();
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          profiles:user_id (full_name, email),
          order_items (*, products:product_id (name, image))
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
      showToast('error', 'Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStatus = async (orderId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
      showToast('success', 'Order status updated');
    } catch (error) {
      console.error('Error updating status:', error);
      showToast('error', 'Failed to update status');
    }
  };

  const handleAssignDriver = async (orderId: string, driverId: string) => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ 
          delivery_agent_id: driverId,
          status: 'out_for_delivery'
        })
        .eq('id', orderId);

      if (error) throw error;

      setOrders(orders.map(o => o.id === orderId ? { ...o, delivery_agent_id: driverId, status: 'out_for_delivery' } : o));
      showToast('success', 'Driver assigned successfully');
    } catch (error) {
      console.error('Error assigning driver:', error);
      showToast('error', 'Failed to assign driver');
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    const matchesSearch = searchQuery === '' || 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.profiles?.full_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.profiles?.email?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'confirmed': return <CheckCircle className="w-5 h-5 text-blue-500" />;
      case 'preparing': return <Package className="w-5 h-5 text-purple-500" />;
      case 'out_for_delivery': return <Truck className="w-5 h-5 text-orange-500" />;
      case 'delivered': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'cancelled': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-stone-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'confirmed': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'preparing': return 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-300';
      case 'out_for_delivery': return 'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-300';
      case 'delivered': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'cancelled': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300';
    }
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
          Order Management
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Manage and process customer orders
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 mb-6"
      >
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="Search by order ID, customer name, or email..."
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
            />
          </div>

          {/* Status Filter */}
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-stone-500" />
            <select
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
              className="px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
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
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-6">
          <div className="text-center p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{orders.length}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Total Orders</p>
          </div>
          <div className="text-center p-3 bg-amber-50 dark:bg-amber-900/20 rounded-xl">
            <p className="text-2xl font-bold text-amber-600">{orders.filter(o => o.status === 'pending').length}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Pending</p>
          </div>
          <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-xl">
            <p className="text-2xl font-bold text-blue-600">{orders.filter(o => o.status === 'confirmed').length}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Confirmed</p>
          </div>
          <div className="text-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-xl">
            <p className="text-2xl font-bold text-purple-600">{orders.filter(o => o.status === 'preparing').length}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Preparing</p>
          </div>
          <div className="text-center p-3 bg-orange-50 dark:bg-orange-900/20 rounded-xl">
            <p className="text-2xl font-bold text-orange-600">{orders.filter(o => o.status === 'out_for_delivery').length}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Shipping</p>
          </div>
          <div className="text-center p-3 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
            <p className="text-2xl font-bold text-emerald-600">{orders.filter(o => o.status === 'delivered').length}</p>
            <p className="text-xs text-stone-500 dark:text-stone-400">Delivered</p>
          </div>
        </div>
      </motion.div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700">
            <Package className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
            <p className="text-stone-500 dark:text-stone-400">No orders found</p>
          </div>
        ) : (
          filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100">
                      Order #{order.id.slice(-6).toUpperCase()}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-400">
                    <span>{order.profiles?.full_name || 'Customer'}</span>
                    <span>•</span>
                    <span>{order.profiles?.email || 'No email'}</span>
                    <span>•</span>
                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Order Total */}
                <div className="text-right">
                  <p className="text-2xl font-bold gradient-text">${order.total.toFixed(2)}</p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {order.order_items?.length || 0} items
                  </p>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedOrder(order)}
                    className="p-2 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                  >
                    <Eye className="w-5 h-5" />
                  </motion.button>
                  {order.status === 'pending' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpdateStatus(order.id, 'confirmed')}
                      className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors"
                    >
                      <CheckCircle className="w-5 h-5" />
                    </motion.button>
                  )}
                  {order.status === 'confirmed' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpdateStatus(order.id, 'preparing')}
                      className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-900/50 transition-colors"
                    >
                      <Package className="w-5 h-5" />
                    </motion.button>
                  )}
                  {order.status === 'preparing' && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleUpdateStatus(order.id, 'out_for_delivery')}
                      className="p-2 bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-lg hover:bg-orange-200 dark:hover:bg-orange-900/50 transition-colors"
                    >
                      <Truck className="w-5 h-5" />
                    </motion.button>
                  )}
                </div>
              </div>

              {/* Order Items Preview */}
              {order.order_items && order.order_items.length > 0 && (
                <div className="mt-4 pt-4 border-t border-stone-200 dark:border-stone-700">
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {order.order_items.slice(0, 5).map((item: any, idx: number) => (
                      <div key={idx} className="flex-shrink-0">
                        <img
                          src={item.products?.image}
                          alt={item.products?.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                      </div>
                    ))}
                    {order.order_items.length > 5 && (
                      <div className="flex-shrink-0 w-16 h-16 rounded-lg bg-stone-200 dark:bg-stone-700 flex items-center justify-center text-xs font-semibold text-stone-600 dark:text-stone-300">
                        +{order.order_items.length - 5}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
          onClick={() => setSelectedOrder(null)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={e => e.stopPropagation()}
            className="bg-white dark:bg-stone-800 rounded-3xl max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
          >
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  Order Details
                </h2>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors"
                >
                  <XCircle className="w-6 h-6 text-stone-600 dark:text-stone-400" />
                </button>
              </div>

              {/* Order Info */}
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Order ID</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    #{selectedOrder.id.slice(-6).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Customer</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {selectedOrder.profiles?.full_name}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Email</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {selectedOrder.profiles?.email}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Date</span>
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {new Date(selectedOrder.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Status</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-600 dark:text-stone-400">Total</span>
                  <span className="text-2xl font-bold gradient-text">
                    ${selectedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="mb-6">
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  Shipping Address
                </h3>
                <p className="text-stone-600 dark:text-stone-400">
                  {selectedOrder.shipping_address}
                </p>
              </div>

              {/* Order Items */}
              <div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
                  Order Items ({selectedOrder.order_items?.length || 0})
                </h3>
                <div className="space-y-3">
                  {selectedOrder.order_items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex items-center gap-4 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                      <img
                        src={item.products?.image}
                        alt={item.products?.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-semibold text-stone-900 dark:text-stone-100">
                          {item.products?.name}
                        </p>
                        <p className="text-sm text-stone-600 dark:text-stone-400">
                          Qty: {item.quantity} × ${item.price.toFixed(2)}
                        </p>
                      </div>
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        ${(item.quantity * item.price).toFixed(2)}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
