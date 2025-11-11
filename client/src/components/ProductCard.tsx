import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, GitCompare } from "lucide-react";
import { type Product } from "@shared/schema";
import { useComparison } from "@/lib/ComparisonContext";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  const { addToComparison, isInComparison, comparisonProducts } = useComparison();
  const { toast } = useToast();

  const handleCompare = () => {
    if (comparisonProducts.length >= 3) {
      toast({
        title: "Maximum reached",
        description: "You can compare up to 3 products at a time.",
        variant: "destructive",
      });
      return;
    }
    
    addToComparison(product);
    toast({
      title: "Added to comparison",
      description: `${product.title} has been added to compare list.`,
    });
  };
  return (
    <Card className="flex flex-col h-full overflow-hidden hover-elevate transition-all border-2 border-transparent hover:border-purple-100" data-testid={`card-product-${product.id}`}>
      <CardHeader className="p-0 relative">
        <div className="aspect-square relative overflow-hidden" style={{ background: 'linear-gradient(135deg, rgba(0, 72, 168, 0.03), rgba(149, 71, 112, 0.03))' }}>
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-cover"
            data-testid={`img-product-${product.id}`}
          />
          {product.isPodiatristPick && (
            <Badge
              className="absolute top-3 right-3 bg-primary text-primary-foreground shadow-lg"
              data-testid={`badge-podiatrist-pick-${product.id}`}
            >
              Podiatrist's Pick
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-6 space-y-3">
        <h3 className="text-card-title text-foreground line-clamp-2" data-testid={`text-product-title-${product.id}`}>
          {product.title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3" data-testid={`text-product-description-${product.id}`}>
          {product.description}
        </p>

        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold text-foreground" data-testid={`text-product-price-${product.id}`}>
            ${product.price}
          </span>
          {product.compareAtPrice && (
            <span className="text-sm text-muted-foreground line-through" data-testid={`text-product-compare-price-${product.id}`}>
              ${product.compareAtPrice}
            </span>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0 flex flex-col gap-2">
        <Button
          className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => onAddToCart(product)}
          disabled={!product.available}
          data-testid={`button-add-to-cart-${product.id}`}
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          {product.available ? "Add to Cart" : "Out of Stock"}
        </Button>
        <Button
          variant="outline"
          className="w-full"
          onClick={handleCompare}
          disabled={isInComparison(product.id)}
          data-testid={`button-compare-${product.id}`}
        >
          <GitCompare className="h-4 w-4 mr-2" />
          {isInComparison(product.id) ? "Added to Compare" : "Compare"}
        </Button>
      </CardFooter>
    </Card>
  );
}
