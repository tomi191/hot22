export interface ContentBlock {
  type: 'heading' | 'paragraph';
  text: string;
  id?: string; // for anchor links (TOC)
}

export function parseBlogContent(raw: string): ContentBlock[] {
  const paragraphs = raw.split('\n\n').filter(p => p.trim());

  return paragraphs.map(p => {
    const trimmed = p.trim();

    // Detect headings: lines that are short (< 100 chars) and either:
    // - Start with a number followed by period: "1. Nисък фреон"
    // - Are questions (end with ?) and don't contain full stops mid-sentence
    // - Match known heading patterns from blog content
    const isNumberedHeading = /^\d+\.\s/.test(trimmed) && trimmed.length < 100;
    const isQuestionHeading = trimmed.endsWith('?') && trimmed.length < 100 && !trimmed.includes('. ');
    const knownHeadingPatterns = [
      /^Какво да направите/,
      /^Защо професионалн/,
      /^Кога е нужно/,
      /^Как работи/,
      /^Видове фреон/,
      /^Колко често/,
      /^Признаци/,
      /^Причини/,
      /^Решение/,
      /^Заключение/,
      /^Подготовка/,
      /^Стъпка/,
      /^Защо мирише/,
      /^Замърсен кабинен филтър$/,
      /^Натрупан конденз$/,
      /^Миризма от цигарен дим$/,
      /^Как да предотвратите проблема/,
      /^What Should You Do/,
      /^Why Does It Smell/,
      /^Dirty Cabin Filter$/,
      /^Trapped Condensation$/,
      /^Cigarette Smoke Odor$/,
      /^When Is Ozone Treatment Needed/,
      /^How to Prevent the Problem/,
    ];
    const matchesKnown = knownHeadingPatterns.some(pat => pat.test(trimmed));

    const isHeading = isNumberedHeading || isQuestionHeading || matchesKnown;

    if (isHeading) {
      const id = trimmed
        .toLowerCase()
        .replace(/^\d+\.\s*/, '')
        .replace(/[^a-zа-яёъьюяА-Яа-я0-9\s]/gi, '')
        .replace(/\s+/g, '-')
        .slice(0, 50);
      return { type: 'heading' as const, text: trimmed, id };
    }

    return { type: 'paragraph' as const, text: trimmed };
  });
}

export function extractHeadings(blocks: ContentBlock[]): ContentBlock[] {
  return blocks.filter(b => b.type === 'heading');
}

export function estimateReadingTime(text: string): number {
  const words = text.split(/\s+/).length;
  return Math.max(1, Math.ceil(words / 200)); // ~200 words per minute
}
