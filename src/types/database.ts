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
