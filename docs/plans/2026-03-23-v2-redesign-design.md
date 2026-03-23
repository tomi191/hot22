# HOT22 v2 Redesign — Design Document

**Date:** 2026-03-23
**Status:** Approved

---

## 1. Homepage Services → Active Grid

### Layout
Asymmetric grid with varying card sizes:
- 2 large cards (Ремонт и зареждане, Диагностика) with background images + glass overlay
- 4 smaller cards (Парно, Озониране, Промивка, Компоненти)
- 1 CTA card (Запази час) with accent gradient

### Behavior
- Hover: image zoom, overlay lightens, shows 3-step process preview
- Glass-morphism: backdrop-blur-md + bg-frost-dark/60
- Staggered AnimateIn on scroll
- Each card links to service detail page

### Visual
- Background images from /images/services/
- Rounded corners (radius-card)
- Subtle border glow on hover (hot-red shadow)
- No uniform sizing — visual hierarchy through size difference

---

## 2. Service Detail Pages → Sales Pages

### Structure per service (6 sections):

**Section 1: Hero**
- Full-width background image (service-specific)
- Title + 1-line hook ("Климатикът не охлажда? Решаваме за 30-60 мин.")
- Glass overlay on dark bg

**Section 2: Problem (Какъв е проблемът?)**
- Customer-facing language: "Ако усещате..."
- 3-4 bullet points of symptoms
- Red accent icons

**Section 3: Process (Как го решаваме?)**
- Visual timeline: 3-5 steps
- Step number + icon + title + short description
- Horizontal on desktop, vertical on mobile
- Shows professionalism and transparency

**Section 4: Equipment (Какво ползваме?)**
- TEXA machine mention + image
- Professional credibility marker
- "Разполагаме с TEXA Konfort 780 Touch BI-GAS..."

**Section 5: When (Кога да дойдете?)**
- Timing recommendations
- Seasonal tips
- Warning signs to watch for

**Section 6: CTA**
- "Запази час" button
- Phone link
- WhatsApp button

**Section 7: Related Services**
- 3 cards from same category

### Translation Keys
New namespace "ServiceDetails" with per-slug keys:
- {slug}.hook
- {slug}.problem (array of symptom strings)
- {slug}.processSteps (array of step objects)
- {slug}.equipment
- {slug}.timing

---

## 3. Blog → 10 SEO-Strategic Posts

### Cluster 1: Problems (catch search queries)
1. klimatik-ne-ohlazhda — "Климатикът не охлажда — 7 причини"
2. nepriyatna-mirizma-klimatik — "Неприятна миризма от климатика"
3. stranni-shumove-klimatik — "Странни шумове от климатика"
4. parnoto-ne-gree — "Парното не грее — какво може да е?"

### Cluster 2: How it works (expert positioning)
5. r134a-ili-r1234yf — "R134a или R1234yf — кой фреон?"
6. ozoniranie-kak-raboti — "Озониране — как работи и кога е нужно?"
7. podgotvete-kolata-za-lyatoto — "Как да подготвите колата за лятото"

### Cluster 3: Local SEO
8. zarezhdane-klimatik-varna — "Зареждане на климатик Варна"
9. avtoklimatici-varna-rakovodstvo — "Автоклиматици Варна — ръководство"
10. uv-test-techove — "UV тест за течове — защо е по-точен?"

### Post Structure
- H1 title targeting keyword
- 2-3 sentence excerpt with keyword
- Service image
- 400-600 words body with H2 sections
- Inline CTA ("При нас в HOT22...")
- Service link at bottom
- Related posts (3)

---

## 4. Gallery Removal

- Remove /gallery route and page
- Remove Gallery from navigation (Header, Footer, MobileMenu)
- Remove Gallery translations from messages
- Keep images in /public/images/services/ for use in service pages
- Navigation: Начало | Услуги | За нас | Блог | Контакти | Запази час

---

## 5. Technical Notes

- All new content in translation files (bg.json, en.json)
- Service detail pages use new "ServiceDetails" namespace
- Blog posts remain in blog-data.ts (migrating to Supabase later)
- Active Grid uses CSS Grid with grid-template-areas for asymmetric layout
- Glass effect: backdrop-blur-md + bg-gradient with opacity
- Process timeline: flexbox with connecting lines
- All images via next/image for optimization
