import React from 'react';
import { motion } from 'framer-motion';
import { Download, Printer, CheckCircle, Package, Calendar, CreditCard } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

interface OrderInvoiceProps {
  orderId: string;
}

export default function OrderInvoice({ orderId }: OrderInvoiceProps) {
  const { orders } = useStore();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="text-center py-12">
        <Package className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
        <p className="text-stone-600 dark:text-stone-400">Order not found</p>
      </div>
    );
  }

  const handlePrint = () => {
    window.print();
  };

  const orderDate = new Date(order.createdAt);
  const estimatedDelivery = new Date(orderDate.getTime() + 7 * 24 * 60 * 60 * 1000);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Action Buttons */}
      <div className="flex gap-3 mb-6 print:hidden">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePrint}
          className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
        >
          <Printer className="w-5 h-5" />
          Print Receipt
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold flex items-center gap-2"
        >
          <Download className="w-5 h-5" />
          Download PDF
        </motion.button>
      </div>

      {/* Invoice */}
      <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-8 print:border-0 print:shadow-none">
        {/* Header */}
        <div className="flex justify-between items-start mb-8 pb-6 border-b-2 border-stone-200 dark:border-stone-700">
          <div>
            <h1 className="font-serif text-3xl font-bold gradient-text mb-2">Terra & Table</h1>
            <p className="text-stone-600 dark:text-stone-400 text-sm">Artisan Food Marketplace</p>
            <p className="text-stone-500 dark:text-stone-500 text-xs mt-2">
              123 Market Street<br />
              San Francisco, CA 94105<br />
              hello@terraandtable.com
            </p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">INVOICE</h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Order #{order.id.slice(-6).toUpperCase()}
            </p>
            <div className="flex items-center gap-2 justify-end mt-2">
              <CheckCircle className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-emerald-600 capitalize">
                {order.status.replace('_', ' ')}
              </span>
            </div>
          </div>
        </div>

        {/* Order Info */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Order Details
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Order Date:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {orderDate.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Est. Delivery:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">
                  {estimatedDelivery.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-600 dark:text-stone-400">Payment Method:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100 flex items-center gap-1">
                  <CreditCard className="w-3 h-3" />
                  {order.paymentMethod}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">Shipping Address</h3>
            <div className="text-sm text-stone-600 dark:text-stone-400">
              <p className="font-semibold text-stone-900 dark:text-stone-100 mb-1">{order.userName}</p>
              <p>{order.address}</p>
              {order.deliveryAgentName && (
                <p className="mt-2 text-emerald-600 dark:text-emerald-400">
                  Delivered by: {order.deliveryAgentName}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-8">
          <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-4">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-stone-200 dark:border-stone-700">
                  <th className="text-left py-3 text-sm font-semibold text-stone-600 dark:text-stone-400">Product</th>
                  <th className="text-center py-3 text-sm font-semibold text-stone-600 dark:text-stone-400">Qty</th>
                  <th className="text-right py-3 text-sm font-semibold text-stone-600 dark:text-stone-400">Price</th>
                  <th className="text-right py-3 text-sm font-semibold text-stone-600 dark:text-stone-400">Total</th>
                </tr>
              </thead>
              <tbody>
                {order.items.map((item, index) => (
                  <tr key={index} className="border-b border-stone-100 dark:border-stone-700">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div>
                          <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-stone-500 dark:text-stone-400">
                            {item.product.origin}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="text-center py-4 text-stone-900 dark:text-stone-100">
                      {item.quantity}
                    </td>
                    <td className="text-right py-4 text-stone-900 dark:text-stone-100">
                      ${item.product.price.toFixed(2)}
                    </td>
                    <td className="text-right py-4 font-semibold text-stone-900 dark:text-stone-100">
                      ${(item.product.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals */}
        <div className="border-t-2 border-stone-200 dark:border-stone-700 pt-6">
          <div className="max-w-sm ml-auto space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone-600 dark:text-stone-400">Subtotal:</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                ${order.total.toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-600 dark:text-stone-400">Shipping:</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-600 dark:text-stone-400">Tax (8%):</span>
              <span className="font-semibold text-stone-900 dark:text-stone-100">
                ${(order.total * 0.08).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-stone-200 dark:border-stone-700">
              <span className="text-lg font-bold text-stone-900 dark:text-stone-100">Total:</span>
              <span className="text-2xl font-bold gradient-text">
                ${(order.total * 1.08).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t-2 border-stone-200 dark:border-stone-700 text-center">
          <p className="text-sm text-stone-600 dark:text-stone-400 mb-2">
            Thank you for your order!
          </p>
          <p className="text-xs text-stone-500 dark:text-stone-500">
            For questions about your order, please contact us at hello@terraandtable.com
          </p>
          <p className="text-xs text-stone-400 dark:text-stone-600 mt-4">
            Invoice generated on {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
