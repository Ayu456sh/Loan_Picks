import { getTopLoans } from '@/lib/db/queries';
import { HeroCard } from '@/components/loans/hero-card';
import { TopList } from '@/components/loans/top-list';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export const revalidate = 3600; // Revalidate every hour

export default async function Home() {
  const loans = await getTopLoans(5);
  
  const heroLoan = loans[0];
  const otherLoans = loans.slice(1);

  return (
    <div className="container mx-auto px-4 py-8 space-y-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">Your personalized loan recommendations overview.</p>
        </div>
        <Button variant="outline" asChild>
            <Link href="/products">
                View All Products <ArrowRight className="ml-2 w-4 h-4" />
            </Link>
        </Button>
      </div>

      {heroLoan ? (
        <section>
             <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <span className="bg-indigo-100 text-indigo-700 p-1 rounded">🏆</span> 
                Top Recommendation
             </h2>
            <HeroCard loan={heroLoan} />
        </section>
      ) : (
        <div className="p-10 text-center border rounded-lg bg-muted/20">
            <p className="text-muted-foreground">No loan data available yet. Please seed the database.</p>
        </div>
      )}

      {otherLoans.length > 0 && (
        <section>
            <h2 className="text-xl font-semibold mb-4">Other Top Picks</h2>
            <TopList loans={otherLoans} />
        </section>
      )}
    </div>
  );
}
