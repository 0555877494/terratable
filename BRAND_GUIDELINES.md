# 🎨 Brand Guidelines - Terra & Table

Complete brand identity guide for Terra & Table marketplace.

---

## 🏷️ Brand Overview

### Brand Name
**Terra & Table**

### Tagline
"Premium Artisan Foods"

### Mission
Curating the world's finest specialty foods, connecting artisan producers with discerning customers who appreciate quality, authenticity, and exceptional taste.

### Vision
To become the global destination for premium artisan foods, where every product tells a story of tradition, craftsmanship, and passion.

### Values
- **Quality** - Only the finest ingredients
- **Authenticity** - Genuine artisan products
- **Sustainability** - Eco-friendly practices
- **Community** - Supporting local producers
- **Excellence** - Exceptional customer experience

---

## 🎨 Logo

### Primary Logo

The Terra & Table logo features a stylized fork and leaf design, representing the union of culinary arts (fork) and natural, organic ingredients (leaf).

**Design Elements:**
- Circular background with amber-to-red gradient
- White fork design with 4 tines
- Green leaf accent in upper right
- Clean, modern, professional aesthetic

**Usage:**
- Use on light and dark backgrounds
- Maintain clear space around logo (minimum 16px)
- Minimum size: 32px width
- Never stretch, rotate, or distort
- Never change colors or add effects

### Logo Variations

**Primary Logo (Full)**
- Icon + "Terra & Table" text
- "Artisan Marketplace" tagline
- Use for: Website header, email signatures, marketing materials

**Icon Only**
- Circular icon without text
- Use for: Favicon, app icon, social media profiles, small spaces

**White Version**
- White logo for dark backgrounds
- Use for: Dark mode, dark backgrounds, overlays

### Logo Colors

```css
/* Primary Gradient */
background: linear-gradient(135deg, #f59e0b 0%, #d97706 50%, #b45309 100%);

/* Leaf Green */
#22c55e to #16a34a

/* Fork White */
#ffffff with 95% opacity
```

### Logo Don'ts

❌ Don't stretch or distort
❌ Don't change colors
❌ Don't add shadows or effects
❌ Don't place on busy backgrounds
❌ Don't rotate or flip
❌ Don't use low-resolution versions
❌ Don't add outlines or borders

---

## 🎨 Color Palette

### Primary Colors

**Amber (Primary)**
```css
--amber-50:  #fef3c7  /* Lightest */
--amber-100: #fde68a
--amber-200: #fcd34d
--amber-300: #fbbf24
--amber-400: #f59e0b  /* Main */
--amber-500: #d97706
--amber-600: #b45309
--amber-700: #92400e
--amber-800: #78350f
--amber-900: #451a03  /* Darkest */
```

**Usage:**
- Primary CTAs (buttons, links)
- Headings and important text
- Brand elements
- Highlights and accents

**Emerald (Secondary)**
```css
--emerald-50:  #ecfdf5
--emerald-100: #d1fae5
--emerald-200: #a7f3d0
--emerald-300: #6ee7b7
--emerald-400: #34d399
--emerald-500: #10b981  /* Main */
--emerald-600: #059669
--emerald-700: #047857
--emerald-800: #065f46
--emerald-900: #064e3b
```

**Usage:**
- Success states
- Eco-friendly badges
- Positive indicators
- Loyalty program
- Sustainability messaging

**Rose (Accent)**
```css
--rose-50:  #fff1f2
--rose-100: #ffe4e6
--rose-200: #fecdd3
--rose-300: #fda4af
--rose-400: #fb7185
--rose-500: #f43f5e  /* Main */
--rose-600: #e11d48
--rose-700: #be123c
--rose-800: #9f1239
--rose-900: #881337
```

**Usage:**
- Wishlist hearts
- Sale badges
- Error states
- Special offers
- Attention-grabbing elements

### Neutral Colors

**Stone (Text & Backgrounds)**
```css
--stone-50:  #fafaf9
--stone-100: #f5f5f4
--stone-200: #e7e5e4
--stone-300: #d6d3d1
--stone-400: #a8a29e
--stone-500: #78716c
--stone-600: #57534e
--stone-700: #44403c
--stone-800: #292524
--stone-900: #1c1917
```

**Usage:**
- Body text
- Backgrounds
- Borders
- Subtle elements
- Dark mode

