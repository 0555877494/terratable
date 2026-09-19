import React from 'react';
import { motion } from 'framer-motion';
import { TrendingDown, TrendingUp, Minus } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';

interface PriceHistoryProps {
  productId: string;
  currentPrice: number;
}

export default function PriceHistory({ productId, currentPrice }: PriceHistoryProps) {
  // Generate mock price history data
  const generatePriceHistory = () => {
    const history = [];
    const basePrice = currentPrice;
    const now = new Date();
    
    for (let i = 90; i >= 0; i -= 7) {
      const date = new Date(now);
      date.setDate(date.getDate() - i);
      
      // Simulate price fluctuations
      const variation = (Math.random() - 0.5) * (basePrice * 0.2);
      const price = Math.max(basePrice * 0.8, Math.min(basePrice * 1.2, basePrice + variation));
      
      history.push({
        date: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
        price: parseFloat(price.toFixed(2))
      });
    }
    
    return history;
  };

  const priceHistory = generatePriceHistory();
  const lowestPrice = Math.min(...priceHistory.map(p => p.price));
  const highestPrice = Math.max(...priceHistory.map(p => p.price));
  const averagePrice = priceHistory.reduce((sum, p) => sum + p.price, 0) / priceHistory.length;
  
  const priceTrend = currentPrice < averagePrice ? 'down' : currentPrice > averagePrice ? 'up' : 'stable';
  const priceDiff = ((currentPrice - averagePrice) / averagePrice * 100).toFixed(1);

  const getTrendIcon = () => {
    if (priceTrend === 'down') return <TrendingDown className="w-5 h-5 text-emerald-500" />;
    if (priceTrend === 'up') return <TrendingUp className="w-5 h-5 text-red-500" />;
    return <Minus className="w-5 h-5 text-stone-500" />;
  };

  const getTrendColor = () => {
    if (priceTrend === 'down') return 'text-emerald-600 dark:text-emerald-400';
    if (priceTrend === 'up') return 'text-red-600 dark:text-red-400';
    return 'text-stone-600 dark:text-stone-400';
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
            {getTrendIcon()}
          </div>
          <div>
            <h3 className="font-bold text-stone-900 dark:text-stone-100">Price History</h3>
            <p className="text-sm text-stone-500 dark:text-stone-400">Last 90 days</p>
          </div>
        </div>
        <div className="text-right">
          <p className={`text-2xl font-bold ${getTrendColor()}`}>
            {priceTrend === 'down' ? '↓' : priceTrend === 'up' ? '↑' : '→'} {Math.abs(parseFloat(priceDiff))}%
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-400">vs average</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-48 mb-4">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={priceHistory}>
            <defs>
              <linearGradient id="colorPrice" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e7e5e4" opacity={0.3} />
            <XAxis 
              dataKey="date" 
              stroke="#78716c" 
              fontSize={12}
              tick={{ fill: '#78716c' }}
            />
            <YAxis 
              stroke="#78716c" 
              fontSize={12}
              tick={{ fill: '#78716c' }}
              domain={['auto', 'auto']}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#fff', 
                border: '2px solid #e7e5e4',
                borderRadius: '12px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: number) => [`$${value.toFixed(2)}`, 'Price']}
            />
            <Area 
              type="monotone" 
              dataKey="price" 
              stroke="#f59e0b" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorPrice)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-stone-200 dark:border-stone-700">
        <div className="text-center">
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Lowest</p>
          <p className="text-lg font-bold text-emerald-600 dark:text-emerald-400">
            ${lowestPrice.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Average</p>
          <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
            ${averagePrice.toFixed(2)}
          </p>
        </div>
        <div className="text-center">
          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Highest</p>
          <p className="text-lg font-bold text-red-600 dark:text-red-400">
            ${highestPrice.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Recommendation */}
      {priceTrend === 'down' && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-3 bg-emerald-50 dark:bg-emerald-900/20 border-2 border-emerald-200 dark:border-emerald-800 rounded-xl"
        >
          <p className="text-sm text-emerald-700 dark:text-emerald-300 font-semibold text-center">
            💡 Great time to buy! Price is below average
          </p>
        </motion.div>
      )}
    </div>
  );
}
