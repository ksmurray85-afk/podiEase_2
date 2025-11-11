import { ProductCard } from "./ProductCard";
import { type Product } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface FeaturedProductsProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export function FeaturedProducts({ products, onAddToCart }: FeaturedProductsProps) {
  return (
    <section className="py-16 md:py-24" style={{ backgroundColor: 'rgba(211, 180, 149, 0.08)' }}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm font-medium tracking-wider mb-4 uppercase" style={{ color: '#593f32' }}>
            Expert-Curated Collection
          </p>
          <h2 className="text-section-mobile md:text-section mb-4" style={{ color: '#283653' }} data-testid="text-featured-headline">
            Podiatrist-Selected Relief Products
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto" data-testid="text-featured-description">
            Clinically proven solutions for plantar fasciitis relief, carefully chosen for real, lasting results
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {products.slice(0, 6).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/shop">
            <Button
              size="lg"
              variant="outline"
              className="text-base"
              data-testid="button-view-all-products"
            >
              View All Products
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
