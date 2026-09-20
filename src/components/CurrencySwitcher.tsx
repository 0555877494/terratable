import React from 'react';
import { Globe, DollarSign, Euro, PoundSterling, Circle } from 'lucide-react';
import { useI18n, Currency } from '../contexts/I18nContext';

export default function CurrencySwitcher() {
  const { currency, setCurrency } = useI18n();

  const currencies: { code: Currency; symbol: string; icon: React.ReactNode; name: string }[] = [
    { code: 'USD', symbol: '$', icon: <DollarSign className="w-4 h-4" />, name: 'US Dollar' },
    { code: 'EUR', symbol: '€', icon: <Euro className="w-4 h-4" />, name: 'Euro' },
    { code: 'GBP', symbol: '£', icon: <PoundSterling className="w-4 h-4" />, name: 'British Pound' },
    { code: 'GHS', symbol: '₵', icon: <Globe className="w-4 h-4" />, name: 'Ghana Cedi' },
    { code: 'JPY', symbol: '¥', icon: <Circle className="w-4 h-4" />, name: 'Japanese Yen' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Globe className="w-4 h-4 text-stone-500 dark:text-stone-400" />
      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value as Currency)}
        className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 focus:border-amber-400 outline-none cursor-pointer"
      >
        {currencies.map((curr) => (
          <option key={curr.code} value={curr.code}>
            {curr.symbol} {curr.code}
          </option>
        ))}
      </select>
    </div>
  );
}
