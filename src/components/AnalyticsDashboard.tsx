import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, ShoppingCart, Users, Package, Star } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0,
    averageOrderValue: 0
  });
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      // Fetch total revenue and orders
      const { data: orders } = await supabase
        .from('orders')
        .select('total, created_at, status')
        .eq('status', 'delivered');

      const totalRevenue = orders?.reduce((sum, order) => sum + order.total, 0) || 0;
      const totalOrders = orders?.length || 0;
      const averageOrderValue = totalOrders > 0 ? totalRevenue / totalOrders : 0;

      // Fetch total customers
      const { count: customerCount } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true })
        .eq('role', 'customer');

      // Fetch total products
      const { count: productCount } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true });

      setStats({
        totalRevenue,
        totalOrders,
        totalCustomers: customerCount || 0,
        totalProducts: productCount || 0,
        averageOrderValue
      });

      // Generate revenue data for chart (last 7 days)
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - (6 - i));
        return date.toISOString().split('T')[0];
      });

      const revenueByDay = last7Days.map(date => {
        const dayOrders = orders?.filter(order => 
          order.created_at.startsWith(date)
        ) || [];
        const dayRevenue = dayOrders.reduce((sum, order) => sum + order.total, 0);
        return {
          date: new Date(date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
          revenue: dayRevenue,
          orders: dayOrders.length
        };
      });

      setRevenueData(revenueByDay);

      // Fetch category data
      const { data: products } = await supabase
        .from('products')
        .select('category');

      const categoryCounts = products?.reduce((acc, product) => {
        acc[product.category] = (acc[product.category] || 0) + 1;
        return acc;
      }, {} as Record<string, number>);

      const categoryChartData = Object.entries(categoryCounts || {}).map(([name, value]) => ({
        name,
        value
      }));

      setCategoryData(categoryChartData);

      // Fetch top products
      const { data: orderItems } = await supabase
        .from('order_items')
        .select('product_id, quantity, products(name, image, price)');

      const productSales = orderItems?.reduce((acc, item) => {
        const productId = item.product_id;
        const product = Array.isArray(item.products) ? item.products[0] : item.products;
        if (!acc[productId]) {
          acc[productId] = {
            id: productId,
            name: product?.name || 'Unknown',
            image: product?.image || '',
            price: product?.price || 0,
            quantity: 0,
            revenue: 0
          };
        }
        acc[productId].quantity += item.quantity;
        acc[productId].revenue += item.quantity * (product?.price || 0);
        return acc;
      }, {} as Record<string, any>);

      const topProductsList = Object.values(productSales || {})
        .sort((a, b) => b.revenue - a.revenue)
        .slice(0, 5);

      setTopProducts(topProductsList);

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
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <DollarSign className="w-5 h-5 text-white" />
            </div>
            <p className="text-sm text-stone-500 dark:text-stone-400">Total Revenue</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            ${stats.totalRevenue.toFixed(2)}
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
            <p className="text-sm text-stone-500 dark:text-stone-400">Total Orders</p>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            {stats.totalOrders}
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
            ${stats.averageOrderValue.toFixed(2)}
          </p>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Revenue (Last 7 Days)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="date" stroke="#78716c" />
              <YAxis stroke="#78716c" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e7e5e4',
                  borderRadius: '12px'
                }}
              />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} name="Revenue ($)" />
              <Line type="monotone" dataKey="orders" stroke="#10b981" strokeWidth={3} name="Orders" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Category Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
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
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {categoryData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Top Products */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
      >
        <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Top Selling Products
        </h3>
        {topProducts.length === 0 ? (
          <p className="text-center text-stone-500 dark:text-stone-400 py-8">
            No sales data available yet
          </p>
        ) : (
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
                className="flex items-center gap-4 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
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
                  <p className="font-semibold text-stone-900 dark:text-stone-100">
                    {product.name}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    {product.quantity} sold
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-stone-900 dark:text-stone-100">
                    ${product.revenue.toFixed(2)}
                  </p>
                  <p className="text-sm text-stone-500 dark:text-stone-400">
                    ${product.price.toFixed(2)} each
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
