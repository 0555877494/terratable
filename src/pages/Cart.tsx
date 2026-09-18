import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft, CreditCard, MapPin, CheckCircle } from 'lucide-react';
import { useStore } from '../contexts/StoreContext';
import { useAuth } from '../contexts/AuthContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, cartTotal, placeOrder } = useStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0); // 0: cart, 1: address, 2: payment, 3: success
  const [address, setAddress] = useState(user?.address || '');
  const [paymentMethod, setPaymentMethod] = useState('Credit Card');
  const [orderPlaced, setOrderPlaced] = useState('');

  const handleCheckout = () => {
    if (!user) {
      navigate('/login');
      return;
    }
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
      <div className="max-w-4xl mx-auto px-4 py-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mb-6">
          <ShoppingBag className="w-20 h-20 mx-auto text-terra-200" />
        </motion.div>
        <h2 className="font-serif text-2xl text-terra-800 mb-2">Your cart is empty</h2>
        <p className="text-terra-500 mb-6">Discover our curated collection of specialty foods</p>
        <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-terra-600 text-white rounded-full font-medium hover:bg-terra-700 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Continue Shopping
        </Link>
      </div>
    );
  }

  if (step === 3) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
          <CheckCircle className="w-20 h-20 mx-auto text-sage-500 mb-6" />
        </motion.div>
        <h2 className="font-serif text-2xl text-terra-800 mb-2">Order Confirmed!</h2>
        <p className="text-terra-500 mb-2">Your order has been placed successfully.</p>
        <p className="text-sm text-terra-400 mb-8">Order ID: {orderPlaced}</p>
        <div className="flex gap-3 justify-center">
          <Link to="/" className="px-6 py-3 bg-terra-600 text-white rounded-full font-medium hover:bg-terra-700 transition-colors">
            Continue Shopping
          </Link>
          {user && user.role === 'customer' && (
            <Link to="/customer" className="px-6 py-3 border border-terra-200 text-terra-700 rounded-full font-medium hover:bg-terra-50 transition-colors">
              View Orders
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Progress */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {['Cart', 'Address', 'Payment'].map((label, i) => (
          <React.Fragment key={label}>
            <div className={`flex items-center gap-2 ${step >= i ? 'text-terra-700' : 'text-terra-300'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= i ? 'bg-terra-600 text-white' : 'bg-terra-100 text-terra-400'}`}>
                {i + 1}
              </div>
              <span className="hidden sm:inline text-sm font-medium">{label}</span>
            </div>
            {i < 2 && <div className={`w-12 h-0.5 ${step > i ? 'bg-terra-400' : 'bg-terra-100'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {step === 0 && (
              <motion.div key="cart" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="font-serif text-2xl text-terra-800 mb-4">Shopping Cart ({cart.length} items)</h2>
                <div className="space-y-4">
                  {cart.map(item => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, x: -100 }}
                      className="flex gap-4 p-4 bg-white rounded-2xl border border-terra-100 shadow-sm"
                    >
                      <img src={item.product.image} alt={item.product.name} className="w-20 h-20 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-terra-800 truncate">{item.product.name}</h3>
                        <p className="text-sm text-terra-500">${item.product.price.toFixed(2)} each</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-7 h-7 rounded-full border border-terra-200 flex items-center justify-center hover:bg-terra-50">
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-7 h-7 rounded-full border border-terra-200 flex items-center justify-center hover:bg-terra-50">
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col items-end justify-between">
                        <button onClick={() => removeFromCart(item.product.id)} className="p-1 text-terra-400 hover:text-red-500 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                        <span className="font-bold text-terra-800">${(item.product.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {step === 1 && (
              <motion.div key="address" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="font-serif text-2xl text-terra-800 mb-4">Delivery Address</h2>
                <div className="bg-white rounded-2xl border border-terra-100 p-6">
                  <label className="block text-sm font-medium text-terra-700 mb-2">
                    <MapPin className="w-4 h-4 inline mr-1" /> Full Address
                  </label>
                  <textarea
                    value={address}
                    onChange={e => setAddress(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl border border-terra-200 focus:border-terra-400 focus:ring-2 focus:ring-terra-100 outline-none transition-all resize-none"
                    placeholder="Enter your delivery address..."
                  />
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="payment" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }}>
                <h2 className="font-serif text-2xl text-terra-800 mb-4">Payment Method</h2>
                <div className="bg-white rounded-2xl border border-terra-100 p-6 space-y-3">
                  {['Credit Card', 'PayPal', 'Apple Pay'].map(method => (
                    <label key={method} className={`flex items-center gap-3 p-4 rounded-xl border-2 cursor-pointer transition-all ${paymentMethod === method ? 'border-terra-500 bg-terra-50' : 'border-terra-100 hover:border-terra-200'}`}>
                      <input type="radio" name="payment" value={method} checked={paymentMethod === method} onChange={e => setPaymentMethod(e.target.value)} className="text-terra-600" />
                      <CreditCard className="w-5 h-5 text-terra-500" />
                      <span className="font-medium text-terra-800">{method}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex gap-3 mt-6">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="px-6 py-3 border border-terra-200 text-terra-700 rounded-full font-medium hover:bg-terra-50 transition-colors">
                Back
              </button>
            )}
            {step === 0 && (
              <button onClick={handleCheckout} className="px-6 py-3 bg-terra-600 text-white rounded-full font-medium hover:bg-terra-700 transition-colors">
                Proceed to Checkout
              </button>
            )}
            {step === 1 && (
              <button onClick={() => setStep(2)} disabled={!address.trim()} className="px-6 py-3 bg-terra-600 text-white rounded-full font-medium hover:bg-terra-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                Continue to Payment
              </button>
            )}
            {step === 2 && (
              <button onClick={handlePlaceOrder} className="px-6 py-3 bg-sage-600 text-white rounded-full font-medium hover:bg-sage-700 transition-colors">
                Place Order — ${cartTotal.toFixed(2)}
              </button>
            )}
          </div>
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-2xl border border-terra-100 p-6 sticky top-24">
            <h3 className="font-serif text-lg font-semibold text-terra-800 mb-4">Order Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between text-terra-600">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-terra-600">
                <span>Shipping</span>
                <span className="text-sage-600">Free</span>
              </div>
              <div className="flex justify-between text-terra-600">
                <span>Tax</span>
                <span>${(cartTotal * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-terra-100 pt-2 mt-2 flex justify-between font-bold text-terra-800 text-lg">
                <span>Total</span>
                <span>${(cartTotal * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
