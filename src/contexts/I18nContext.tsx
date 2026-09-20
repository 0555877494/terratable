import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'en' | 'es' | 'fr' | 'zh' | 'ar';
export type Currency = 'USD' | 'EUR' | 'GBP' | 'GHS' | 'JPY';

interface I18nContextType {
  language: Language;
  currency: Currency;
  setLanguage: (lang: Language) => void;
  setCurrency: (curr: Currency) => void;
  t: (key: string) => string;
  formatPrice: (price: number) => string;
  convertPrice: (price: number) => number;
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.giftcards': 'Gift Cards',
    'nav.subscriptions': 'Subscriptions',
    'nav.recipes': 'Recipes',
    'nav.rewards': 'Rewards',
    'nav.signin': 'Sign In',
    'nav.join': 'Join Free',
    'hero.title1': 'Discover the',
    'hero.title2': 'Extraordinary',
    'hero.subtitle': 'Handpicked delicacies from the world\'s finest producers. Every bite tells a story of tradition, passion, and uncompromising quality.',
    'hero.cta': 'Explore Collection',
    'hero.menu': 'View Menu',
    'product.add': 'Add',
    'product.quickview': 'Quick View',
    'product.price': 'Price',
    'cart.title': 'Shopping Cart',
    'cart.empty': 'Your cart is empty',
    'cart.checkout': 'Proceed to Checkout',
    'cart.total': 'Total',
    'footer.explore': 'Explore',
    'footer.support': 'Support',
    'footer.copyright': '© 2024 Terra & Table. Crafted with love.',
  },
  es: {
    'nav.shop': 'Tienda',
    'nav.about': 'Acerca de',
    'nav.contact': 'Contacto',
    'nav.giftcards': 'Tarjetas Regalo',
    'nav.subscriptions': 'Suscripciones',
    'nav.recipes': 'Recetas',
    'nav.rewards': 'Recompensas',
    'nav.signin': 'Iniciar Sesión',
    'nav.join': 'Únete Gratis',
    'hero.title1': 'Descubre lo',
    'hero.title2': 'Extraordinario',
    'hero.subtitle': 'Delicadezas seleccionadas de los mejores productores del mundo. Cada bocado cuenta una historia de tradición, pasión y calidad.',
    'hero.cta': 'Explorar Colección',
    'hero.menu': 'Ver Menú',
    'product.add': 'Añadir',
    'product.quickview': 'Vista Rápida',
    'product.price': 'Precio',
    'cart.title': 'Carrito de Compras',
    'cart.empty': 'Tu carrito está vacío',
    'cart.checkout': 'Proceder al Pago',
    'cart.total': 'Total',
    'footer.explore': 'Explorar',
    'footer.support': 'Soporte',
    'footer.copyright': '© 2024 Terra & Table. Hecho con amor.',
  },
  fr: {
    'nav.shop': 'Boutique',
    'nav.about': 'À Propos',
    'nav.contact': 'Contact',
    'nav.giftcards': 'Cartes Cadeaux',
    'nav.subscriptions': 'Abonnements',
    'nav.recipes': 'Recettes',
    'nav.rewards': 'Récompenses',
    'nav.signin': 'Se Connecter',
    'nav.join': 'Rejoindre',
    'hero.title1': 'Découvrez l\'',
    'hero.title2': 'Extraordinaire',
    'hero.subtitle': 'Des délices sélectionnés parmi les meilleurs producteurs du monde. Chaque bouchée raconte une histoire de tradition et de passion.',
    'hero.cta': 'Explorer la Collection',
    'hero.menu': 'Voir le Menu',
    'product.add': 'Ajouter',
    'product.quickview': 'Aperçu',
    'product.price': 'Prix',
    'cart.title': 'Panier',
    'cart.empty': 'Votre panier est vide',
    'cart.checkout': 'Passer à la Caisse',
    'cart.total': 'Total',
    'footer.explore': 'Explorer',
    'footer.support': 'Support',
    'footer.copyright': '© 2024 Terra & Table. Fait avec amour.',
  },
  zh: {
    'nav.shop': '商店',
    'nav.about': '关于',
    'nav.contact': '联系',
    'nav.giftcards': '礼品卡',
    'nav.subscriptions': '订阅',
    'nav.recipes': '食谱',
    'nav.rewards': '奖励',
    'nav.signin': '登录',
    'nav.join': '免费注册',
    'hero.title1': '探索',
    'hero.title2': '非凡美味',
    'hero.subtitle': '来自世界顶级生产商的手工精选美食。每一口都讲述着传统、激情和卓越品质的故事。',
    'hero.cta': '探索系列',
    'hero.menu': '查看菜单',
    'product.add': '添加',
    'product.quickview': '快速查看',
    'product.price': '价格',
    'cart.title': '购物车',
    'cart.empty': '您的购物车是空的',
    'cart.checkout': '去结算',
    'cart.total': '总计',
    'footer.explore': '探索',
    'footer.support': '支持',
    'footer.copyright': '© 2024 Terra & Table. 用心制作。',
  },
  ar: {
    'nav.shop': 'متجر',
    'nav.about': 'حول',
    'nav.contact': 'اتصل',
    'nav.giftcards': 'بطاقات الهدايا',
    'nav.subscriptions': 'الاشتراكات',
    'nav.recipes': 'الوصفات',
    'nav.rewards': 'المكافآت',
    'nav.signin': 'تسجيل الدخول',
    'nav.join': 'انضم مجاناً',
    'hero.title1': 'اكتشف',
    'hero.title2': 'الاستثنائي',
    'hero.subtitle': 'مأكولات مختارة بعناية من أفضل المنتجين في العالم. كل قضمة تحكي قصة من التقاليد والشغف والجودة.',
    'hero.cta': 'استكشف المجموعة',
    'hero.menu': 'عرض القائمة',
    'product.add': 'أضف',
    'product.quickview': 'عرض سريع',
    'product.price': 'السعر',
    'cart.title': 'سلة التسوق',
    'cart.empty': 'سلتك فارغة',
    'cart.checkout': 'المتابعة للدفع',
    'cart.total': 'المجموع',
    'footer.explore': 'استكشف',
    'footer.support': 'الدعم',
    'footer.copyright': '© 2024 Terra & Table. صنع بحب.',
  }
};

