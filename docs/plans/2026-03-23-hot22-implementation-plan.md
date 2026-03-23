# HOT22 Website Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a modern, anti-generic bilingual (BG/EN) website for Автоклиматици HOT22 in Varna — auto AC full-service repair shop.

**Architecture:** Next.js 16 App Router with `[locale]` routing via next-intl, Supabase for dynamic data (bookings, reviews, blog, gallery), Tailwind CSS v4 for styling with custom "Heat & Frost" design system, Framer Motion for scroll animations.

**Tech Stack:** Next.js 16, React 19.2, TypeScript, Tailwind CSS v4, Framer Motion, Supabase, next-intl, React Hook Form + Zod, Lucide React

**Design Doc:** `docs/plans/2026-03-23-hot22-website-design.md`

---

## Phase 1: Project Foundation

### Task 1: Scaffold Next.js 16 project

**Step 1: Create the project**

```bash
cd "Z:/Clients - Level8/HOT22"
pnpm create next-app@latest . --yes
```

Expected: Project created with TypeScript, Tailwind CSS v4, ESLint, App Router, Turbopack.

**Step 2: Verify it runs**

```bash
pnpm dev
```

Visit http://localhost:3000 — should see default Next.js page.

**Step 3: Commit**

```bash
git add .
git commit -m "chore: scaffold Next.js 16 project"
```

---

### Task 2: Install all dependencies

**Step 1: Install runtime dependencies**

```bash
pnpm add next-intl @supabase/supabase-js framer-motion react-hook-form @hookform/resolvers zod lucide-react
```

**Step 2: Install dev dependencies**

```bash
pnpm add -D @types/node
```

**Step 3: Verify build**

```bash
pnpm build
```

Expected: Build succeeds with no errors.

**Step 4: Commit**

```bash
git add .
git commit -m "chore: install project dependencies"
```

---

### Task 3: Configure Tailwind design tokens + global styles

**Files:**
- Modify: `src/app/globals.css`
- Create: `src/lib/fonts.ts`

**Step 1: Update globals.css with HOT22 design tokens**

Replace `src/app/globals.css` with:

```css
@import "tailwindcss";

/* HOT22 "Heat & Frost" Design Tokens */
@theme {
  /* Brand Colors */
  --color-hot-red: #DC2626;
  --color-hot-red-dark: #B91C1C;
  --color-hot-red-light: #FCA5A5;

  --color-frost-dark: #1A1A2E;
  --color-frost-mid: #374151;
  --color-frost-steel: #94A3B8;
  --color-frost-light: #F8F9FA;
  --color-frost-white: #FFFFFF;

  /* Accent */
  --color-accent-warm: #F97316;
  --color-accent-cool: #3B82F6;

  /* Typography Scale */
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'JetBrains Mono', ui-monospace, monospace;

  /* Spacing */
  --spacing-section: 5rem;
  --spacing-section-sm: 3rem;

  /* Border Radius */
  --radius-card: 0.75rem;
  --radius-btn: 0.5rem;

  /* Transitions */
  --transition-base: 200ms ease;
  --transition-slow: 500ms ease;

  /* Diagonal clip for sections */
  --clip-diagonal: polygon(0 0, 100% 0, 100% calc(100% - 4rem), 0 100%);
  --clip-diagonal-reverse: polygon(0 4rem, 100% 0, 100% 100%, 0 100%);
}

/* Base styles */
body {
  font-family: var(--font-sans);
  color: var(--color-frost-dark);
  background-color: var(--color-frost-white);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: var(--color-frost-light);
}

::-webkit-scrollbar-thumb {
  background: var(--color-frost-steel);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-hot-red);
}

/* Selection */
::selection {
  background-color: var(--color-hot-red);
  color: white;
}

/* Diagonal section utility */
.clip-diagonal {
  clip-path: var(--clip-diagonal);
}

.clip-diagonal-reverse {
  clip-path: var(--clip-diagonal-reverse);
}

/* Texture overlay utility */
.texture-metal {
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
}
```

**Step 2: Create font config**

Create `src/lib/fonts.ts`:

```typescript
import { Inter } from 'next/font/google';

export const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  variable: '--font-sans',
});
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add HOT22 Heat & Frost design tokens and global styles"
```

---

### Task 4: Set up i18n with next-intl

**Files:**
- Create: `src/i18n/routing.ts`
- Create: `src/i18n/navigation.ts`
- Create: `src/i18n/request.ts`
- Create: `src/proxy.ts`
- Create: `messages/bg.json`
- Create: `messages/en.json`
- Modify: `next.config.ts`

**Step 1: Create routing config**

Create `src/i18n/routing.ts`:

```typescript
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['bg', 'en'],
  defaultLocale: 'bg',
});
```

**Step 2: Create navigation helpers**

Create `src/i18n/navigation.ts`:

```typescript
import { createNavigation } from 'next-intl/navigation';
import { routing } from './routing';

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
```

**Step 3: Create request config**

Create `src/i18n/request.ts`:

