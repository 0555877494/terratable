import React from 'react';
import { motion } from 'framer-motion';
import { Package, MapPin, DollarSign, CheckCircle, Truck, Clock, ArrowRight, TrendingUp } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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

  const statusConfig: Record<string, { color: string; bg: string }> = {
    pending: { color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200' },
    confirmed: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200' },
    preparing: { color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200' },
    out_for_delivery: { color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200' },
    delivered: { color: 'text-sage-700', bg: 'bg-sage-50 border-sage-200' }
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
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-terra-800">
          Delivery Dashboard 🚚
        </h1>
        <p className="text-terra-500 mt-1">Welcome back, {user.name.split(' ')[0]}. Ready to deliver?</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {[
          { label: 'Active', value: activeOrders.length, icon: <Truck className="w-5 h-5" />, gradient: 'from-orange-500 to-wine-500' },
          { label: 'Completed', value: completedOrders.length, icon: <CheckCircle className="w-5 h-5" />, gradient: 'from-sage-500 to-sage-600' },
          { label: 'Earnings', value: `$${earnings.toFixed(0)}`, icon: <DollarSign className="w-5 h-5" />, gradient: 'from-terra-500 to-terra-600' },
          { label: 'Available', value: unassignedOrders.length, icon: <Package className="w-5 h-5" />, gradient: 'from-blue-500 to-blue-600' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative bg-white rounded-2xl border border-terra-100/50 p-5 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-terra-800">{stat.value}</p>
                <p className="text-xs text-terra-500 font-medium">{stat.label}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-gradient-to-r from-terra-800 to-wine-800 rounded-2xl p-6 text-white relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
          <div className="absolute bottom-0 left-1/3 w-32 h-32 bg-white/5 rounded-full translate-y-12" />
          <div className="relative">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-sage-300" />
              <span className="text-sm font-medium text-terra-200">This Week's Earnings</span>
            </div>
            <p className="text-4xl font-bold mb-1">${earnings.toFixed(2)}</p>
            <p className="text-sm text-terra-300">{completedOrders.length} deliveries completed</p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl border border-terra-100/50 p-6 shadow-sm"
        >
          <h3 className="font-serif text-lg font-semibold text-terra-800 mb-4">Weekly Earnings</h3>
          <ResponsiveContainer width="100%" height={160}>
            <BarChart data={[
              { day: 'Mon', earnings: earnings * 0.15 },
              { day: 'Tue', earnings: earnings * 0.2 },
              { day: 'Wed', earnings: earnings * 0.1 },
              { day: 'Thu', earnings: earnings * 0.25 },
              { day: 'Fri', earnings: earnings * 0.15 },
              { day: 'Sat', earnings: earnings * 0.1 },
              { day: 'Sun', earnings: earnings * 0.05 }
            ]}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f2d9b4" />
              <XAxis dataKey="day" stroke="#864323" fontSize={12} />
              <YAxis stroke="#864323" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #f2d9b4' }} formatter={(value: number) => [`$${value.toFixed(2)}`, 'Earnings']} />
              <Bar dataKey="earnings" fill="#4e8644" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Active Deliveries */}
      <div className="mb-10">
        <h2 className="font-serif text-xl font-semibold text-terra-800 mb-5 flex items-center gap-2">
          <Truck className="w-5 h-5 text-orange-500" /> My Active Deliveries
        </h2>
        {activeOrders.length === 0 ? (
          <div className="bg-white rounded-2xl border border-terra-100/50 p-10 text-center shadow-sm">
            <Clock className="w-12 h-12 mx-auto text-terra-200 mb-3" />
            <p className="text-terra-500 font-medium">No active deliveries at the moment</p>
            <p className="text-sm text-terra-400 mt-1">New orders will appear here when assigned</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeOrders.map((order, i) => {
              const nextStatus = getNextStatus(order.status);
              const config = statusConfig[order.status];
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-terra-100/50 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                    <div>
                      <p className="font-semibold text-terra-800">Order #{order.id.slice(-6).toUpperCase()}</p>
                      <p className="text-sm text-terra-500 mt-0.5">{order.userName} • {order.items.length} items</p>
                    </div>
                    <span className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.color}`}>
                      {order.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {order.items.map(item => (
                      <div key={item.product.id} className="flex items-center gap-2 px-3 py-1.5 bg-cream-50 rounded-lg border border-terra-100/50">
                        <img src={item.product.image} alt="" className="w-7 h-7 rounded-md object-cover" />
                        <span className="text-xs font-medium text-terra-700">{item.product.name}</span>
                        <span className="text-[10px] text-terra-400">×{item.quantity}</span>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-terra-600 mb-4">
                    <MapPin className="w-3.5 h-3.5 text-terra-400" /> {order.address}
                  </div>
                  {nextStatus && (
                    <motion.button
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.99 }}
                      onClick={() => updateOrderStatus(order.id, nextStatus)}
                      className="w-full py-3.5 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-xl font-semibold shadow-lg shadow-terra-500/20 hover:shadow-xl transition-all flex items-center justify-center gap-2"
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
          <h2 className="font-serif text-xl font-semibold text-terra-800 mb-5">Completed Deliveries</h2>
          <div className="space-y-3">
            {completedOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl border border-terra-100/50 p-4 flex items-center justify-between hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sage-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-sage-500" />
                  </div>
                  <div>
                    <p className="font-medium text-terra-700">Order #{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-terra-400">{new Date(order.createdAt).toLocaleDateString()} • {order.userName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-sage-600 bg-sage-50 px-3 py-1 rounded-full">+${(order.total * 0.1).toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
