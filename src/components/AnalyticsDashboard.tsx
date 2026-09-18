import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, DollarSign, ShoppingBag, Users, Package, Star, ArrowUp, ArrowDown } from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { useStore } from '../contexts/StoreContext';

export default function AnalyticsDashboard() {
  const { orders, products } = useStore();

  // Mock analytics data
  const revenueData = [
    { month: 'Jan', revenue: 4200, orders: 42 },
    { month: 'Feb', revenue: 5800, orders: 58 },
    { month: 'Mar', revenue: 6100, orders: 61 },
    { month: 'Apr', revenue: 7500, orders: 75 },
    { month: 'May', revenue: 8200, orders: 82 },
    { month: 'Jun', revenue: 9100, orders: 91 }
  ];

  const categoryData = [
    { name: 'Pantry', value: 35, color: '#f59e0b' },
    { name: 'Beverages', value: 25, color: '#10b981' },
    { name: 'Spices', value: 20, color: '#ef4444' },
    { name: 'Confections', value: 12, color: '#8b5cf6' },
    { name: 'Oils', value: 8, color: '#3b82f6' }
  ];

  const topProducts = [
    { name: 'Tuscan Wildflower Honey', sales: 145, revenue: 3624.55 },
    { name: 'Japanese Matcha Powder', sales: 128, revenue: 4928.00 },
    { name: 'Artisan Dark Chocolate', sales: 112, revenue: 2100.00 },
    { name: 'Truffle Infused Olive Oil', sales: 98, revenue: 4704.00 },
    { name: 'Saffron Threads Premium', sales: 87, revenue: 4872.00 }
  ];

  const customerData = [
    { day: 'Mon', customers: 45 },
    { day: 'Tue', customers: 52 },
    { day: 'Wed', customers: 48 },
    { day: 'Thu', customers: 61 },
    { day: 'Fri', customers: 72 },
    { day: 'Sat', customers: 85 },
    { day: 'Sun', customers: 68 }
  ];

  const stats = [
    {
      label: 'Total Revenue',
      value: '$40,900',
      change: '+12.5%',
      trend: 'up',
      icon: <DollarSign className="w-6 h-6" />,
      color: 'from-emerald-500 to-emerald-600'
    },
    {
      label: 'Total Orders',
      value: '409',
      change: '+8.2%',
      trend: 'up',
      icon: <ShoppingBag className="w-6 h-6" />,
      color: 'from-blue-500 to-blue-600'
    },
    {
      label: 'Active Customers',
      value: '1,247',
      change: '+15.3%',
      trend: 'up',
      icon: <Users className="w-6 h-6" />,
      color: 'from-purple-500 to-purple-600'
    },
    {
      label: 'Avg. Order Value',
      value: '$100.00',
      change: '-2.1%',
      trend: 'down',
      icon: <TrendingUp className="w-6 h-6" />,
      color: 'from-amber-500 to-amber-600'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <h1 className="font-serif text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
          Analytics Dashboard
        </h1>
        <p className="text-stone-600 dark:text-stone-400">
          Comprehensive insights into your business performance
        </p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-5"
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white`}>
                {stat.icon}
              </div>
              <div className={`flex items-center gap-1 text-sm font-semibold ${
                stat.trend === 'up' ? 'text-emerald-600' : 'text-red-600'
              }`}>
                {stat.trend === 'up' ? <ArrowUp className="w-4 h-4" /> : <ArrowDown className="w-4 h-4" />}
                {stat.change}
              </div>
            </div>
            <p className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-1">
              {stat.value}
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-400">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Revenue Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Revenue Trend
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="month" stroke="#78716c" />
              <YAxis stroke="#78716c" />
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
          transition={{ delay: 0.4 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Sales by Category
          </h3>
          <ResponsiveContainer width="100%" height={250}>
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
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e7e5e4',
                  borderRadius: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="grid grid-cols-2 gap-2 mt-4">
            {categoryData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-sm text-stone-600 dark:text-stone-400">
                  {item.name} ({item.value}%)
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        {/* Customer Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Customer Activity (This Week)
          </h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={customerData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="day" stroke="#78716c" />
              <YAxis stroke="#78716c" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e7e5e4',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="customers" fill="#10b981" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Products */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
        >
          <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            Top Selling Products
          </h3>
          <div className="space-y-4">
            {topProducts.map((product, index) => (
              <motion.div
                key={product.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className="flex items-center gap-4"
              >
                <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {index + 1}
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                    {product.name}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {product.sales} sales
                  </p>
                </div>
                <p className="font-bold text-stone-900 dark:text-stone-100">
                  ${product.revenue.toFixed(2)}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Orders Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
      >
        <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Orders vs Revenue
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
            <XAxis dataKey="month" stroke="#78716c" />
            <YAxis yAxisId="left" stroke="#f59e0b" />
            <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '2px solid #e7e5e4',
                borderRadius: '12px'
              }}
            />
            <Line 
              yAxisId="left"
              type="monotone" 
              dataKey="revenue" 
              stroke="#f59e0b" 
              strokeWidth={3}
              dot={{ fill: '#f59e0b', r: 5 }}
            />
            <Line 
              yAxisId="right"
              type="monotone" 
              dataKey="orders" 
              stroke="#10b981" 
              strokeWidth={3}
              dot={{ fill: '#10b981', r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
        <div className="flex justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-sm text-stone-600 dark:text-stone-400">Revenue</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-sm text-stone-600 dark:text-stone-400">Orders</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
