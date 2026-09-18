import React from 'react';
import { motion } from 'framer-motion';
import { Share2, Facebook, Twitter, Instagram, Link as LinkIcon, Check } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface Props {
  productName: string;
  productUrl?: string;
}

export default function SocialShare({ productName, productUrl }: Props) {
  const { showToast } = useToast();
  const url = productUrl || window.location.href;
  const text = `Check out ${productName} on Terra & Table!`;

  const shareLinks = [
    {
      name: 'Facebook',
      icon: <Facebook className="w-5 h-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      name: 'Twitter',
      icon: <Twitter className="w-5 h-5" />,
      url: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
      color: 'bg-sky-500 hover:bg-sky-600'
    },
    {
      name: 'Pinterest',
      icon: <Instagram className="w-5 h-5" />,
      url: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(text)}`,
      color: 'bg-red-600 hover:bg-red-700'
    }
  ];

  const copyLink = () => {
    navigator.clipboard.writeText(url);
    showToast('success', 'Link copied to clipboard!');
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold text-stone-600 dark:text-stone-400 mr-2">Share:</span>
      {shareLinks.map(share => (
        <motion.a
          key={share.name}
          href={share.url}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={`w-10 h-10 rounded-full ${share.color} text-white flex items-center justify-center shadow-md hover:shadow-lg transition-all`}
          title={`Share on ${share.name}`}
        >
          {share.icon}
        </motion.a>
      ))}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={copyLink}
        className="w-10 h-10 rounded-full bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 flex items-center justify-center shadow-md hover:shadow-lg transition-all"
        title="Copy link"
      >
        <LinkIcon className="w-5 h-5" />
      </motion.button>
    </div>
  );
}
