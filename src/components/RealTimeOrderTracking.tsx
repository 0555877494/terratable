import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';
import { Order } from '../types';

interface RealTimeOrderTrackingProps {
  orderId: string;
  onOrderUpdate: (order: Order) => void;
}

export default function RealTimeOrderTracking({ orderId, onOrderUpdate }: RealTimeOrderTrackingProps) {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch initial order data
    const fetchOrder = async () => {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          order_items (
            *,
            product:products (*)
          )
        `)
        .eq('id', orderId)
        .single();

      if (!error && data) {
        setOrder(data);
        onOrderUpdate(data);
      }
      setLoading(false);
    };

    fetchOrder();

    // Subscribe to real-time updates
    const channel = supabase
      .channel(`order-${orderId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${orderId}`,
        },
        async (payload) => {
          // Fetch updated order with items
          const { data, error } = await supabase
            .from('orders')
            .select(`
              *,
              order_items (
                *,
                product:products (*)
              )
            `)
            .eq('id', orderId)
            .single();

          if (!error && data) {
            setOrder(data);
            onOrderUpdate(data);
          }
        }
      )
      .subscribe();

    // Cleanup subscription
    return () => {
      supabase.removeChannel(channel);
    };
  }, [orderId, onOrderUpdate]);

  if (loading) {
    return <div className="text-center py-8">Loading order details...</div>;
  }

  if (!order) {
    return <div className="text-center py-8 text-red-600">Order not found</div>;
  }

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
          Order #{order.id.slice(-6).toUpperCase()}
        </h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-emerald-600 dark:text-emerald-400 font-semibold">
            Live Updates
          </span>
        </div>
      </div>

      {/* Order Status Timeline */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          {['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'].map((status, index) => {
            const statusOrder = ['pending', 'confirmed', 'preparing', 'out_for_delivery', 'delivered'];
            const currentIndex = statusOrder.indexOf(order.status);
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <div key={status} className="flex-1 flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  isCompleted
                    ? 'bg-gradient-to-br from-emerald-500 to-emerald-600 text-white'
                    : 'bg-stone-200 dark:bg-stone-700 text-stone-400'
                } ${isCurrent ? 'ring-4 ring-emerald-200 dark:ring-emerald-800' : ''}`}>
                  {index + 1}
                </div>
                {index < 4 && (
                  <div className={`flex-1 h-1 mx-2 ${
                    isCompleted && index < currentIndex ? 'bg-emerald-500' : 'bg-stone-200 dark:bg-stone-700'
                  }`}></div>
                )}
              </div>
            );
          })}
        </div>
        <div className="flex items-center justify-between text-xs text-stone-600 dark:text-stone-400">
          <span>Placed</span>
          <span>Confirmed</span>
          <span>Preparing</span>
          <span>Shipping</span>
          <span>Delivered</span>
        </div>
      </div>

      {/* Current Status */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-4 mb-6">
        <p className="text-sm text-stone-600 dark:text-stone-400 mb-1">Current Status</p>
        <p className="text-lg font-bold text-stone-900 dark:text-stone-100 capitalize">
          {order.status.replace('_', ' ')}
        </p>
        {order.deliveryAgentId && (
          <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
            Delivery Agent: {order.deliveryAgentName || order.deliveryAgentId}
          </p>
        )}
      </div>

      {/* Order Items */}
      <div>
        <h4 className="font-semibold text-stone-900 dark:text-stone-100 mb-3">Order Items</h4>
        <div className="space-y-3">
          {order.items?.map((item: any, index: number) => (
            <div key={index} className="flex items-center gap-4 p-3 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="font-semibold text-stone-900 dark:text-stone-100">
                  {item.product.name}
                </p>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  Quantity: {item.quantity} × ${item.product.price.toFixed(2)}
                </p>
              </div>
              <p className="font-bold text-stone-900 dark:text-stone-100">
                ${(item.quantity * item.product.price).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary */}
      <div className="mt-6 pt-6 border-t border-stone-200 dark:border-stone-700">
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-stone-600 dark:text-stone-400">Subtotal</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">${(order.subtotal || order.total).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-600 dark:text-stone-400">Shipping</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">${(order.shipping || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-stone-600 dark:text-stone-400">Tax</span>
            <span className="font-semibold text-stone-900 dark:text-stone-100">${(order.tax || 0).toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-lg pt-2 border-t border-stone-200 dark:border-stone-700">
            <span className="font-bold text-stone-900 dark:text-stone-100">Total</span>
            <span className="font-bold gradient-text">${order.total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
