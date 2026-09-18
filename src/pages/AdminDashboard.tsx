import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Package, ShoppingBag, TrendingUp, Edit, Trash2, Plus, X, Save, Truck, UserCheck, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { Product, UserRole, Order } from '../types';

type Tab = 'overview' | 'users' | 'products' | 'orders';

export default function AdminDashboard() {
  const { users, updateUserRole, deleteUser } = useAuth();
  const { products, orders, addProduct, updateProduct, deleteProduct, updateOrderStatus, assignDeliveryAgent } = useStore();
  const [activeTab, setActiveTab] = useState<Tab>('overview');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [showAssignModal, setShowAssignModal] = useState<string | null>(null);

  const deliveryAgents = users.filter(u => u.role === 'delivery');
  const customers = users.filter(u => u.role === 'customer');
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0);

  const tabs: { id: Tab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" />, count: users.length },
    { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" />, count: products.length },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" />, count: orders.length },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-50 text-amber-700 border-amber-200',
    confirmed: 'bg-blue-50 text-blue-700 border-blue-200',
    preparing: 'bg-purple-50 text-purple-700 border-purple-200',
    out_for_delivery: 'bg-orange-50 text-orange-700 border-orange-200',
    delivered: 'bg-sage-50 text-sage-700 border-sage-200'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 bg-gradient-to-br from-wine-500 to-wine-700 rounded-xl flex items-center justify-center shadow-lg shadow-wine-500/20">
            <Shield className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-terra-800">Admin Dashboard</h1>
            <p className="text-terra-500 text-sm">Manage your store, users, and orders</p>
          </div>
        </div>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2 scrollbar-hide">
        {tabs.map(tab => (
          <motion.button
            key={tab.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-gradient-to-r from-terra-600 to-wine-600 text-white shadow-lg shadow-terra-500/20'
                : 'bg-white text-terra-600 border border-terra-100 hover:border-terra-200 hover:shadow-sm'
            }`}
          >
            {tab.icon} {tab.label}
            {tab.count !== undefined && (
              <span className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold ${activeTab === tab.id ? 'bg-white/20' : 'bg-terra-100 text-terra-600'}`}>
                {tab.count}
              </span>
            )}
          </motion.button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Revenue', value: `$${totalRevenue.toFixed(0)}`, icon: <TrendingUp className="w-5 h-5" />, gradient: 'from-sage-500 to-sage-600' },
              { label: 'Orders', value: orders.length, icon: <ShoppingBag className="w-5 h-5" />, gradient: 'from-terra-500 to-terra-600' },
              { label: 'Customers', value: customers.length, icon: <Users className="w-5 h-5" />, gradient: 'from-blue-500 to-blue-600' },
              { label: 'Products', value: products.length, icon: <Package className="w-5 h-5" />, gradient: 'from-purple-500 to-purple-600' }
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative bg-white rounded-2xl border border-terra-100/50 p-5 shadow-sm overflow-hidden hover:shadow-lg transition-shadow"
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

          {/* Revenue highlight */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-terra-800 to-wine-800 rounded-2xl p-6 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -translate-y-16 translate-x-16" />
            <div className="relative">
              <p className="text-sm text-terra-200 mb-1">Total Revenue</p>
              <p className="text-4xl font-bold mb-2">${totalRevenue.toFixed(2)}</p>
              <p className="text-sm text-terra-300">{orders.length} orders processed</p>
            </div>
          </motion.div>

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-terra-100/50 p-6 shadow-sm">
            <h3 className="font-serif text-lg font-semibold text-terra-800 mb-5">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-terra-100">
                    <th className="text-left py-3 px-2 text-terra-500 font-medium">Order</th>
                    <th className="text-left py-3 px-2 text-terra-500 font-medium">Customer</th>
                    <th className="text-left py-3 px-2 text-terra-500 font-medium">Status</th>
                    <th className="text-left py-3 px-2 text-terra-500 font-medium">Total</th>
                    <th className="text-left py-3 px-2 text-terra-500 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b border-terra-50 hover:bg-cream-50 transition-colors">
                      <td className="py-3 px-2 font-medium text-terra-800">#{order.id.slice(-6).toUpperCase()}</td>
                      <td className="py-3 px-2 text-terra-600">{order.userName}</td>
                      <td className="py-3 px-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status]}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-2 font-bold text-terra-800">${order.total.toFixed(2)}</td>
                      <td className="py-3 px-2 text-terra-500">{new Date(order.createdAt).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Users Tab */}
      {activeTab === 'users' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="bg-white rounded-2xl border border-terra-100/50 overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-cream-50">
                  <tr>
                    <th className="text-left p-4 text-terra-600 font-medium">User</th>
                    <th className="text-left p-4 text-terra-600 font-medium">Email</th>
                    <th className="text-left p-4 text-terra-600 font-medium">Role</th>
                    <th className="text-left p-4 text-terra-600 font-medium">Joined</th>
                    <th className="text-left p-4 text-terra-600 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.filter(u => u.role !== 'admin').map(user => (
                    <tr key={user.id} className="border-t border-terra-50 hover:bg-cream-50/50 transition-colors">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-gradient-to-br from-terra-400 to-wine-500 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-white">{user.name[0]}</span>
                          </div>
                          <span className="font-medium text-terra-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-terra-600">{user.email}</td>
                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={e => updateUserRole(user.id, e.target.value as UserRole)}
                          className="px-3 py-1.5 rounded-lg border border-terra-200 text-sm bg-white font-medium text-terra-700 focus:border-terra-400 outline-none"
                        >
                          <option value="customer">Customer</option>
                          <option value="delivery">Delivery Agent</option>
                        </select>
                      </td>
                      <td className="p-4 text-terra-500">{user.joinedDate}</td>
                      <td className="p-4">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => deleteUser(user.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      )}

      {/* Products Tab */}
      {activeTab === 'products' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          <div className="flex items-center justify-between mb-6">
            <h2 className="font-serif text-xl font-semibold text-terra-800">Product Catalog</h2>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => { setEditingProduct(null); setShowProductForm(true); }}
              className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-xl text-sm font-semibold shadow-lg shadow-terra-500/20 hover:shadow-xl transition-all"
            >
              <Plus className="w-4 h-4" /> Add Product
            </motion.button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {products.map(product => (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                className="bg-white rounded-2xl border border-terra-100/50 overflow-hidden shadow-sm hover:shadow-lg transition-all"
              >
                <img src={product.image} alt={product.name} className="w-full h-36 object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-terra-800 truncate">{product.name}</h3>
                  <p className="text-sm text-terra-500 mt-0.5">{product.category} • {product.origin}</p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-lg font-bold bg-gradient-to-r from-terra-700 to-wine-700 bg-clip-text text-transparent">${product.price.toFixed(2)}</span>
                    <div className="flex gap-1">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => { setEditingProduct(product); setShowProductForm(true); }}
                        className="p-2 text-terra-500 hover:text-terra-700 hover:bg-terra-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <AnimatePresence>
            {showProductForm && (
              <ProductFormModal
                product={editingProduct}
                onClose={() => setShowProductForm(false)}
                onSave={(data: any) => {
                  if (editingProduct) {
                    updateProduct(editingProduct.id, data);
                  } else {
                    addProduct(data as Omit<Product, 'id'>);
                  }
                  setShowProductForm(false);
                }}
              />
            )}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          {orders.map((order, i) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-white rounded-2xl border border-terra-100/50 p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
                <div>
                  <p className="font-semibold text-terra-800">Order #{order.id.slice(-6).toUpperCase()}</p>
                  <p className="text-sm text-terra-500 mt-0.5">{order.userName} • {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <select
                  value={order.status}
                  onChange={e => updateOrderStatus(order.id, e.target.value as Order['status'])}
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold border ${statusColors[order.status]} cursor-pointer`}
                >
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="preparing">Preparing</option>
                  <option value="out_for_delivery">Out for Delivery</option>
                  <option value="delivered">Delivered</option>
                </select>
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
                <div className="flex items-center gap-4 text-sm text-terra-600">
                  <span>Total: <strong className="text-terra-800">${order.total.toFixed(2)}</strong></span>
                  <span className="hidden sm:inline">• {order.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2">
                  {order.deliveryAgentName ? (
                    <span className="flex items-center gap-1.5 text-sm text-sage-700 bg-sage-50 px-3 py-1.5 rounded-full border border-sage-200">
                      <Truck className="w-3.5 h-3.5" /> {order.deliveryAgentName}
                    </span>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setShowAssignModal(order.id)}
                      className="flex items-center gap-1.5 text-sm text-terra-600 bg-terra-50 px-3 py-1.5 rounded-full border border-terra-200 hover:bg-terra-100 transition-colors"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Assign Agent
                    </motion.button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          <AnimatePresence>
            {showAssignModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
                onClick={() => setShowAssignModal(null)}
              >
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  onClick={e => e.stopPropagation()}
                  className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl"
                >
                  <h3 className="font-serif text-lg font-semibold text-terra-800 mb-5">Assign Delivery Agent</h3>
                  <div className="space-y-2">
                    {deliveryAgents.length === 0 ? (
                      <p className="text-sm text-terra-500 text-center py-4">No delivery agents available.</p>
                    ) : (
                      deliveryAgents.map(agent => (
                        <motion.button
                          key={agent.id}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => {
                            assignDeliveryAgent(showAssignModal, agent.id, agent.name);
                            setShowAssignModal(null);
                          }}
                          className="w-full flex items-center gap-3 p-3.5 rounded-xl border border-terra-100 hover:bg-terra-50 hover:border-terra-200 transition-all text-left"
                        >
                          <div className="w-10 h-10 bg-gradient-to-br from-sage-400 to-sage-600 rounded-full flex items-center justify-center shadow-sm">
                            <span className="text-xs font-bold text-white">{agent.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-terra-800">{agent.name}</p>
                            <p className="text-xs text-terra-500">{agent.email}</p>
                          </div>
                        </motion.button>
                      ))
                    )}
                  </div>
                  <button
                    onClick={() => setShowAssignModal(null)}
                    className="mt-5 w-full py-3 border-2 border-terra-200 text-terra-600 rounded-xl text-sm font-medium hover:bg-terra-50 transition-colors"
                  >
                    Cancel
                  </button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
}

function ProductFormModal({ product, onClose, onSave }: {
  product: Product | null;
  onClose: () => void;
  onSave: (data: any) => void;
}) {
  const [form, setForm] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || 'Pantry',
    image: product?.image || '',
    origin: product?.origin || '',
    weight: product?.weight || '',
    inStock: product?.inStock ?? true,
    rating: product?.rating || 4.5,
    reviews: product?.reviews || 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(form);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 20 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="font-serif text-lg font-semibold text-terra-800">
            {product ? 'Edit Product' : '✨ Add New Product'}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-terra-50 rounded-lg transition-colors">
            <X className="w-5 h-5 text-terra-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-terra-700 mb-1.5">Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
              className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none bg-cream-50/50" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-terra-700 mb-1.5">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none resize-none bg-cream-50/50" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-terra-700 mb-1.5">Price ($)</label>
              <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} required
                className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none bg-cream-50/50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-terra-700 mb-1.5">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none bg-cream-50/50">
                <option>Pantry</option><option>Beverages</option><option>Spices</option><option>Confections</option><option>Oils</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-terra-700 mb-1.5">Origin</label>
              <input type="text" value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none bg-cream-50/50" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-terra-700 mb-1.5">Weight/Size</label>
              <input type="text" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none bg-cream-50/50" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-terra-700 mb-1.5">Image URL</label>
            <input type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none bg-cream-50/50" />
          </div>
          <motion.button
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            type="submit"
            className="w-full py-3.5 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-xl font-semibold shadow-lg shadow-terra-500/20 hover:shadow-xl transition-all flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> {product ? 'Update Product' : 'Add Product'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