```typescript
import { getRequestConfig } from 'next-intl/server';
import { hasLocale } from 'next-intl';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../../messages/${locale}.json`)).default,
  };
});
```

**Step 4: Create proxy (middleware)**

Create `src/proxy.ts`:

```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*)*)',
};
```

**Step 5: Create translation files**

Create `messages/bg.json`:

```json
{
  "Metadata": {
    "title": "HOT22 — Автоклиматици Варна | Ремонт и Зареждане",
    "description": "Професионален ремонт, зареждане и диагностика на автоклиматици във Варна. Пълен спектър услуги за климатичната система на вашия автомобил."
  },
  "Nav": {
    "home": "Начало",
    "services": "Услуги",
    "about": "За нас",
    "gallery": "Галерия",
    "blog": "Блог",
    "contact": "Контакти",
    "booking": "Запази час"
  },
  "Hero": {
    "title": "Вашият климатик.",
    "titleAccent": "Нашата грижа.",
    "subtitle": "Професионален ремонт и зареждане на автоклиматици във Варна. Всичко от А до Я за климатичната система на колата ви.",
    "cta": "Запази час",
    "ctaSecondary": "Виж услугите"
  },
  "Services": {
    "sectionTitle": "Услуги",
    "sectionSubtitle": "Пълен спектър грижа за климатичната система",
    "repair": "Ремонт и зареждане",
    "repairDesc": "Диагностика, зареждане с фреон R134a и R1234yf, отстраняване на течове и пълен ремонт на климатичната система.",
    "heating": "Парно и клапи",
    "heatingDesc": "Почистване и ремонт на парно, сваляне на табло, ремонт на клапи за прецизен контрол на температурата.",
    "ozone": "Озониране",
    "ozoneDesc": "Професионално почистване с озон — премахване на миризми, бактерии и влага от купето.",
    "flush": "Промивка на системи",
    "flushDesc": "Цялостна промивка на климатичната система от замърсявания, стара масла и метални частици.",
    "diagnostics": "Диагностика",
    "diagnosticsDesc": "Прецизна диагностика с leak detector и UV тест за откриване на микро течове във фреоновата система.",
    "components": "Ремонт на компоненти",
    "componentsDesc": "Смяна и ремонт на компресори, кондензатори, изпарители, радиатори и ел. части.",
    "viewAll": "Виж всички услуги"
  },
  "WhyUs": {
    "sectionTitle": "Защо HOT22?",
    "experience": "Години опит",
    "experienceDesc": "Специализирана експертиза в автоклиматични системи за всички марки автомобили.",
    "equipment": "Модерна апаратура",
    "equipmentDesc": "Професионално оборудване за прецизна диагностика и ремонт.",
    "personal": "Лично отношение",
    "personalDesc": "Внимание към всеки детайл и индивидуален подход към всеки клиент.",
    "fast": "Бързо обслужване",
    "fastDesc": "Ефективна работа без компромис с качеството.",
    "allBrands": "Всички марки",
    "allBrandsDesc": "Работим с всички марки и модели автомобили.",
    "fullService": "Пълен сервиз",
    "fullServiceDesc": "Всичко от А до Я за климатичната инсталация на вашата кола."
  },
  "Reviews": {
    "sectionTitle": "Какво казват клиентите",
    "sectionSubtitle": "Доверието на нашите клиенти е най-важното за нас"
  },
  "CTA": {
    "title": "Климатикът ви не работи както трябва?",
    "subtitle": "Свържете се с нас за бърза диагностика и ремонт.",
    "button": "Запази час",
    "call": "Обадете се"
  },
  "Footer": {
    "description": "Професионален ремонт и зареждане на автоклиматици във Варна. Пълен спектър услуги за климатичната система на вашия автомобил.",
    "quickLinks": "Бързи връзки",
    "workingHours": "Работно време",
    "weekdays": "Пон – Пет: 9:00 – 18:00",
    "saturday": "Събота: 9:00 – 14:00",
    "sunday": "Неделя: Почивен ден",
    "rights": "Всички права запазени."
  },
  "Contact": {
    "title": "Контакти",
    "subtitle": "Свържете се с нас",
    "address": "Владислав Варненчик, бул. „Владислав Варненчик", 9000 Варна",
    "phone": "089 338 3443",
    "nameLabel": "Име",
    "emailLabel": "Имейл",
    "phoneLabel": "Телефон",
    "messageLabel": "Съобщение",
    "send": "Изпрати",
    "success": "Съобщението е изпратено успешно!",
    "error": "Грешка при изпращане. Моля, опитайте отново."
  },
  "Booking": {
    "title": "Запази час",
    "subtitle": "Изберете услуга, дата и час за вашето посещение",
    "step1": "Услуга",
    "step2": "Дата и час",
    "step3": "Вашите данни",
    "selectService": "Изберете услуга",
    "selectDate": "Изберете дата",
    "selectTime": "Изберете час",
    "name": "Име",
    "phone": "Телефон",
    "email": "Имейл (по желание)",
    "carModel": "Марка и модел на автомобила",
    "notes": "Допълнителни бележки",
    "next": "Напред",
    "back": "Назад",
    "submit": "Потвърди записването",
    "success": "Успешно записване! Ще се свържем с вас за потвърждение.",
    "error": "Грешка при записването. Моля, опитайте отново."
  },
  "About": {
    "title": "За нас",
    "subtitle": "Вашият доверен партньор за автоклиматици във Варна",
    "story": "HOT22 е специализиран сервиз за автоклиматични системи във Варна. С години опит и модерна апаратура, ние предлагаме пълен спектър от услуги — от диагностика и зареждане до цялостен ремонт на климатичната инсталация на вашия автомобил.",
    "mission": "Нашата мисия е да осигурим комфорт и безопасност на всеки шофьор, независимо от марката и модела на колата."
  },
  "Gallery": {
    "title": "Галерия",
    "subtitle": "Вижте нашата работа"
  },
  "Blog": {
    "title": "Блог",
    "subtitle": "Полезни съвети и информация",
    "readMore": "Прочети повече"
  },
  "Common": {
    "learnMore": "Научи повече",
    "getQuote": "Поискай оферта",
    "callUs": "Обадете се",
    "whatsapp": "WhatsApp",
    "viber": "Viber"
  }
}
```

Create `messages/en.json`:

```json
{
  "Metadata": {
    "title": "HOT22 — Auto AC Varna | Repair & Recharge",
    "description": "Professional auto air conditioning repair, recharge and diagnostics in Varna. Full range of services for your car's climate system."
  },
  "Nav": {
    "home": "Home",
    "services": "Services",
    "about": "About",
    "gallery": "Gallery",
    "blog": "Blog",
    "contact": "Contact",
    "booking": "Book Now"
  },
  "Hero": {
    "title": "Your AC.",
    "titleAccent": "Our expertise.",
    "subtitle": "Professional auto air conditioning repair and recharge in Varna. Everything A to Z for your car's climate system.",
    "cta": "Book Now",
    "ctaSecondary": "View Services"
  },
  "Services": {
    "sectionTitle": "Services",
    "sectionSubtitle": "Full spectrum care for your climate system",
    "repair": "Repair & Recharge",
    "repairDesc": "Diagnostics, refrigerant recharge with R134a and R1234yf, leak repair and full AC system overhaul.",
    "heating": "Heating & Valves",
    "heatingDesc": "Heating system cleaning and repair, dashboard removal, valve repair for precise temperature control.",
    "ozone": "Ozone Treatment",
    "ozoneDesc": "Professional ozone cleaning — elimination of odors, bacteria and moisture from the cabin.",
    "flush": "System Flush",
    "flushDesc": "Complete AC system flush to remove contaminants, old oil and metal particles.",
    "diagnostics": "Diagnostics",
    "diagnosticsDesc": "Precision diagnostics with leak detector and UV testing for micro-leaks in the refrigerant system.",
    "components": "Component Repair",
    "componentsDesc": "Replacement and repair of compressors, condensers, evaporators, radiators and electrical parts.",
    "viewAll": "View all services"
  },
  "WhyUs": {
    "sectionTitle": "Why HOT22?",
    "experience": "Years of Experience",
    "experienceDesc": "Specialized expertise in automotive climate systems for all car brands.",
    "equipment": "Modern Equipment",
    "equipmentDesc": "Professional equipment for precision diagnostics and repair.",
    "personal": "Personal Attention",
    "personalDesc": "Attention to every detail and individual approach to each client.",
    "fast": "Fast Service",
    "fastDesc": "Efficient work without compromising quality.",
    "allBrands": "All Brands",
    "allBrandsDesc": "We work with all car makes and models.",
    "fullService": "Full Service",
    "fullServiceDesc": "Everything A to Z for your car's climate system."
  },
  "Reviews": {
    "sectionTitle": "What Clients Say",
    "sectionSubtitle": "The trust of our clients is what matters most"
  },
  "CTA": {
    "title": "AC not working properly?",
    "subtitle": "Contact us for quick diagnostics and repair.",
    "button": "Book Now",
    "call": "Call Us"
  },
  "Footer": {
    "description": "Professional auto air conditioning repair and recharge in Varna. Full range of services for your car's climate system.",
    "quickLinks": "Quick Links",
    "workingHours": "Working Hours",
    "weekdays": "Mon – Fri: 9:00 – 18:00",
    "saturday": "Sat: 9:00 – 14:00",
    "sunday": "Sunday: Closed",
    "rights": "All rights reserved."
  },
  "Contact": {
    "title": "Contact",
    "subtitle": "Get in touch with us",
    "address": "Vladislav Varnenchik Blvd., 9000 Varna",
    "phone": "089 338 3443",
    "nameLabel": "Name",
    "emailLabel": "Email",
    "phoneLabel": "Phone",
    "messageLabel": "Message",
    "send": "Send",
    "success": "Message sent successfully!",
    "error": "Error sending message. Please try again."
  },
  "Booking": {
    "title": "Book an Appointment",
    "subtitle": "Select a service, date and time for your visit",
    "step1": "Service",
    "step2": "Date & Time",
    "step3": "Your Details",
    "selectService": "Select a service",
    "selectDate": "Select a date",
    "selectTime": "Select a time",
    "name": "Name",
    "phone": "Phone",
    "email": "Email (optional)",
    "carModel": "Car make and model",
    "notes": "Additional notes",
    "next": "Next",
    "back": "Back",
    "submit": "Confirm Booking",
    "success": "Booking confirmed! We'll contact you for confirmation.",
    "error": "Booking failed. Please try again."
  },
  "About": {
    "title": "About Us",
    "subtitle": "Your trusted auto AC partner in Varna",
    "story": "HOT22 is a specialized auto air conditioning service in Varna. With years of experience and modern equipment, we offer a full range of services — from diagnostics and recharge to complete repair of your car's climate system.",
    "mission": "Our mission is to ensure comfort and safety for every driver, regardless of car make and model."
  },
  "Gallery": {
    "title": "Gallery",
    "subtitle": "See our work"
  },
  "Blog": {
    "title": "Blog",
    "subtitle": "Useful tips and information",
    "readMore": "Read more"
  },
  "Common": {
    "learnMore": "Learn more",
    "getQuote": "Get a Quote",
    "callUs": "Call Us",
    "whatsapp": "WhatsApp",
    "viber": "Viber"
  }
}
```

**Step 6: Update next.config.ts**

```typescript
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
```

**Step 7: Restructure app directory for [locale]**

Move `src/app/page.tsx` → `src/app/[locale]/page.tsx`
Move `src/app/layout.tsx` → `src/app/[locale]/layout.tsx`
Keep `src/app/globals.css` in `src/app/`

Create a root `src/app/layout.tsx` that just renders children (minimal wrapper).

**Step 8: Verify dev server works**

```bash
pnpm dev
```

Visit http://localhost:3000 — should redirect to /bg

**Step 9: Commit**

```bash
git add .
git commit -m "feat: set up i18n with next-intl (BG/EN)"
```

---

### Task 5: Set up Supabase client and types

**Files:**
- Create: `src/lib/supabase/client.ts`
- Create: `src/lib/supabase/server.ts`
- Create: `src/types/database.ts`
- Create: `.env.local.example`

**Step 1: Create browser client**

Create `src/lib/supabase/client.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
```

**Step 2: Create server client**

Create `src/lib/supabase/server.ts`:

```typescript
import { createClient } from '@supabase/supabase-js';

