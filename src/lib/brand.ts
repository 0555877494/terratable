// Brand Identity System for Terra & Table

export const brand = {
  name: 'Terra & Table',
  tagline: 'Premium Artisan Foods',
  description: 'Curating the world\'s finest specialty foods since 2020',
  
  // Brand Colors
  colors: {
    primary: {
      50: '#fef3c7',
      100: '#fde68a',
      200: '#fcd34d',
      300: '#fbbf24',
      400: '#f59e0b',
      500: '#d97706',
      600: '#b45309',
      700: '#92400e',
      800: '#78350f',
      900: '#451a03',
    },
    secondary: {
      50: '#f0fdf4',
      100: '#dcfce7',
      200: '#bbf7d0',
      300: '#86efac',
      400: '#4ade80',
      500: '#22c55e',
      600: '#16a34a',
      700: '#15803d',
      800: '#166534',
      900: '#14532d',
    },
    accent: {
      50: '#fdf2f8',
      100: '#fce7f3',
      200: '#fbcfe8',
      300: '#f9a8d4',
      400: '#f472b6',
      500: '#ec4899',
      600: '#db2777',
      700: '#be185d',
      800: '#9d174d',
      900: '#831843',
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
      700: '#404040',
      800: '#262626',
      900: '#171717',
    }
  },

  // Typography
  typography: {
    fontFamily: {
      heading: '"Playfair Display", serif',
      body: '"Inter", sans-serif',
    },
    fontSize: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
      '6xl': '3.75rem',
    }
  },

  // Spacing
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem',
    '3xl': '4rem',
  },

  // Border Radius
  borderRadius: {
    sm: '0.25rem',
    md: '0.5rem',
    lg: '0.75rem',
    xl: '1rem',
    '2xl': '1.5rem',
    full: '9999px',
  },

  // Shadows
  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  },

  // Logo
  logo: {
    primary: '/logo-primary.svg',
    white: '/logo-white.svg',
    icon: '/logo-icon.svg',
  },

  // Social Media
  social: {
    instagram: 'https://instagram.com/terraandtable',
    facebook: 'https://facebook.com/terraandtable',
    twitter: 'https://twitter.com/terraandtable',
    pinterest: 'https://pinterest.com/terraandtable',
  },

  // Contact
  contact: {
    email: 'hello@terraandtable.com',
    phone: '+1 (555) 123-4567',
    address: '123 Market Street, San Francisco, CA 94105',
  },

  // SEO
  seo: {
    title: 'Terra & Table - Premium Artisan Foods',
    description: 'Discover the world\'s finest specialty foods. Handpicked delicacies from artisan producers worldwide.',
    keywords: 'artisan food, specialty foods, organic, premium, gourmet, marketplace',
    ogImage: '/og-image.jpg',
  }
};

// Brand Guidelines
export const brandGuidelines = {
  logo: {
    minimumSize: '32px',
    clearSpace: '16px',
    donts: [
      'Do not stretch or distort the logo',
      'Do not change the colors',
      'Do not add effects or shadows',
      'Do not place on busy backgrounds',
    ]
  },
  colors: {
    primary: 'Use for main CTAs, headings, and brand elements',
    secondary: 'Use for success states, eco-friendly badges',
    accent: 'Use for highlights, special offers',
    neutral: 'Use for text, backgrounds, borders',
  },
  typography: {
    headings: 'Use Playfair Display for all headings (h1-h6)',
    body: 'Use Inter for all body text and UI elements',
    hierarchy: 'Maintain clear visual hierarchy with font sizes',
  },
  photography: {
    style: 'Warm, natural lighting, artisan feel',
    subjects: 'Products, ingredients, producers, lifestyle',
    editing: 'Slightly warm tones, high contrast, natural',
  },
  voice: {
    tone: 'Warm, knowledgeable, passionate, trustworthy',
    style: 'Conversational but professional',
    personality: 'Artisan, authentic, caring, expert',
  }
};

// Export for use in components
export default brand;
