import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Camera, Upload, X, Star } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface ReviewWithPhotosProps {
  productId: string;
  onSubmit: (review: { rating: number; comment: string; photos: string[] }) => void;
}

export default function ReviewWithPhotos({ productId, onSubmit }: ReviewWithPhotosProps) {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);
  const [hoverRating, setHoverRating] = useState(0);
  const { showToast } = useToast();

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotos(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removePhoto = (index: number) => {
    setPhotos(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0) {
      showToast('error', 'Please select a rating');
      return;
    }
    if (!comment.trim()) {
      showToast('error', 'Please write a comment');
      return;
    }
    onSubmit({ rating, comment, photos });
    showToast('success', 'Review submitted successfully!');
    setRating(0);
    setComment('');
    setPhotos([]);
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6"
    >
      <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-stone-100 mb-5">
        Write a Review
      </h3>

      {/* Star Rating */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
          Your Rating
        </label>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map(star => (
            <motion.button
              key={star}
              type="button"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
              onClick={() => setRating(star)}
              className="transition-transform"
            >
              <Star
                className={`w-10 h-10 ${
                  star <= (hoverRating || rating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-stone-200 text-stone-200'
                }`}
              />
            </motion.button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
          Your Review
        </label>
        <textarea
          value={comment}
          onChange={e => setComment(e.target.value)}
          placeholder="Share your experience with this product..."
          rows={4}
          className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
        />
      </div>

      {/* Photo Upload */}
      <div className="mb-5">
        <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
          Add Photos (Optional)
        </label>
        <div className="flex flex-wrap gap-3">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative w-20 h-20 rounded-xl overflow-hidden"
            >
              <img src={photo} alt={`Review photo ${index + 1}`} className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => removePhoto(index)}
                className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </motion.div>
          ))}
          <label className="w-20 h-20 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
            <Camera className="w-6 h-6 text-stone-400 mb-1" />
            <span className="text-xs text-stone-500">Upload</span>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <motion.button
        type="submit"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full py-3 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all"
      >
        Submit Review
      </motion.button>
    </motion.form>
  );
}
