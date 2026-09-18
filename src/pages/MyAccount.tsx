import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Calendar, ShoppingBag, Heart, Award, Edit2, Save, Camera } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';

export default function MyAccount() {
  const { user } = useAuth();
  const { getOrdersForUser, wishlist, products } = useStore();
  const { showToast } = useToast();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  if (!user) return null;

  const orders = getOrdersForUser(user.id);
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));
  const totalSpent = orders.reduce((sum, o) => sum + o.total, 0);
  const memberSince = new Date(user.joinedDate || '2024-01-01');

  const handleSave = () => {
    setEditing(false);
    showToast('success', 'Profile updated successfully!');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10"
      >
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          My Account
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Manage your profile and preferences
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              {/* Avatar */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold mx-auto">
                  {user.name[0]}
                </div>
                <button className="absolute bottom-0 right-1/2 translate-x-12 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <Camera className="w-4 h-4 text-amber-600" />
                </button>
              </div>

              {/* Name */}
              <h2 className="font-serif text-2xl font-bold text-center mb-1">
                {user.name}
              </h2>
              <p className="text-white/80 text-center text-sm mb-6">
                {user.email}
              </p>

              {/* Member Info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <Calendar className="w-5 h-5" />
                  <div>
                    <p className="text-white/60 text-xs">Member Since</p>
                    <p className="font-semibold">
                      {memberSince.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <ShoppingBag className="w-5 h-5" />
                  <div>
                    <p className="text-white/60 text-xs">Total Orders</p>
                    <p className="font-semibold">{orders.length}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-white/10 rounded-xl px-4 py-3">
                  <Award className="w-5 h-5" />
                  <div>
                    <p className="text-white/60 text-xs">Total Spent</p>
                    <p className="font-semibold">${totalSpent.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Personal Info */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Personal Information
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => editing ? handleSave() : setEditing(true)}
                className="px-4 py-2 gradient-bg text-white rounded-xl font-semibold text-sm shadow-lg flex items-center gap-2"
              >
                {editing ? (
                  <>
                    <Save className="w-4 h-4" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </>
                )}
              </motion.button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                  />
                ) : (
                  <p className="px-4 py-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl text-stone-800 dark:text-stone-200">
                    {user.name}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <p className="px-4 py-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl text-stone-800 dark:text-stone-200">
                  {user.email}
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                {editing ? (
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={e => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                  />
                ) : (
                  <p className="px-4 py-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl text-stone-800 dark:text-stone-200">
                    {user.phone || 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {editing ? (
                  <input
                    type="text"
                    value={formData.address}
                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Your address"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                  />
                ) : (
                  <p className="px-4 py-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl text-stone-800 dark:text-stone-200">
                    {user.address || 'Not set'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid sm:grid-cols-3 gap-4">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5 text-center"
            >
              <ShoppingBag className="w-8 h-8 mx-auto mb-2 text-amber-600" />
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">{orders.length}</p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Total Orders</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5 text-center"
            >
              <Heart className="w-8 h-8 mx-auto mb-2 text-rose-500" />
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">{wishlistProducts.length}</p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Wishlist Items</p>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5 text-center"
            >
              <Award className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">2,450</p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Loyalty Points</p>
            </motion.div>
          </div>

          {/* Recent Orders */}
          {orders.length > 0 && (
            <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                Recent Orders
              </h3>
              <div className="space-y-3">
                {orders.slice(0, 3).map(order => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
                  >
                    <div>
                      <p className="font-semibold text-stone-900 dark:text-stone-100">
                        Order #{order.id.slice(-6).toUpperCase()}
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {new Date(order.createdAt).toLocaleDateString()} • {order.items.length} items
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-stone-900 dark:text-stone-100">
                        ${order.total.toFixed(2)}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === 'delivered'
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                          : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                      }`}>
                        {order.status.replace('_', ' ')}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
