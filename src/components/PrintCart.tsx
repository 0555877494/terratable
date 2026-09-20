import React from 'react';
import { motion } from 'framer-motion';
import { Printer, Download } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';

export default function PrintCart() {
  const { cart, cartTotal } = useStore();

  if (cart.length === 0) return null;

  const handlePrint = () => {
    window.print();
  };

  const subtotal = cartTotal;
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="print-only">
      <style>{`
        @media print {
          .print-only {
            display: block !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          body {
            background: white !important;
          }
        }
        @media screen {
          .print-only {
            display: none;
          }
        }
      `}</style>

      <div className="max-w-4xl mx-auto p-8 bg-white">
        {/* Header */}
        <div className="text-center mb-8 pb-6 border-b-2 border-stone-300">
          <h1 className="font-serif text-4xl font-bold text-stone-900 mb-2">Terra & Table</h1>
          <p className="text-stone-600">Shopping Cart Summary</p>
          <p className="text-sm text-stone-500 mt-2">
            Printed on {new Date().toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit'
            })}
          </p>
        </div>

        {/* Items */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-stone-900 mb-4">Items ({cart.length})</h2>
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-stone-300">
                <th className="text-left py-3 text-sm font-semibold text-stone-700">Product</th>
                <th className="text-center py-3 text-sm font-semibold text-stone-700">Qty</th>
                <th className="text-right py-3 text-sm font-semibold text-stone-700">Price</th>
                <th className="text-right py-3 text-sm font-semibold text-stone-700">Total</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={index} className="border-b border-stone-200">
                  <td className="py-4">
                    <p className="font-semibold text-stone-900">{item.product.name}</p>
                    <p className="text-xs text-stone-500">{item.product.origin}</p>
                  </td>
                  <td className="text-center py-4 text-stone-900">{item.quantity}</td>
                  <td className="text-right py-4 text-stone-900">${item.product.price.toFixed(2)}</td>
                  <td className="text-right py-4 font-semibold text-stone-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="border-t-2 border-stone-300 pt-6">
          <div className="max-w-sm ml-auto space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Subtotal:</span>
              <span className="font-semibold text-stone-900">${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Shipping:</span>
              <span className="font-semibold text-emerald-600">FREE</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-stone-600">Tax (8%):</span>
              <span className="font-semibold text-stone-900">${tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-stone-300">
              <span className="text-lg font-bold text-stone-900">Total:</span>
              <span className="text-2xl font-bold text-stone-900">${total.toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t-2 border-stone-300 text-center">
          <p className="text-sm text-stone-600 mb-2">
            Thank you for shopping with Terra & Table!
          </p>
          <p className="text-xs text-stone-500">
            www.terraandtable.com • hello@terraandtable.com • +1 (555) 123-4567
          </p>
        </div>
      </div>
    </div>
  );
}
