'use client';

import { Product } from '@/lib/types';
import { LoanCard } from './loan-card';

interface TopListProps {
  loans: Product[];
}

export function TopList({ loans }: TopListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {loans.map((loan) => (
        <LoanCard key={loan.id} loan={loan} />
      ))}
    </div>
  );
}
