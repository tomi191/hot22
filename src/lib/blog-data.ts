export interface BlogPost {
  slug: string;
  title_bg: string;
  title_en: string;
  excerpt_bg: string;
  excerpt_en: string;
  content_bg: string;
  content_en: string;
  date: string;
}

export const placeholderPosts: BlogPost[] = [
  {
    slug: 'kogda-da-zaredite-klimatika',
    title_bg: 'Кога да заредите климатика на колата?',
    title_en: 'When to Recharge Your Car AC?',
    excerpt_bg:
      'Научете кога е подходящият момент за зареждане на автоклиматика и какви са признаците, че системата се нуждае от обслужване.',
    excerpt_en:
      'Learn when is the right time to recharge your car AC and what signs indicate the system needs servicing.',
    content_bg:
      'Климатичната система на вашия автомобил се нуждае от редовна поддръжка. Ако забележите, че въздухът от климатика не е достатъчно студен, чувате необичайни шумове или усещате неприятна миризма, това са сигнали, че е време за сервизно обслужване. Препоръчваме проверка на климатичната система поне веднъж годишно, най-добре преди началото на летния сезон. Навременната поддръжка предотвратява скъпоструващи ремонти и осигурява комфорт по време на шофиране.',
    content_en:
      'Your car air conditioning system needs regular maintenance. If you notice the air from the AC is not cold enough, hear unusual noises, or detect an unpleasant smell, these are signals that it is time for service. We recommend checking the climate system at least once a year, preferably before the start of the summer season. Timely maintenance prevents costly repairs and ensures comfort while driving.',
    date: '2026-03-15',
  },
  {
    slug: 'ozoniranie-predimstva',
    title_bg: 'Предимства на озонирането на автомобила',
    title_en: 'Benefits of Car Ozone Treatment',
    excerpt_bg:
      'Озонирането е ефективен метод за премахване на миризми и бактерии от купето. Научете повече за ползите.',
    excerpt_en:
      'Ozone treatment is an effective method for removing odors and bacteria from the cabin. Learn more about the benefits.',
    content_bg:
      'Озонирането е процес, при който озон газ се използва за дезинфекция на купето на автомобила. Озонът е мощен окислител, който унищожава бактерии, вируси и гъбички. Той прониква навсякъде — в тапицерията, килимите, вентилационната система. След третирането миризмите от цигари, домашни любимци или влага изчезват напълно. Процедурата е бърза, безопасна и не оставя химически остатъци.',
    content_en:
      'Ozone treatment is a process where ozone gas is used to disinfect the car cabin. Ozone is a powerful oxidizer that destroys bacteria, viruses, and fungi. It penetrates everywhere — into the upholstery, carpets, and ventilation system. After treatment, odors from cigarettes, pets, or moisture disappear completely. The procedure is quick, safe, and leaves no chemical residues.',
    date: '2026-03-01',
  },
  {
    slug: 'sezonni-saveti-klimatik',
    title_bg: 'Сезонни съвети за вашия автоклиматик',
    title_en: 'Seasonal Tips for Your Car AC',
    excerpt_bg:
      'Подгответе климатичната система за лятото или зимата с нашите практични съвети.',
    excerpt_en:
      'Prepare your climate system for summer or winter with our practical tips.',
    content_bg:
      'С настъпването на новия сезон е важно да проверите климатичната система на вашия автомобил. Преди лятото се уверете, че фреонът е на правилното ниво, филтрите са чисти и няма течове. Преди зимата проверете работата на парното и клапите. Редовната профилактика удължава живота на компонентите и гарантира ефективна работа на системата целогодишно. Не чакайте проблемът да се влоши — навременната проверка спестява време и пари.',
    content_en:
      'With the arrival of a new season, it is important to check the climate system of your car. Before summer, make sure the refrigerant is at the correct level, filters are clean, and there are no leaks. Before winter, check the heater and valves. Regular maintenance extends the life of components and ensures efficient system operation year-round. Do not wait for the problem to worsen — timely inspection saves time and money.',
    date: '2026-02-15',
  },
];
