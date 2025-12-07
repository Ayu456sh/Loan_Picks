import { FileQuestion } from 'lucide-react';

interface EmptyStateProps {
  title?: string;
  description?: string;
}

export function EmptyState({ 
  title = "No products found", 
  description = "Try adjusting your filters to see more results." 
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 bg-muted/10 rounded-lg border border-dashed border-muted-foreground/25">
      <div className="bg-muted/20 p-4 rounded-full mb-4">
        <FileQuestion className="w-10 h-10 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-center text-sm text-muted-foreground max-w-sm">
        {description}
      </p>
    </div>
  );
}
