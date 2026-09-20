import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, Upload, X, ThumbsUp, Camera, Send } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface ProductReviewsProps {
  productId: string;
  productName?: string;
}

export default function ProductReviews({ productId, productName }: ProductReviewsProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    images: [] as string[]
  });
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    loadReviews();
  }, [productId]);

  const loadReviews = async () => {
    try {
      const { data, error } = await supabase
        .from('reviews')
        .select(`
          *,
          profiles:user_id (full_name, avatar_url)
        `)
        .eq('product_id', productId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error('Error loading reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    try {
      const uploadedUrls: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${productId}/${Date.now()}_${i}.${fileExt}`;
        
        const { data, error } = await supabase.storage
          .from('reviews')
          .upload(fileName, file);

        if (error) throw error;

        const { data: { publicUrl } } = supabase.storage
          .from('reviews')
          .getPublicUrl(fileName);

        uploadedUrls.push(publicUrl);
      }

      setNewReview({ ...newReview, images: [...newReview.images, ...uploadedUrls] });
      showToast('success', 'Images uploaded successfully');
    } catch (error) {
      console.error('Error uploading images:', error);
      showToast('error', 'Failed to upload images');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      showToast('error', 'Please login to submit a review');
      return;
    }

    if (!newReview.comment.trim()) {
      showToast('error', 'Please write a comment');
      return;
    }

    try {
      const { error } = await supabase
        .from('reviews')
        .insert({
          product_id: productId,
          user_id: user.id,
          rating: newReview.rating,
          comment: newReview.comment,
          images: newReview.images
        });

      if (error) throw error;

      // Update product rating
      const { data: allReviews } = await supabase
        .from('reviews')
        .select('rating')
        .eq('product_id', productId);

      if (allReviews) {
        const avgRating = allReviews.reduce((sum, r) => sum + r.rating, 0) / allReviews.length;
        await supabase
          .from('products')
          .update({ 
            rating: avgRating,
            reviews_count: allReviews.length 
          })
          .eq('id', productId);
      }

      showToast('success', 'Review submitted successfully!');
      setNewReview({ rating: 5, comment: '', images: [] });
      setShowReviewForm(false);
      loadReviews();
    } catch (error) {
      console.error('Error submitting review:', error);
      showToast('error', 'Failed to submit review');
    }
  };

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      const { error } = await supabase
        .from('reviews')
        .update({ helpful_count: supabase.rpc('increment', { row_id: reviewId }) })
        .eq('id', reviewId);

      if (error) throw error;

      loadReviews();
      showToast('success', 'Thanks for your feedback!');
    } catch (error) {
      console.error('Error marking helpful:', error);
    }
  };

  const removeImage = (index: number) => {
    setNewReview({
      ...newReview,
      images: newReview.images.filter((_, i) => i !== index)
    });
  };

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 gradient-bg"></div>
        <p className="mt-4 text-stone-600 dark:text-stone-400">Loading reviews...</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100 mb-2">
            Customer Reviews
          </h3>
          <div className="flex items-center gap-3">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${
                    i < Math.floor(averageRating)
                      ? 'fill-amber-400 text-amber-400'
                      : 'fill-stone-200 text-stone-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-bold text-stone-900 dark:text-stone-100">
              {averageRating.toFixed(1)}
            </span>
            <span className="text-stone-500 dark:text-stone-400">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>
        {user && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
          >
            <Star className="w-5 h-5" />
            Write a Review
          </motion.button>
        )}
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.form
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            onSubmit={handleSubmitReview}
            className="mb-6 p-6 bg-stone-50 dark:bg-stone-700/50 rounded-xl space-y-4"
          >
            {/* Rating */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map(star => (
                  <motion.button
                    key={star}
                    type="button"
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setNewReview({ ...newReview, rating: star })}
                  >
                    <Star
                      className={`w-8 h-8 ${
                        star <= newReview.rating
                          ? 'fill-amber-400 text-amber-400'
                          : 'fill-stone-200 text-stone-200'
                      }`}
                    />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Comment */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Your Review
              </label>
              <textarea
                value={newReview.comment}
                onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                placeholder="Share your experience with this product..."
                rows={4}
                className="w-full px-4 py-3 rounded-xl border-2 border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Add Photos (Optional)
              </label>
              <div className="flex flex-wrap gap-3">
                {newReview.images.map((image, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative w-20 h-20 rounded-xl overflow-hidden"
                  >
                    <img src={image} alt={`Review photo ${index + 1}`} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </motion.div>
                ))}
                <label className="w-20 h-20 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:border-amber-400 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors">
                  {uploading ? (
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 gradient-bg"></div>
                  ) : (
                    <>
                      <Camera className="w-6 h-6 text-stone-400 mb-1" />
                      <span className="text-xs text-stone-500">Upload</span>
                    </>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    disabled={uploading}
                  />
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-3">
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center justify-center gap-2"
              >
                <Send className="w-5 h-5" />
                Submit Review
              </motion.button>
              <button
                type="button"
                onClick={() => setShowReviewForm(false)}
                className="px-6 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="text-center py-12">
          <Star className="w-16 h-16 mx-auto text-stone-300 dark:text-stone-600 mb-4" />
          <p className="text-stone-500 dark:text-stone-400">No reviews yet</p>
          <p className="text-sm text-stone-400 dark:text-stone-500 mt-2">
            Be the first to review this product!
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {reviews.map((review, index) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-5 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
            >
              {/* Review Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center text-white font-bold">
                    {review.profiles?.full_name?.charAt(0).toUpperCase() || 'U'}
                  </div>
                  <div>
                    <p className="font-semibold text-stone-900 dark:text-stone-100">
                      {review.profiles?.full_name || 'Anonymous'}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < review.rating
                                ? 'fill-amber-400 text-amber-400'
                                : 'fill-stone-200 text-stone-200'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-stone-500 dark:text-stone-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Review Comment */}
              <p className="text-stone-700 dark:text-stone-300 mb-3 leading-relaxed">
                {review.comment}
              </p>

              {/* Review Images */}
              {review.images && review.images.length > 0 && (
                <div className="flex gap-2 mb-3 overflow-x-auto pb-2">
                  {review.images.map((image: string, idx: number) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`Review photo ${idx + 1}`}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                  ))}
                </div>
              )}

              {/* Helpful Button */}
              <button
                onClick={() => handleMarkHelpful(review.id)}
                className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
              >
                <ThumbsUp className="w-4 h-4" />
                Helpful ({review.helpful_count || 0})
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