### Color Combinations

**Primary CTA:**
```css
background: linear-gradient(135deg, #f59e0b, #d97706);
color: white;
```

**Success State:**
```css
background: #ecfdf5;
border: 2px solid #10b981;
color: #047857;
```

**Error State:**
```css
background: #fff1f2;
border: 2px solid #f43f5e;
color: #be123c;
```

**Card (Light Mode):**
```css
background: white;
border: 2px solid #e7e5e4;
```

**Card (Dark Mode):**
```css
background: #292524;
border: 2px solid #44403c;
```

---

## 📝 Typography

### Font Families

**Headings: Playfair Display**
- Serif font for elegance and sophistication
- Use for: H1-H6, product names, section titles
- Weights: 400 (Regular), 600 (SemiBold), 700 (Bold)

**Body: Inter**
- Sans-serif font for readability
- Use for: Body text, UI elements, labels
- Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold)

### Font Sizes

```css
/* Headings */
h1: 3.75rem (60px) - Hero titles
h2: 3rem (48px) - Section titles
h3: 2.25rem (36px) - Subsection titles
h4: 1.875rem (30px) - Card titles
h5: 1.5rem (24px) - Small titles
h6: 1.25rem (20px) - Labels

/* Body */
xl: 1.25rem (20px) - Lead text
lg: 1.125rem (18px) - Large body
base: 1rem (16px) - Default body
sm: 0.875rem (14px) - Small text
xs: 0.75rem (12px) - Extra small, labels
```

### Line Heights

```css
headings: 1.2
body: 1.6
tight: 1.1
relaxed: 1.8
```

### Letter Spacing

```css
tight: -0.025em
normal: 0
wide: 0.025em
wider: 0.05em
widest: 0.1em (uppercase labels)
```

### Typography Hierarchy

**Example:**
```html
<h1 class="font-serif text-5xl font-bold">Discover the Extraordinary</h1>
<h2 class="font-serif text-3xl font-bold">Our Collection</h2>
<h3 class="font-serif text-xl font-bold">Tuscan Wildflower Honey</h3>
<p class="text-base text-stone-600">Raw, unfiltered honey from Tuscany...</p>
<label class="text-xs uppercase tracking-wider font-semibold">Origin</label>
```

---

## 📸 Photography Style

### General Guidelines

**Style:**
- Warm, natural lighting
- High contrast
- Slightly warm tones
- Professional food photography
- Artisan, handcrafted feel

**Subjects:**
- Products (hero shots, lifestyle)
- Ingredients (raw materials)
- Producers (artisans at work)
- Lifestyle (products in use)
- Details (textures, close-ups)

### Product Photography

**Hero Shots:**
- Clean, white or neutral backgrounds
- Product centered or rule-of-thirds
- Soft shadows
- High resolution (minimum 1200x1200px)
- Multiple angles (front, side, top, detail)

**Lifestyle Shots:**
- Products in use (kitchen, dining table)
- Natural settings
- Warm lighting
- Human elements (hands, people)
- Storytelling composition

### Producer Photography

**Portraits:**
- Natural lighting
- Authentic expressions
- Work environment
- Tools of trade visible
- Cultural context

**Process Shots:**
- Hands at work
- Ingredients being prepared
- Traditional methods
- Attention to detail
- Story of craftsmanship

### Image Specifications

**Product Images:**
- Minimum: 800x800px
- Recommended: 1200x1200px
- Format: WebP or JPEG
- Quality: 80-90%
- Background: White or neutral

**Banner Images:**
- Desktop: 1920x600px
- Tablet: 1024x400px
- Mobile: 640x400px
- Format: WebP or JPEG
- Quality: 85-95%

**Profile Images:**
- Square: 400x400px
- Format: JPEG
- Quality: 90%
- Focus: Face centered

### Image Editing

**Color Grading:**
- Slightly warm tones
- High contrast
- Natural saturation
- Consistent across product lines

**Retouching:**
- Remove distractions
- Enhance product features
- Maintain authenticity
- No heavy filters

**Composition:**
- Rule of thirds
- Leading lines
- Negative space
- Balanced framing

### Image Don'ts

❌ Don't use stock photos
❌ Don't over-edit or filter
❌ Don't use inconsistent lighting
❌ Don't crop products awkwardly
❌ Don't use low-resolution images
❌ Don't add heavy text overlays
❌ Don't use busy backgrounds

