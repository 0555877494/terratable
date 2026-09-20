import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Tag, Mail, TrendingUp, DollarSign, ShoppingCart, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface CustomerSegment {
  id: string;
  name: string;
  description: string;
  criteria: string;
  customerCount: number;
  totalSpent: number;
  avgOrderValue: number;
  color: string;
}

export default function CustomerSegmentation() {
  const [segments, setSegments] = useState<CustomerSegment[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSegment, setSelectedSegment] = useState<string | null>(null);

  useEffect(() => {
    fetchSegments();
  }, []);

  const fetchSegments = async () => {
    try {
      // In production, this would fetch from a segments table
      // For now, we'll create mock segments based on customer data
      
      const { data: orders } = await supabase
        .from('orders')
        .select('user_id, total, created_at, profiles(full_name, email)');

      const { data: customers } = await supabase
        .from('profiles')
        .select('*')
        .eq('role', 'customer');

      // Calculate segments
      const segmentData = calculateSegments(customers || [], orders || []);
      setSegments(segmentData);
    } catch (error) {
      console.error('Error fetching segments:', error);
    } finally {
      setLoading(false);
    }
  };

  const calculateSegments = (customers: any[], allOrders: any[]): CustomerSegment[] => {
    const now = new Date();
    const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
    const ninetyDaysAgo = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);

    // New Customers (signed up in last 30 days)
    const newCustomers = customers.filter(c => {
      const signupDate = new Date(c.created_at);
      return signupDate >= thirtyDaysAgo;
    });

    // Regular Customers (ordered in last 90 days)
    const regularCustomers = customers.filter(c => {
      const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
      return customerOrders.some((o: any) => new Date(o.created_at) >= ninetyDaysAgo);
    });

    // VIP Customers (spent > $500 total)
    const vipCustomers = customers.filter(c => {
      const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
      const totalSpent = customerOrders.reduce((sum: number, o: any) => sum + o.total, 0);
      return totalSpent > 500;
    });

    // Inactive Customers (no orders in last 90 days)
    const inactiveCustomers = customers.filter(c => {
      const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
      if (customerOrders.length === 0) return true;
      const lastOrder = customerOrders.sort((a: any, b: any) => 
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      )[0];
      return new Date(lastOrder.created_at) < ninetyDaysAgo;
    });

    return [
      {
        id: 'new',
        name: 'New Customers',
        description: 'Signed up in the last 30 days',
        criteria: 'created_at >= 30 days ago',
        customerCount: newCustomers.length,
        totalSpent: newCustomers.reduce((sum, c) => {
          const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
          return sum + customerOrders.reduce((s: number, o: any) => s + o.total, 0);
        }, 0),
        avgOrderValue: newCustomers.length > 0 ? 
          newCustomers.reduce((sum, c) => {
            const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
            return sum + customerOrders.reduce((s: number, o: any) => s + o.total, 0);
          }, 0) / newCustomers.length : 0,
        color: 'from-blue-500 to-blue-600'
      },
      {
        id: 'regular',
        name: 'Regular Customers',
        description: 'Ordered in the last 90 days',
        criteria: 'orders in last 90 days',
        customerCount: regularCustomers.length,
        totalSpent: regularCustomers.reduce((sum, c) => {
          const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
          return sum + customerOrders.reduce((s: number, o: any) => s + o.total, 0);
        }, 0),
        avgOrderValue: regularCustomers.length > 0 ? 
          regularCustomers.reduce((sum, c) => {
            const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
            return sum + customerOrders.reduce((s: number, o: any) => s + o.total, 0);
          }, 0) / regularCustomers.length : 0,
        color: 'from-emerald-500 to-emerald-600'
      },
      {
        id: 'vip',
        name: 'VIP Customers',
        description: 'Total spent over $500',
        criteria: 'total_spent > $500',
        customerCount: vipCustomers.length,
        totalSpent: vipCustomers.reduce((sum, c) => {
          const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
          return sum + customerOrders.reduce((s: number, o: any) => s + o.total, 0);
        }, 0),
        avgOrderValue: vipCustomers.length > 0 ? 
          vipCustomers.reduce((sum, c) => {
            const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
            return sum + customerOrders.reduce((s: number, o: any) => s + o.total, 0);
          }, 0) / vipCustomers.length : 0,
        color: 'from-amber-500 to-amber-600'
      },
      {
        id: 'inactive',
        name: 'Inactive Customers',
        description: 'No orders in last 90 days',
        criteria: 'no orders in 90 days',
        customerCount: inactiveCustomers.length,
        totalSpent: inactiveCustomers.reduce((sum, c) => {
          const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
          return sum + customerOrders.reduce((s: number, o: any) => s + o.total, 0);
        }, 0),
        avgOrderValue: inactiveCustomers.length > 0 ? 
          inactiveCustomers.reduce((sum, c) => {
            const customerOrders = allOrders.filter((o: any) => o.user_id === c.id);
            return sum + customerOrders.reduce((s: number, o: any) => s + o.total, 0);
          }, 0) / inactiveCustomers.length : 0,
        color: 'from-rose-500 to-rose-600'
      }
    ];
  };

  const handleSendCampaign = (segmentId: string) => {
    // In production, this would trigger an email campaign
    alert(`Sending campaign to ${segmentId} segment...`);
  };

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading segments...</p>
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
        <div className="flex items-center gap-3 mb-2">
          <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100">
              Customer Segmentation
            </h1>
            <p className="text-stone-600 dark:text-stone-400">
              Group customers for targeted marketing campaigns
            </p>
          </div>
        </div>
      </motion.div>

      {/* Segments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {segments.map((segment, index) => (
          <motion.div
            key={segment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedSegment(selectedSegment === segment.id ? null : segment.id)}
            className={`bg-white dark:bg-stone-800 rounded-2xl border-2 p-6 cursor-pointer transition-all ${
              selectedSegment === segment.id
                ? 'border-amber-400 dark:border-amber-600 shadow-xl'
                : 'border-stone-200 dark:border-stone-700 hover:border-amber-300 dark:hover:border-amber-700'
            }`}
          >
            {/* Icon */}
            <div className={`w-14 h-14 bg-gradient-to-br ${segment.color} rounded-xl flex items-center justify-center mb-4`}>
              <Users className="w-7 h-7 text-white" />
            </div>

            {/* Name */}
            <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg mb-1">
              {segment.name}
            </h3>
            <p className="text-sm text-stone-600 dark:text-stone-400 mb-4">
              {segment.description}
            </p>

            {/* Stats */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600 dark:text-stone-400 flex items-center gap-1">
                  <Users className="w-4 h-4" />
                  Customers
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  {segment.customerCount}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600 dark:text-stone-400 flex items-center gap-1">
                  <DollarSign className="w-4 h-4" />
                  Total Spent
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  ${segment.totalSpent.toFixed(0)}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-stone-600 dark:text-stone-400 flex items-center gap-1">
                  <ShoppingCart className="w-4 h-4" />
                  Avg. Order
                </span>
                <span className="font-bold text-stone-900 dark:text-stone-100">
                  ${segment.avgOrderValue.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Action Button */}
            {selectedSegment === segment.id && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleSendCampaign(segment.id);
                }}
                className="w-full mt-4 py-2.5 gradient-bg text-white rounded-xl font-semibold text-sm shadow-lg flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" />
                Send Campaign
              </motion.button>
            )}
          </motion.div>
        ))}
      </div>

      {/* Segment Details */}
      {selectedSegment && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Segment Details
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">Criteria</p>
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                {segments.find(s => s.id === selectedSegment)?.criteria}
              </p>
            </div>
            <div className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">Revenue Potential</p>
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                ${segments.find(s => s.id === selectedSegment)?.totalSpent.toFixed(2)}
              </p>
            </div>
            <div className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
              <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">Engagement Rate</p>
              <p className="font-semibold text-stone-900 dark:text-stone-100">
                {Math.round(Math.random() * 40 + 60)}%
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Marketing Tips */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-8 text-white"
      >
        <h3 className="font-serif text-2xl font-bold mb-4">Marketing Tips</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-bold mb-2">New Customers</h4>
            <p className="text-sm text-white/90">
              Send welcome emails with 10% discount to encourage first purchase
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-bold mb-2">Regular Customers</h4>
            <p className="text-sm text-white/90">
              Offer loyalty rewards and exclusive products to increase retention
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-bold mb-2">VIP Customers</h4>
            <p className="text-sm text-white/90">
              Provide early access to new products and personalized recommendations
            </p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
            <h4 className="font-bold mb-2">Inactive Customers</h4>
            <p className="text-sm text-white/90">
              Send re-engagement emails with special offers to win them back
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
