# PodiEase E-Commerce Design Guidelines

## Design Approach: Clean, Bold & Minimal (Inspired by The Rehab Mechanics)

**Primary References:** The Rehab Mechanics (therehabmechanics.com.au) - clean, bold, minimal aesthetic with strong typography and clear hierarchy.

**Key Principle:** Professional medical credibility through simplicity and boldness. Clean layouts, strong typography with Biski font, generous white space, and minimal color palette that lets content and products speak for themselves.

---

## Color Palette (Minimal Black/White + Brown Accent)

**Design Philosophy:** Clean, minimal palette inspired by The Rehab Mechanics - primarily black and white with strategic brown accents.

**Core Palette (3 colors only):**
1. **White:** `#FFFFFF` (Primary backgrounds, cards, clean surfaces)
2. **Near-Black:** `#1a1a1a` (Headings, body text, strong contrast)
3. **Rich Brown:** `#593f32` (Brand accent - CTAs, logo, emphasis only)

**Neutral Spectrum:**
- **Light Gray:** `#f5f5f5` (Subtle section backgrounds when needed)
- **Border Gray:** `#e5e5e5` (Thin dividing lines, card borders)
- **Text Gray:** `#666666` (Secondary text, captions)

**Application Strategy:**
- **Backgrounds:** White (default), very subtle light gray (#f5f5f5) for section variety
- **Headings:** Near-black (#1a1a1a), bold, large scale
- **Body Text:** Near-black (#1a1a1a) or text gray (#666666) for secondary info
- **Primary CTAs:** Rich brown (#593f32) background, white text, no gradients
- **Secondary CTAs:** Black outline on white background (outline-2)
- **Trust Badges:** Simple black text with thin brown border, no background fills
- **Dividers:** Thin light gray (#e5e5e5) keylines, 1px max
- **Links:** Rich brown (#593f32) with underline on hover
- **Product Cards:** White background, thin gray border, no shadows or gradients

**Prohibited:**
- ❌ No gradients or color washes
- ❌ No colored backgrounds at opacity (no rgba fills)
- ❌ No drop shadows or glows
- ❌ No multiple accent colors per section
- ❌ Keep it flat, clean, and minimal

---

## Typography Hierarchy

**Primary Font:** Biski (BiskiTrial-Regular.otf) - Custom font for brand identity
**Fallback Stack:** -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif

**Design Philosophy:** Bold, clean, readable typography inspired by The Rehab Mechanics

**Scale:**
- H1 (Hero Headlines): 4rem (64px) desktop / 2.75rem mobile, font-weight: 700, line-height: 1.1, letter-spacing: -0.02em
- H2 (Section Headers): 3rem (48px) desktop / 2.25rem mobile, font-weight: 700, line-height: 1.2, letter-spacing: -0.01em
- H3 (Subsections): 2rem (32px), font-weight: 700, letter-spacing: -0.01em
- H4 (Card Titles): 1.5rem (24px), font-weight: 600
- Body: 1.125rem (18px), font-weight: 400, line-height: 1.7
- Small Text: 1rem (16px) for captions, badges

---

## Layout System

**Container Widths:**
- Maximum content width: `max-w-7xl` (1280px)
- Product grids: `max-w-6xl` (1152px)
- Text content: `max-w-3xl` (768px)

**Spacing Philosophy:**
- **Generous White Space:** More breathing room between sections (py-20 to py-32)
- **Clean Separation:** Clear visual breaks between content blocks
- **Alignment:** Strong left or center alignment, avoid mixed alignments

**Spacing Primitives (Tailwind):**
- Section padding: `py-20` to `py-32` desktop / `py-16` mobile (increased for breathing room)
- Component spacing: `gap-8` to `gap-12` for grids (wider spacing)
- Card padding: `p-8` (more generous than p-6)
- Element margins: `mb-6`, `mb-8`, `mb-12` for clear hierarchy

**Grid System:**
- Product cards: 3 columns desktop, 2 tablet, 1 mobile
- Feature sections: 3 columns desktop, flexible tablet/mobile
- Trust badges: 3-4 horizontal on desktop, stack mobile
- Consistent gaps: Use `gap-8` or `gap-12` for all grids

---

## Component Library

**Navigation:**
- Sticky header with white background, subtle shadow on scroll
- Logo left-aligned, navigation center, cart icon right
- Mobile: Hamburger menu with smooth slide-in
- Include: Shop, Learn, About, Contact, Cart (with item count badge)

**Hero Section:**
- Full-width, 85vh height with professional lifestyle image
- Dark overlay wash for text legibility (solid color, no gradients)
- Centered content with large, bold Biski headline + clean subheadline
- Two CTA buttons: Primary (Rich Brown) + Secondary (Black outline)
- Trust badges row beneath CTAs - simple text with thin borders, no background fills
- Flat design, no shadows

**Product Cards:**
- White background with thin light gray border (1px)
- Product image (16:9 ratio), simple "Podiatrist's Pick" badge
- Product name (bold), price, short description
- "Add to Cart" button (Rich Brown primary)
- No shadows, no hover lift - clean and flat
- Shopify integration for dynamic pricing/inventory

**About Section:**
- Two-column layout: Podiatrist photo left, text content right
- Professional headshot in clean frame (no colored borders)
- Bold headline with clean body copy
- "Read My Story" link in rich brown
- White background, ample spacing

**Trust Indicators:**
- Minimal badge components: Icon + text
- Examples: "Podiatrist-Approved", "Fast AU Shipping", "Satisfaction Guarantee"
- Simple black text with thin brown border (1px), white background
- No fills, no shadows

**Footer:**
- Clean white or light gray background with multi-column layout
- Columns: About, Quick Links, Customer Service, Newsletter
- Simple typography, minimal decoration
- Social icons in black, payment icons
- Copyright and policies at bottom

**Buttons:**
- Primary: Rich brown (#593f32) background, white text, rounded corners (8px)
- Secondary: Black (#1a1a1a) outline (2px), transparent background
- Flat design - no shadows, no blurs
- Rely on built-in hover states only

---

## Images

**Hero Section:**
- Large, professional lifestyle image (1920x1080): Person walking confidently outdoors, active lifestyle, natural lighting
- Shows relief/comfort without clinical setting
- Solid dark overlay (no gradients) for text contrast

**Podiatrist Profile:**
- Professional headshot (600x600): Clinical coat or business casual, warm smile, clean background
- Simple rectangular or circular frame, no decorative borders

**Product Images:**
- High-quality product photography (800x800): Clean white background, multiple angles
- Lifestyle context shots showing products in use
- Sourced from Shopify product catalog
- Clean presentation, no filters or effects

**Educational Content:**
- Anatomical diagrams (simple, clean illustrated style)
- Before/after comparison visuals
- Clean infographic-style educational graphics

**Trust Builders:**
- Customer testimonial photos (if available, clean presentation)
- Certification badges/logos (minimal design)
- Simple, professional imagery throughout

---

## Key Design Principles

1. **Medical Credibility:** Professional without being clinical or cold
2. **Trust Through Transparency:** Clear product info, podiatrist backing visible throughout
3. **Gentle Encouragement:** Empathetic tone for customers in pain seeking relief
4. **Shopify Integration:** Seamless e-commerce with native cart/checkout experience
5. **Mobile-First:** Responsive design prioritizing mobile shopping experience
6. **Accessibility:** WCAG 2.1 AA compliant, clear contrast ratios, keyboard navigation
7. **Australian Context:** Prices in AUD, local shipping emphasis, Australian lifestyle imagery