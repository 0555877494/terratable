import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, Bell, MessageSquare, CheckCircle, Clock, XCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

interface Notification {
  id: string;
  type: 'email' | 'sms' | 'push';
  recipient: string;
  subject: string;
  message: string;
  status: 'sent' | 'pending' | 'failed';
  sentAt?: string;
}

export default function EmailSMSNotifications() {
  const { showToast } = useToast();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCompose, setShowCompose] = useState(false);
  const [composeForm, setComposeForm] = useState({
    type: 'email' as 'email' | 'sms' | 'push',
    recipient: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    loadNotifications();
  }, []);

  const loadNotifications = async () => {
    try {
      // In production, this would fetch from a notifications table
      // For now, we'll use mock data
      const mockNotifications: Notification[] = [
        {
          id: '1',
          type: 'email',
          recipient: 'sarah@email.com',
          subject: 'Order Confirmation #12345',
          message: 'Thank you for your order!',
          status: 'sent',
          sentAt: '2024-01-20T10:30:00Z'
        },
        {
          id: '2',
          type: 'sms',
          recipient: '+1234567890',
          subject: 'Shipping Update',
          message: 'Your order has shipped!',
          status: 'sent',
          sentAt: '2024-01-20T14:20:00Z'
        },
        {
          id: '3',
          type: 'email',
          recipient: 'john@email.com',
          subject: 'Welcome to Terra & Table',
          message: 'Thanks for joining us!',
          status: 'pending'
        }
      ];

      setNotifications(mockNotifications);
    } catch (error) {
      console.error('Error loading notifications:', error);
      showToast('error', 'Failed to load notifications');
    } finally {
      setLoading(false);
    }
  };

  const handleSendNotification = async () => {
    if (!composeForm.recipient || !composeForm.message) {
      showToast('error', 'Please fill in all required fields');
      return;
    }

    try {
      // In production, this would send via email/SMS service
      // For now, we'll simulate sending
      const newNotification: Notification = {
        id: Date.now().toString(),
        type: composeForm.type,
        recipient: composeForm.recipient,
        subject: composeForm.subject,
        message: composeForm.message,
        status: 'sent',
        sentAt: new Date().toISOString()
      };

      setNotifications([newNotification, ...notifications]);
      setComposeForm({ type: 'email', recipient: '', subject: '', message: '' });
      setShowCompose(false);
      showToast('success', 'Notification sent successfully!');
    } catch (error) {
      console.error('Error sending notification:', error);
      showToast('error', 'Failed to send notification');
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      case 'pending': return <Clock className="w-5 h-5 text-amber-500" />;
      case 'failed': return <XCircle className="w-5 h-5 text-red-500" />;
      default: return <Clock className="w-5 h-5 text-stone-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'sent': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      case 'pending': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'failed': return 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300';
      default: return 'bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'email': return <Mail className="w-5 h-5" />;
      case 'sms': return <MessageSquare className="w-5 h-5" />;
      case 'push': return <Bell className="w-5 h-5" />;
      default: return <Mail className="w-5 h-5" />;
    }
  };

  const stats = {
    total: notifications.length,
    sent: notifications.filter(n => n.status === 'sent').length,
    pending: notifications.filter(n => n.status === 'pending').length,
    failed: notifications.filter(n => n.status === 'failed').length
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading notifications...</p>
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
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Email & SMS Notifications
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Send and track notifications to customers
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowCompose(!showCompose)}
            className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
          >
            <Send className="w-5 h-5" />
            Compose
          </motion.button>
        </div>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <Send className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Total</p>
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
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Sent</p>
          </div>
          <p className="text-2xl font-bold text-emerald-600">{stats.sent}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Pending</p>
          </div>
          <p className="text-2xl font-bold text-amber-600">{stats.pending}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Failed</p>
          </div>
          <p className="text-2xl font-bold text-red-600">{stats.failed}</p>
        </motion.div>
      </div>

      {/* Compose Form */}
      {showCompose && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 mb-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Compose Notification
          </h3>
          <div className="space-y-4">
            {/* Type */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Notification Type
              </label>
              <div className="flex gap-2">
                {(['email', 'sms', 'push'] as const).map(type => (
                  <motion.button
                    key={type}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setComposeForm({ ...composeForm, type })}
                    className={`flex-1 py-3 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 transition-all ${
                      composeForm.type === type
                        ? 'gradient-bg text-white shadow-lg'
                        : 'bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600'
                    }`}
                  >
                    {getTypeIcon(type)}
                    {type.toUpperCase()}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Recipient */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Recipient {composeForm.type === 'email' ? '(Email)' : composeForm.type === 'sms' ? '(Phone)' : '(User ID)'}
              </label>
              <input
                type={composeForm.type === 'email' ? 'email' : 'text'}
                value={composeForm.recipient}
                onChange={e => setComposeForm({ ...composeForm, recipient: e.target.value })}
                placeholder={composeForm.type === 'email' ? 'user@example.com' : composeForm.type === 'sms' ? '+1234567890' : 'User ID'}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
              />
            </div>

            {/* Subject (for email) */}
            {composeForm.type === 'email' && (
              <div>
                <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  value={composeForm.subject}
                  onChange={e => setComposeForm({ ...composeForm, subject: e.target.value })}
                  placeholder="Notification subject"
                  className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                />
              </div>
            )}

            {/* Message */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Message
              </label>
              <textarea
                value={composeForm.message}
                onChange={e => setComposeForm({ ...composeForm, message: e.target.value })}
                placeholder="Type your message..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleSendNotification}
                className="flex-1 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Send Notification
              </motion.button>
              <button
                onClick={() => setShowCompose(false)}
                className="px-6 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      )}

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
          >
            <div className="flex items-start gap-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                notification.type === 'email' ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600' :
                notification.type === 'sms' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600' :
                'bg-purple-100 dark:bg-purple-900/30 text-purple-600'
              }`}>
                {getTypeIcon(notification.type)}
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h4 className="font-bold text-stone-900 dark:text-stone-100 mb-1">
                      {notification.subject || notification.type.toUpperCase()}
                    </h4>
                    <p className="text-sm text-stone-500 dark:text-stone-400">
                      To: {notification.recipient}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(notification.status)}`}>
                    {getStatusIcon(notification.status)}
                    {notification.status}
                  </span>
                </div>
                <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
                  {notification.message}
                </p>
                {notification.sentAt && (
                  <p className="text-xs text-stone-500 dark:text-stone-500">
                    Sent: {new Date(notification.sentAt).toLocaleString()}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {notifications.length === 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700"
        >
          <Mail className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No notifications yet
          </h3>
          <p className="text-stone-500 dark:text-stone-400">
            Compose a notification to get started
          </p>
        </motion.div>
      )}
    </div>
  );
}
