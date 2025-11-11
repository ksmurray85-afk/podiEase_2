import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, GitCompare } from "lucide-react";
import { useComparison } from "@/lib/ComparisonContext";
import { Link } from "wouter";

export function ComparisonBar() {
  const { comparisonProducts, removeFromComparison, clearComparison } = useComparison();

  if (comparisonProducts.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-foreground text-background shadow-lg z-40 border-t border-background/20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 flex-1 overflow-x-auto">
            <div className="flex items-center gap-2 flex-shrink-0">
              <GitCompare className="h-5 w-5 text-primary" />
              <span className="font-semibold">Compare Products ({comparisonProducts.length}/3)</span>
            </div>
            
            <div className="flex gap-3">
              {comparisonProducts.map((product) => (
                <Badge
                  key={product.id}
                  variant="secondary"
                  className="flex items-center gap-2 px-3 py-2 bg-background/10 text-background"
                >
                  <span className="max-w-[150px] truncate">{product.title}</span>
                  <button
                    onClick={() => removeFromComparison(product.id)}
                    className="hover:text-destructive"
                    data-testid={`button-remove-comparison-${product.id}`}
                  >
                    <X className="h-4 w-4" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={clearComparison}
              className="text-background/80 hover:text-background hover:bg-background/10"
              data-testid="button-clear-comparison"
            >
              Clear All
            </Button>
            <Link href="/compare">
              <Button
                size="sm"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={comparisonProducts.length < 2}
                data-testid="button-view-comparison"
              >
                Compare Now
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
