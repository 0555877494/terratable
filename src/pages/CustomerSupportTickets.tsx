import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Plus, Filter, Search, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { useToast } from '../contexts/ToastContext';

export default function CustomerSupportTickets() {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [tickets, setTickets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewTicket, setShowNewTicket] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [newTicket, setNewTicket] = useState({
    subject: '',
    message: '',
    category: 'general',
    priority: 'medium'
  });

  useEffect(() => {
    if (user) {
      loadTickets();
    }
  }, [user]);

  const loadTickets = async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .select(`
          *,
          ticket_replies (*)
        `)
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTickets(data || []);
    } catch (error) {
      console.error('Error loading tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast('error', 'Please login to create a ticket');
      return;
    }

    if (!newTicket.subject || !newTicket.message) {
      showToast('error', 'Please fill in all fields');
      return;
    }

    try {
      const { data, error } = await supabase
        .from('support_tickets')
        .insert({
          user_id: user.id,
          subject: newTicket.subject,
          message: newTicket.message,
          category: newTicket.category,
          priority: newTicket.priority,
          status: 'open'
        })
        .select()
        .single();

      if (error) throw error;

      showToast('success', 'Support ticket created successfully!');
      setNewTicket({ subject: '', message: '', category: 'general', priority: 'medium' });
      setShowNewTicket(false);
      loadTickets();
    } catch (error) {
      console.error('Error creating ticket:', error);
      showToast('error', 'Failed to create ticket');
    }
  };

  const handleReply = async (ticketId: string, message: string) => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('ticket_replies')
        .insert({
          ticket_id: ticketId,
          user_id: user.id,
          message,
          is_admin: false
        });

      if (error) throw error;

      showToast('success', 'Reply sent successfully!');
      loadTickets();
    } catch (error) {
      console.error('Error sending reply:', error);
      showToast('error', 'Failed to send reply');
    }
  };

  const filteredTickets = tickets.filter(ticket => {
    if (statusFilter === 'all') return true;
    return ticket.status === statusFilter;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open': return <AlertCircle className="w-5 h-5 text-amber-500" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-blue-500" />;
      case 'resolved': return <CheckCircle className="w-5 h-5 text-emerald-500" />;
      default: return <AlertCircle className="w-5 h-5 text-stone-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open': return 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300';
      case 'in_progress': return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300';
      default: return 'bg-stone-100 text-stone-700 dark:bg-stone-700 dark:text-stone-300';
    }
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading tickets...</p>
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
              Customer Support
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Get help with your orders and account
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowNewTicket(!showNewTicket)}
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
                <option value="account">Account Issue</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Priority
              </label>
              <select
                value={newTicket.priority}
                onChange={e => setNewTicket({ ...newTicket, priority: e.target.value })}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
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
                <MessageCircle className="w-5 h-5" />
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

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-4 mb-6"
      >
        <div className="flex items-center gap-4">
          <Filter className="w-5 h-5 text-stone-500" />
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
          >
            <option value="all">All Tickets</option>
            <option value="open">Open</option>
            <option value="in_progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
          <span className="text-sm text-stone-500 dark:text-stone-400">
            {filteredTickets.length} ticket{filteredTickets.length !== 1 ? 's' : ''}
          </span>
        </div>
      </motion.div>

      {/* Tickets List */}
      {filteredTickets.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-20 bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700"
        >
          <MessageCircle className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <h3 className="font-serif text-xl font-bold text-stone-700 dark:text-stone-300 mb-2">
            No tickets found
          </h3>
          <p className="text-stone-500 dark:text-stone-400">
            {statusFilter !== 'all' ? 'Try changing the filter' : 'Create a new ticket to get help'}
          </p>
        </motion.div>
      ) : (
        <div className="space-y-4">
          {filteredTickets.map((ticket, index) => (
            <motion.div
              key={ticket.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
                      {ticket.subject}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1 ${getStatusColor(ticket.status)}`}>
                      {getStatusIcon(ticket.status)}
                      {ticket.status.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-stone-600 dark:text-stone-400">
                    <span>Ticket #{ticket.id.slice(-6).toUpperCase()}</span>
                    <span>•</span>
                    <span>{ticket.category}</span>
                    <span>•</span>
                    <span>Priority: {ticket.priority}</span>
                    <span>•</span>
                    <span>{new Date(ticket.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Original Message */}
              <div className="mb-4 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
                <p className="text-stone-700 dark:text-stone-300">{ticket.message}</p>
              </div>

              {/* Replies */}
              {ticket.ticket_replies && ticket.ticket_replies.length > 0 && (
                <div className="space-y-3 mb-4">
                  {ticket.ticket_replies.map((reply: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-4 rounded-xl ${
                        reply.is_admin
                          ? 'bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800'
                          : 'bg-stone-50 dark:bg-stone-700/50'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                          {reply.is_admin ? 'Support Team' : 'You'}
                        </span>
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          {new Date(reply.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-stone-700 dark:text-stone-300 text-sm">{reply.message}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Form */}
              {ticket.status !== 'resolved' && (
                <ReplyForm ticketId={ticket.id} onReply={handleReply} />
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

function ReplyForm({ ticketId, onReply }: { ticketId: string; onReply: (ticketId: string, message: string) => void }) {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;
    onReply(ticketId, message);
    setMessage('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-3">
      <input
        type="text"
        value={message}
        onChange={e => setMessage(e.target.value)}
        placeholder="Type your reply..."
        className="flex-1 px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
      />
      <motion.button
        type="submit"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg"
      >
        Send
      </motion.button>
    </form>
  );
}
