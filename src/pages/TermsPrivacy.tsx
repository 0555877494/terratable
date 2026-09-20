import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Shield, FileText, Mail, Calendar } from 'lucide-react';

export default function TermsPrivacy() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded-full text-sm font-semibold mb-4">
          <Shield className="w-4 h-4" />
          Legal Information
        </div>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-4">
          Terms & <span className="gradient-text">Privacy</span>
        </h1>
        <p className="text-stone-600 dark:text-stone-400 text-lg">
          Last updated: January 2024
        </p>
      </motion.div>

      <div className="space-y-12">
        {/* Terms of Service */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 gradient-bg rounded-xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Terms of Service
            </h2>
          </div>

          <div className="space-y-6 text-stone-600 dark:text-stone-400 leading-relaxed">
            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">1. Acceptance of Terms</h3>
              <p>
                By accessing and using Terra & Table, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by these terms, please do not use this service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">2. Use License</h3>
              <p>
                Permission is granted to temporarily access the materials on Terra & Table for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">3. Product Descriptions</h3>
              <p>
                We attempt to be as accurate as possible. However, we do not warrant that product descriptions or other content are accurate, complete, reliable, current, or error-free. All products are subject to availability.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">4. Pricing</h3>
              <p>
                All prices are listed in USD unless otherwise specified. We reserve the right to change prices at any time without prior notice. Promotional prices and discounts are valid for limited periods only.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">5. Orders and Payment</h3>
              <p>
                All orders are subject to acceptance and availability. We accept various payment methods including credit cards, Mobile Money, PayPal, and Apple Pay. Payment must be received before orders are processed.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">6. Shipping and Delivery</h3>
              <p>
                Delivery times are estimates and cannot be guaranteed. We are not responsible for delays caused by customs, weather, or other factors beyond our control. Risk of loss and title for items pass to you upon delivery.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">7. Returns and Refunds</h3>
              <p>
                We offer a 30-day return policy for unopened items in original packaging. Perishable items must be reported within 24 hours. Refunds are processed within 5-7 business days of receiving returned items.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Privacy Policy */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-8"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <h2 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
              Privacy Policy
            </h2>
          </div>

          <div className="space-y-6 text-stone-600 dark:text-stone-400 leading-relaxed">
            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">1. Information We Collect</h3>
              <p>
                We collect information you provide directly to us, including your name, email address, shipping address, phone number, and payment information. We also automatically collect certain information about your device and usage of our service.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">2. How We Use Your Information</h3>
              <p>
                We use the information we collect to process transactions, send periodic emails regarding your order, improve our services, and personalize your experience. We never sell your personal information to third parties.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">3. Data Security</h3>
              <p>
                We implement a variety of security measures to maintain the safety of your personal information. All sensitive information is transmitted via Secure Socket Layer (SSL) technology and encrypted in our databases.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">4. Cookies</h3>
              <p>
                We use cookies to understand and save your preferences for future visits, keep track of advertisements, and compile aggregate data about site traffic and site interaction. You can choose to disable cookies through your browser settings.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">5. Third-Party Services</h3>
              <p>
                We may employ third-party companies to facilitate our service, provide service on our behalf, or assist us in analyzing how our service is used. These third parties have access to your personal information only to perform these tasks on our behalf.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">6. Your Rights</h3>
              <p>
                You have the right to access, update, or delete your personal information at any time. You can do this through your account settings or by contacting our support team. You may also opt out of marketing communications at any time.
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-stone-800 dark:text-stone-200 text-lg mb-2">7. Children's Privacy</h3>
              <p>
                Our service does not address anyone under the age of 13. We do not knowingly collect personally identifiable information from children under 13. If we discover that a child under 13 has provided us with personal information, we will delete it immediately.
              </p>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-3xl p-10 text-white text-center relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          
          <div className="relative z-10">
            <Mail className="w-12 h-12 mx-auto mb-4" />
            <h2 className="font-serif text-3xl font-bold mb-4">
              Questions About Our Policies?
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              If you have any questions about our Terms of Service or Privacy Policy, please contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="px-8 py-3 bg-white text-amber-600 rounded-xl font-bold shadow-xl hover:shadow-2xl transition-all"
              >
                Contact Us
              </Link>
              <a
                href="mailto:legal@terraandtable.com"
                className="px-8 py-3 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-xl font-bold hover:bg-white/30 transition-all"
              >
                legal@terraandtable.com
              </a>
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
