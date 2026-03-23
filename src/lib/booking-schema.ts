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
