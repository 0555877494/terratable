import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Store, Star, MapPin, Package, Edit2, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface Vendor {
  id: string;
  name: string;
  description: string;
  logo: string;
  location: string;
  rating: number;
  totalProducts: number;
  totalSales: number;
  joinedDate: string;
  status: 'active' | 'pending' | 'suspended';
}

export default function MultiVendorMarketplace() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [vendors, setVendors] = useState<Vendor[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'active' | 'pending'>('all');

  useEffect(() => {
    loadVendors();
  }, []);

  const loadVendors = async () => {
    try {
      // In production, this would fetch from a vendors table
      // For now, we'll use mock data
      const mockVendors: Vendor[] = [
        {
          id: 'vendor-1',
          name: 'Tuscan Artisans',
          description: 'Premium Italian foods directly from Tuscany',
          logo: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?w=200&h=200&fit=crop',
          location: 'Tuscany, Italy',
          rating: 4.9,
          totalProducts: 24,
          totalSales: 1250,
          joinedDate: '2023-01-15',
          status: 'active'
        },
        {
          id: 'vendor-2',
          name: 'Japanese Tea House',
          description: 'Authentic Japanese teas and matcha',
          logo: 'https://images.unsplash.com/photo-1545513245-1565fef691d3?w=200&h=200&fit=crop',
          location: 'Uji, Kyoto, Japan',
          rating: 4.8,
          totalProducts: 18,
          totalSales: 890,
          joinedDate: '2023-03-20',
          status: 'active'
        },
        {
          id: 'vendor-3',
          name: 'Persian Spice Co.',
          description: 'Premium saffron and spices from Iran',
          logo: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=200&h=200&fit=crop',
          location: 'Khorasan, Iran',
          rating: 4.9,
          totalProducts: 32,
          totalSales: 2100,
          joinedDate: '2023-02-10',
          status: 'active'
        },
        {
          id: 'vendor-4',
          name: 'Ecuadorian Chocolate',
          description: 'Single-origin artisan chocolate',
          logo: 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=200&h=200&fit=crop',
          location: 'Esmeraldas, Ecuador',
          rating: 4.7,
          totalProducts: 15,
          totalSales: 650,
          joinedDate: '2023-05-01',
          status: 'pending'
        }
      ];

      setVendors(mockVendors);
    } catch (error) {
      console.error('Error loading vendors:', error);
      showToast('error', 'Failed to load vendors');
    } finally {
      setLoading(false);
    }
  };

  const handleApproveVendor = async (vendorId: string) => {
    try {
      setVendors(vendors.map(v => 
        v.id === vendorId ? { ...v, status: 'active' as const } : v
      ));
      showToast('success', 'Vendor approved successfully');
    } catch (error) {
      console.error('Error approving vendor:', error);
      showToast('error', 'Failed to approve vendor');
    }
  };

  const handleSuspendVendor = async (vendorId: string) => {
    try {
      setVendors(vendors.map(v => 
        v.id === vendorId ? { ...v, status: 'suspended' as const } : v
      ));
      showToast('success', 'Vendor suspended');
    } catch (error) {
      console.error('Error suspending vendor:', error);
      showToast('error', 'Failed to suspend vendor');
    }
  };

  const filteredVendors = vendors.filter(vendor => {
    if (filter === 'all') return true;
    return vendor.status === filter;
  });

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading vendors...</p>
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
          Multi-Vendor Marketplace
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Manage vendor accounts and product listings
        </p>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {vendors.length}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Total Vendors</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-emerald-600">
                {vendors.filter(v => v.status === 'active').length}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Active Vendors</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {vendors.reduce((sum, v) => sum + v.totalProducts, 0)}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Total Products</p>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Star className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                {(vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1)}
              </p>
              <p className="text-sm text-stone-500 dark:text-stone-400">Avg. Rating</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-4 mb-6"
      >
        <div className="flex items-center gap-4">
          <span className="text-sm font-semibold text-stone-700 dark:text-stone-300">Filter:</span>
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === 'all'
                ? 'gradient-bg text-white shadow-lg'
                : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
            }`}
          >
            All ({vendors.length})
          </button>
          <button
            onClick={() => setFilter('active')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === 'active'
                ? 'bg-emerald-500 text-white shadow-lg'
                : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
            }`}
          >
            Active ({vendors.filter(v => v.status === 'active').length})
          </button>
          <button
            onClick={() => setFilter('pending')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === 'pending'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
            }`}
          >
            Pending ({vendors.filter(v => v.status === 'pending').length})
          </button>
        </div>
      </motion.div>

      {/* Vendors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredVendors.map((vendor, index) => (
          <motion.div
            key={vendor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 overflow-hidden hover:shadow-xl transition-shadow"
          >
            {/* Vendor Header */}
            <div className="relative h-32 bg-gradient-to-br from-amber-500 to-orange-500">
              <img
                src={vendor.logo}
                alt={vendor.name}
                className="absolute -bottom-12 left-6 w-24 h-24 rounded-2xl object-cover border-4 border-white dark:border-stone-800 shadow-lg"
              />
              <div className="absolute top-4 right-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                  vendor.status === 'active'
                    ? 'bg-emerald-500 text-white'
                    : vendor.status === 'pending'
                    ? 'bg-amber-500 text-white'
                    : 'bg-red-500 text-white'
                }`}>
                  {vendor.status}
                </span>
              </div>
            </div>

            {/* Vendor Info */}
            <div className="pt-16 p-6">
              <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-1">
                {vendor.name}
              </h3>
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
                {vendor.description}
              </p>

              <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-400 mb-4">
                <MapPin className="w-4 h-4" />
                <span>{vendor.location}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 mb-4">
                <div className="text-center p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-stone-900 dark:text-stone-100">
                      {vendor.rating}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Rating</p>
                </div>
                <div className="text-center p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                  <p className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                    {vendor.totalProducts}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Products</p>
                </div>
                <div className="text-center p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                  <p className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                    {vendor.totalSales}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">Sales</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                {vendor.status === 'pending' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleApproveVendor(vendor.id)}
                    className="flex-1 py-2 bg-emerald-500 text-white rounded-xl font-semibold text-sm"
                  >
                    Approve
                  </motion.button>
                )}
                {vendor.status === 'active' && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuspendVendor(vendor.id)}
                    className="flex-1 py-2 bg-red-500 text-white rounded-xl font-semibold text-sm"
                  >
                    Suspend
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex-1 py-2 gradient-bg text-white rounded-xl font-semibold text-sm"
                >
                  View Store
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {filteredVendors.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700"
        >
          <Store className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No vendors found
          </h3>
          <p className="text-stone-500 dark:text-stone-400">
            {filter === 'all' ? 'No vendors registered yet' : `No ${filter} vendors`}
          </p>
        </motion.div>
      )}
    </div>
  );
}
