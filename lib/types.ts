import { z } from 'zod';

// --- 1. User Schema ---
export const UserSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime().or(z.date()),
  email: z.string().email(),
  full_name: z.string().nullable().optional(),
  phone_number: z.string().nullable().optional(),
  credit_score: z.number().int().min(300).max(900).nullable().optional(),
  monthly_income: z.coerce.number().min(0).nullable().optional(), // Ensure number
});

export type User = z.infer<typeof UserSchema>;

// --- 2. Product (Loan) Schema ---
export const ProductSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime().or(z.date()),
  name: z.string().min(1, "Name is required"),
  description: z.string().nullable().optional(),
  provider_name: z.string().min(1, "Provider name is required"),
  
  // Rate APR must be a number (numeric in DB)
  rate_apr: z.coerce.number().min(0, "APR must be positive"), 
  
  processing_fee_percentage: z.coerce.number().default(0),
  min_amount: z.coerce.number().positive(),
  max_amount: z.coerce.number().positive(),
  
  // Min Income must be a number
  min_income: z.coerce.number().min(0).default(0),
  
  min_credit_score: z.coerce.number().int(),
  tenure_months_min: z.coerce.number().int().positive(),
  tenure_months_max: z.coerce.number().int().positive(),
  
  logo_url: z.string().url().nullable().optional(),
  features: z.array(z.string()).default([]), // jsonb
  apply_link: z.string().url().nullable().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

// --- 3. Chat Messages Schema ---
export const ChatMessageRoleEnum = z.enum(['user', 'assistant']);

export const AIChatMessageSchema = z.object({
  id: z.string().uuid(),
  created_at: z.string().datetime().or(z.date()),
  user_id: z.string().uuid().nullable().optional(), // Nullable in case of guest chat or deleted user
  product_id: z.string().uuid().nullable().optional(),
  role: ChatMessageRoleEnum,
  content: z.string().min(1),
});

export type AIChatMessage = z.infer<typeof AIChatMessageSchema>;
