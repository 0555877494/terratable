import React from 'react';
import { Languages } from 'lucide-react';
import { useI18n, Language } from '../contexts/I18nContext';

export default function LanguageSwitcher() {
  const { language, setLanguage } = useI18n();

  const languages: { code: Language; name: string; flag: string }[] = [
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Español', flag: '🇪🇸' },
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'zh', name: '中文', flag: '🇨🇳' },
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
  ];

  return (
    <div className="flex items-center gap-2">
      <Languages className="w-4 h-4 text-stone-500 dark:text-stone-400" />
      <select
        value={language}
        onChange={(e) => setLanguage(e.target.value as Language)}
        className="px-3 py-1.5 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-800 text-sm font-medium text-stone-700 dark:text-stone-300 focus:border-amber-400 outline-none cursor-pointer"
      >
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.flag} {lang.name}
          </option>
        ))}
      </select>
    </div>
  );
}
