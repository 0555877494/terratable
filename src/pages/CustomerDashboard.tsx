import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Clock, MapPin, CheckCircle, Truck, ShoppingBag, Star, ArrowRight, Edit2, Save, X, RotateCcw, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import OrderTimeline from '../components/OrderTimeline';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { getOrdersForUser, cancelOrder, reorder } = useStore();
  const { showToast } = useToast();
  const [editingProfile, setEditingProfile] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) return null;
  const orders = getOrdersForUser(user.id);
  const activeOrders = orders.filter(o => o.status !== 'delivered' && o.status !== 'pending');
  const pendingOrders = orders.filter(o => o.status === 'pending');
  const pastOrders = orders.filter(o => o.status === 'delivered');
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);

  const handleCancelOrder = (orderId: string) => {
    cancelOrder(orderId);
    showToast('success', 'Order cancelled successfully');
  };

  const handleReorder = (orderId: string) => {
    reorder(orderId);
    showToast('success', 'Items added to cart!');
  };

  const handleSaveProfile = () => {
    setEditingProfile(false);
    showToast('success', 'Profile updated successfully!');
  };

  const statusConfig: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
    pending: { color: 'text-amber-700', bg: 'bg-amber-50 border-amber-200', icon: <Clock className="w-4 h-4" /> },
    confirmed: { color: 'text-blue-700', bg: 'bg-blue-50 border-blue-200', icon: <CheckCircle className="w-4 h-4" /> },
    preparing: { color: 'text-purple-700', bg: 'bg-purple-50 border-purple-200', icon: <Package className="w-4 h-4" /> },
    out_for_delivery: { color: 'text-orange-700', bg: 'bg-orange-50 border-orange-200', icon: <Truck className="w-4 h-4" /> },
    delivered: { color: 'text-sage-700', bg: 'bg-sage-50 border-sage-200', icon: <CheckCircle className="w-4 h-4" /> }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {/* Welcome Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-terra-800">
              Hello, {user.name.split(' ')[0]} 👋
            </h1>
            <p className="text-terra-500 mt-1">Here's what's happening with your orders</p>
          </div>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-full text-sm font-semibold shadow-lg shadow-terra-500/20 hover:shadow-xl transition-all"
          >
            <ShoppingBag className="w-4 h-4" /> Shop More
          </Link>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {[
          { label: 'Total Orders', value: orders.length, icon: <ShoppingBag className="w-5 h-5" />, gradient: 'from-terra-500 to-terra-600', light: 'bg-terra-50' },
          { label: 'Active', value: activeOrders.length, icon: <Truck className="w-5 h-5" />, gradient: 'from-orange-500 to-wine-500', light: 'bg-orange-50' },
          { label: 'Total Spent', value: `$${totalSpent.toFixed(0)}`, icon: <Star className="w-5 h-5" />, gradient: 'from-sage-500 to-sage-600', light: 'bg-sage-50' }
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="relative bg-white rounded-2xl border border-terra-100/50 p-5 shadow-sm overflow-hidden group hover:shadow-lg transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white shadow-lg`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-2xl font-bold text-terra-800">{stat.value}</p>
                <p className="text-sm text-terra-500">{stat.label}</p>
              </div>
            </div>
            <div className={`absolute top-0 right-0 w-24 h-24 ${stat.light} rounded-full -translate-y-8 translate-x-8 opacity-50 group-hover:scale-150 transition-transform duration-500`} />
          </motion.div>
        ))}
      </div>

      {/* Pending Orders */}
      {pendingOrders.length > 0 && (
        <div className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-terra-800 mb-5 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-500" /> Pending Orders
          </h2>
          <div className="space-y-4">
            {pendingOrders.map((order, i) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl border border-amber-100 p-5 shadow-sm"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                  <div>
                    <p className="font-semibold text-terra-800">Order #{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-sm text-terra-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                    Pending
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {order.items.map(item => (
                    <div key={item.product.id} className="flex items-center gap-2 px-3 py-1.5 bg-cream-50 rounded-lg">
                      <img src={item.product.image} alt="" className="w-6 h-6 rounded object-cover" />
                      <span className="text-xs font-medium text-terra-700">{item.product.name} ×{item.quantity}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-terra-50">
                  <span className="font-bold text-terra-800">${order.total.toFixed(2)}</span>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleCancelOrder(order.id)}
                    className="flex items-center gap-1.5 px-4 py-2 text-red-600 bg-red-50 rounded-full text-sm font-medium hover:bg-red-100 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" /> Cancel
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Active Orders with Timeline */}
      {activeOrders.length > 0 && (
        <div className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-terra-800 mb-5 flex items-center gap-2">
            <Truck className="w-5 h-5 text-orange-500" /> Active Orders
          </h2>
          <div className="space-y-6">
            {activeOrders.map((order, i) => {
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
                      <p className="text-sm text-terra-500 mt-0.5">{new Date(order.createdAt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border ${config.bg} ${config.color}`}>
                      {config.icon} {order.status.replace('_', ' ')}
                    </span>
                  </div>

                  {/* Order Timeline */}
                  <div className="mb-5 px-2">
                    <OrderTimeline status={order.status} />
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
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-terra-50">
                    <div className="flex items-center gap-1.5 text-sm text-terra-500">
                      <MapPin className="w-3.5 h-3.5" /> {order.address}
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-terra-700 to-wine-700 bg-clip-text text-transparent">${order.total.toFixed(2)}</span>
                  </div>
                  {order.deliveryAgentName && (
                    <div className="mt-4 flex items-center gap-2 text-sm text-sage-700 bg-sage-50 rounded-xl p-3 border border-sage-100">
                      <Truck className="w-4 h-4 text-sage-500" />
                      <span>Delivered by <strong>{order.deliveryAgentName}</strong></span>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Past Orders */}
      {pastOrders.length > 0 && (
        <div className="mb-10">
          <h2 className="font-serif text-xl font-semibold text-terra-800 mb-5">Order History</h2>
          <div className="space-y-3">
            {pastOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl border border-terra-100/50 p-4 flex flex-wrap items-center justify-between gap-3 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-sage-50 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-sage-500" />
                  </div>
                  <div>
                    <p className="font-medium text-terra-700">Order #{order.id.slice(-6).toUpperCase()}</p>
                    <p className="text-xs text-terra-400">{new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-bold text-terra-800">${order.total.toFixed(2)}</span>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleReorder(order.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-terra-50 text-terra-700 rounded-full text-xs font-medium hover:bg-terra-100 transition-colors"
                  >
                    <RotateCcw className="w-3 h-3" /> Reorder
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {orders.length === 0 && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
          <div className="text-6xl mb-4">🍽️</div>
          <h3 className="font-serif text-2xl text-terra-700 mb-2">No orders yet</h3>
          <p className="text-terra-500 mb-6">Start exploring our specialty food collection</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-full font-medium shadow-lg shadow-terra-500/20 hover:shadow-xl transition-all">
            Browse Products <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      )}

      {/* Profile Card */}
      <div className="bg-white rounded-2xl border border-terra-100/50 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h2 className="font-serif text-xl font-semibold text-terra-800 flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-terra-400 to-wine-500 rounded-lg flex items-center justify-center">
              <span className="text-white text-xs font-bold">{user.name[0]}</span>
            </div>
            Profile Settings
          </h2>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => editingProfile ? handleSaveProfile() : setEditingProfile(true)}
            className="flex items-center gap-1.5 px-4 py-2 bg-terra-50 text-terra-700 rounded-full text-sm font-medium hover:bg-terra-100 transition-colors"
          >
            {editingProfile ? (
              <><Save className="w-3.5 h-3.5" /> Save</>
            ) : (
              <><Edit2 className="w-3.5 h-3.5" /> Edit</>
            )}
          </motion.button>
        </div>
        <div className="grid sm:grid-cols-2 gap-5">
          <div className="p-4 bg-cream-50 rounded-xl">
            <label className="text-xs text-terra-400 uppercase tracking-wider font-medium">Name</label>
            {editingProfile ? (
              <input
                type="text"
                value={profileForm.name}
                onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-terra-200 focus:border-terra-400 outline-none text-sm"
              />
            ) : (
              <p className="font-medium text-terra-800 mt-1">{user.name}</p>
            )}
          </div>
          <div className="p-4 bg-cream-50 rounded-xl">
            <label className="text-xs text-terra-400 uppercase tracking-wider font-medium">Email</label>
            <p className="font-medium text-terra-800 mt-1">{user.email}</p>
            <p className="text-[10px] text-terra-400 mt-1">Contact support to change email</p>
          </div>
          <div className="p-4 bg-cream-50 rounded-xl">
            <label className="text-xs text-terra-400 uppercase tracking-wider font-medium">Phone</label>
            {editingProfile ? (
              <input
                type="tel"
                value={profileForm.phone}
                onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-terra-200 focus:border-terra-400 outline-none text-sm"
                placeholder="+1 (555) 000-0000"
              />
            ) : (
              <p className="font-medium text-terra-800 mt-1">{user.phone || 'Not set'}</p>
            )}
          </div>
          <div className="p-4 bg-cream-50 rounded-xl">
            <label className="text-xs text-terra-400 uppercase tracking-wider font-medium">Address</label>
            {editingProfile ? (
              <input
                type="text"
                value={profileForm.address}
                onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                className="w-full mt-1 px-3 py-2 rounded-lg border border-terra-200 focus:border-terra-400 outline-none text-sm"
                placeholder="Your address"
              />
            ) : (
              <p className="font-medium text-terra-800 mt-1">{user.address || 'Not set'}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
