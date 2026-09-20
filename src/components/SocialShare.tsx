import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Facebook, Twitter, Instagram, Link as LinkIcon, Copy, Check } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface SocialShareProps {
  productName: string;
  productUrl?: string;
  productImage?: string;
}

export default function SocialShare({ productName, productUrl, productImage }: SocialShareProps) {
  const { showToast } = useToast();
  const [copied, setCopied] = React.useState(false);

  const url = productUrl || window.location.href;
  const text = `Check out ${productName} on Terra & Table!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    showToast('success', 'Link copied to clipboard!');
    setTimeout(() => setCopied(false), 2000);
  };

  const shareToFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`;
    window.open(facebookUrl, '_blank', 'width=600,height=400');
  };

  const shareToTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const shareToPinterest = () => {
    const pinterestUrl = `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&media=${encodeURIComponent(productImage || '')}&description=${encodeURIComponent(text)}`;
    window.open(pinterestUrl, '_blank', 'width=600,height=400');
  };

  const shareToWhatsApp = () => {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
          <Share2 className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Share This Product
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            Share with friends and family
          </p>
        </div>
      </div>

      {/* Social Media Buttons */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareToFacebook}
          className="flex items-center justify-center gap-2 py-3 bg-blue-600 text-white rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition-colors"
        >
          <Facebook className="w-5 h-5" />
          Facebook
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareToTwitter}
          className="flex items-center justify-center gap-2 py-3 bg-sky-500 text-white rounded-xl font-semibold shadow-lg hover:bg-sky-600 transition-colors"
        >
          <Twitter className="w-5 h-5" />
          Twitter
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareToPinterest}
          className="flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl font-semibold shadow-lg hover:bg-red-700 transition-colors"
        >
          <Instagram className="w-5 h-5" />
          Pinterest
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={shareToWhatsApp}
          className="flex items-center justify-center gap-2 py-3 bg-emerald-500 text-white rounded-xl font-semibold shadow-lg hover:bg-emerald-600 transition-colors"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
          WhatsApp
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleCopyLink}
          className={`flex items-center justify-center gap-2 py-3 rounded-xl font-semibold shadow-lg transition-all ${
            copied
              ? 'bg-emerald-500 text-white'
              : 'bg-stone-600 text-white hover:bg-stone-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-5 h-5" />
              Copied!
            </>
          ) : (
            <>
              <LinkIcon className="w-5 h-5" />
              Copy Link
            </>
          )}
        </motion.button>
      </div>

      {/* Share Preview */}
      <div className="p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
        <p className="text-xs text-stone-500 dark:text-stone-400 mb-2">Share Preview:</p>
        <div className="flex items-start gap-3">
          {productImage && (
            <img
              src={productImage}
              alt={productName}
              className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
            />
          )}
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-stone-900 dark:text-stone-100 text-sm truncate">
              {productName}
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
              {url}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
