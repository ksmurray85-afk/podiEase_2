import { useComparison } from "@/lib/ComparisonContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import { ArrowLeft, CheckCircle2, XCircle, Star, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CompareProps {
  onAddToCart: (product: any) => void;
}

export default function Compare({ onAddToCart }: CompareProps) {
  const { comparisonProducts, clearComparison } = useComparison();
  const { toast } = useToast();

  if (comparisonProducts.length < 2) {
    return (
      <div className="min-h-screen bg-background py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Product Comparison</h1>
          <p className="text-lg text-muted-foreground mb-8">
            Add at least 2 products to compare their features side by side
          </p>
          <Link href="/shop">
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  const features = [
    { label: "Price", key: "price", format: (val: string) => `$${val}` },
    { label: "Availability", key: "available", format: (val: boolean) => val ? "In Stock" : "Out of Stock" },
    { label: "Podiatrist's Pick", key: "isPodiatristPick", format: (val: boolean) => val },
    { label: "Compare Price", key: "compareAtPrice", format: (val?: string) => val ? `$${val}` : "-" },
  ];

  const handleAddToCart = (product: any) => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
              Product Comparison
            </h1>
            <p className="text-muted-foreground">
              Compare up to 3 products side by side
            </p>
          </div>
          <div className="flex gap-2">
            <Link href="/shop">
              <Button variant="outline">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Shop
              </Button>
            </Link>
            <Button variant="outline" onClick={clearComparison} data-testid="button-clear-all">
              Clear All
            </Button>
          </div>
        </div>

        <div className={`grid gap-6 ${comparisonProducts.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
          {comparisonProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="object-cover w-full h-full"
                />
                {product.isPodiatristPick && (
                  <Badge className="absolute top-3 right-3 bg-primary text-primary-foreground">
                    <Star className="h-3 w-3 mr-1 fill-current" />
                    Podiatrist's Pick
                  </Badge>
                )}
              </div>
              
              <CardHeader>
                <CardTitle className="text-xl">{product.title}</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground line-clamp-3">
                  {product.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-t">
                    <span className="text-sm text-muted-foreground">Price</span>
                    <div className="text-right">
                      <span className="text-lg font-bold text-foreground">${product.price}</span>
                      {product.compareAtPrice && (
                        <span className="text-sm text-muted-foreground line-through ml-2">
                          ${product.compareAtPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t">
                    <span className="text-sm text-muted-foreground">Availability</span>
                    <span className="flex items-center gap-1">
                      {product.available ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                          <span className="text-sm text-green-600">In Stock</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-destructive" />
                          <span className="text-sm text-destructive">Out of Stock</span>
                        </>
                      )}
                    </span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-t">
                    <span className="text-sm text-muted-foreground">Expert Recommended</span>
                    <span className="flex items-center gap-1">
                      {product.isPodiatristPick ? (
                        <>
                          <CheckCircle2 className="h-4 w-4 text-primary" />
                          <span className="text-sm text-primary font-medium">Yes</span>
                        </>
                      ) : (
                        <span className="text-sm text-muted-foreground">-</span>
                      )}
                    </span>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground mt-4"
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.available}
                  data-testid={`button-add-to-cart-${product.id}`}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
