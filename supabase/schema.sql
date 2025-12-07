-- Drop tables if they exist to ensure clean slate (for dev only)
drop table if exists public.ai_chat_messages;
drop table if exists public.products;
drop table if exists public.users;

-- 1. Users Table
create table public.users (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  email text unique not null,
  full_name text,
  phone_number text,
  credit_score integer,
  monthly_income numeric,
  
  constraint email_format check (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
  constraint credit_score_range check (credit_score is null or (credit_score between 300 and 900)),
  constraint income_positive check (monthly_income is null or monthly_income >= 0)
);

-- 2. Products (Loans) Table
create table public.products (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  description text,
  provider_name text not null, -- e.g., "HDFC Bank"
  rate_apr numeric not null, -- Renamed from interest_rate_percentage
  processing_fee_percentage numeric default 0,
  min_amount numeric not null,
  max_amount numeric not null,
  min_income numeric default 0, -- New field
  min_credit_score integer not null,
  tenure_months_min integer not null,
  tenure_months_max integer not null,
  logo_url text,
  features jsonb default '[]'::jsonb, -- Array of strings e.g. ["Low APR", "Instant Approval"]
  apply_link text,
  
  constraint rate_apr_positive check (rate_apr >= 0),
  constraint amount_range check (max_amount >= min_amount),
  constraint tenure_range check (tenure_months_max >= tenure_months_min)
);

-- 3. AI Chat Messages Table
create table public.ai_chat_messages (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references public.users(id) on delete cascade,
  product_id uuid references public.products(id) on delete set null, -- Optional context
  role text not null check (role in ('user', 'assistant')),
  content text not null
);

-- RLS Policies
alter table public.users enable row level security;
alter table public.products enable row level security;
alter table public.ai_chat_messages enable row level security;

-- Public can read products
create policy "Allow public read access products" on public.products for select using (true);

-- Mock Data Seed (Indian Context)
insert into public.products 
(name, provider_name, description, rate_apr, min_amount, max_amount, min_income, min_credit_score, tenure_months_min, tenure_months_max, features, logo_url, apply_link)
values
('HDFC Personal Loan', 'HDFC Bank', 'Get funds in 10 seconds for pre-approved customers.', 10.50, 50000, 4000000, 25000, 720, 12, 60, '["Fast Disbursal", "Competitive Rates"]'::jsonb, 'https://placehold.co/100x100?text=HDFC', '#'),
('SBI Home Loan', 'SBI', 'Lowest interest rates for home buyers.', 8.40, 100000, 10000000, 30000, 700, 60, 360, '["Low APR", "No Hidden Fees"]'::jsonb, 'https://placehold.co/100x100?text=SBI', '#'),
('ICICI Car Loan', 'ICICI Bank', 'Drive your dream car today.', 9.00, 100000, 5000000, 20000, 650, 12, 84, '["100% On-Road Funding", "Quick Processing"]'::jsonb, 'https://placehold.co/100x100?text=ICICI', '#'),
('Bajaj Finserv Personal Loan', 'Bajaj Finserv', 'Instant approval within minutes.', 11.00, 30000, 2500000, 22000, 680, 12, 60, '["Instant Approval", "Flexi Loan"]'::jsonb, 'https://placehold.co/100x100?text=Bajaj', '#'),
('Kotak Mahogany Home Loan', 'Kotak Mahindra', 'Luxury home loans for high net worth individuals.', 8.75, 5000000, 50000000, 100000, 750, 120, 240, '["Doorstep Service", "Dedicated RM"]'::jsonb, 'https://placehold.co/100x100?text=Kotak', '#'),
('Axis Education Loan', 'Axis Bank', 'Fund your higher education in India or abroad.', 10.00, 50000, 7500000, 0, 0, 60, 180, '["100% Financing", "Moratorium Period"]'::jsonb, 'https://placehold.co/100x100?text=Axis', '#'),
('IDFC First Personal Loan', 'IDFC First Bank', 'Paperless digital process.', 10.49, 20000, 10000000, 30000, 700, 6, 60, '["Paperless", "No Collateral"]'::jsonb, 'https://placehold.co/100x100?text=IDFC', '#'),
('Tata Capital Used Car Loan', 'Tata Capital', 'Loans for pre-owned cars.', 12.50, 50000, 5000000, 20000, 650, 12, 60, '["High LTV", "Flexible Terms"]'::jsonb, 'https://placehold.co/100x100?text=Tata', '#'),
('IndusInd Two Wheeler Loan', 'IndusInd Bank', 'Ride away on your new bike.', 14.00, 15000, 200000, 10000, 600, 12, 36, '["Low Down Payment", "Minimal Docs"]'::jsonb, 'https://placehold.co/100x100?text=IndusInd', '#'),
('Standard Chartered Credit Card Loan', 'Standard Chartered', 'Loan against credit limit.', 13.00, 50000, 1500000, 50000, 740, 6, 48, '["Pre-approved", "No Docs"]'::jsonb, 'https://placehold.co/100x100?text=SC', '#');
