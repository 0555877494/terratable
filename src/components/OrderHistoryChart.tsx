import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Calendar, DollarSign } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface OrderHistoryChartProps {
  orders: Array<{
    id: string;
    date: string;
    total: number;
    status: string;
  }>;
}

export default function OrderHistoryChart({ orders }: OrderHistoryChartProps) {
  // Group orders by month
  const monthlyData = orders.reduce((acc, order) => {
    const date = new Date(order.date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (!acc[monthKey]) {
      acc[monthKey] = { month: monthKey, total: 0, count: 0 };
    }
    
    acc[monthKey].total += order.total;
    acc[monthKey].count += 1;
    
    return acc;
  }, {} as Record<string, { month: string; total: number; count: number }>);

  const chartData = Object.values(monthlyData)
    .sort((a, b) => a.month.localeCompare(b.month))
    .slice(-6) // Last 6 months
    .map(data => ({
      ...data,
      month: new Date(data.month + '-01').toLocaleDateString('en-US', { month: 'short' })
    }));

  const totalSpent = orders.reduce((sum, order) => sum + order.total, 0);
  const avgOrderValue = orders.length > 0 ? totalSpent / orders.length : 0;

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
          <TrendingUp className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Order History
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Your spending trends over time
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <DollarSign className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span className="text-sm text-stone-600 dark:text-stone-400">Total Spent</span>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            ${totalSpent.toFixed(2)}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-stone-50 dark:bg-stone-700/50 rounded-xl p-4"
        >
          <div className="flex items-center gap-2 mb-2">
            <TrendingUp className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <span className="text-sm text-stone-600 dark:text-stone-400">Avg. Order</span>
          </div>
          <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">
            ${avgOrderValue.toFixed(2)}
          </p>
        </motion.div>
      </div>

      {/* Spending Chart */}
      {chartData.length > 0 && (
        <div className="mb-6">
          <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Monthly Spending
          </h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="month" stroke="#78716c" fontSize={12} />
              <YAxis stroke="#78716c" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e7e5e4',
                  borderRadius: '12px'
                }}
                formatter={(value: number) => [`$${value.toFixed(2)}`, 'Spent']}
              />
              <Bar dataKey="total" fill="#f59e0b" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}

      {/* Order Count Chart */}
      {chartData.length > 0 && (
        <div>
          <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">
            Orders per Month
          </h4>
          <ResponsiveContainer width="100%" height={150}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" />
              <XAxis dataKey="month" stroke="#78716c" fontSize={12} />
              <YAxis stroke="#78716c" fontSize={12} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#fff', 
                  border: '2px solid #e7e5e4',
                  borderRadius: '12px'
                }}
                formatter={(value: number) => [value, 'Orders']}
              />
              <Line 
                type="monotone" 
                dataKey="count" 
                stroke="#10b981" 
                strokeWidth={3}
                dot={{ fill: '#10b981', r: 5 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
