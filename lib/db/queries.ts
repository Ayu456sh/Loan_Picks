import { supabase } from './supabase';
import { Product, ProductSchema } from '@/lib/types';

// Helper to check if we are in a "Demo" environment or missing Supabase keys.
// This prevents the app from crashing during local development or review.
const isMockEnv = !process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('example') || process.env.NEXT_PUBLIC_SUPABASE_URL.includes('placeholder');

// Hardcoded data for development/demo purposes. 
// TODO: Move this to a separate JSON file or seed script in the future to keep this file clean.
const MOCK_PRODUCTS: Product[] = [
    {
        id: '123e4567-e89b-12d3-a456-426614174001',
        created_at: new Date().toISOString(),
        name: 'HDFC Personal Loan',
        provider_name: 'HDFC Bank',
        description: 'Quick personal loans with minimal documentation and fast disbursal.',
        logo_url: 'https://placehold.co/100x100?text=HDFC',
        apply_link: 'https://www.hdfcbank.com',
        rate_apr: 10.5,
        processing_fee_percentage: 1.5,
        min_credit_score: 720,
        min_amount: 50000,
        max_amount: 4000000,
        min_income: 25000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Instant Approval', 'No Collateral', 'Flexible Tenure'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174002',
        created_at: new Date().toISOString(),
        name: 'SBI Xpress Credit',
        provider_name: 'SBI',
        description: 'Low interest personal loans for salaried employees.',
        logo_url: 'https://placehold.co/100x100?text=SBI',
        apply_link: 'https://sbi.co.in',
        rate_apr: 9.6,
        processing_fee_percentage: 1.0,
        min_credit_score: 700,
        min_amount: 25000,
        max_amount: 2000000,
        min_income: 20000,
        tenure_months_min: 6,
        tenure_months_max: 72,
        features: ['Low Rates', 'Govt Employee discount', 'Zero Prepayment'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174003',
        created_at: new Date().toISOString(),
        name: 'ICICI Personal Loan',
        provider_name: 'ICICI Bank',
        description: 'Get personal loans up to 50 Lakhs with 3 second disbursal for select customers.',
        logo_url: 'https://placehold.co/100x100?text=ICICI',
        apply_link: 'https://www.icicibank.com',
        rate_apr: 10.75,
        processing_fee_percentage: 2.0,
        min_credit_score: 730,
        min_amount: 50000,
        max_amount: 5000000,
        min_income: 30000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Fast Disbursal', 'Digital Process'],
    },
     {
        id: '123e4567-e89b-12d3-a456-426614174004',
        created_at: new Date().toISOString(),
        name: 'Bajaj Finserv Flexi',
        provider_name: 'Bajaj Finserv',
        description: 'Unique Flexi Loan facility - withdraw and prepay as per your need.',
        logo_url: 'https://placehold.co/100x100?text=Bajaj',
        apply_link: 'https://www.bajajfinserv.in',
        rate_apr: 12.0,
        processing_fee_percentage: 2.5,
        min_credit_score: 685,
        min_amount: 30000,
        max_amount: 3500000,
        min_income: 25000,
        tenure_months_min: 12,
        tenure_months_max: 84,
        features: ['Flexi Withdrawals', 'Pay Interest Only EMI'],
    },
     {
        id: '123e4567-e89b-12d3-a456-426614174005',
        created_at: new Date().toISOString(),
        name: 'Kotak Mahindra PL',
        provider_name: 'Kotak Bank',
        description: 'Personal loans for all your needs with quick processing.',
        logo_url: 'https://placehold.co/100x100?text=Kotak',
        apply_link: 'https://www.kotak.com',
        rate_apr: 10.99,
        processing_fee_percentage: 1.75,
        min_credit_score: 710,
        min_amount: 50000,
        max_amount: 2500000,
        min_income: 25000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Part Prepayment', 'Quick Approval'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174006',
        created_at: new Date().toISOString(),
        name: 'Axis Bank Personal Loan',
        provider_name: 'Axis Bank',
        description: '24x7 Personal Loans with minimal documentation.',
        logo_url: 'https://placehold.co/100x100?text=Axis',
        apply_link: 'https://www.axisbank.com',
        rate_apr: 10.49,
        processing_fee_percentage: 1.5,
        min_credit_score: 720,
        min_amount: 50000,
        max_amount: 1500000,
        min_income: 15000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Quick Disbursal', 'Minimal Docs'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174007',
        created_at: new Date().toISOString(),
        name: 'IDFC First Bank Loan',
        provider_name: 'IDFC First',
        description: 'Paperless personal loans giving you complete peace of mind.',
        logo_url: 'https://placehold.co/100x100?text=IDFC',
        apply_link: 'https://www.idfcfirstbank.com',
        rate_apr: 10.99,
        processing_fee_percentage: 2.0,
        min_credit_score: 700,
        min_amount: 20000,
        max_amount: 1000000,
        min_income: 20000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Paperless', 'Flexible Tenure'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174008',
        created_at: new Date().toISOString(),
        name: 'Tata Capital PL',
        provider_name: 'Tata Capital',
        description: 'Multi-purpose personal loans for all your financial needs.',
        logo_url: 'https://placehold.co/100x100?text=Tata',
        apply_link: 'https://www.tatacapital.com',
        rate_apr: 11.25,
        processing_fee_percentage: 2.25,
        min_credit_score: 680,
        min_amount: 75000,
        max_amount: 2500000,
        min_income: 20000,
        tenure_months_min: 12,
        tenure_months_max: 72,
        features: ['Overdraft Facility', 'No Collateral'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174009',
        created_at: new Date().toISOString(),
        name: 'IndusInd Bank PL',
        provider_name: 'IndusInd Bank',
        description: 'Personal loans with simple eligibility and quick processing.',
        logo_url: 'https://placehold.co/100x100?text=IndusInd',
        apply_link: 'https://www.indusind.com',
        rate_apr: 11.0,
        processing_fee_percentage: 2.5,
        min_credit_score: 700,
        min_amount: 30000,
        max_amount: 1500000,
        min_income: 25000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Quick Processing', 'Easy Repayment'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174010',
        created_at: new Date().toISOString(),
        name: 'Yes Bank PL',
        provider_name: 'Yes Bank',
        description: 'Fulfill your dreams with Yes Bank Personal Loans.',
        logo_url: 'https://placehold.co/100x100?text=YesBank',
        apply_link: 'https://www.yesbank.in',
        rate_apr: 10.75,
        processing_fee_percentage: 1.0,
        min_credit_score: 720,
        min_amount: 100000,
        max_amount: 4000000,
        min_income: 30000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Part Prepayment', 'Balance Transfer'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174011',
        created_at: new Date().toISOString(),
        name: 'Standard Chartered PL',
        provider_name: 'Standard Chartered',
        description: 'Get personal loans online with attractive interest rates.',
        logo_url: 'https://placehold.co/100x100?text=SC',
        apply_link: 'https://www.sc.com/in',
        rate_apr: 11.5,
        processing_fee_percentage: 2.5,
        min_credit_score: 750,
        min_amount: 100000,
        max_amount: 5000000,
        min_income: 50000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Online Approval', 'Top-up Loan'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174012',
        created_at: new Date().toISOString(),
        name: 'Fullerton India PL',
        provider_name: 'Fullerton',
        description: 'Flexible personal loans for salaried and self-employed.',
        logo_url: 'https://placehold.co/100x100?text=Fullerton',
        apply_link: 'https://www.fullertonindia.com',
        rate_apr: 12.5,
        processing_fee_percentage: 3.0,
        min_credit_score: 650,
        min_amount: 50000,
        max_amount: 2500000,
        min_income: 20000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['InstaLoan App', 'Document Pickup'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174013',
        created_at: new Date().toISOString(),
        name: 'Aditya Birla Capital',
        provider_name: 'Aditya Birla',
        description: 'Instant personal loans up to 50 Lakhs.',
        logo_url: 'https://placehold.co/100x100?text=Birla',
        apply_link: 'https://www.adityabirlacapital.com',
        rate_apr: 13.0,
        processing_fee_percentage: 2.0,
        min_credit_score: 680,
        min_amount: 50000,
        max_amount: 5000000,
        min_income: 25000,
        tenure_months_min: 12,
        tenure_months_max: 84,
        features: ['Fully Digital', 'Flexible Repayment'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174014',
        created_at: new Date().toISOString(),
        name: 'Federal Bank FedPremia',
        provider_name: 'Federal Bank',
        description: 'Exclusive personal loan for premium customers.',
        logo_url: 'https://placehold.co/100x100?text=Federal',
        apply_link: 'https://www.federalbank.co.in',
        rate_apr: 10.25,
        processing_fee_percentage: 1.0,
        min_credit_score: 750,
        min_amount: 100000,
        max_amount: 2500000,
        min_income: 50000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Low Processing Fee', 'Quick Sanction'],
    },
    {
        id: '123e4567-e89b-12d3-a456-426614174015',
        created_at: new Date().toISOString(),
        name: 'IDBI Bank PL',
        provider_name: 'IDBI Bank',
        description: 'Personal loans for salaried individuals with salary account.',
        logo_url: 'https://placehold.co/100x100?text=IDBI',
        apply_link: 'https://www.idbibank.in',
        rate_apr: 11.5,
        processing_fee_percentage: 1.0,
        min_credit_score: 700,
        min_amount: 25000,
        max_amount: 500000,
        min_income: 15000,
        tenure_months_min: 12,
        tenure_months_max: 60,
        features: ['Salary Overdraft', 'Simplified Docs'],
    }
];

export async function getTopLoans(limit = 5): Promise<Product[]> {
  if (isMockEnv) {
      return MOCK_PRODUCTS.slice(0, limit);
  }
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('rate_apr', { ascending: true })
    .limit(limit);

  if (error) {
    console.error('Error fetching top loans:', error);
    return [];
  }

  // Parse with Zod
  const loans = data.map(d => ProductSchema.safeParse(d));
  
  const validLoans = loans
    .filter(result => result.success)
    .map(result => result.data!);
    
  return validLoans;
}

export interface LoanFilterOptions {
  search?: string;
  maxApr?: number;
  minScore?: number;
  minIncome?: number;
}

export async function getAllLoans(filters?: LoanFilterOptions): Promise<Product[]> {
  if (isMockEnv) {
      console.log('Using Mock Data for getAllLoans');
      let loans = [...MOCK_PRODUCTS];

      if (filters?.search) {
          const q = filters.search.toLowerCase();
          loans = loans.filter(l => 
              l.name.toLowerCase().includes(q) || 
              l.provider_name.toLowerCase().includes(q)
          );
      }
      if (filters?.maxApr) {
          loans = loans.filter(l => l.rate_apr <= filters.maxApr!);
      }
      if (filters?.minScore) {
          loans = loans.filter(l => l.min_credit_score <= filters.minScore!);
      }
      if (filters?.minIncome) {
        loans = loans.filter(l => l.min_income <= filters.minIncome!);
      }
      return loans;
  }
  
  let query = supabase
    .from('products')
    .select('*')
    .order('rate_apr', { ascending: true }); // Default sort by APR

  if (filters?.search) {
    // Search by name or provider
    query = query.or(`name.ilike.%${filters.search}%,provider_name.ilike.%${filters.search}%`);
  }

  if (filters?.maxApr) {
    query = query.lte('rate_apr', filters.maxApr);
  }

  if (filters?.minScore) {
    // Show loans allowing this credit score (min_credit_score <= input)
    query = query.lte('min_credit_score', filters.minScore);
  }

  if (filters?.minIncome) {
    query = query.lte('min_income', filters.minIncome);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching loans:', error);
    return [];
  }

  return data
    .map(d => ProductSchema.safeParse(d))
    .filter(r => r.success)
    .map(r => r.data!);
}

export async function getLoanById(id: string): Promise<Product | null> {
  if (isMockEnv) {
      console.log('Using Mock Data for getLoanById', id);
      return MOCK_PRODUCTS.find(p => p.id === id) || null;
  }
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('id', id)
    .single();

  if (error || !data) {
    return null;
  }

  const result = ProductSchema.safeParse(data);
  if (!result.success) {
    console.error('Validation error for loan:', result.error);
    return null;
  }
  
  return result.data;
}
