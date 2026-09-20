import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, Lock, Eye, EyeOff, Save, Bell, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function AccountSettings() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [activeTab, setActiveTab] = useState('profile');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    orderUpdates: true,
    promotions: true,
    newsletters: false,
    smsNotifications: false,
  });

  const handleProfileSave = () => {
    showToast('success', 'Profile updated successfully!');
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      showToast('error', 'Passwords do not match');
      return;
    }
    if (passwordForm.newPassword.length < 6) {
      showToast('error', 'Password must be at least 6 characters');
      return;
    }
    showToast('success', 'Password changed successfully!');
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleNotificationSave = () => {
    showToast('success', 'Notification preferences saved!');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'password', label: 'Password', icon: <Lock className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Account Settings
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Manage your account preferences and security
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-4">
            {/* Avatar */}
            <div className="text-center mb-6 pb-6 border-b border-stone-200 dark:border-stone-700">
              <div className="w-20 h-20 mx-auto mb-3 gradient-bg rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {user?.name[0]}
              </div>
              <h3 className="font-bold text-stone-900 dark:text-stone-100">{user?.name}</h3>
              <p className="text-sm text-stone-500 dark:text-stone-400">{user?.email}</p>
            </div>

            {/* Tabs */}
            <div className="space-y-2">
              {tabs.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                    activeTab === tab.id
                      ? 'gradient-bg text-white shadow-lg'
                      : 'text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-700'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
            >
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                Profile Information
              </h2>
              <div className="space-y-5">
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    <User className="w-4 h-4" />
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={e => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    <Mail className="w-4 h-4" />
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={e => setProfileForm({ ...profileForm, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    <Phone className="w-4 h-4" />
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={profileForm.phone}
                    onChange={e => setProfileForm({ ...profileForm, phone: e.target.value })}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                  />
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    <MapPin className="w-4 h-4" />
                    Address
                  </label>
                  <textarea
                    value={profileForm.address}
                    onChange={e => setProfileForm({ ...profileForm, address: e.target.value })}
                    rows={3}
                    placeholder="Your full address"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
                  />
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleProfileSave}
                  className="w-full py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Changes
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Password Tab */}
          {activeTab === 'password' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
            >
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                Change Password
              </h2>
              <form onSubmit={handlePasswordChange} className="space-y-5">
                <div>
                  <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showOldPassword ? 'text' : 'password'}
                      value={passwordForm.currentPassword}
                      onChange={e => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                      placeholder="Enter current password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordForm.newPassword}
                      onChange={e => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 pr-12 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-stone-500 dark:text-stone-400 mt-2">
                    Password must be at least 6 characters
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={e => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Lock className="w-5 h-5" />
                  Update Password
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* Notifications Tab */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
            >
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                Notification Preferences
              </h2>
              <div className="space-y-4">
                {Object.entries(notificationPrefs).map(([key, value]) => (
                  <label key={key} className="flex items-center justify-between p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl cursor-pointer">
                    <div>
                      <p className="font-semibold text-stone-900 dark:text-stone-100 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        {key === 'orderUpdates' && 'Get notified about your order status'}
                        {key === 'promotions' && 'Receive special offers and discounts'}
                        {key === 'newsletters' && 'Weekly recipes and artisan stories'}
                        {key === 'smsNotifications' && 'Receive SMS updates'}
                      </p>
                    </div>
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={e => setNotificationPrefs({ ...notificationPrefs, [key]: e.target.checked })}
                      className="w-5 h-5 accent-amber-500"
                    />
                  </label>
                ))}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNotificationSave}
                  className="w-full py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Save Preferences
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Security Tab */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
            >
              <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                Security Settings
              </h2>
              <div className="space-y-4">
                <div className="p-5 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Shield className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                    <h3 className="font-bold text-emerald-800 dark:text-emerald-200">Two-Factor Authentication</h3>
                  </div>
                  <p className="text-sm text-emerald-700 dark:text-emerald-300 mb-3">
                    Add an extra layer of security to your account
                  </p>
                  <button className="px-5 py-2 bg-emerald-600 text-white rounded-lg font-semibold text-sm hover:bg-emerald-700 transition-colors">
                    Enable 2FA
                  </button>
                </div>

                <div className="p-5 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                  <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">Active Sessions</h3>
                  <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
                    You are currently logged in on this device
                  </p>
                  <div className="flex items-center justify-between p-3 bg-white dark:bg-stone-800 rounded-lg">
                    <div>
                      <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">Current Session</p>
                      <p className="text-xs text-stone-500 dark:text-stone-400">Last active: Just now</p>
                    </div>
                    <span className="px-3 py-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-300 text-xs font-semibold rounded-full">
                      Active
                    </span>
                  </div>
                </div>

                <div className="p-5 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-xl">
                  <h3 className="font-bold text-red-800 dark:text-red-200 mb-2">Delete Account</h3>
                  <p className="text-sm text-red-700 dark:text-red-300 mb-3">
                    Permanently delete your account and all associated data
                  </p>
                  <button className="px-5 py-2 bg-red-600 text-white rounded-lg font-semibold text-sm hover:bg-red-700 transition-colors">
                    Delete Account
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
