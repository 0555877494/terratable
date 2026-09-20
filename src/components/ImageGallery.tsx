import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut } from 'lucide-react';

interface Props {
  images: string[];
  productName: string;
  onClose: () => void;
}

export default function ImageGallery({ images, productName, onClose }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={e => e.stopPropagation()}
        className="relative max-w-5xl w-full"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 p-2 text-white hover:bg-white/10 rounded-full transition-colors"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Main Image */}
        <div className="relative bg-white dark:bg-stone-800 rounded-2xl overflow-hidden">
          <motion.img
            key={currentIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentIndex]}
            alt={`${productName} - Image ${currentIndex + 1}`}
            className={`w-full h-[60vh] object-contain cursor-zoom-in transition-transform ${
              isZoomed ? 'scale-150' : 'scale-100'
            }`}
            onClick={() => setIsZoomed(!isZoomed)}
          />

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
              >
                <ChevronLeft className="w-6 h-6 text-stone-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
              >
                <ChevronRight className="w-6 h-6 text-stone-800" />
              </button>
            </>
          )}

          {/* Image Counter */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/70 text-white rounded-full text-sm font-semibold">
            {currentIndex + 1} / {images.length}
          </div>

          {/* Zoom Controls */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={() => setIsZoomed(!isZoomed)}
              className="p-2 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all"
            >
              {isZoomed ? <ZoomOut className="w-5 h-5 text-stone-800" /> : <ZoomIn className="w-5 h-5 text-stone-800" />}
            </button>
          </div>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-4 justify-center overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex
                    ? 'border-amber-500 shadow-lg'
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
