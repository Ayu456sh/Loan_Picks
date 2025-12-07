'use client';

import { Input } from '@/components/ui/input';
import { useRouter, useSearchParams } from 'next/navigation';
// I'll write simple debounce manually to avoid install
import { useEffect, useState } from 'react';

export function LoanSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [term, setTerm] = useState(searchParams.get('q') || '');

  useEffect(() => {
    const timer = setTimeout(() => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set('q', term);
        } else {
            params.delete('q');
        }
        router.push(`/loans?${params.toString()}`);
    }, 500);
    return () => clearTimeout(timer);
  }, [term, router, searchParams]);

  return (
    <div className="max-w-md w-full mb-8">
        <Input 
            placeholder="Search loans..." 
            value={term}
            onChange={(e) => setTerm(e.target.value)}
        />
    </div>
  );
}