const currencyRates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  GHS: 15.5,
  JPY: 149.5
};

const currencySymbols: Record<Currency, string> = {
  USD: '$',
  EUR: '€',
  GBP: '£',
  GHS: '₵',
  JPY: '¥'
};

const languageNames: Record<Language, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  zh: '中文',
  ar: 'العربية'
};

const currencyNames: Record<Currency, string> = {
  USD: 'US Dollar',
  EUR: 'Euro',
  GBP: 'British Pound',
  GHS: 'Ghana Cedi',
  JPY: 'Japanese Yen'
};

const I18nContext = createContext<I18nContextType | undefined>(undefined);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('terra_language');
    return (saved as Language) || 'en';
  });

  const [currency, setCurrency] = useState<Currency>(() => {
    const saved = localStorage.getItem('terra_currency');
    return (saved as Currency) || 'USD';
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('terra_language', lang);
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  };

  const handleSetCurrency = (curr: Currency) => {
    setCurrency(curr);
    localStorage.setItem('terra_currency', curr);
  };

  const t = (key: string): string => {
    return translations[language]?.[key] || translations.en[key] || key;
  };

  const convertPrice = (price: number): number => {
    return price * currencyRates[currency];
  };

  const formatPrice = (price: number): string => {
    const converted = convertPrice(price);
    const symbol = currencySymbols[currency];
    
    if (currency === 'JPY') {
      return `${symbol}${Math.round(converted).toLocaleString()}`;
    }
    return `${symbol}${converted.toFixed(2)}`;
  };

  return (
    <I18nContext.Provider value={{
      language,
      currency,
      setLanguage: handleSetLanguage,
      setCurrency: handleSetCurrency,
      t,
      formatPrice,
      convertPrice
    }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) throw new Error('useI18n must be used within I18nProvider');
  return context;
}

export { languageNames, currencyNames, currencySymbols };
