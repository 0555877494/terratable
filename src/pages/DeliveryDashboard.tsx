import React from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, DollarSign, CheckCircle, Truck, Clock, ArrowRight } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { Order } from '../types';

export default function DeliveryDashboard() {
  const { user } = useAuth();
  const { orders, updateOrderStatus } = useStore();

  if (!user) return null;

  const myOrders = orders.filter(o => o.deliveryAgentId === user.id);
  const activeOrders = myOrders.filter(o => o.status !== 'delivered');
  const completedOrders = myOrders.filter(o => o.status === 'delivered');
  const earnings = completedOrders.reduce((sum, o) => sum + o.total * 0.1, 0);

  const unassignedOrders = orders.filter(o => !o.deliveryAgentId && o.status !== 'delivered' && o.status !== 'pending');

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-blue-100 text-blue-700',
    preparing: 'bg-purple-100 text-purple-700',
    out_for_delivery: 'bg-orange-100 text-orange-700',
    delivered: 'bg-sage-100 text-sage-700'
  };

  const handleStatusUpdate = (order: Order, newStatus: Order['status']) => {
    updateOrderStatus(order.id, newStatus);
  };

  const getNextStatus = (status: string): Order['status'] | null => {
    switch (status) {
      case 'confirmed': return 'preparing';
      case 'preparing': return 'out_for_delivery';
      case 'out_for_delivery': return 'delivered';
      default: return null;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-terra-800">Delivery Dashboard</h1>
        <p className="text-terra-500 mt-1">Welcome back, {user.name.split(' ')[0]}</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Active Deliveries', value: activeOrders.length, icon: <Truck className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600' },
          { label: 'Completed', value: completedOrders.length, icon: <CheckCircle className="w-5 h-5" />, color: 'bg-sage-50 text-sage-600' },
          { label: 'Earnings', value: `$${earnings.toFixed(2)}`, icon: <DollarSign className="w-5 h-5" />, color: 'bg-terra-50 text-terra-600' },
          { label: 'Available', value: unassignedOrders.length, icon: <Package className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white rounded-2xl border border-terra-100 p-5 shadow-sm"
          >
            <div className="flex items-center gap-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-terra-800">{stat.value}</p>
                <p className="text-sm text-terra-500">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Available Orders */}
      {unassignedOrders.length > 0 && (
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-terra-800 mb-4">Available Deliveries</h2>
          <div className="space-y-4">
            {unassignedOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-blue-100 p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-medium text-terra-800">Order #{order.id.slice(-6)}</p>
                    <p className="text-sm text-terra-500">{order.userName} • {order.items.length} items</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                    {order.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm text-terra-600 mb-3">
                  <MapPin className="w-3.5 h-3.5" /> {order.address}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-terra-800">${order.total.toFixed(2)}</span>
                  <span className="text-sm text-sage-600 font-medium">Earn ${((order.total * 0.1)).toFixed(2)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Active Deliveries */}
      <div className="mb-8">
        <h2 className="font-serif text-xl font-semibold text-terra-800 mb-4">My Active Deliveries</h2>
        {activeOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-terra-100 p-8 text-center">
            <Clock className="w-12 h-12 mx-auto text-terra-200 mb-3" />
            <p className="text-terra-500">No active deliveries at the moment</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order, i) => {
              const nextStatus = getNextStatus(order.status);
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-terra-100 p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                    <div>
                      <p className="font-medium text-terra-800">Order #{order.id.slice(-6)}</p>
                      <p className="text-sm text-terra-500">{order.userName} • {order.items.length} items</p>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {order.items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-2 px-2 py-1 bg-terra-50 rounded-lg">
                        <img src={item.product.image} alt="" className="w-6 h-6 rounded object-cover" />
                        <span className="text-xs text-terra-700">{item.product.name} ×{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1 text-sm text-terra-600 mb-4">
                    <MapPin className="w-3.5 h-3.5" /> {order.address}
                  </div>
                  {nextStatus && (
                    <motion.button
                      whileTap={{ scale: 0.98 }}
                      onClick={() => handleStatusUpdate(order, nextStatus)}
                      className="w-full py-2.5 bg-terra-600 text-white rounded-xl font-medium hover:bg-terra-700 transition-colors flex items-center justify-center gap-2"
                    >
                      Mark as {nextStatus.replace('_', ' ')} <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>

      {/* Completed */}
      {completedOrders.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-terra-800 mb-4">Completed Deliveries</h2>
          <div className="space-y-3">
            {completedOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl border border-terra-100 p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-terra-700">Order #{order.id.slice(-6)}</p>
                  <p className="text-xs text-terra-400">{new Date(order.createdAt).toLocaleDateString()} • {order.userName}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-sage-600">+${(order.total * 0.1).toFixed(2)}</span>
                  <CheckCircle className="w-5 h-5 text-sage-500" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
