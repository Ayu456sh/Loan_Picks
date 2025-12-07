'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';

// I will implement a custom hook inside this file to be self-contained and safe.

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

export function LoanFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // State
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [maxApr, setMaxApr] = useState(searchParams.get('maxApr') || '20');
  const [minScore, setMinScore] = useState(searchParams.get('minScore') || '');
  const [minIncome, setMinIncome] = useState(searchParams.get('minIncome') || '');

  // Debounce
  const debouncedSearch = useDebouncedValue(search, 500);
  const debouncedApr = useDebouncedValue(maxApr, 500);
  const debouncedScore = useDebouncedValue(minScore, 500);
  const debouncedIncome = useDebouncedValue(minIncome, 500);

  // Sync with URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (debouncedSearch) params.set('search', debouncedSearch);
    else params.delete('search');

    if (debouncedApr && debouncedApr !== '20') params.set('maxApr', debouncedApr);
    else params.delete('maxApr');
    
    if (debouncedScore) params.set('minScore', debouncedScore);
    else params.delete('minScore');

    if (debouncedIncome) params.set('minIncome', debouncedIncome);
    else params.delete('minIncome');

    router.push(`/products?${params.toString()}`);
  }, [debouncedSearch, debouncedApr, debouncedScore, debouncedIncome, router, searchParams]);

  const clearFilters = () => {
    setSearch('');
    setMaxApr('20');
    setMinScore('');
    setMinIncome('');
    router.push('/products');
  };

  return (
    <Card className="h-fit sticky top-4 border-none shadow-none bg-transparent sm:bg-card sm:border sm:shadow-sm">
      <CardHeader className="px-0 sm:px-6">
        <div className="flex items-center justify-between">
            <CardTitle>Filters</CardTitle>
            {(search || minScore || minIncome || maxApr !== '20') && (
                <Button variant="ghost" size="sm" onClick={clearFilters} className="h-8 px-2 text-xs text-muted-foreground hover:text-destructive">
                    Clear <X className="ml-1 w-3 h-3" />
                </Button>
            )}
        </div>
      </CardHeader>
      <CardContent className="space-y-6 px-0 sm:px-6">
        {/* Search */}
        <div className="space-y-2">
            <Label>Bank / Provider</Label>
            <Input 
                placeholder="e.g. HDFC" 
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
        </div>

        {/* APR Slider */}
        <div className="space-y-2">
            <div className="flex justify-between">
                <Label>Max APR</Label>
                <span className="text-sm text-muted-foreground font-medium">{maxApr}%</span>
            </div>
            <input 
                type="range" 
                min="5" 
                max="20" 
                step="0.5"
                value={maxApr}
                onChange={(e) => setMaxApr(e.target.value)}
                className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground">
                <span>5%</span>
                <span>20%</span>
            </div>
        </div>

        {/* Credit Score */}
        <div className="space-y-2">
            <Label>Min Credit Score</Label>
            <Input 
                type="number" 
                placeholder="e.g. 750" 
                value={minScore}
                onChange={(e) => setMinScore(e.target.value)}
            />
        </div>

        {/* Minimum Income */}
        <div className="space-y-2">
            <Label>Minimum Income (₹)</Label>
            <Input 
                type="number" 
                placeholder="e.g. 25000" 
                value={minIncome}
                onChange={(e) => setMinIncome(e.target.value)}
            />
        </div>
      </CardContent>
    </Card>
  );
}
