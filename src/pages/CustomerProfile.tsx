import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Edit2, Save, X, Camera, ShoppingBag, Heart, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useStore } from '../contexts/StoreContext';
import { useToast } from '../contexts/ToastContext';
import { supabase } from '../lib/supabase';

export default function CustomerProfile() {
  const { user } = useAuth();
  const { getOrdersForUser, wishlist } = useStore();
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProfile();
      loadOrders();
    }
  }, [user]);

  const loadProfile = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (!error && data) {
        setProfile({
          name: data.full_name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || ''
        });
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  const loadOrders = async () => {
    if (!user) return;

    try {
      const userOrders = getOrdersForUser(user.id);
      setOrders(userOrders);
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: profile.name,
          phone: profile.phone,
          address: profile.address
        })
        .eq('id', user.id);

      if (error) throw error;

      showToast('success', 'Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      showToast('error', 'Failed to update profile');
    }
  };

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const totalOrders = orders.length;
  const wishlistCount = wishlist.length;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading profile...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          My Profile
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Manage your account information and preferences
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-1"
        >
          <div className="bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-xl">
            {/* Avatar */}
            <div className="relative mb-6">
              <div className="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center text-4xl font-bold backdrop-blur-sm">
                {profile.name.charAt(0).toUpperCase()}
              </div>
              <button className="absolute bottom-0 right-1/2 translate-x-12 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                <Camera className="w-4 h-4 text-amber-600" />
              </button>
            </div>

            {/* Name */}
            <h2 className="font-serif text-2xl font-bold text-center mb-1">
              {profile.name}
            </h2>
            <p className="text-white/80 text-center text-sm mb-6">
              {profile.email}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <ShoppingBag className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xl font-bold">{totalOrders}</p>
                <p className="text-xs text-white/80">Orders</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <Heart className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xl font-bold">{wishlistCount}</p>
                <p className="text-xs text-white/80">Wishlist</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 text-center">
                <Award className="w-5 h-5 mx-auto mb-1" />
                <p className="text-xl font-bold">${totalSpent.toFixed(0)}</p>
                <p className="text-xs text-white/80">Spent</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="lg:col-span-2"
        >
          <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
                Personal Information
              </h3>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className="px-4 py-2 gradient-bg text-white rounded-xl font-semibold text-sm shadow-lg flex items-center gap-2"
              >
                {isEditing ? (
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

            {/* Form */}
            <div className="space-y-5">
              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={profile.name}
                    onChange={e => setProfile({ ...profile, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                  />
                ) : (
                  <p className="px-4 py-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl text-stone-800 dark:text-stone-200">
                    {profile.name}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <p className="px-4 py-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl text-stone-800 dark:text-stone-200">
                  {profile.email}
                </p>
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  <Phone className="w-4 h-4" />
                  Phone Number
                </label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={profile.phone}
                    onChange={e => setProfile({ ...profile, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                  />
                ) : (
                  <p className="px-4 py-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl text-stone-800 dark:text-stone-200">
                    {profile.phone || 'Not set'}
                  </p>
                )}
              </div>

              <div>
                <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  <MapPin className="w-4 h-4" />
                  Address
                </label>
                {isEditing ? (
                  <textarea
                    value={profile.address}
                    onChange={e => setProfile({ ...profile, address: e.target.value })}
                    rows={3}
                    placeholder="Your full address"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
                  />
                ) : (
                  <p className="px-4 py-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl text-stone-800 dark:text-stone-200">
                    {profile.address || 'Not set'}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Recent Orders */}
          <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 mt-6">
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Recent Orders
            </h3>
            {orders.length === 0 ? (
              <p className="text-center text-stone-500 dark:text-stone-400 py-8">
                No orders yet
              </p>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 5).map((order, index) => (
                  <motion.div
                    key={order.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
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
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
