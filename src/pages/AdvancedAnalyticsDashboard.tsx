import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Package, ArrowUp, ArrowDown, Calendar, Star } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { supabase } from '../lib/supabase';

export default function AdvancedAnalyticsDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    averageOrderValue: 0,
    conversionRate: 0
  });
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [customerSegments, setCustomerSegments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch orders
      const { data: orders } = await supabase
        .from('orders')
        .select('*, order_items(*, products(*))')
        .eq('status', 'delivered');

      // Fetch products
      const { data: products } = await supabase
        .from('products')
        .select('*');

      // Fetch customers
      const { count: customerCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'customer');

      // Calculate stats
      const totalRevenue = orders?.reduce((sum: number, order: any) => sum + order.total, 0) || 0;
      const totalOrders = orders?.length || 0;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      setStats({
        totalRevenue,
        totalOrders,
        totalCustomers: customerCount || 0,
        totalProducts: products?.length || 0,
        averageOrderValue,
        conversionRate: 3.5 // Mock conversion rate
      });

      // Generate revenue data for last 30 days
      const last30Days = Array.from({ length: 30 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (29 - i));
        return date.toISOString().split('T')[0];
      });

      const revenueByDay = last30Days.map(date => {
        const dayOrders = orders?.filter((order: any) => 
          order.created_at.startsWith(date)
        ) || [];
        const dayRevenue = dayOrders.reduce((sum: number, order: any) => sum + order.total, 0);
        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: dayRevenue,
          orders: dayOrders.length
        };
      });

      setRevenueData(revenueByDay);

      // Category distribution
      const categoryCounts = products?.reduce((acc: Record<string, number>, product: any) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const categoryChartData = Object.entries(categoryCounts || {}).map(([name, value]) => ({
        name,
        value
      }));

      setCategoryData(categoryChartData);

      // Top products by revenue
      const productSales = orders?.flatMap((order: any) => 
        order.order_items?.map((item: any) => ({
          ...item,
          product: item.products
        })) || []
      ) || [];

      const productRevenue = productSales.reduce((acc: Record<string, any>, item: any) => {
        const productId = item.product_id;
        if (!acc[productId]) {
          acc[productId] = {
            id: productId,
            name: item.product?.name || 'Unknown',
            image: item.product?.image || '',
            price: item.product?.price || 0,
            quantity: 0,
            revenue: 0
          };
        }
        acc[productId].quantity += item.quantity;
        acc[productId].revenue += item.quantity * item.price;
        return acc;
      }, {} as Record<string, any>);

      const topProductsList = Object.values(productRevenue)
        .sort((a: any, b: any) => b.revenue - a.revenue)
        .slice(0, 10);

      setTopProducts(topProductsList);

      // Customer segments
      const segments = [
        { name: 'New Customers', value: 35, color: '#3b82f6' },
        { name: 'Regular Customers', value: 45, color: '#10b981' },
        { name: 'VIP Customers', value: 15, color: '#f59e0b' },
        { name: 'Inactive', value: 5, color: '#ef4444' }
      ];

      setCustomerSegments(segments);

    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'];

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading analytics...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Advanced Analytics
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Comprehensive insights into your business performance
        </p>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Revenue</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            ${stats.totalRevenue.toFixed(0)}
          </p>
          <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
            <ArrowUp className="w-3 h-3" />
            +12.5%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
              <ShoppingCart className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Orders</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {stats.totalOrders}
          </p>
          <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
            <ArrowUp className="w-3 h-3" />
            +8.2%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
              <Users className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Customers</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {stats.totalCustomers}
          </p>
          <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
            <ArrowUp className="w-3 h-3" />
            +15.3%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-amber-600 rounded-xl flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Products</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {stats.totalProducts}
          </p>
          <p className="text-xs text-stone-500 mt-1">
            Active
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-rose-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Avg. Order</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            ${stats.averageOrderValue.toFixed(0)}
          </p>
          <p className="text-xs text-emerald-600 flex items-center gap-1 mt-1">
            <ArrowUp className="w-3 h-3" />
            +5.7%
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-teal-600 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Conversion</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {stats.conversionRate}%
          </p>
          <p className="text-xs text-rose-600 flex items-center gap-1 mt-1">
            <ArrowDown className="w-3 h-3" />
            -0.3%
          </p>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100">
              Revenue Trend (Last 30 Days)
            </h3>
            <Calendar className="w-5 h-5 text-stone-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="date" stroke="#78716c" fontSize={12} />
              <YAxis stroke="#78716c" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e7e5e4',
                  borderRadius: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="revenue" 
                stroke="#f59e0b" 
                strokeWidth={3}
                fillOpacity={1} 
                fill="url(#colorRevenue)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Products by Category
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.9 + index * 0.05 }}
                className="flex items-center gap-4 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
              >
                <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold">
                  #{index + 1}
                </div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-16 h-16 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                    {product.name}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {product.quantity} sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900 dark:text-stone-100">
                    ${product.revenue.toFixed(2)}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    ${product.price.toFixed(2)} each
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Customer Segments */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Customer Segments
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={customerSegments}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="name" stroke="#78716c" fontSize={12} />
              <YAxis stroke="#78716c" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e7e5e4',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="value" fill="#f59e0b" radius={[8, 8, 0, 0]}>
                {customerSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="mt-4 grid grid-cols-2 gap-3">
            {customerSegments.map((segment, index) => (
              <div key={index} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: segment.color }} />
                <span className="text-sm text-stone-600 dark:text-stone-400">
                  {segment.name}: {segment.value}%
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Orders vs Revenue Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
      >
        <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Orders vs Revenue
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis dataKey="date" stroke="#78716c" fontSize={12} />
            <YAxis yAxisId="left" stroke="#f59e0b" fontSize={12} />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" fontSize={12} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '2px solid #e7e5e4',
                borderRadius: '12px'
              }}
            />
            <Legend />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="revenue" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 5 }}
              name="Revenue ($)"
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="orders" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
              name="Orders"
            />
          </LineChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
