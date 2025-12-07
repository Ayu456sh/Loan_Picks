'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Landmark } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-background sticky top-0 z-50">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl">
            <Landmark className="w-6 h-6 text-primary" />
            <span>LoanPicks</span>
        </Link>
        
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-primary transition-colors">Top Picks</Link>
            <Link href="/products" className="hover:text-primary transition-colors">All Loans</Link>
            <a href="#" onClick={(e) => { e.preventDefault(); alert("Resources section coming soon!"); }} className="hover:text-primary transition-colors">Resources</a>
        </nav>

        <div className="flex items-center gap-4">
            <Button variant="ghost" onClick={() => alert("Sign In coming soon!")}>
                Sign In
            </Button>
            <Button onClick={() => alert("Feature coming soon!")}>Get Started</Button>
        </div>
      </div>
    </header>
  );
}
