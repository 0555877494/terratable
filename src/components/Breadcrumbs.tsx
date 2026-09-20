import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight } from 'lucide-react';

export default function Breadcrumbs() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter(x => x);

  if (pathnames.length === 0) return null;

  const breadcrumbMap: Record<string, string> = {
    'cart': 'Cart',
    'wishlist': 'Wishlist',
    'gift-cards': 'Gift Cards',
    'subscriptions': 'Subscriptions',
    'order-tracking': 'Order Tracking',
    'referral': 'Referral Program',
    'blog': 'Blog',
    'addresses': 'Address Book',
    'loyalty': 'Loyalty Program',
    'bundles': 'Product Bundles',
    'my-account': 'My Account',
    'faq': 'FAQ',
    'track-order': 'Track Order',
    'terms': 'Terms & Privacy',
    'about': 'About',
    'contact': 'Contact',
    'customer': 'Customer Dashboard',
    'delivery': 'Delivery Dashboard',
    'admin': 'Admin Dashboard',
  };

  return (
    <nav className="max-w-7xl mx-auto px-4 py-3 print:hidden">
      <ol className="flex items-center gap-2 text-sm">
        <li>
          <Link to="/" className="flex items-center gap-1 text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
            <Home className="w-4 h-4" />
            <span>Home</span>
          </Link>
        </li>
        {pathnames.map((pathname, index) => {
          const href = '/' + pathnames.slice(0, index + 1).join('/');
          const isLast = index === pathnames.length - 1;
          const label = breadcrumbMap[pathname] || pathname.charAt(0).toUpperCase() + pathname.slice(1);

          return (
            <li key={href} className="flex items-center gap-2">
              <ChevronRight className="w-4 h-4 text-stone-400" />
              {isLast ? (
                <span className="font-semibold text-stone-900 dark:text-stone-100">{label}</span>
              ) : (
                <Link to={href} className="text-stone-600 dark:text-stone-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors">
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
