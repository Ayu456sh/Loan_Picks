import { getAllLoans } from '@/lib/db/queries';
import { TopList } from '@/components/loans/top-list';
import { LoanFilters } from '@/components/loans/loan-filters';
import { EmptyState } from '@/components/ui/empty-state';
import { Suspense } from 'react';

export const revalidate = 0; // Dynamic page, always fetch fresh data based on filters

interface ProductPageProps {
  searchParams: {
    search?: string;
    maxApr?: string;
    minScore?: string;
    minIncome?: string;
  }
}

export default async function ProductsPage({ searchParams }: ProductPageProps) {
  const filters = {
    search: searchParams.search,
    maxApr: searchParams.maxApr ? parseFloat(searchParams.maxApr) : undefined,
    minScore: searchParams.minScore ? parseInt(searchParams.minScore) : undefined,
    minIncome: searchParams.minIncome ? parseInt(searchParams.minIncome) : undefined,
  };

  const loans = await getAllLoans(filters);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Sidebar: Filters */}
        <div className="w-full md:w-64 flex-shrink-0">
            <Suspense fallback={<div className="h-64 bg-muted animate-pulse rounded-lg" />}>
                <LoanFilters />
            </Suspense>
        </div>

        {/* Right Grid: Results */}
        <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold">All Products</h1>
                <p className="text-muted-foreground">{loans.length} results found</p>
            </div>
            
            {loans.length > 0 ? (
                <TopList loans={loans} />
            ) : (
                <EmptyState 
                    title="No loans found" 
                    description="We couldn't find any loans matching your specific criteria. Try lowering the credit score or increasing the APR limit."
                />
            )}
        </div>
      </div>
    </div>
  );
}
