import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

export default function Contact() {
  const { showToast } = useToast();
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('success', 'Message sent! We\'ll get back to you within 24 hours.');
    setForm({ name: '', email: '', subject: '', message: '' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-br from-sage-50 via-cream-100 to-terra-50 py-20">
        <div className="absolute inset-0">
          <div className="absolute top-20 right-20 w-72 h-72 bg-sage-200/30 rounded-full blur-[80px]" />
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-terra-200/30 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-terra-900 mb-4">
              Get in <span className="text-terra-600">Touch</span>
            </h1>
            <p className="text-lg text-terra-600 max-w-xl mx-auto">
              Have a question, feedback, or just want to say hello? We'd love to hear from you.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {[
              { icon: <Mail className="w-5 h-5" />, title: 'Email', value: 'hello@terraandtable.com', sub: 'We reply within 24 hours' },
              { icon: <Phone className="w-5 h-5" />, title: 'Phone', value: '+1 (555) 123-4567', sub: 'Mon–Fri, 9am–6pm PST' },
              { icon: <MapPin className="w-5 h-5" />, title: 'Address', value: '100 Market Street', sub: 'San Francisco, CA 94105' },
              { icon: <Clock className="w-5 h-5" />, title: 'Hours', value: 'Mon–Fri: 9am–6pm', sub: 'Sat: 10am–4pm PST' },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-terra-100/50 shadow-sm"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-terra-100 to-cream-100 rounded-xl flex items-center justify-center text-terra-600 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-xs text-terra-400 uppercase tracking-wider font-medium">{item.title}</p>
                  <p className="font-semibold text-terra-800">{item.value}</p>
                  <p className="text-sm text-terra-500">{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white rounded-2xl border border-terra-100/50 p-6 sm:p-8 shadow-sm"
          >
            <h2 className="font-serif text-2xl font-bold text-terra-800 mb-6">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold text-terra-700 mb-1.5">Name</label>
                  <input
                    type="text"
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none bg-cream-50/50"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-terra-700 mb-1.5">Email</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    required
                    className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none bg-cream-50/50"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-terra-700 mb-1.5">Subject</label>
                <input
                  type="text"
                  value={form.subject}
                  onChange={e => setForm({ ...form, subject: e.target.value })}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none bg-cream-50/50"
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-terra-700 mb-1.5">Message</label>
                <textarea
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-terra-100 focus:border-terra-300 focus:ring-4 focus:ring-terra-50 outline-none resize-none bg-cream-50/50"
                  placeholder="Tell us more..."
                />
              </div>
              <motion.button
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-terra-600 to-wine-600 text-white rounded-xl font-semibold shadow-lg shadow-terra-500/20 hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" /> Send Message
              </motion.button>
            </form>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
