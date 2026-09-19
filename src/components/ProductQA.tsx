import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, ThumbsUp, Send, HelpCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

interface Question {
  id: string;
  productId: string;
  userId: string;
  userName: string;
  question: string;
  date: string;
  answers: Array<{
    id: string;
    userId: string;
    userName: string;
    answer: string;
    date: string;
    helpful: number;
  }>;
}

interface ProductQAProps {
  productId: string;
  productName: string;
}

export default function ProductQA({ productId, productName }: ProductQAProps) {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: '1',
      productId,
      userId: 'u1',
      userName: 'Sarah M.',
      question: 'Is this product organic?',
      date: '2024-01-15',
      answers: [
        {
          id: 'a1',
          userId: 'seller',
          userName: 'Terra & Table',
          answer: 'Yes! This product is 100% organic and certified.',
          date: '2024-01-16',
          helpful: 12
        }
      ]
    },
    {
      id: '2',
      productId,
      userId: 'u2',
      userName: 'James K.',
      question: 'How long does this last once opened?',
      date: '2024-01-10',
      answers: [
        {
          id: 'a2',
          userId: 'u3',
          userName: 'Maria L.',
          answer: 'I kept mine for about 6 months in the fridge and it was still great!',
          date: '2024-01-11',
          helpful: 8
        }
      ]
    }
  ]);
  const [newQuestion, setNewQuestion] = useState('');
  const [answerText, setAnswerText] = useState<Record<string, string>>({});

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) {
      showToast('error', 'Please enter your question');
      return;
    }
    if (!user) {
      showToast('error', 'Please login to ask a question');
      return;
    }

    const question: Question = {
      id: Date.now().toString(),
      productId,
      userId: user.id,
      userName: user.name,
      question: newQuestion,
      date: new Date().toISOString().split('T')[0],
      answers: []
    };

    setQuestions([question, ...questions]);
    setNewQuestion('');
    showToast('success', 'Question submitted! We\'ll notify you when it\'s answered.');
  };

  const handleAnswer = (questionId: string) => {
    const answer = answerText[questionId];
    if (!answer?.trim()) {
      showToast('error', 'Please enter your answer');
      return;
    }
    if (!user) {
      showToast('error', 'Please login to answer');
      return;
    }

    const newAnswer = {
      id: Date.now().toString(),
      userId: user.id,
      userName: user.name,
      answer,
      date: new Date().toISOString().split('T')[0],
      helpful: 0
    };

    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, answers: [...q.answers, newAnswer] }
        : q
    ));

    setAnswerText({ ...answerText, [questionId]: '' });
    showToast('success', 'Answer posted!');
  };

  const handleHelpful = (questionId: string, answerId: string) => {
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { 
            ...q, 
            answers: q.answers.map(a => 
              a.id === answerId ? { ...a, helpful: a.helpful + 1 } : a
            )
          }
        : q
    ));
    showToast('success', 'Thanks for your feedback!');
  };

  return (
    <div className="bg-white dark:bg-stone-800 rounded-2xl border-2 border-stone-200 dark:border-stone-700 p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center">
          <HelpCircle className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="font-bold text-stone-900 dark:text-stone-100 text-lg">
            Questions & Answers
          </h3>
          <p className="text-sm text-stone-500 dark:text-stone-400">
            {questions.length} questions about this product
          </p>
        </div>
      </div>

      {/* Ask Question Form */}
      <form onSubmit={handleSubmitQuestion} className="mb-6 p-4 bg-stone-50 dark:bg-stone-700/50 rounded-xl">
        <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
          Ask a Question
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={newQuestion}
            onChange={e => setNewQuestion(e.target.value)}
            placeholder="Type your question here..."
            className="flex-1 px-4 py-2.5 rounded-lg border-2 border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none"
          />
          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-6 py-2.5 gradient-bg text-white rounded-lg font-semibold shadow-lg flex items-center gap-2"
          >
            <Send className="w-4 h-4" />
            Ask
          </motion.button>
        </div>
      </form>

      {/* Questions List */}
      <div className="space-y-6">
        {questions.map((q, qIndex) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: qIndex * 0.1 }}
            className="border-b border-stone-200 dark:border-stone-700 pb-6 last:border-0"
          >
            {/* Question */}
            <div className="flex gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold text-stone-900 dark:text-stone-100">
                    {q.userName}
                  </span>
                  <span className="text-xs text-stone-500 dark:text-stone-400">
                    {new Date(q.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-stone-700 dark:text-stone-300">{q.question}</p>
              </div>
            </div>

            {/* Answers */}
            {q.answers.length > 0 && (
              <div className="ml-13 space-y-3">
                {q.answers.map((a, aIndex) => (
                  <motion.div
                    key={a.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: aIndex * 0.1 }}
                    className="flex gap-3 p-3 bg-stone-50 dark:bg-stone-700/30 rounded-lg"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <span className="text-white text-xs font-bold">
                        {a.userName[0]}
                      </span>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-sm text-stone-900 dark:text-stone-100">
                          {a.userName}
                        </span>
                        {a.userId === 'seller' && (
                          <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-300 text-xs font-semibold rounded-full">
                            Seller
                          </span>
                        )}
                        <span className="text-xs text-stone-500 dark:text-stone-400">
                          {new Date(a.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm text-stone-700 dark:text-stone-300 mb-2">
                        {a.answer}
                      </p>
                      <button
                        onClick={() => handleHelpful(q.id, a.id)}
                        className="flex items-center gap-1 text-xs text-stone-500 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors"
                      >
                        <ThumbsUp className="w-3 h-3" />
                        Helpful ({a.helpful})
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Answer Form */}
            <div className="ml-13 mt-3">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={answerText[q.id] || ''}
                  onChange={e => setAnswerText({ ...answerText, [q.id]: e.target.value })}
                  placeholder="Write your answer..."
                  className="flex-1 px-3 py-2 rounded-lg border-2 border-stone-200 dark:border-stone-600 bg-white dark:bg-stone-800 text-stone-800 dark:text-stone-200 focus:border-amber-400 outline-none text-sm"
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(q.id)}
                  className="px-4 py-2 bg-stone-200 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg font-semibold text-sm hover:bg-stone-300 dark:hover:bg-stone-600 transition-colors"
                >
                  Answer
                </motion.button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
