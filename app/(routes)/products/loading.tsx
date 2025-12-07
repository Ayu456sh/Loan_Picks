import { LoanCardSkeleton } from '@/components/loans/loan-card-skeleton';
import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8 items-start">
        {/* Left Sidebar Skeleton */}
        <div className="w-full md:w-64 flex-shrink-0 space-y-4">
            <Skeleton className="h-64 w-full rounded-lg" />
        </div>

        {/* Right Grid Skeleton */}
        <div className="flex-1 space-y-6">
            <div className="flex justify-between items-center">
                <Skeleton className="h-10 w-48" />
                <Skeleton className="h-5 w-32" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                    <LoanCardSkeleton key={i} />
                ))}
            </div>
        </div>
      </div>
    </div>
  );
}