export function createServerSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );
}
```

**Step 3: Create database types**

Create `src/types/database.ts`:

```typescript
export interface Booking {
  id: string;
  service: string;
  date: string;
  time: string;
  name: string;
  phone: string;
  email?: string;
  car_model: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  created_at: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  text: string;
  car_model?: string;
  is_published: boolean;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title_bg: string;
  title_en: string;
  excerpt_bg: string;
  excerpt_en: string;
  content_bg: string;
  content_en: string;
  cover_image?: string;
  is_published: boolean;
  published_at?: string;
  created_at: string;
}

export interface GalleryImage {
  id: string;
  url: string;
  alt_bg: string;
  alt_en: string;
  category?: string;
  sort_order: number;
  created_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email?: string;
  phone: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface Service {
  id: string;
  slug: string;
  title_bg: string;
  title_en: string;
  description_bg: string;
  description_en: string;
  icon: string;
  category: 'repair' | 'diagnostics' | 'components' | 'cleaning' | 'maintenance';
  sort_order: number;
  is_active: boolean;
  created_at: string;
}
```

**Step 4: Create .env.local.example**

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
```

**Step 5: Commit**

```bash
git add .
git commit -m "feat: set up Supabase client and database types"
```

---

## Phase 2: Layout Shell

### Task 6: Create Header with navigation

**Files:**
- Create: `src/components/layout/Header.tsx`
- Create: `src/components/layout/MobileMenu.tsx`
- Create: `src/components/layout/LanguageSwitcher.tsx`

**Step 1: Create LanguageSwitcher**

Create `src/components/layout/LanguageSwitcher.tsx`:

```tsx
'use client';

import { useLocale } from 'next-intl';
import { usePathname, useRouter } from '@/i18n/navigation';

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function switchLocale() {
    const newLocale = locale === 'bg' ? 'en' : 'bg';
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 rounded-radius-btn border border-frost-steel/30 px-3 py-1.5 text-sm font-medium tracking-wide transition-all hover:border-hot-red hover:text-hot-red"
      aria-label={locale === 'bg' ? 'Switch to English' : 'Превключи на български'}
    >
      {locale === 'bg' ? 'EN' : 'BG'}
    </button>
  );
}
```

**Step 2: Create MobileMenu**

Create `src/components/layout/MobileMenu.tsx`:

```tsx
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Menu, X } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'about', href: '/about' },
  { key: 'gallery', href: '/gallery' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations('Nav');

  return (
    <div className="lg:hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 text-frost-dark"
        aria-label="Toggle menu"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full w-full border-t border-frost-steel/10 bg-frost-white shadow-lg">
          <nav className="flex flex-col px-6 py-4">
            {navItems.map((item) => (
              <Link
                key={item.key}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="border-b border-frost-light py-3 text-frost-mid transition-colors hover:text-hot-red"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/booking"
              onClick={() => setIsOpen(false)}
              className="mt-4 rounded-radius-btn bg-hot-red px-6 py-3 text-center font-semibold text-white transition-colors hover:bg-hot-red-dark"
            >
              {t('booking')}
            </Link>
            <div className="mt-4 flex justify-center">
              <LanguageSwitcher />
            </div>
          </nav>
        </div>
      )}
    </div>
  );
}
```

**Step 3: Create Header**

Create `src/components/layout/Header.tsx`:

```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone } from 'lucide-react';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MobileMenu } from './MobileMenu';

const navItems = [
  { key: 'home', href: '/' },
  { key: 'services', href: '/services' },
  { key: 'about', href: '/about' },
  { key: 'gallery', href: '/gallery' },
  { key: 'blog', href: '/blog' },
  { key: 'contact', href: '/contact' },
] as const;

export function Header() {
  const t = useTranslations('Nav');

  return (
    <header className="sticky top-0 z-50 border-b border-frost-steel/10 bg-frost-white/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl font-black tracking-tight">
            <span className="text-hot-red">HOT</span>
            <span className="text-frost-dark">22</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={item.href}
              className="rounded-md px-3 py-2 text-sm font-medium text-frost-mid transition-colors hover:bg-frost-light hover:text-hot-red"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        {/* Right Side */}
        <div className="hidden items-center gap-3 lg:flex">
          <a
            href="tel:+359893383443"
            className="flex items-center gap-1.5 text-sm font-medium text-frost-mid transition-colors hover:text-hot-red"
          >
            <Phone size={16} />
            089 338 3443
          </a>
          <LanguageSwitcher />
          <Link
            href="/booking"
            className="rounded-radius-btn bg-hot-red px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-hot-red-dark hover:shadow-md"
          >
            {t('booking')}
          </Link>
        </div>

        {/* Mobile Menu */}
        <MobileMenu />
      </div>
    </header>
  );
}
```

**Step 4: Commit**

```bash
git add .
git commit -m "feat: create Header with desktop/mobile navigation and language switcher"
```

---

### Task 7: Create Footer

**Files:**
- Create: `src/components/layout/Footer.tsx`

**Step 1: Create Footer component**

Create `src/components/layout/Footer.tsx`:

```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, MapPin, Clock, MessageCircle } from 'lucide-react';

export function Footer() {
  const t = useTranslations('Footer');
  const tNav = useTranslations('Nav');

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-frost-dark text-frost-steel texture-metal">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <span className="text-3xl font-black tracking-tight">
              <span className="text-hot-red">HOT</span>
              <span className="text-frost-white">22</span>
            </span>
            <p className="mt-4 text-sm leading-relaxed text-frost-steel">
              {t('description')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-frost-white">
              {t('quickLinks')}
            </h3>
            <nav className="flex flex-col gap-2">
              {(['home', 'services', 'about', 'gallery', 'blog', 'contact'] as const).map((key) => (
                <Link
                  key={key}
                  href={key === 'home' ? '/' : `/${key}`}
                  className="text-sm text-frost-steel transition-colors hover:text-hot-red"
                >
                  {tNav(key)}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-frost-white">
              {tNav('contact')}
            </h3>
            <div className="flex flex-col gap-3">
              <a href="tel:+359893383443" className="flex items-start gap-2 text-sm hover:text-hot-red">
                <Phone size={16} className="mt-0.5 shrink-0" />
                089 338 3443
              </a>
              <div className="flex items-start gap-2 text-sm">
                <MapPin size={16} className="mt-0.5 shrink-0" />
                <span>{useTranslations('Contact')('address')}</span>
              </div>
              <div className="flex gap-3 pt-2">
                <a
                  href="https://wa.me/359893383443"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-frost-mid/50 p-2 transition-colors hover:bg-green-600"
                  aria-label="WhatsApp"
                >
                  <MessageCircle size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Working Hours */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-frost-white">
              {t('workingHours')}
            </h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex items-start gap-2">
                <Clock size={16} className="mt-0.5 shrink-0" />
                <div className="flex flex-col gap-1">
                  <span>{t('weekdays')}</span>
                  <span>{t('saturday')}</span>
                  <span>{t('sunday')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 border-t border-frost-mid/30 pt-8 text-center text-xs text-frost-steel">
          &copy; {currentYear} HOT22. {t('rights')}
        </div>
      </div>
    </footer>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: create Footer with contact, links and working hours"
```

---

### Task 8: Assemble locale layout

**Files:**
- Modify: `src/app/[locale]/layout.tsx`
- Create: `src/components/layout/StickyMobileCTA.tsx`

**Step 1: Create StickyMobileCTA**

Create `src/components/layout/StickyMobileCTA.tsx`:

```tsx
'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function StickyMobileCTA() {
  const t = useTranslations('Common');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-frost-steel/10 bg-frost-white/95 backdrop-blur-md lg:hidden">
      <a
        href="tel:+359893383443"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-frost-dark transition-colors active:bg-frost-light"
      >
        <Phone size={18} />
        {t('callUs')}
      </a>
      <div className="w-px bg-frost-steel/20" />
      <a
        href="https://wa.me/359893383443"
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 py-3.5 text-sm font-semibold text-green-600 transition-colors active:bg-frost-light"
      >
        <MessageCircle size={18} />
        WhatsApp
      </a>
    </div>
  );
}
```

**Step 2: Update locale layout**

Replace `src/app/[locale]/layout.tsx`:

```tsx
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { inter } from '@/lib/fonts';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { StickyMobileCTA } from '@/components/layout/StickyMobileCTA';
import '@/app/globals.css';

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata' });

  return {
    title: t('title'),
    description: t('description'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      locale: locale === 'bg' ? 'bg_BG' : 'en_US',
      type: 'website',
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale} className={inter.variable}>
      <body className="flex min-h-screen flex-col pb-[60px] lg:pb-0">
        <NextIntlClientProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <StickyMobileCTA />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Step 3: Verify**

```bash
pnpm dev
```

Should see header + footer + mobile CTA bar.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: assemble locale layout with Header, Footer and mobile CTA"
```

---

## Phase 3: Home Page

### Task 9: Create Hero section

**Files:**
- Create: `src/components/home/Hero.tsx`

**Step 1: Create Hero**

Create `src/components/home/Hero.tsx`:

```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { ArrowRight, ChevronDown } from 'lucide-react';

export function Hero() {
  const t = useTranslations('Hero');

  return (
    <section className="relative overflow-hidden bg-frost-dark texture-metal">
      {/* Temperature gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-hot-red/20 via-transparent to-accent-cool/10" />

      {/* Diagonal red accent */}
      <div className="absolute -left-20 -top-20 h-96 w-96 rotate-12 rounded-3xl bg-hot-red/10 blur-3xl" />
      <div className="absolute -bottom-20 -right-20 h-96 w-96 -rotate-12 rounded-3xl bg-accent-cool/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Title */}
          <h1 className="text-4xl font-black leading-tight tracking-tight text-frost-white sm:text-5xl lg:text-7xl">
            {t('title')}
            <br />
            <span className="text-hot-red">{t('titleAccent')}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-frost-steel sm:text-xl">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="group inline-flex items-center justify-center gap-2 rounded-radius-btn bg-hot-red px-8 py-4 text-lg font-semibold text-white shadow-lg shadow-hot-red/25 transition-all hover:bg-hot-red-dark hover:shadow-xl hover:shadow-hot-red/30"
            >
              {t('cta')}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center justify-center gap-2 rounded-radius-btn border border-frost-steel/30 px-8 py-4 text-lg font-semibold text-frost-white transition-all hover:border-frost-white hover:bg-frost-white/5"
            >
              {t('ctaSecondary')}
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom diagonal cut */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-frost-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: create Hero section with Heat & Frost visual"
```

---

### Task 10: Create Services overview section

**Files:**
- Create: `src/components/home/ServicesOverview.tsx`

**Step 1: Create ServicesOverview**

Create `src/components/home/ServicesOverview.tsx`:

```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import {
  Thermometer,
  Wind,
  Snowflake,
  Droplets,
  Search,
  Wrench,
  ArrowRight,
} from 'lucide-react';

const services = [
  { key: 'repair', icon: Thermometer },
  { key: 'heating', icon: Wind },
  { key: 'ozone', icon: Snowflake },
  { key: 'flush', icon: Droplets },
  { key: 'diagnostics', icon: Search },
  { key: 'components', icon: Wrench },
] as const;

export function ServicesOverview() {
  const t = useTranslations('Services');

  return (
    <section className="py-section-sm sm:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-frost-dark sm:text-4xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-3 text-lg text-frost-mid">
            {t('sectionSubtitle')}
          </p>
        </div>

        {/* Service cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map(({ key, icon: Icon }) => (
            <div
              key={key}
              className="group relative overflow-hidden rounded-radius-card border border-frost-steel/10 bg-frost-white p-6 transition-all hover:border-hot-red/20 hover:shadow-lg hover:shadow-hot-red/5"
            >
              {/* Icon */}
              <div className="mb-4 inline-flex rounded-xl bg-hot-red/10 p-3 text-hot-red transition-colors group-hover:bg-hot-red group-hover:text-white">
                <Icon size={24} />
              </div>

              {/* Content */}
              <h3 className="text-lg font-bold text-frost-dark">
                {t(key)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-frost-mid">
                {t(`${key}Desc`)}
              </p>

              {/* Hover accent line */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-hot-red transition-all duration-300 group-hover:w-full" />
            </div>
          ))}
        </div>

        {/* View all link */}
        <div className="mt-10 text-center">
          <Link
            href="/services"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-hot-red transition-colors hover:text-hot-red-dark"
          >
            {t('viewAll')}
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: create ServicesOverview section with 6 service cards"
```

---

### Task 11: Create "Why HOT22" section

**Files:**
- Create: `src/components/home/WhyUs.tsx`

**Step 1: Create WhyUs**

Create `src/components/home/WhyUs.tsx`:

```tsx
import { useTranslations } from 'next-intl';
import { Award, Cpu, Heart, Zap, Car, Settings } from 'lucide-react';

const advantages = [
  { key: 'experience', icon: Award },
  { key: 'equipment', icon: Cpu },
  { key: 'personal', icon: Heart },
  { key: 'fast', icon: Zap },
  { key: 'allBrands', icon: Car },
  { key: 'fullService', icon: Settings },
] as const;

export function WhyUs() {
  const t = useTranslations('WhyUs');

  return (
    <section className="relative overflow-hidden bg-frost-dark py-section-sm text-frost-white texture-metal sm:py-section">
      {/* Diagonal top */}
      <div className="absolute left-0 right-0 top-0 h-16 bg-frost-white" style={{ clipPath: 'polygon(0 0, 100% 0, 0 100%)' }} />

      <div className="mx-auto max-w-7xl px-4 pt-8 sm:px-6">
        <h2 className="text-center text-3xl font-black tracking-tight sm:text-4xl">
          {t('sectionTitle')}
        </h2>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {advantages.map(({ key, icon: Icon }) => (
            <div key={key} className="flex gap-4">
              <div className="shrink-0 rounded-lg bg-hot-red/20 p-3 text-hot-red">
                <Icon size={24} />
              </div>
              <div>
                <h3 className="font-bold text-frost-white">{t(key)}</h3>
                <p className="mt-1 text-sm leading-relaxed text-frost-steel">
                  {t(`${key}Desc`)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Diagonal bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-frost-white" style={{ clipPath: 'polygon(0 100%, 100% 0, 100% 100%)' }} />
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: create WhyUs section with 6 advantage cards"
```

---

### Task 12: Create Reviews section (static placeholder data)

**Files:**
- Create: `src/components/home/Reviews.tsx`

**Step 1: Create Reviews**

Create `src/components/home/Reviews.tsx`:

```tsx
import { useTranslations } from 'next-intl';
import { Star } from 'lucide-react';

// Placeholder reviews — will be replaced with Supabase data
const placeholderReviews = [
  {
    id: '1',
    name: 'Георги М.',
    rating: 5,
    text: 'Отлично обслужване! Климатикът работи перфектно след зареждането. Препоръчвам!',
    car_model: 'BMW 320d',
  },
  {
    id: '2',
    name: 'Мария К.',
    rating: 5,
    text: 'Много професионален подход. Бързо откриха проблема и го отстраниха. Ще се върна отново.',
    car_model: 'VW Golf 7',
  },
  {
    id: '3',
    name: 'Иван П.',
    rating: 5,
    text: 'Най-добрият сервиз за климатици във Варна. Лично отношение и внимание към детайла.',
    car_model: 'Audi A4',
  },
];

export function Reviews() {
  const t = useTranslations('Reviews');

  return (
    <section className="py-section-sm sm:py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-3xl font-black tracking-tight text-frost-dark sm:text-4xl">
            {t('sectionTitle')}
          </h2>
          <p className="mt-3 text-lg text-frost-mid">{t('sectionSubtitle')}</p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {placeholderReviews.map((review) => (
            <div
              key={review.id}
              className="rounded-radius-card border border-frost-steel/10 bg-frost-white p-6 shadow-sm"
            >
              {/* Stars */}
              <div className="flex gap-0.5">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star key={i} size={18} className="fill-hot-red text-hot-red" />
                ))}
              </div>

              {/* Text */}
              <p className="mt-4 text-sm leading-relaxed text-frost-mid">
                &ldquo;{review.text}&rdquo;
              </p>

              {/* Author */}
              <div className="mt-4 flex items-center justify-between border-t border-frost-light pt-4">
                <span className="font-semibold text-frost-dark">{review.name}</span>
                {review.car_model && (
                  <span className="text-xs text-frost-steel">{review.car_model}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: create Reviews section with placeholder data"
```

---

### Task 13: Create CTA section

**Files:**
- Create: `src/components/home/CTASection.tsx`

**Step 1: Create CTASection**

Create `src/components/home/CTASection.tsx`:

```tsx
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { Phone, ArrowRight } from 'lucide-react';

export function CTASection() {
  const t = useTranslations('CTA');

  return (
    <section className="relative overflow-hidden bg-hot-red py-16 sm:py-20">
      {/* Texture */}
      <div className="absolute inset-0 bg-gradient-to-r from-hot-red-dark/50 via-transparent to-hot-red-dark/50" />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          {t('title')}
        </h2>
        <p className="mt-4 text-lg text-white/80">
          {t('subtitle')}
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/booking"
            className="group inline-flex items-center gap-2 rounded-radius-btn bg-frost-white px-8 py-4 text-lg font-semibold text-hot-red shadow-lg transition-all hover:bg-frost-light hover:shadow-xl"
          >
            {t('button')}
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="tel:+359893383443"
            className="inline-flex items-center gap-2 rounded-radius-btn border-2 border-white/30 px-8 py-4 text-lg font-semibold text-white transition-all hover:border-white hover:bg-white/10"
          >
            <Phone size={20} />
            {t('call')}
          </a>
        </div>
      </div>
    </section>
  );
}
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: create CTA section"
```

---

### Task 14: Assemble Home page

**Files:**
- Modify: `src/app/[locale]/page.tsx`

**Step 1: Compose home page**

Replace `src/app/[locale]/page.tsx`:

```tsx
import { use } from 'react';
import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/home/Hero';
import { ServicesOverview } from '@/components/home/ServicesOverview';
import { WhyUs } from '@/components/home/WhyUs';
import { Reviews } from '@/components/home/Reviews';
import { CTASection } from '@/components/home/CTASection';

type Props = {
  params: Promise<{ locale: string }>;
};

export default function HomePage({ params }: Props) {
  const { locale } = use(params);
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <ServicesOverview />
      <WhyUs />
      <Reviews />
      <CTASection />
    </>
  );
}
```

**Step 2: Verify**

```bash
pnpm dev
```

Visit http://localhost:3000/bg — should see full home page with all sections.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: assemble Home page with all sections"
```

---

## Phase 4: Inner Pages

### Task 15: Create Services listing page

**Files:**
- Create: `src/app/[locale]/services/page.tsx`
- Create: `src/lib/services-data.ts`

**Step 1: Create services data**

Create `src/lib/services-data.ts` with the full list of 15+ services organized by category. Each service has: slug, icon name, category, and translation keys. This will be the source of truth until Supabase is connected.

```typescript
export type ServiceCategory = 'repair' | 'diagnostics' | 'components' | 'cleaning' | 'maintenance';

export interface ServiceItem {
  slug: string;
  icon: string;
  category: ServiceCategory;
}

export const services: ServiceItem[] = [
  { slug: 'repair-recharge', icon: 'Thermometer', category: 'repair' },
  { slug: 'heating-repair', icon: 'Wind', category: 'repair' },
  { slug: 'valve-repair', icon: 'Settings', category: 'repair' },
  { slug: 'ozone-treatment', icon: 'Snowflake', category: 'cleaning' },
  { slug: 'system-flush', icon: 'Droplets', category: 'cleaning' },
  { slug: 'leak-detection', icon: 'Search', category: 'diagnostics' },
  { slug: 'uv-test', icon: 'Sun', category: 'diagnostics' },
  { slug: 'compressor-repair', icon: 'Wrench', category: 'components' },
  { slug: 'condenser-replacement', icon: 'Box', category: 'components' },
  { slug: 'evaporator-replacement', icon: 'AirVent', category: 'components' },
  { slug: 'cabin-filter', icon: 'Filter', category: 'maintenance' },
  { slug: 'refrigerant-r134a-r1234yf', icon: 'Gauge', category: 'repair' },
  { slug: 'radiator-repair', icon: 'CircuitBoard', category: 'components' },
  { slug: 'seasonal-maintenance', icon: 'CalendarCheck', category: 'maintenance' },
  { slug: 'electrical-repair', icon: 'Zap', category: 'components' },
];

export const categories: { key: ServiceCategory; translationKey: string }[] = [
  { key: 'repair', translationKey: 'categoryRepair' },
  { key: 'diagnostics', translationKey: 'categoryDiagnostics' },
  { key: 'components', translationKey: 'categoryComponents' },
  { key: 'cleaning', translationKey: 'categoryCleaning' },
  { key: 'maintenance', translationKey: 'categoryMaintenance' },
];
```

**Step 2: Create services page**

Create `src/app/[locale]/services/page.tsx` that renders all services grouped by category, each linking to `/services/[slug]`.

**Step 3: Add service-specific translations to `messages/bg.json` and `messages/en.json`** under a `"ServicesList"` namespace with keys for each slug's title and description.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: create Services listing page with categories"
```

---

### Task 16: Create individual Service page

**Files:**
- Create: `src/app/[locale]/services/[slug]/page.tsx`

**Step 1: Create dynamic service page**

Uses `generateStaticParams` to pre-render all service slugs. Displays full service description, related services, and CTA to book.

**Step 2: Commit**

```bash
git add .
git commit -m "feat: create individual service pages with SEO"
```

---

### Task 17: Create About page

**Files:**
- Create: `src/app/[locale]/about/page.tsx`

**Step 1: Create About page**

Sections: intro text, mission, equipment/capabilities (placeholder images), team (placeholder). Uses diagonal cuts and the dark/light alternating pattern from the design system.

**Step 2: Commit**

```bash
git add .
git commit -m "feat: create About page"
```

---

### Task 18: Create Gallery page

**Files:**
- Create: `src/app/[locale]/gallery/page.tsx`
- Create: `src/components/gallery/GalleryGrid.tsx`
- Create: `src/components/gallery/Lightbox.tsx`

**Step 1: Create Lightbox component**

Client component with keyboard navigation (Escape to close, arrows to navigate), click-outside-to-close, and swipe support placeholder.

**Step 2: Create GalleryGrid**

Masonry-style responsive grid using CSS columns. Each image opens the Lightbox on click. Uses placeholder images for now.

**Step 3: Create Gallery page**

Composes GalleryGrid with page header.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: create Gallery page with masonry grid and lightbox"
```

---

### Task 19: Create Blog listing and post pages

**Files:**
- Create: `src/app/[locale]/blog/page.tsx`
- Create: `src/app/[locale]/blog/[slug]/page.tsx`
- Create: `src/components/blog/BlogCard.tsx`

**Step 1: Create BlogCard component**

Card with cover image, title, excerpt, date, and "Read more" link.

**Step 2: Create blog listing page**

Grid of BlogCards with placeholder posts. Will be replaced with Supabase data later.

**Step 3: Create blog post page**

Full article layout with cover image, content, share buttons, and related posts.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: create Blog listing and post pages"
```

---

### Task 20: Create Contact page

**Files:**
- Create: `src/app/[locale]/contact/page.tsx`
- Create: `src/components/contact/ContactForm.tsx`
- Create: `src/components/contact/Map.tsx`

**Step 1: Create Map component**

Google Maps embed for HOT22 location (Vladislav Varnenchik Blvd, Varna). Uses an iframe with lazy loading.

**Step 2: Create ContactForm**

Client component using React Hook Form + Zod validation. Fields: name, phone (required), email (optional), message. Submits to `/api/contact` (created later).

**Step 3: Create Contact page**

Two-column layout: left = contact info (address, phone, WhatsApp, Viber, working hours) + Map; right = ContactForm.

**Step 4: Commit**

```bash
git add .
git commit -m "feat: create Contact page with form and Google Maps"
```

---

### Task 21: Create Booking page (multi-step form)

**Files:**
- Create: `src/app/[locale]/booking/page.tsx`
- Create: `src/components/booking/BookingForm.tsx`
- Create: `src/components/booking/StepIndicator.tsx`
- Create: `src/lib/booking-schema.ts`

**Step 1: Create Zod schema**

Create `src/lib/booking-schema.ts`:

```typescript
import { z } from 'zod';

export const bookingSchema = z.object({
  service: z.string().min(1),
  date: z.string().min(1),
  time: z.string().min(1),
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  car_model: z.string().min(2),
  notes: z.string().optional(),
});

export type BookingFormData = z.infer<typeof bookingSchema>;
```

**Step 2: Create StepIndicator**

Visual step indicator (3 steps) with active/completed states using brand colors.

**Step 3: Create BookingForm**

Multi-step client component:
- Step 1: Select service (from services-data.ts list)
- Step 2: Select date (native date picker) + time slot
- Step 3: Personal details (name, phone, email, car model, notes)

Uses React Hook Form with per-step validation. Submits to `/api/booking`.

**Step 4: Create Booking page**

Wraps BookingForm with page header.

**Step 5: Commit**

```bash
git add .
git commit -m "feat: create Booking page with multi-step form"
```

---

## Phase 5: API Routes

### Task 22: Create Booking API route

**Files:**
- Create: `src/app/api/booking/route.ts`

**Step 1: Write the failing test**

Create `src/app/api/booking/__tests__/route.test.ts` that tests: valid booking returns 200, missing fields return 400.

**Step 2: Create API route**

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { bookingSchema } from '@/lib/booking-schema';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const data = bookingSchema.parse(body);

