import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Package, Clock, MapPin, CheckCircle, Truck, ShoppingBag } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';

export default function CustomerDashboard() {
  const { user } = useAuth();
  const { getOrdersForUser } = useStore();

  if (!user) return null;
  const orders = getOrdersForUser(user.id);
  const activeOrders = orders.filter(o => o.status !== 'delivered');
  const pastOrders = orders.filter(o => o.status === 'delivered');

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-blue-100 text-blue-700',
    preparing: 'bg-purple-100 text-purple-700',
    out_for_delivery: 'bg-orange-100 text-orange-700',
    delivered: 'bg-sage-100 text-sage-700'
  };

  const statusIcons: Record<string, React.ReactNode> = {
    pending: <Clock className="w-4 h-4" />,
    confirmed: <CheckCircle className="w-4 h-4" />,
    preparing: <Package className="w-4 h-4" />,
    out_for_delivery: <Truck className="w-4 h-4" />,
    delivered: <CheckCircle className="w-4 h-4" />
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-terra-800">Welcome, {user.name.split(' ')[0]}!</h1>
        <p className="text-terra-500 mt-1">Here's your order overview</p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: orders.length, icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-terra-50 text-terra-600' },
          { label: 'Active Orders', value: activeOrders.length, icon: <Truck className="w-5 h-5" />, color: 'bg-orange-50 text-orange-600' },
          { label: 'Delivered', value: pastOrders.length, icon: <CheckCircle className="w-5 h-5" />, color: 'bg-sage-50 text-sage-600' }
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

      {/* Active Orders */}
      {activeOrders.length > 0 && (
        <div className="mb-8">
          <h2 className="font-serif text-xl font-semibold text-terra-800 mb-4">Active Orders</h2>
          <div className="space-y-4">
            {activeOrders.map((order, i) => (
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
                    <p className="text-sm text-terra-500">{new Date(order.createdAt).toLocaleDateString()}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                    {statusIcons[order.status]} {order.status.replace('_', ' ')}
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
                <div className="flex items-center justify-between pt-3 border-t border-terra-50">
                  <div className="flex items-center gap-1 text-sm text-terra-500">
                    <MapPin className="w-3.5 h-3.5" /> {order.address}
                  </div>
                  <span className="font-bold text-terra-800">${order.total.toFixed(2)}</span>
                </div>
                {order.deliveryAgentName && (
                  <div className="mt-3 flex items-center gap-2 text-sm text-terra-600 bg-sage-50 rounded-lg p-2">
                    <Truck className="w-4 h-4 text-sage-600" />
                    Delivered by: {order.deliveryAgentName}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Past Orders */}
      {pastOrders.length > 0 && (
        <div>
          <h2 className="font-serif text-xl font-semibold text-terra-800 mb-4">Order History</h2>
          <div className="space-y-3">
            {pastOrders.map(order => (
              <div key={order.id} className="bg-white rounded-xl border border-terra-100 p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-terra-700">Order #{order.id.slice(-6)}</p>
                  <p className="text-xs text-terra-400">{new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-medium text-sage-600">Delivered</span>
                  <span className="font-bold text-terra-800">${order.total.toFixed(2)}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {orders.length === 0 && (
        <div className="text-center py-16">
          <ShoppingBag className="w-16 h-16 mx-auto text-terra-200 mb-4" />
          <h3 className="font-serif text-xl text-terra-700 mb-2">No orders yet</h3>
          <p className="text-terra-500 mb-4">Start exploring our specialty food collection</p>
          <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-terra-600 text-white rounded-full font-medium hover:bg-terra-700 transition-colors">
            Browse Products
          </Link>
        </div>
      )}

      {/* Profile */}
      <div className="mt-8 bg-white rounded-2xl border border-terra-100 p-6">
        <h2 className="font-serif text-xl font-semibold text-terra-800 mb-4">Profile Settings</h2>
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-terra-500">Name</label>
            <p className="font-medium text-terra-800">{user.name}</p>
          </div>
          <div>
            <label className="text-sm text-terra-500">Email</label>
            <p className="font-medium text-terra-800">{user.email}</p>
          </div>
          <div>
            <label className="text-sm text-terra-500">Phone</label>
            <p className="font-medium text-terra-800">{user.phone || 'Not set'}</p>
          </div>
          <div>
            <label className="text-sm text-terra-500">Address</label>
            <p className="font-medium text-terra-800">{user.address || 'Not set'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