---

## 🗣️ Brand Voice & Tone

### Voice Characteristics

**Warm**
- Friendly and approachable
- Conversational but professional
- Empathetic and caring
- Inviting and inclusive

**Knowledgeable**
- Expert in artisan foods
- Educational without being condescending
- Passionate about quality
- Detail-oriented

**Passionate**
- Enthusiastic about products
- Genuine love for food
- Excitement about discovery
- Pride in craftsmanship

**Trustworthy**
- Honest and transparent
- Reliable and consistent
- Authentic and genuine
- Professional and credible

### Tone Variations

**Product Descriptions:**
```
✅ "Hand-harvested Persian saffron threads, each delivering intense color and aroma. The world's most prized spice, perfect for paella and risotto."

❌ "This is saffron. It's expensive but good."
```

**Customer Support:**
```
✅ "We're so sorry about the delay! Let me check on your order right away and get this sorted for you."

❌ "Your order is delayed. Wait for it."
```

**Marketing Emails:**
```
✅ "We're thrilled to introduce our new collection of Tuscan olive oils, harvested from century-old groves..."

❌ "New products available. Buy now."
```

**Social Media:**
```
✅ "Meet Marco, our honey producer from Tuscany 🍯 His family has been beekeeping for 3 generations! #ArtisanFoods #TerraAndTable"

❌ "New honey in stock."
```

### Writing Guidelines

**Do:**
- Use active voice
- Be specific and detailed
- Tell stories
- Use sensory language
- Show passion
- Be conversational
- Use "we" and "you"

**Don't:**
- Use jargon or technical terms
- Be vague or generic
- Use passive voice
- Sound corporate or robotic
- Overuse exclamation points
- Use slang or informal language
- Make false claims

### Content Types

**Product Descriptions:**
- Origin story
- Production process
- Flavor profile
- Usage suggestions
- Producer information

**Blog Posts:**
- Educational content
- Recipes
- Producer stories
- Industry insights
- Seasonal content

**Email Newsletters:**
- New arrivals
- Seasonal features
- Exclusive offers
- Producer spotlights
- Recipes and tips

**Social Media:**
- Product highlights
- Behind-the-scenes
- User-generated content
- Educational tips
- Community engagement

---

## 🎯 Brand Applications

### Website

**Header:**
- Logo (primary version)
- Navigation links
- Search bar
- Cart icon
- User menu
- Sticky on scroll

**Footer:**
- Logo (icon version)
- Navigation links
- Social media icons
- Newsletter signup
- Contact information
- Legal links

**Buttons:**
- Primary: Gradient amber background
- Secondary: White with border
- Text: Underlined links
- Icons: Lucide React icons

### Marketing Materials

**Business Cards:**
- Logo (primary)
- Name and title
- Contact information
- Website URL
- QR code

**Brochures:**
- High-quality product images
- Brand story
- Product highlights
- Contact information
- Consistent branding

**Packaging:**
- Logo prominently displayed
- Brand colors
- Product information
- Sustainability messaging
- Premium feel

### Social Media

**Profile Images:**
- Logo (icon version)
- Consistent across platforms
- High resolution
- Clear and recognizable

**Post Templates:**
- Brand colors
- Logo placement
- Consistent fonts
- Professional imagery
- Call-to-action

**Stories:**
- Vertical format
- Brand elements
- Interactive elements
- Behind-the-scenes
- User-generated content

### Email Templates

**Header:**
- Logo
- Brand colors
- Navigation (if applicable)

**Body:**
- Clean layout
- Brand fonts
- Product images
- Clear CTAs
- Personalization

**Footer:**
- Logo (small)
- Social links
- Unsubscribe
- Contact info
- Legal links

---

## 📐 Design Principles

### 1. Simplicity
- Clean, uncluttered layouts
- Clear visual hierarchy
- Minimal distractions
- Focus on content
- White space is your friend

### 2. Consistency
- Consistent colors across all touchpoints
- Uniform typography
- Standardized components
- Predictable interactions
- Cohesive brand experience

### 3. Quality
- High-resolution images
- Professional photography
- Attention to detail
- Premium feel
- No compromises

### 4. Accessibility
- WCAG 2.1 AA compliance
- Sufficient color contrast
- Keyboard navigation
- Screen reader support
- Inclusive design

