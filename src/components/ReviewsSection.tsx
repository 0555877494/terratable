import React from 'react';
import { motion } from 'framer-motion';
import { Star, ThumbsUp } from 'lucide-react';
import { Review } from '../types';

interface Props {
  reviews: Review[];
  onAddReview?: () => void;
}

export default function ReviewsSection({ reviews, onAddReview }: Props) {
  const averageRating = reviews.length > 0
    ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(stars => ({
    stars,
    count: reviews.filter(r => r.rating === stars).length,
    percentage: reviews.length > 0 ? (reviews.filter(r => r.rating === stars).length / reviews.length) * 100 : 0
  }));

  return (
    <div className="mt-8 pt-8 border-t border-stone-200">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-2xl font-bold text-stone-900">Customer Reviews</h3>
        {onAddReview && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onAddReview}
            className="px-5 py-2.5 gradient-bg text-white rounded-full text-sm font-bold shadow-lg shadow-amber-500/30"
          >
            Write a Review
          </motion.button>
        )}
      </div>

      {/* Rating Summary */}
      <div className="grid md:grid-cols-2 gap-8 mb-8 p-6 bg-amber-50 rounded-2xl">
        <div className="text-center">
          <div className="text-5xl font-bold gradient-text mb-2">{averageRating.toFixed(1)}</div>
          <div className="flex justify-center gap-1 mb-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${i < Math.round(averageRating) ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`}
              />
            ))}
          </div>
          <p className="text-sm text-stone-600">Based on {reviews.length} reviews</p>
        </div>

        <div className="space-y-2">
          {ratingDistribution.map(({ stars, count, percentage }) => (
            <div key={stars} className="flex items-center gap-3">
              <span className="text-sm font-semibold text-stone-700 w-8">{stars}★</span>
              <div className="flex-1 h-2 bg-stone-200 rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${percentage}%` }}
                  transition={{ duration: 0.5, delay: 0.1 * (5 - stars) }}
                  className="h-full gradient-bg rounded-full"
                />
              </div>
              <span className="text-sm text-stone-500 w-8">{count}</span>
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
            className="p-5 bg-white rounded-2xl border-2 border-stone-100 hover:border-amber-200 transition-colors"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-8 h-8 gradient-bg rounded-full flex items-center justify-center">
                    <span className="text-white text-xs font-bold">{review.userName[0]}</span>
                  </div>
                  <span className="font-bold text-stone-800">{review.userName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-3.5 h-3.5 ${i < review.rating ? 'fill-amber-400 text-amber-400' : 'fill-stone-200 text-stone-200'}`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-stone-400">{new Date(review.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-stone-500">
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>{review.helpful}</span>
              </div>
            </div>
            <p className="text-stone-600 leading-relaxed">{review.comment}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
