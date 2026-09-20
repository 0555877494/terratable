import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Plus, Edit2, Trash2, Check, X, Home, Building } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface Address {
  id: string;
  label: string;
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  isDefault: boolean;
}

export default function AddressBook() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: '1',
      label: 'Home',
      name: user?.name || 'John Doe',
      street: '123 Main Street, Apt 4B',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94105',
      phone: '+1 (555) 123-4567',
      isDefault: true
    },
    {
      id: '2',
      label: 'Work',
      name: user?.name || 'John Doe',
      street: '456 Market Street, Suite 200',
      city: 'San Francisco',
      state: 'CA',
      zipCode: '94103',
      phone: '+1 (555) 987-6543',
      isDefault: false
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<Partial<Address>>({
    label: '',
    name: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleAdd = () => {
    setFormData({
      label: '',
      name: user?.name || '',
      street: '',
      city: '',
      state: '',
      zipCode: '',
      phone: ''
    });
    setEditingId(null);
    setShowForm(true);
  };

  const handleEdit = (address: Address) => {
    setFormData(address);
    setEditingId(address.id);
    setShowForm(true);
  };

  const handleSave = () => {
    if (!formData.label || !formData.name || !formData.street || !formData.city || !formData.state || !formData.zipCode) {
      showToast('error', 'Please fill in all required fields');
      return;
    }

    if (editingId) {
      setAddresses(addresses.map(addr => 
        addr.id === editingId ? { ...formData, id: editingId, isDefault: addr.isDefault } as Address : addr
      ));
      showToast('success', 'Address updated successfully');
    } else {
      const newAddress: Address = {
        ...formData,
        id: Date.now().toString(),
        isDefault: addresses.length === 0
      } as Address;
      setAddresses([...addresses, newAddress]);
      showToast('success', 'Address added successfully');
    }

    setShowForm(false);
    setEditingId(null);
  };

  const handleDelete = (id: string) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
    showToast('success', 'Address deleted');
  };

  const handleSetDefault = (id: string) => {
    setAddresses(addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === id
    })));
    showToast('success', 'Default address updated');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between mb-8"
      >
        <div>
          <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Address Book
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Manage your delivery addresses
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleAdd}
          className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Address
        </motion.button>
      </motion.div>

      {/* Addresses Grid */}
      <div className="grid md:grid-cols-2 gap-4 mb-8">
        <AnimatePresence>
          {addresses.map((address, index) => (
            <motion.div
              key={address.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
              className={`bg-white dark:bg-stone-800 rounded-2xl border-2 p-5 relative ${
                address.isDefault
                  ? 'border-amber-400 dark:border-amber-600 shadow-lg'
                  : 'border-stone-200 dark:border-stone-700'
              }`}
            >
              {address.isDefault && (
                <div className="absolute top-4 right-4 px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-bold rounded-full">
                  Default
                </div>
              )}

              <div className="flex items-start gap-3 mb-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  address.label === 'Home' 
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' 
                    : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
                }`}>
                  {address.label === 'Home' ? <Home className="w-6 h-6" /> : <Building className="w-6 h-6" />}
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">
                    {address.label}
                  </h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">
                    {address.name}
                  </p>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex items-start gap-2 text-sm text-stone-700 dark:text-stone-300">
                  <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0 text-stone-400" />
                  <div>
                    <p>{address.street}</p>
                    <p>{address.city}, {address.state} {address.zipCode}</p>
                  </div>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 pl-6">
                  {address.phone}
                </p>
              </div>

              <div className="flex gap-2 pt-4 border-t border-stone-200 dark:border-stone-700">
                {!address.isDefault && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => handleSetDefault(address.id)}
                    className="flex-1 py-2 bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-400 rounded-lg text-sm font-semibold hover:bg-amber-100 dark:hover:bg-amber-900/30 transition-colors flex items-center justify-center gap-1"
                  >
                    <Check className="w-4 h-4" />
                    Set Default
                  </motion.button>
                )}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleEdit(address)}
                  className="flex-1 py-2 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg text-sm font-semibold hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors flex items-center justify-center gap-1"
                >
                  <Edit2 className="w-4 h-4" />
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDelete(address.id)}
                  className="py-2 px-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm font-semibold hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md"
            onClick={() => setShowForm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="bg-white dark:bg-stone-800 rounded-3xl p-6 w-full max-w-lg shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                  {editingId ? 'Edit Address' : 'Add New Address'}
                </h2>
                <button
                  onClick={() => setShowForm(false)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    Address Label *
                  </label>
                  <input
                    type="text"
                    value={formData.label}
                    onChange={e => setFormData({ ...formData, label: e.target.value })}
                    placeholder="Home, Work, etc."
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Recipient name"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.street}
                    onChange={e => setFormData({ ...formData, street: e.target.value })}
                    placeholder="Street address, apt, suite, etc."
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={e => setFormData({ ...formData, city: e.target.value })}
                      placeholder="City"
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={e => setFormData({ ...formData, state: e.target.value })}
                      placeholder="State"
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      value={formData.zipCode}
                      onChange={e => setFormData({ ...formData, zipCode: e.target.value })}
                      placeholder="ZIP"
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                      Phone
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Phone number"
                      className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 focus:ring-4 focus:ring-amber-100 dark:focus:ring-amber-900/30 outline-none transition-all"
                    />
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setShowForm(false)}
                  className="flex-1 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSave}
                  className="flex-1 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
                >
                  {editingId ? 'Update' : 'Add'} Address
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Empty State */}
      {addresses.length === 0 && !showForm && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20"
        >
          <MapPin className="w-20 h-20 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h2 className="font-serif text-2xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No Addresses Yet
          </h2>
          <p className="text-stone-500 dark:text-stone-400 mb-6">
            Add your first delivery address to get started
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAdd}
            className="px-8 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
          >
            Add Your First Address
          </motion.button>
        </motion.div>
      )}
    </div>
  );
}
