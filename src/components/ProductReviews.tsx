import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp, MessageCircle, Send } from 'lucide-react';
import { useToast } from '../contexts/ToastContext';

interface Review {
  id: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

interface Props {
  productId: string;
  productName: string;
}

export default function ProductReviews({ productId, productName }: Props) {
  const { showToast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([
    {
      id: '1',
      userName: 'Sarah M.',
      rating: 5,
      comment: 'Absolutely amazing quality! The flavor is incredible and you can tell it\'s made with care. Will definitely order again.',
      date: '2024-01-15',
      helpful: 24
    },
    {
      id: '2',
      userName: 'James K.',
      rating: 4,
      comment: 'Great product, very fresh and well-packaged. Shipping was fast too. Only giving 4 stars because I wish it was a bit larger.',
      date: '2024-01-12',
      helpful: 18
    },
    {
      id: '3',
      userName: 'Maria L.',
      rating: 5,
      comment: 'This is hands down the best I\'ve ever had. You can taste the difference in quality. Highly recommend!',
      date: '2024-01-10',
      helpful: 32
    }
  ]);

  const [newReview, setNewReview] = useState({
    rating: 5,
    comment: '',
    userName: ''
  });

  const [showReviewForm, setShowReviewForm] = useState(false);

  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 : 0
  }));

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newReview.userName || !newReview.comment) {
      showToast('error', 'Please fill in all fields');
      return;
    }

    const review: Review = {
      id: Date.now().toString(),
      userName: newReview.userName,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setReviews([review, ...reviews]);
    setNewReview({ rating: 5, comment: '', userName: '' });
    setShowReviewForm(false);
    showToast('success', 'Review submitted successfully!');
  };

  const handleHelpful = (reviewId: string) => {
    setReviews(reviews.map(r => 
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ));
    showToast('success', 'Thanks for your feedback!');
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-bold text-stone-900 dark:text-stone-100">
          Customer Reviews
        </h3>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowReviewForm(!showReviewForm)}
          className="px-5 py-2.5 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-2"
        >
          <MessageCircle className="w-4 h-4" />
          Write a Review
        </motion.button>
      </div>

      {/* Review Form */}
      {showReviewForm && (
        <motion.form
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          onSubmit={handleSubmitReview}
          className="mb-6 p-5 bg-stone-50 dark:bg-stone-700/50 rounded-xl space-y-4"
        >
          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Your Name
            </label>
            <input
              type="text"
              value={newReview.userName}
              onChange={e => setNewReview({ ...newReview, userName: e.target.value })}
              placeholder="Enter your name"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setNewReview({ ...newReview, rating: star })}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-8 h-8 ${
                      star <= newReview.rating
                        ? 'fill-amber-400 text-amber-400'
                        : 'fill-stone-200 text-stone-200'
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
              Your Review
            </label>
            <textarea
              value={newReview.comment}
              onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
              placeholder="Share your experience with this product..."
              rows={4}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none resize-none"
            />
          </div>

          <div className="flex gap-3">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-6 py-2.5 gradient-bg text-white rounded-xl font-bold shadow-lg flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              Submit Review
            </motion.button>
            <button
              type="button"
              onClick={() => setShowReviewForm(false)}
              className="px-6 py-2.5 border-2 border-stone-200 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </motion.form>
      )}

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-6 mb-8 pb-8 border-b-2 border-stone-200 dark:border-stone-700">
        <div className="text-center">
          <div className="text-5xl font-bold gradient-text mb-2">
            {averageRating.toFixed(1)}
          </div>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${
                  i < Math.round(averageRating)
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-stone-200 text-stone-200'
                }`}
              />
            ))}
          </div>
          <p className="text-sm text-stone-600 dark:text-stone-400">
            Based on {reviews.length} reviews
          </p>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-semibold text-stone-700 dark:text-stone-300 w-8">
                {stars}★
              </span>
              <div className="flex-1 h-2 bg-stone-200 dark:bg-stone-700 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: 0.1 * (5 - stars) }}
                  className="h-full gradient-bg rounded-full"
                />
              </div>
              <span className="text-sm text-stone-500 dark:text-stone-400 w-8">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-6">
        {reviews.map((review, index) => (
          <motion.div
            key={review.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-5 bg-stone-50 dark:bg-stone-700/50 rounded-xl"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-10 h-10 gradient-bg rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">{review.userName[0]}</span>
                  </div>
                  <div>
                    <p className="font-bold text-stone-900 dark:text-stone-100">
                      {review.userName}
                    </p>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      {new Date(review.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
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
              </div>
            </div>

            <p className="text-stone-700 dark:text-stone-300 mb-4 leading-relaxed">
              {review.comment}
            </p>

            <button
              onClick={() => handleHelpful(review.id)}
              className="flex items-center gap-2 text-sm text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
            >
              <ThumbsUp className="w-4 h-4" />
              Helpful ({review.helpful})
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
