export function LoadingSpinner() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading products...</p>
      </div>
    </div>
  );
}

export function ProductGridSkeleton() {
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <div key={i} className="bg-card rounded-lg overflow-hidden animate-pulse">
          <div className="aspect-square bg-muted"></div>
          <div className="p-6 space-y-3">
            <div className="h-6 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-full"></div>
            <div className="h-4 bg-muted rounded w-5/6"></div>
            <div className="h-8 bg-muted rounded w-1/3"></div>
            <div className="h-10 bg-muted rounded w-full mt-4"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
