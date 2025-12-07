import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function LoanCardSkeleton() {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-1/2" />
            <Skeleton className="h-3 w-1/3" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 space-y-4">
        <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-6 w-16" />
             </div>
             <div className="space-y-2">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-6 w-16" />
             </div>
             <div className="space-y-2">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-6 w-16" />
             </div>
             <div className="space-y-2">
                <Skeleton className="h-3 w-10" />
                <Skeleton className="h-6 w-16" />
             </div>
        </div>
        <div className="flex gap-2 pt-2">
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
            <Skeleton className="h-5 w-16" />
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardFooter>
    </Card>
  );
}
