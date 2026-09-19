import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, Home, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-cream-50 dark:bg-stone-900 flex items-center justify-center px-4 py-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md w-full text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', delay: 0.2 }}
              className="w-20 h-20 mx-auto mb-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center"
            >
              <AlertCircle className="w-10 h-10 text-red-600 dark:text-red-400" />
            </motion.div>

            <h1 className="font-serif text-3xl font-bold text-stone-900 dark:text-stone-100 mb-3">
              Oops! Something went wrong
            </h1>
            
            <p className="text-stone-600 dark:text-stone-400 mb-2">
              We're sorry, but something unexpected happened.
            </p>
            
            {this.state.error && (
              <details className="mb-6 text-left">
                <summary className="cursor-pointer text-sm text-stone-500 dark:text-stone-500 hover:text-stone-700 dark:hover:text-stone-300 mb-2">
                  Error Details
                </summary>
                <pre className="p-4 bg-stone-100 dark:bg-stone-800 rounded-lg text-xs overflow-x-auto text-stone-700 dark:text-stone-300">
                  {this.state.error.message}
                </pre>
              </details>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={this.handleReset}
                className="px-6 py-3 gradient-bg text-white rounded-xl font-bold shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-5 h-5" />
                Try Again
              </motion.button>
              
              <Link
                to="/"
                className="px-6 py-3 border-2 border-stone-200 dark:border-stone-700 text-stone-700 dark:text-stone-300 rounded-xl font-bold hover:bg-stone-50 dark:hover:bg-stone-800 transition-colors flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                Go Home
              </Link>
            </div>

            <p className="mt-8 text-sm text-stone-500 dark:text-stone-500">
              If the problem persists, please{' '}
              <Link to="/contact" className="text-amber-600 dark:text-amber-400 hover:underline">
                contact support
              </Link>
            </p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
