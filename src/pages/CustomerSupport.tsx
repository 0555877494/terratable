import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Plus, Send, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface Ticket {
  id: string;
  subject: string;
  message: string;
  status: 'open' | 'in_progress' | 'resolved';
  createdAt: string;
  responses: Array<{
    from: 'customer' | 'support';
    message: string;
    timestamp: string;
  }>;
}

export default function CustomerSupport() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [tickets, setTickets] = useState<Ticket[]>([
    {
      id: 'TKT-001',
      subject: 'Question about delivery time',
      message: 'When will my order arrive?',
      status: 'resolved',
      createdAt: '2024-01-15',
      responses: [
        { from: 'support', message: 'Your order will arrive within 2-3 business days.', timestamp: '2024-01-15' }
      ]
    }
  ]);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [newTicket, setNewTicket] = useState({ subject: '', message: '', category: 'general' });
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const handleSubmitTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTicket.subject || !newTicket.message) {
      showToast('error', 'Please fill in all fields');
      return;
    }

    const ticket: Ticket = {
      id: `TKT-${String(tickets.length + 1).padStart(3, '0')}`,
      subject: newTicket.subject,
      message: newTicket.message,
      status: 'open',
      createdAt: new Date().toISOString().split('T')[0],
      responses: []
    };

    setTickets([ticket, ...tickets]);
    setNewTicket({ subject: '', message: '', category: 'general' });
    setShowNewTicket(false);
    showToast('success', 'Support ticket created successfully!');
  };

  const handleReply = () => {
    if (!replyMessage.trim() || !selectedTicket) return;

    const updatedTicket = {
      ...selectedTicket,
      responses: [...selectedTicket.responses, {
        from: 'customer' as const,
        message: replyMessage,
        timestamp: new Date().toISOString().split('T')[0]
      }]
    };

    setTickets(tickets.map(t => t.id === selectedTicket.id ? updatedTicket : t));
    setSelectedTicket(updatedTicket);
    setReplyMessage('');
    showToast('success', 'Reply sent!');
  };

  const statusColors = {
    open: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300',
    in_progress: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300',
    resolved: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300',
  };

  const statusIcons = {
    open: <AlertCircle className="w-4 h-4" />,
    in_progress: <Clock className="w-4 h-4" />,
    resolved: <CheckCircle className="w-4 h-4" />,
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Customer Support
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Get help with your orders and account
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewTicket(true)}
            className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
          >
            <Plus className="w-5 h-5" />
            New Ticket
          </motion.button>
        </div>
      </motion.div>

      {/* New Ticket Form */}
      {showNewTicket && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 mb-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Create Support Ticket
          </h3>
          <form onSubmit={handleSubmitTicket} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Category
              </label>
              <select
                value={newTicket.category}
                onChange={e => setNewTicket({ ...newTicket, category: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
              >
                <option value="general">General Inquiry</option>
                <option value="order">Order Issue</option>
                <option value="payment">Payment Problem</option>
                <option value="delivery">Delivery Issue</option>
                <option value="product">Product Question</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Subject
              </label>
              <input
                type="text"
                value={newTicket.subject}
                onChange={e => setNewTicket({ ...newTicket, subject: e.target.value })}
                placeholder="Brief description of your issue"
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Message
              </label>
              <textarea
                value={newTicket.message}
                onChange={e => setNewTicket({ ...newTicket, message: e.target.value })}
                placeholder="Describe your issue in detail..."
                rows={5}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
              />
            </div>
            <div className="flex gap-3">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Submit Ticket
              </motion.button>
              <button
                type="button"
                onClick={() => setShowNewTicket(false)}
                className="px-6 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </motion.div>
      )}

      {/* Tickets List */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Tickets Sidebar */}
        <div className="lg:col-span-1 space-y-3">
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">
            Your Tickets ({tickets.length})
          </h3>
          {tickets.map((ticket, index) => (
            <motion.button
              key={ticket.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              onClick={() => setSelectedTicket(ticket)}
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selectedTicket?.id === ticket.id
                  ? 'border-amber-400 bg-amber-50 dark:bg-amber-900/20'
                  : 'border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-amber-300'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-xs font-mono text-stone-500 dark:text-stone-400">{ticket.id}</span>
                <span className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${statusColors[ticket.status]}`}>
                  {statusIcons[ticket.status]}
                  {ticket.status.replace('_', ' ')}
                </span>
              </div>
              <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm mb-1">
                {ticket.subject}
              </h4>
              <p className="text-xs text-stone-500 dark:text-stone-400">
                {new Date(ticket.createdAt).toLocaleDateString()}
              </p>
            </motion.button>
          ))}
        </div>

        {/* Ticket Details */}
        <div className="lg:col-span-2">
          {selectedTicket ? (
            <motion.div
              key={selectedTicket.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
            >
              <div className="flex items-start justify-between mb-6 pb-4 border-b-2 border-stone-100 dark:border-stone-700">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
                      {selectedTicket.subject}
                    </h2>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[selectedTicket.status]}`}>
                      {statusIcons[selectedTicket.status]}
                      {selectedTicket.status.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    Ticket #{selectedTicket.id} • Created {new Date(selectedTicket.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Messages */}
              <div className="space-y-4 mb-6">
                {/* Original Message */}
                <div className="flex gap-3">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-white font-bold text-sm">{user?.name[0]}</span>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">{user?.name}</span>
                      <span className="text-xs text-stone-500 dark:text-stone-400">{selectedTicket.createdAt}</span>
                    </div>
                    <div className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-4">
                      <p className="text-stone-700 dark:text-stone-300">{selectedTicket.message}</p>
                    </div>
                  </div>
                </div>

                {/* Responses */}
                {selectedTicket.responses.map((response, index) => (
                  <div key={index} className={`flex gap-3 ${response.from === 'customer' ? '' : 'flex-row-reverse'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      response.from === 'customer'
                        ? 'gradient-bg'
                        : 'bg-emerald-500'
                    }`}>
                      {response.from === 'customer' ? (
                        <span className="text-white font-bold text-sm">{user?.name[0]}</span>
                      ) : (
                        <MessageCircle className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className={`flex-1 ${response.from === 'support' ? 'text-right' : ''}`}>
                      <div className={`flex items-center gap-2 mb-1 ${response.from === 'support' ? 'justify-end' : ''}`}>
                        <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                          {response.from === 'customer' ? user?.name : 'Support Team'}
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">{response.timestamp}</span>
                      </div>
                      <div className={`rounded-xl p-4 ${
                        response.from === 'customer'
                          ? 'bg-stone-50 dark:bg-stone-700/50'
                          : 'bg-emerald-50 dark:bg-emerald-900/20'
                      }`}>
                        <p className="text-stone-700 dark:text-stone-300">{response.message}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Reply Box */}
              {selectedTicket.status !== 'resolved' && (
                <div className="border-t-2 border-stone-100 dark:border-stone-700 pt-4">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={replyMessage}
                      onChange={e => setReplyMessage(e.target.value)}
                      placeholder="Type your reply..."
                      className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
                      onKeyPress={e => e.key === 'Enter' && handleReply()}
                    />
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={handleReply}
                      className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-12 text-center">
              <MessageCircle className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
              <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
                Select a ticket
              </h3>
              <p className="text-stone-500 dark:text-stone-400">
                Choose a ticket from the list to view details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
