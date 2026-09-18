import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, MapPin, CheckCircle, Sparkles } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, placeOrder } = useStore();
  const { user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [address, setAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [orderPlaced, setOrderPlaced] = useState('');

  const handleRemoveItem = (productId: string, productName: string) => {
    removeFromCart(productId);
    showToast('info', `${productName} removed from cart`);
  };

  const handleCheckout = () => {
    if (!user) { navigate('/login'); return; }
    setStep(1);
  };

  const handlePlaceOrder = () => {
    if (!user) return;
    const orderId = placeOrder(user.id, user.name, address, paymentMethod);
    setOrderPlaced(orderId);
    setStep(3);
  };

  if (cart.length === 0 && step !== 3) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-7xl mb-6"
          >
            🛒
          </motion.div>
          <h2 className="font-serif text-3xl text-terra-800 mb-3">Your cart is empty</h2>
          <p className="text-terra-500 mb-8 max-w-sm mx-auto">Discover our curated collection of the world's finest specialty foods</p>
          <Link to="/" className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-full font-semibold shadow-xl shadow-terra-500/20 hover:shadow-2xl transition-all hover:-translate-y-0.5">
            <ArrowLeft className="w-4 h-4" /> Explore Collection
          </Link>
        </motion.div>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ type: 'spring' }} className="text-center max-w-md">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', delay: 0.2 }}
            className="relative w-24 h-24 mx-auto mb-8"
          >
            <div className="absolute inset-0 bg-sage-100 rounded-full animate-ping opacity-30" />
            <div className="relative w-24 h-24 bg-gradient-to-br from-sage-400 to-sage-600 rounded-full flex items-center justify-center shadow-xl shadow-sage-500/30">
              <CheckCircle className="w-12 h-12 text-white" />
            </div>
          </motion.div>
          <h2 className="font-serif text-3xl text-terra-800 mb-3">Order Confirmed!</h2>
          <p className="text-terra-500 mb-2">Your delicious order is on its way</p>
          <p className="text-sm text-terra-400 mb-8 bg-terra-50 inline-block px-4 py-2 rounded-full">Order ID: {orderPlaced}</p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link to="/" className="px-6 py-3 bg-gradient-to-r from-terra-600 to-terra-700 text-white rounded-full font-medium shadow-lg shadow-terra-500/20 hover:shadow-xl transition-all">
              Continue Shopping
            </Link>
            {user && user.role === 'customer' && (
              <Link to="/customer" className="px-6 py-3 border-2 border-terra-200 text-terra-700 rounded-full font-medium hover:bg-terra-50 transition-colors">
                Track Order
              </Link>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      {/* Progress */}
      <div className="flex items-center justify-center gap-3 mb-10">
        {['Cart', 'Address', 'Payment'].map((label, i) => (
          <React.Fragment key={label}>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className={`flex items-center gap-2 ${step >= i ? 'text-terra-700' : 'text-terra-300'}`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all ${
                step >= i
                  ? 'bg-gradient-to-br from-terra-500 to-wine-600 text-white shadow-lg shadow-terra-500/20'
                  : 'bg-terra-100 text-terra-400'
              }`}>
                {step > i ? '✓' : i + 1}
              </div>
              <span className="hidden sm:inline text-sm font-medium">{label}</span>
            </motion.div>
            {i < 2 && (
              <div className={`w-12 sm:w-20 h-1 rounded-full transition-all ${step > i ? 'bg-gradient-to-r from-terra-400 to-wine-400' : 'bg-terra-100'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="font-serif text-2xl text-terra-800 mb-6">Shopping Cart</h2>
                <div className="space-y-4">
                  {cart.map((item, i) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -100, scale: 0.9 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex gap-4 sm:gap-5 p-4 sm:p-5 bg-white rounded-2xl border border-terra-100/50 shadow-sm hover:shadow-md transition-shadow"
                    >
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover shadow-sm" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-terra-800 truncate text-base">{item.product.name}</h3>
                        <p className="text-sm text-terra-500 mt-0.5">${item.product.price.toFixed(2)} each</p>
                        <div className="flex items-center gap-2 mt-3">
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-full border border-terra-200 flex items-center justify-center hover:bg-terra-50 hover:border-terra-300 transition-all"
                          >
                            <Minus className="w-3.5 h-3.5" />
                          </motion.button>
                          <span className="text-sm font-bold w-8 text-center text-terra-800">{item.quantity}</span>
                          <motion.button
                            whileTap={{ scale: 0.9 }}
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-full border border-terra-200 flex items-center justify-center hover:bg-terra-50 hover:border-terra-300 transition-all"
                          >
                            <Plus className="w-3.5 h-3.5" />
                          </motion.button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => handleRemoveItem(item.product.id, item.product.name)}
                          className="p-2 text-terra-300 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                        <span className="font-bold text-lg bg-gradient-to-r from-terra-700 to-wine-700 bg-clip-text text-transparent">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="address" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="font-serif text-2xl text-terra-800 mb-6">Delivery Address</h2>
                <div className="bg-white rounded-2xl border border-terra-100/50 p-6 shadow-sm">
                  <label className="flex items-center gap-2 text-sm font-semibold text-terra-700 mb-3">
                    <MapPin className="w-4 h-4 text-terra-500" /> Where should we deliver?
                  </label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3.5 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none transition-all resize-none bg-cream-50/50 text-terra-800 placeholder:text-terra-400"
                    placeholder="Street address, apartment, city, zip code..."
                  />
                  <div className="mt-4 p-3 bg-sage-50 rounded-xl flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-sage-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-sage-700">Your address is encrypted and secure. We only share it with our delivery partners.</p>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="font-serif text-2xl text-terra-800 mb-6">Payment Method</h2>
                <div className="bg-white rounded-2xl border border-terra-100/50 p-6 space-y-3 shadow-sm">
                  {[
                    { method: 'Credit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
                    { method: 'PayPal', icon: '🅿️', desc: 'Pay with your PayPal account' },
                    { method: 'Apple Pay', icon: '🍎', desc: 'Quick & secure checkout' }
                  ].map(({ method, icon, desc }) => (
                    <motion.label
                      key={method}
                      whileHover={{ scale: 1.01 }}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        paymentMethod === method
                          ? 'border-terra-400 bg-gradient-to-r from-terra-50 to-cream-50 shadow-md'
                          : 'border-terra-100 hover:border-terra-200'
                      }`}
                    >
                      <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={e => setPaymentMethod(e.target.value)} className="sr-only" />
                      <span className="text-2xl">{icon}</span>
                      <div className="flex-1">
                        <span className="font-semibold text-terra-800 block">{method}</span>
                        <span className="text-xs text-terra-500">{desc}</span>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === method ? 'border-terra-500' : 'border-terra-200'}`}>
                        {paymentMethod === method && <div className="w-3 h-3 bg-terra-500 rounded-full" />}
                      </div>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(step - 1)}
                className="px-6 py-3.5 border-2 border-terra-200 text-terra-700 rounded-full font-medium hover:bg-terra-50 transition-colors"
              >
                ← Back
              </motion.button>
            )}
            {step === 0 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCheckout}
                className="px-8 py-3.5 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-full font-semibold shadow-xl shadow-terra-500/20 hover:shadow-2xl transition-all"
              >
                Proceed to Checkout →
              </motion.button>
            )}
            {step === 1 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setStep(2)}
                disabled={!address.trim()}
                className="px-8 py-3.5 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-full font-semibold shadow-xl shadow-terra-500/20 hover:shadow-2xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Continue to Payment →
              </motion.button>
            )}
            {step === 2 && (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePlaceOrder}
                className="px-8 py-3.5 bg-gradient-to-r from-sage-600 to-sage-700 text-white rounded-full font-semibold shadow-xl shadow-sage-500/20 hover:shadow-2xl transition-all"
              >
                ✨ Place Order — ${(cartTotal * 1.08).toFixed(2)}
              </motion.button>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-terra-100/50 p-6 sticky top-24 shadow-sm">
            <h3 className="font-serif text-lg font-semibold text-terra-800 mb-5 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-terra-500" /> Order Summary
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-terra-600">
                <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
                <span className="font-medium">${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-terra-600">
                <span>Shipping</span>
                <span className="text-sage-600 font-medium">Free ✨</span>
              </div>
              <div className="flex justify-between text-terra-600">
                <span>Estimated Tax</span>
                <span className="font-medium">${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-terra-100 pt-3 mt-3 flex justify-between">
                <span className="font-bold text-terra-800 text-lg">Total</span>
                <span className="font-bold text-xl bg-gradient-to-r from-terra-700 to-wine-700 bg-clip-text text-transparent">
                  ${(cartTotal * 1.08).toFixed(2)}
                </span>
              </div>
            </div>
            <div className="mt-5 p-3 bg-sage-50 rounded-xl">
              <p className="text-xs text-sage-700 text-center">🔒 Secure checkout • Free returns within 30 days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
