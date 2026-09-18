import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Package, ShoppingBag, TrendingUp, Edit, Trash2, Plus, X, Save, Truck, UserCheck } from 'lucide-react';
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

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp className="w-4 h-4" /> },
    { id: 'users', label: 'Users', icon: <Users className="w-4 h-4" /> },
    { id: 'products', label: 'Products', icon: <Package className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders', icon: <ShoppingBag className="w-4 h-4" /> },
  ];

  const statusColors: Record<string, string> = {
    pending: 'bg-amber-100 text-amber-700',
    confirmed: 'bg-blue-100 text-blue-700',
    preparing: 'bg-purple-100 text-purple-700',
    out_for_delivery: 'bg-orange-100 text-orange-700',
    delivered: 'bg-sage-100 text-sage-700'
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-3xl font-bold text-terra-800">Admin Dashboard</h1>
        <p className="text-terra-500 mt-1">Manage your store, users, and orders</p>
      </motion.div>

      {/* Tabs */}
      <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-terra-600 text-white shadow-sm'
                : 'bg-white text-terra-600 border border-terra-100 hover:bg-terra-50'
            }`}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      {/* Overview Tab */}
      {activeTab === 'overview' && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label: 'Total Revenue', value: `$${totalRevenue.toFixed(2)}`, icon: <TrendingUp className="w-5 h-5" />, color: 'bg-sage-50 text-sage-600' },
              { label: 'Total Orders', value: orders.length, icon: <ShoppingBag className="w-5 h-5" />, color: 'bg-terra-50 text-terra-600' },
              { label: 'Customers', value: customers.length, icon: <Users className="w-5 h-5" />, color: 'bg-blue-50 text-blue-600' },
              { label: 'Products', value: products.length, icon: <Package className="w-5 h-5" />, color: 'bg-purple-50 text-purple-600' }
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

          {/* Recent Orders */}
          <div className="bg-white rounded-2xl border border-terra-100 p-6">
            <h3 className="font-serif text-lg font-semibold text-terra-800 mb-4">Recent Orders</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-terra-100">
                    <th className="text-left py-2 text-terra-500 font-medium">Order</th>
                    <th className="text-left py-2 text-terra-500 font-medium">Customer</th>
                    <th className="text-left py-2 text-terra-500 font-medium">Status</th>
                    <th className="text-left py-2 text-terra-500 font-medium">Total</th>
                    <th className="text-left py-2 text-terra-500 font-medium">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.slice(0, 5).map(order => (
                    <tr key={order.id} className="border-b border-terra-50">
                      <td className="py-3 font-medium text-terra-800">#{order.id.slice(-6)}</td>
                      <td className="py-3 text-terra-600">{order.userName}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[order.status]}`}>
                          {order.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 font-medium text-terra-800">${order.total.toFixed(2)}</td>
                      <td className="py-3 text-terra-500">{new Date(order.createdAt).toLocaleDateString()}</td>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
          <div className="bg-white rounded-2xl border border-terra-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-terra-50">
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
                    <tr key={user.id} className="border-t border-terra-50 hover:bg-terra-25">
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-terra-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-terra-700">{user.name[0]}</span>
                          </div>
                          <span className="font-medium text-terra-800">{user.name}</span>
                        </div>
                      </td>
                      <td className="p-4 text-terra-600">{user.email}</td>
                      <td className="p-4">
                        <select
                          value={user.role}
                          onChange={e => updateUserRole(user.id, e.target.value as UserRole)}
                          className="px-2 py-1 rounded-lg border border-terra-200 text-sm bg-white"
                        >
                          <option value="customer">Customer</option>
                          <option value="delivery">Delivery Agent</option>
                        </select>
                      </td>
                      <td className="p-4 text-terra-500">{user.joinedDate}</td>
                      <td className="p-4">
                        <button
                          onClick={() => deleteUser(user.id)}
                          className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
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
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-serif text-xl font-semibold text-terra-800">Product Catalog</h2>
            <button
              onClick={() => { setEditingProduct(null); setShowProductForm(true); }}
              className="flex items-center gap-2 px-4 py-2 bg-terra-600 text-white rounded-xl text-sm font-medium hover:bg-terra-700 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Product
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map(product => (
              <div key={product.id} className="bg-white rounded-2xl border border-terra-100 overflow-hidden shadow-sm">
                <img src={product.image} alt={product.name} className="w-full h-32 object-cover" />
                <div className="p-4">
                  <h3 className="font-medium text-terra-800 truncate">{product.name}</h3>
                  <p className="text-sm text-terra-500">{product.category} • {product.origin}</p>
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-bold text-terra-800">${product.price.toFixed(2)}</span>
                    <div className="flex gap-1">
                      <button
                        onClick={() => { setEditingProduct(product); setShowProductForm(true); }}
                        className="p-2 text-terra-500 hover:text-terra-700 hover:bg-terra-50 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => deleteProduct(product.id)}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Product Form Modal */}
          <AnimatePresence>
            {showProductForm && (
              <ProductFormModal
                product={editingProduct}
                onClose={() => setShowProductForm(false)}
                onSave={(data) => {
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
              className="bg-white rounded-2xl border border-terra-100 p-5 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                <div>
                  <p className="font-medium text-terra-800">Order #{order.id.slice(-6)}</p>
                  <p className="text-sm text-terra-500">{order.userName} • {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={order.status}
                    onChange={e => updateOrderStatus(order.id, e.target.value as Order['status'])}
                    className={`px-3 py-1 rounded-full text-xs font-medium border-0 ${statusColors[order.status]}`}
                  >
                    <option value="pending">Pending</option>
                    <option value="confirmed">Confirmed</option>
                    <option value="preparing">Preparing</option>
                    <option value="out_for_delivery">Out for Delivery</option>
                    <option value="delivered">Delivered</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-3">
                {order.items.map(item => (
                  <div key={item.product.id} className="flex items-center gap-2 px-2 py-1 bg-terra-50 rounded-lg">
                    <img src={item.product.image} alt="" className="w-6 h-6 rounded object-cover" />
                    <span className="text-xs text-terra-700">{item.product.name} ×{item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-terra-50">
                <div className="flex items-center gap-4 text-sm text-terra-600">
                  <span>Total: <strong className="text-terra-800">${order.total.toFixed(2)}</strong></span>
                  <span>Payment: {order.paymentMethod}</span>
                </div>
                <div className="flex items-center gap-2">
                  {order.deliveryAgentName ? (
                    <span className="flex items-center gap-1 text-sm text-sage-600 bg-sage-50 px-3 py-1 rounded-full">
                      <Truck className="w-3.5 h-3.5" /> {order.deliveryAgentName}
                    </span>
                  ) : (
                    <button
                      onClick={() => setShowAssignModal(order.id)}
                      className="flex items-center gap-1 text-sm text-terra-600 bg-terra-50 px-3 py-1 rounded-full hover:bg-terra-100 transition-colors"
                    >
                      <UserCheck className="w-3.5 h-3.5" /> Assign Agent
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}

          {/* Assign Delivery Agent Modal */}
          <AnimatePresence>
            {showAssignModal && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
                onClick={() => setShowAssignModal(null)}
              >
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.9 }}
                  onClick={e => e.stopPropagation()}
                  className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-xl"
                >
                  <h3 className="font-serif text-lg font-semibold text-terra-800 mb-4">Assign Delivery Agent</h3>
                  <div className="space-y-2">
                    {deliveryAgents.length === 0 ? (
                      <p className="text-sm text-terra-500">No delivery agents available.</p>
                    ) : (
                      deliveryAgents.map(agent => (
                        <button
                          key={agent.id}
                          onClick={() => {
                            assignDeliveryAgent(showAssignModal, agent.id, agent.name);
                            setShowAssignModal(null);
                          }}
                          className="w-full flex items-center gap-3 p-3 rounded-xl border border-terra-100 hover:bg-terra-50 transition-colors text-left"
                        >
                          <div className="w-8 h-8 bg-sage-100 rounded-full flex items-center justify-center">
                            <span className="text-xs font-bold text-sage-700">{agent.name[0]}</span>
                          </div>
                          <div>
                            <p className="font-medium text-terra-800">{agent.name}</p>
                            <p className="text-xs text-terra-500">{agent.email}</p>
                          </div>
                        </button>
                      ))
                    )}
                  </div>
                  <button
                    onClick={() => setShowAssignModal(null)}
                    className="mt-4 w-full py-2 border border-terra-200 text-terra-600 rounded-xl text-sm font-medium hover:bg-terra-50 transition-colors"
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

// Product Form Modal Component
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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="bg-white rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-xl"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold text-terra-800">
            {product ? 'Edit Product' : 'Add New Product'}
          </h3>
          <button onClick={onClose} className="p-1 hover:bg-terra-50 rounded-lg">
            <X className="w-5 h-5 text-terra-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-terra-700 mb-1">Name</label>
            <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required
              className="w-full px-3 py-2 rounded-xl border border-terra-200 focus:border-terra-400 outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-terra-700 mb-1">Description</label>
            <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3}
              className="w-full px-3 py-2 rounded-xl border border-terra-200 focus:border-terra-400 outline-none resize-none" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-terra-700 mb-1">Price ($)</label>
              <input type="number" step="0.01" value={form.price} onChange={e => setForm({ ...form, price: parseFloat(e.target.value) })} required
                className="w-full px-3 py-2 rounded-xl border border-terra-200 focus:border-terra-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-terra-700 mb-1">Category</label>
              <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-terra-200 focus:border-terra-400 outline-none">
                <option>Pantry</option>
                <option>Beverages</option>
                <option>Spices</option>
                <option>Confections</option>
                <option>Oils</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-terra-700 mb-1">Origin</label>
              <input type="text" value={form.origin} onChange={e => setForm({ ...form, origin: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-terra-200 focus:border-terra-400 outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-terra-700 mb-1">Weight/Size</label>
              <input type="text" value={form.weight} onChange={e => setForm({ ...form, weight: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-terra-200 focus:border-terra-400 outline-none" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-terra-700 mb-1">Image URL</label>
            <input type="url" value={form.image} onChange={e => setForm({ ...form, image: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-terra-200 focus:border-terra-400 outline-none" />
          </div>
          <motion.button
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3 bg-terra-600 text-white rounded-xl font-medium hover:bg-terra-700 transition-colors flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" /> {product ? 'Update Product' : 'Add Product'}
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
}