### 5. Performance
- Fast loading times
- Optimized images
- Efficient code
- Smooth animations
- Responsive design

---

## 🎨 Design Elements

### Icons

**Icon Library:** Lucide React
- Consistent style
- Clean lines
- Recognizable shapes
- Scalable vector format
- Wide variety

**Icon Usage:**
- Size: 16px, 20px, 24px, 32px
- Color: Inherit from text or brand colors
- Weight: Regular (default)
- Spacing: 8px from text

### Illustrations

**Style:**
- Minimalist
- Line art
- Brand colors
- Consistent with photography
- Professional quality

**Usage:**
- Empty states
- Onboarding
- Feature highlights
- Error messages
- Success states

### Patterns & Textures

**Usage:**
- Subtle backgrounds
- Section dividers
- Card backgrounds
- Decorative elements

**Style:**
- Organic, natural textures
- Subtle, not distracting
- Consistent with brand
- High quality

---

## 📱 Responsive Design

### Breakpoints

```css
/* Mobile first */
mobile: 0 - 639px
tablet: 640px - 1023px
laptop: 1024px - 1439px
desktop: 1440px+
```

### Mobile Design

**Navigation:**
- Hamburger menu
- Bottom navigation bar
- Swipe gestures
- Large tap targets (44x44px minimum)

**Layout:**
- Single column
- Stacked content
- Full-width images
- Simplified forms

**Typography:**
- Larger touch targets
- Readable font sizes (16px minimum)
- Adequate line spacing
- Clear hierarchy

### Tablet Design

**Navigation:**
- Side navigation
- Top navigation bar
- Expandable menus
- Touch-optimized

**Layout:**
- Two columns where appropriate
- Flexible grid
- Optimized images
- Balanced content

### Desktop Design

**Navigation:**
- Full navigation bar
- Mega menus
- Search functionality
- User menu

**Layout:**
- Multi-column grids
- Sidebar content
- Maximum width containers
- Rich media

---

## 🌗 Dark Mode

### Color Adjustments

**Backgrounds:**
```css
Light: #fafaf9 (stone-50)
Dark: #1c1917 (stone-900)
```

**Cards:**
```css
Light: white
Dark: #292524 (stone-800)
```

**Text:**
```css
Light: #1c1917 (stone-900)
Dark: #f5f5f4 (stone-100)
```

**Borders:**
```css
Light: #e7e5e4 (stone-200)
Dark: #44403c (stone-700)
```

### Implementation

```css
/* Automatic dark mode */
@media (prefers-color-scheme: dark) {
  /* Dark mode styles */
}

/* Manual toggle */
.dark {
  /* Dark mode styles */
}
```

---

## ✅ Brand Checklist

### Before Publishing

- [ ] Logo is correctly sized and positioned
- [ ] Colors match brand guidelines
- [ ] Typography follows hierarchy
- [ ] Images are high quality
- [ ] Content uses brand voice
- [ ] Design is responsive
- [ ] Accessibility standards met
- [ ] Dark mode supported
- [ ] All links work
- [ ] No spelling errors

### Ongoing Maintenance

- [ ] Regular brand audits
- [ ] Update imagery seasonally
- [ ] Refresh content regularly
- [ ] Monitor brand mentions
- [ ] Gather user feedback
- [ ] Track brand performance
- [ ] Update as needed
- [ ] Maintain consistency

---

## 📞 Brand Support

### Resources

- **Logo Files**: `/public/logos/`
- **Brand Assets**: `/public/brand/`
- **Templates**: `/templates/`
- **Icons**: Lucide React library
- **Fonts**: Google Fonts (Playfair Display, Inter)

### Contact

For brand questions or asset requests:
- **Email**: brand@terraandtable.com
- **Slack**: #brand-channel
- **Design Team**: design@terraandtable.com

---

## 🎉 Brand Evolution

### Version History

**v1.0 (2024)**
- Initial brand identity
- Logo design
- Color palette
- Typography system
- Brand guidelines

### Future Updates

**Planned:**
- Seasonal color variations
- Expanded icon library
- Video brand guidelines
- Motion design principles
- Sound branding

---

**Thank you for representing Terra & Table!** 🌿✨

Remember: Consistency is key to building a strong, recognizable brand. Always refer to these guidelines when creating materials for Terra & Table.
