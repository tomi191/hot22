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

export const categories: { key: ServiceCategory }[] = [
  { key: 'repair' },
  { key: 'diagnostics' },
  { key: 'components' },
  { key: 'cleaning' },
  { key: 'maintenance' },
];