    // TODO: Insert into Supabase when configured
    // const { error } = await supabase.from('bookings').insert(data);

    // TODO: Send email notification

    return NextResponse.json({ success: true, data });
  } catch (error) {
    if (error instanceof Error && error.name === 'ZodError') {
      return NextResponse.json({ success: false, error: 'Invalid data' }, { status: 400 });
    }
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 });
  }
}
```

**Step 3: Commit**

```bash
git add .
git commit -m "feat: create booking API route with Zod validation"
```

---

### Task 23: Create Contact API route

**Files:**
- Create: `src/app/api/contact/route.ts`
- Create: `src/lib/contact-schema.ts`

**Step 1: Create contact schema and route**

Similar pattern to booking: Zod validation, POST handler, Supabase insert placeholder.

**Step 2: Commit**

```bash
git add .
git commit -m "feat: create contact form API route"
```

---

## Phase 6: SEO & Polish

### Task 24: Add JSON-LD structured data

**Files:**
- Create: `src/components/seo/JsonLd.tsx`
- Modify: `src/app/[locale]/layout.tsx`

**Step 1: Create LocalBusiness JSON-LD**

```tsx
export function LocalBusinessJsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'AutoRepair',
    name: 'HOT22 — Автоклиматици Варна',
    image: '/images/og-image.jpg',
    telephone: '+359893383443',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'бул. Владислав Варненчик',
      addressLocality: 'Варна',
      postalCode: '9000',
      addressCountry: 'BG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 43.2141,
      longitude: 27.9147,
    },
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '09:00',
        closes: '18:00',
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: 'Saturday',
        opens: '09:00',
        closes: '14:00',
      },
    ],
    priceRange: '$$',
    url: 'https://hot22.bg',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
