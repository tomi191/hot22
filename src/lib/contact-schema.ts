import { z } from 'zod';

export const contactSchema = z.object({
  name: z.string().min(2),
  phone: z.string().min(8),
  email: z.string().email().optional().or(z.literal('')),
  message: z.string().min(10),
});

export type ContactFormData = z.infer<typeof contactSchema>;
