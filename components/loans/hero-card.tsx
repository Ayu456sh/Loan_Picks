'use client';

import { Product } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import { ChatSheet } from '@/components/chat/chat-sheet';

interface HeroCardProps {
  loan: Product;
}

export function HeroCard({ loan }: HeroCardProps) {
  return (
    <Card className="w-full bg-gradient-to-br from-indigo-50 to-white border-indigo-100 dark:from-slate-900 dark:to-slate-800 dark:border-indigo-900 overflow-hidden relative shadow-md">
      {/* Best Match Badge */}
      <div className="absolute top-0 right-0 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg z-10 flex items-center gap-1">
        <Star className="w-3 h-3 fill-white" />
        BEST MATCH
      </div>

      <div className="grid md:grid-cols-3 gap-6 p-6">
        {/* Left: Branding & Core Info */}
        <div className="flex flex-col gap-4">
             <div className="flex items-center gap-3">
                {loan.logo_url && (
                    <div className="relative w-16 h-16 rounded-xl border bg-white p-1">
                         <Image 
                            src={loan.logo_url} 
                            alt={loan.name} 
                            fill 
                            className="object-contain"
                            unoptimized
                        />
                    </div>
                )}
                <div>
                     <h3 className="font-bold text-2xl text-indigo-950 dark:text-indigo-100">{loan.name}</h3>
                     <p className="text-sm text-muted-foreground">{loan.provider_name}</p>
                </div>
             </div>
             <div>
                <Badge variant="outline" className="bg-indigo-100 text-indigo-700 hover:bg-indigo-100 border-indigo-200">
                    Recommended for you
                </Badge>
             </div>
        </div>

        {/* Middle: Key Stats */}
        <div className="flex flex-col justify-center space-y-4 border-l pl-6 border-dashed border-indigo-200 dark:border-indigo-800">
            <div className="grid grid-cols-2 gap-y-4">
                <div>
                    <p className="text-sm text-muted-foreground">Interest Rate</p>
                    <p className="text-3xl font-extrabold text-indigo-600">{formatPercentage(loan.rate_apr)}</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Max Amount</p>
                    <p className="text-xl font-bold">{formatCurrency(loan.max_amount)}</p>
                </div>
                 <div>
                    <p className="text-sm text-muted-foreground">Tenure</p>
                    <p className="font-medium">{loan.tenure_months_min}-{loan.tenure_months_max} mos</p>
                </div>
                <div>
                    <p className="text-sm text-muted-foreground">Min Income</p>
                    <p className="font-medium">{formatCurrency(loan.min_income)}</p>
                </div>
            </div>
        </div>

        {/* Right: Actions & Features */}
        <div className="flex flex-col justify-between gap-4">
             <div className="space-y-2">
                <p className="text-sm font-semibold mb-2">Key Features:</p>
                {loan.features.slice(0, 3).map((feature, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className="w-4 h-4 text-green-500" />
                        {feature}
                    </div>
                ))}
             </div>
             
             <div className="flex flex-col gap-3 mt-4">
                <Button size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 shadow-indigo-200 dark:shadow-none" asChild>
                    <Link href={loan.apply_link || '#'}>
                        Apply Now <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                </Button>
                <ChatSheet loan={loan} trigger={
                     <Button variant="outline" className="w-full">
                        Ask About Product
                    </Button>
                } />
             </div>
        </div>
      </div>
    </Card>
  );
}