```

**Step 2: Add to layout**

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add LocalBusiness JSON-LD structured data"
```

---

### Task 25: Add sitemap and robots.txt

**Files:**
- Create: `src/app/sitemap.ts`
- Create: `src/app/robots.ts`

**Step 1: Create sitemap**

Next.js metadata API sitemap with all pages in both locales.

**Step 2: Create robots.txt**

Allow all, point to sitemap.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add sitemap.xml and robots.txt"
```

---

### Task 26: Add Framer Motion scroll animations

**Files:**
- Create: `src/components/ui/AnimateIn.tsx`

**Step 1: Create reusable AnimateIn wrapper**

```tsx
'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimateIn({ children, className, delay = 0 }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
```

**Step 2: Wrap key sections in AnimateIn**

Add to: ServicesOverview cards, WhyUs cards, Reviews cards, CTASection.

**Step 3: Commit**

```bash
git add .
git commit -m "feat: add scroll animations with Framer Motion"
```

---

### Task 27: Create Supabase migration SQL

**Files:**
- Create: `supabase/migrations/001_initial_schema.sql`

**Step 1: Write migration**

```sql
-- Bookings
CREATE TABLE bookings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  service TEXT NOT NULL,
  date DATE NOT NULL,
  time TEXT NOT NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT,
  car_model TEXT NOT NULL,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Reviews
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  text TEXT NOT NULL,
  car_model TEXT,
  is_published BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Blog Posts
