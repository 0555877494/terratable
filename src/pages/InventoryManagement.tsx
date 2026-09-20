import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Package, AlertTriangle, TrendingDown, TrendingUp, Edit2, Save, X } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

interface InventoryItem {
  id: string;
  name: string;
  image: string;
  category: string;
  stockCount: number;
  price: number;
  reorderLevel: number;
  status: 'in_stock' | 'low_stock' | 'out_of_stock';
}

export default function InventoryManagement() {
  const { showToast } = useToast();
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState(0);
  const [filter, setFilter] = useState<'all' | 'low_stock' | 'out_of_stock'>('all');

  useEffect(() => {
    loadInventory();
  }, []);

  const loadInventory = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('stock_count', { ascending: true });

      if (error) throw error;

      const inventoryItems: InventoryItem[] = (data || []).map((product: any) => ({
        id: product.id,
        name: product.name,
        image: product.image,
        category: product.category,
        stockCount: product.stock_count || 0,
        price: product.price,
        reorderLevel: 10, // Default reorder level
        status: product.stock_count === 0 ? 'out_of_stock' : 
                product.stock_count <= 10 ? 'low_stock' : 'in_stock'
      }));

      setInventory(inventoryItems);
    } catch (error) {
      console.error('Error loading inventory:', error);
      showToast('error', 'Failed to load inventory');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateStock = async (productId: string, newStock: number) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ stock_count: newStock })
        .eq('id', productId);

      if (error) throw error;

      setInventory(inventory.map(item => 
        item.id === productId 
          ? { 
              ...item, 
              stockCount: newStock,
              status: newStock === 0 ? 'out_of_stock' : 
                      newStock <= 10 ? 'low_stock' : 'in_stock'
            }
          : item
      ));

      showToast('success', 'Stock updated successfully');
      setEditingId(null);
    } catch (error) {
      console.error('Error updating stock:', error);
      showToast('error', 'Failed to update stock');
    }
  };

  const handleBulkUpdate = async (action: 'reorder' | 'restock') => {
    const lowStockItems = inventory.filter(item => item.status === 'low_stock' || item.status === 'out_of_stock');
    
    try {
      for (const item of lowStockItems) {
        const newStock = action === 'reorder' ? item.reorderLevel * 2 : item.stockCount + 50;
        await supabase
          .from('products')
          .update({ stock_count: newStock })
          .eq('id', item.id);
      }

      await loadInventory();
      showToast('success', `Bulk ${action} completed for ${lowStockItems.length} items`);
    } catch (error) {
      console.error('Error in bulk update:', error);
      showToast('error', 'Failed to complete bulk update');
    }
  };

  const filteredInventory = inventory.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'low_stock') return item.status === 'low_stock';
    if (filter === 'out_of_stock') return item.status === 'out_of_stock';
    return true;
  });

  const stats = {
    total: inventory.length,
    inStock: inventory.filter(i => i.status === 'in_stock').length,
    lowStock: inventory.filter(i => i.status === 'low_stock').length,
    outOfStock: inventory.filter(i => i.status === 'out_of_stock').length,
    totalValue: inventory.reduce((sum, item) => sum + (item.stockCount * item.price), 0)
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading inventory...</p>
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Inventory Management
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Track and manage product stock levels
            </p>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBulkUpdate('reorder')}
              className="px-4 py-2 bg-amber-500 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Auto Reorder
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleBulkUpdate('restock')}
              className="px-4 py-2 bg-emerald-500 text-white rounded-xl font-semibold shadow-lg flex items-center gap-2"
            >
              <Package className="w-4 h-4" />
              Bulk Restock
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Total Items</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{stats.total}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">In Stock</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{stats.inStock}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Low Stock</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">{stats.lowStock}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <TrendingDown className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Out of Stock</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.outOfStock}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Total Value</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            ${stats.totalValue.toFixed(0)}
          </p>
        </motion.div>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
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
            All ({stats.total})
          </button>
          <button
            onClick={() => setFilter('low_stock')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === 'low_stock'
                ? 'bg-amber-500 text-white shadow-lg'
                : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
            }`}
          >
            Low Stock ({stats.lowStock})
          </button>
          <button
            onClick={() => setFilter('out_of_stock')}
            className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
              filter === 'out_of_stock'
                ? 'bg-red-500 text-white shadow-lg'
                : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
            }`}
          >
            Out of Stock ({stats.outOfStock})
          </button>
        </div>
      </motion.div>

      {/* Inventory List */}
      <div className="space-y-3">
        {filteredInventory.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`bg-white dark:bg-stone-800 rounded-2xl border-2 p-4 flex items-center gap-4 ${
              item.status === 'out_of_stock'
                ? 'border-red-200 dark:border-red-800'
                : item.status === 'low_stock'
                ? 'border-amber-200 dark:border-amber-800'
                : 'border-stone-200 dark:border-stone-700'
            }`}
          >
            {/* Product Image */}
            <img
              src={item.image}
              alt={item.name}
              className="w-20 h-20 rounded-xl object-cover"
            />

            {/* Product Info */}
            <div className="flex-1">
              <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                {item.name}
              </h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">
                {item.category} • ${item.price.toFixed(2)}
              </p>
              <div className="flex items-center gap-2 mt-2">
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  item.status === 'in_stock'
                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300'
                    : item.status === 'low_stock'
                    ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {item.status === 'in_stock' && '✓ In Stock'}
                  {item.status === 'low_stock' && '⚠ Low Stock'}
                  {item.status === 'out_of_stock' && '✗ Out of Stock'}
                </span>
              </div>
            </div>

            {/* Stock Control */}
            <div className="flex items-center gap-3">
              {editingId === item.id ? (
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={editValue}
                    onChange={e => setEditValue(Number(e.target.value))}
                    className="w-20 px-3 py-2 rounded-lg border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-center"
                    min="0"
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleUpdateStock(item.id, editValue)}
                    className="p-2 bg-emerald-500 text-white rounded-lg"
                  >
                    <Save className="w-4 h-4" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setEditingId(null)}
                    className="p-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg"
                  >
                    <X className="w-4 h-4" />
                  </motion.button>
                </div>
              ) : (
                <>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                      {item.stockCount}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      in stock
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setEditingId(item.id);
                      setEditValue(item.stockCount);
                    }}
                    className="p-2 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </motion.button>
                </>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredInventory.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700"
        >
          <Package className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No items found
          </h3>
          <p className="text-stone-500 dark:text-stone-400">
            {filter === 'all' ? 'No products in inventory' : `No ${filter.replace('_', ' ')} items`}
          </p>
        </motion.div>
      )}
    </div>
  );
}
