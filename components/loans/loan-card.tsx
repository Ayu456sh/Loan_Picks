'use client';

import { Product } from '@/lib/types';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { formatCurrency, formatPercentage } from '@/lib/utils';
import Image from 'next/image';
import Link from 'next/link';
import { ChatSheet } from '@/components/chat/chat-sheet';


interface LoanCardProps {
  loan: Product;
}

export function LoanCard({ loan }: LoanCardProps) {
  return (
    <Card className="flex flex-col h-full hover:shadow-lg transition-shadow duration-200">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        {loan.logo_url && (
            <div className="relative w-12 h-12 rounded-full overflow-hidden border">
                <Image 
                    src={loan.logo_url} 
                    alt={`${loan.name} logo`} 
                    fill 
                    className="object-cover"
                    unoptimized
                />
            </div>
        )}
        <div className="flex-1">
            <CardTitle className="text-xl">{loan.name}</CardTitle>
            <p className="text-xs text-muted-foreground">{loan.provider_name}</p>
            {loan.description && (
                <p className="text-sm text-muted-foreground line-clamp-1">{loan.description}</p>
            )}
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
                <p className="text-muted-foreground">APR</p>
                <p className="font-semibold text-lg text-primary">
                    {formatPercentage(loan.rate_apr)}
                </p>
            </div>
            <div>
                <p className="text-muted-foreground">Max Amount</p>
                <p className="font-semibold">
                    {formatCurrency(loan.max_amount)}
                </p>
            </div>
            <div>
                <p className="text-muted-foreground">Min Income</p>
                <p className="font-medium">{formatCurrency(loan.min_income)}</p>
            </div>
             <div>
                <p className="text-muted-foreground">Tenure</p>
                <p className="font-medium">
                    {loan.tenure_months_min} - {loan.tenure_months_max} mos
                </p>
            </div>
        </div>
        
        {/* Dynamic Badges */}
        <div className="flex flex-wrap gap-2 pt-2">
            {loan.rate_apr < 11 && (
                 <Badge variant="outline" className="text-emerald-600 bg-emerald-50 border-emerald-200 text-xs">
                    Low Rates
                </Badge>
            )}
             {loan.processing_fee_percentage === 0 && (
                 <Badge variant="outline" className="text-amber-600 bg-amber-50 border-amber-200 text-xs">
                    No PF
                </Badge>
            )}
            {loan.tenure_months_max > 60 && (
                 <Badge variant="outline" className="text-blue-600 bg-blue-50 border-blue-200 text-xs">
                    Long Term
                </Badge>
            )}
            {/* Fallback to feature badges if no dynamic ones triggered  */}
             {loan.features.slice(0, 2).map((feature, i) => (
                <Badge key={i} variant="secondary" className="text-xs">
                    {feature}
                </Badge>
            ))}
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-3 pt-2">
        <ChatSheet loan={loan} />
        <Button asChild className="w-full">
            <Link href={loan.apply_link || '#'}>
                Apply Now
            </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