CREATE TABLE blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_bg TEXT NOT NULL,
  title_en TEXT NOT NULL,
  excerpt_bg TEXT NOT NULL,
  excerpt_en TEXT NOT NULL,
  content_bg TEXT NOT NULL,
  content_en TEXT NOT NULL,
  cover_image TEXT,
  is_published BOOLEAN DEFAULT false,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Gallery Images
CREATE TABLE gallery_images (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  url TEXT NOT NULL,
  alt_bg TEXT NOT NULL,
  alt_en TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact Messages
CREATE TABLE contact_messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT NOT NULL,
  message TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Services (dynamic, manageable)
CREATE TABLE services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title_bg TEXT NOT NULL,
  title_en TEXT NOT NULL,
  description_bg TEXT NOT NULL,
  description_en TEXT NOT NULL,
  icon TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('repair', 'diagnostics', 'components', 'cleaning', 'maintenance')),
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS Policies (basic)
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;

-- Public read access for published content
CREATE POLICY "Public can read published reviews" ON reviews FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read published blog posts" ON blog_posts FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read gallery images" ON gallery_images FOR SELECT USING (true);
CREATE POLICY "Public can read active services" ON services FOR SELECT USING (is_active = true);

-- Public can insert bookings and contact messages
CREATE POLICY "Public can create bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Public can create contact messages" ON contact_messages FOR INSERT WITH CHECK (true);
```

**Step 2: Commit**

```bash
git add .
git commit -m "feat: add Supabase initial schema migration"
```

---

### Task 28: Final integration test and cleanup

**Step 1: Run build**

```bash
pnpm build
```

Fix any TypeScript or build errors.

**Step 2: Test all routes manually**

Visit each page in both /bg and /en:
- `/bg` and `/en` — Home
- `/bg/services` and `/en/services` — Services
- `/bg/about` and `/en/about` — About
- `/bg/gallery` and `/en/gallery` — Gallery
- `/bg/blog` and `/en/blog` — Blog
- `/bg/contact` and `/en/contact` — Contact
- `/bg/booking` and `/en/booking` — Booking

**Step 3: Verify mobile responsiveness**

Test at 375px, 768px, 1024px, 1440px widths.

**Step 4: Final commit**

```bash
git add .
git commit -m "chore: final cleanup and integration verification"
```

---

## Summary

| Phase | Tasks | Description |
|-------|-------|-------------|
| 1 | 1-5 | Foundation: Next.js, Tailwind, i18n, Supabase |
| 2 | 6-8 | Layout: Header, Footer, mobile CTA |
| 3 | 9-14 | Home page: Hero, Services, WhyUs, Reviews, CTA |
| 4 | 15-21 | Inner pages: Services, About, Gallery, Blog, Contact, Booking |
| 5 | 22-23 | API routes: Booking, Contact |
| 6 | 24-28 | SEO, animations, Supabase schema, final polish |

**Total: 28 tasks across 6 phases**
