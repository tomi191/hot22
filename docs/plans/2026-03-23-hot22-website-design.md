# HOT22 — Website Design Document

**Date:** 2026-03-23
**Status:** Approved

---

## 1. Business Overview

- **Name:** Автоклиматици HOT22
- **Location:** Владислав Варненчик, бул. „Владислав Варненчик", 9000 Варна
- **Phone:** 089 338 3443
- **Industry:** Автоклиматични услуги — пълен спектър "от А до Я"

## 2. Target Audience & Tone

- **Аудитория:** Микс — ежедневни шофьори + автоентусиасти + чужденци (Варна е туристически град)
- **Тон:** Достъпен, но компетентен — показва експертиза без да плаши
- **Езици:** Български + Английски (i18n)

## 3. Competitive Advantages

- Години опит и специализация
- Бързо обслужване
- Модерна апаратура и техника
- Лично отношение с внимание към детайла
- Работят с всички марки коли
- Пълен спектър услуги — всичко "от-до" на климатичната инсталация

## 4. Brand Identity

### Colors
| Role | Hex | Usage |
|------|-----|-------|
| Primary Red | #DC2626 | CTA бутони, акценти, "hot" side |
| Dark | #1A1A2E | Фонове, header, footer |
| Mid Grey | #374151 | Текст, карти |
| Light | #F8F9FA | Светли секции |
| Accent Cool | #94A3B8 | Вторични елементи, "cool" side |

### Typography
- **Headings:** Bold, industrial character (Inter Black или подобен)
- **Body:** Inter / clean sans-serif
- **Accents:** Monospace за числа/статистики

### Visual Language — "Heat & Frost" Concept
- Diagonal cuts между секциите (не прави линии)
- Subtle texture overlays (метал/carbon fiber) в тъмни секции
- Temperature gradient в hero (топло → студено)
- Micro-animations при scroll с purpose
- Anti-generic: никакви шаблонни automotive layouts

## 5. Full Services List

### Основни услуги
1. Ремонт и зареждане на автоклиматици
2. Почистване и ремонт на парно + сваляне на табло
3. Ремонт на клапи
4. Озониране против миризми и влага
5. Промивка на климатични системи

### Диагностика
6. Диагностика с leak detector (проверка за течове на фреон)
7. UV тест за микро течове

### Компоненти
8. Смяна/ремонт на компресор
9. Смяна на кондензатор
10. Смяна на изпарител
11. Смяна на филтър кабина (поленов филтър)
12. Ремонт на радиатори

### Специализирани
13. Зареждане с R134a и R1234yf
14. Сезонна профилактика (лято/зима)
15. Ремонт на ел. части (вентилатори, датчици, управление)

*Структурата е гъвкава — нови услуги се добавят лесно чрез Supabase.*

## 6. Site Architecture

```
/ (Начало / Home)
├── Hero: temperature split визуал + CTA "Запази час"
├── Услуги overview: 6 ключови карти с custom иконки
├── "Защо HOT22": предимства с числа/факти
├── Последни ревюта от клиенти (от Supabase)
├── CTA лента
└── Footer: контакти + mini карта

/услуги (/services)
├── Overview на всички услуги по категории
└── /услуги/[slug] — отделна страница за всяка услуга (SEO)

/за-нас (/about)
├── История и мисия
├── Екип (placeholders засега)
└── Оборудване/апаратура

/галерия (/gallery)
├── Masonry grid layout
├── Lightbox за преглед
└── Управлявана от Supabase Storage

/блог (/blog)
├── Списък статии с pagination
└── /блог/[slug] — отделна статия (SEO)

/записване (/booking)
├── Стъпкова форма: Услуга → Дата/Час → Лични данни
├── Записва в Supabase
└── Email нотификация

/контакти (/contact)
├── Google Maps embed
├── Форма за контакт
├── WhatsApp / Viber бутони
└── Работно време
```

## 7. Key Features

### Online Booking System
- Multi-step форма (услуга → дата/час → данни за контакт)
- Записва в Supabase `bookings` таблица
- Email нотификация към собственика
- Потвърждение към клиента

### Reviews/Testimonials
- Управлявани от Supabase
- Показват се на началната страница (последни 3-5)
- Отделна секция с всички ревюта

### Blog
- Статии за поддръжка, съвети, сезонни препоръки
- SEO оптимизирани с meta tags, structured data
- Supabase или MDX базирани

### Gallery
- Masonry grid с responsive layout
- Lightbox преглед
- Supabase Storage за изображения
- Lazy loading

### i18n (BG/EN)
- next-intl middleware routing: `/bg/...`, `/en/...`
- Превключване с бутон в header
- SEO: hreflang tags

### Contact & Quick Actions
- Google Maps embed с marker
- WhatsApp бутон (click-to-chat)
- Viber бутон
- Телефон (click-to-call)
- Sticky mobile CTA bar (call + WhatsApp)

## 8. Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 (App Router) | Latest, Turbopack, React 19.2, View Transitions |
| Language | TypeScript | Type safety |
| Styling | Tailwind CSS v4 | Utility-first, fast iteration |
| Animations | Framer Motion | Smooth scroll animations, page transitions |
| Database | Supabase (PostgreSQL) | Bookings, reviews, blog, gallery metadata |
| Storage | Supabase Storage | Gallery images, blog images |
| Forms | React Hook Form + Zod | Validation, type-safe forms |
| i18n | next-intl | Routing-based internationalization |
| Maps | Google Maps Embed API | Location display |
| Icons | Lucide React | Clean, consistent iconography |
| SEO | next/metadata + JSON-LD | Structured data, meta tags |

## 9. Mobile-First Design

- Responsive breakpoints: mobile (default) → tablet (768px) → desktop (1024px) → wide (1440px)
- Sticky bottom bar на мобилни: Call + WhatsApp бутони
- Touch-friendly navigation с hamburger menu
- Оптимизирани изображения с next/image
- Core Web Vitals оптимизация

## 10. SEO Strategy

- Structured data (LocalBusiness JSON-LD)
- Meta tags за всяка страница
- hreflang за BG/EN
- Semantic HTML
- Sitemap.xml + robots.txt
- Open Graph + Twitter Cards
- Blog за long-tail keywords

## 11. Content — Placeholder Strategy

- Реални снимки ще бъдат добавени по-късно (след обработка)
- Placeholder images с правилни aspect ratios
- Текст съдържание на български (основен) + английски
- Иконки за услугите — custom или Lucide

## 12. No Public Pricing

Няма публична ценова листа по стратегически причини (конкуренция). Вместо това:
- CTA "Поискай оферта" или "Свържи се за цена"
- Записването за час е основният conversion path

## 13. Future Enhancements (Not in v1)

- Admin panel за управление на съдържание
- Vercel + GitHub CI/CD deployment
- Online плащания
- SMS нотификации
- Loyalty програма
- Google Reviews интеграция (API)
