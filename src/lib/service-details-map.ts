// Maps service slugs to ServiceDetails translation keys and images
export const serviceDetailsMap: Record<string, { detailKey: string; image: string }> = {
  'repair-recharge': { detailKey: 'repair-recharge', image: '/images/services/recharge.jpg' },
  'heating-repair': { detailKey: 'heating-repair', image: '/images/services/heater.jpg' },
  'ozone-treatment': { detailKey: 'ozone-treatment', image: '/images/services/ozone.jpg' },
  'system-flush': { detailKey: 'system-flush', image: '/images/services/compressor.jpg' },
  'leak-detection': { detailKey: 'leak-detection', image: '/images/services/diagnostics.jpg' },
  'compressor-repair': { detailKey: 'compressor-repair', image: '/images/services/compressor.jpg' },
};

export function hasDetailPage(slug: string): boolean {
  return slug in serviceDetailsMap;
}
