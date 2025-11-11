import { ProductCard } from "@/components/ProductCard";
import { BeforeAfter } from "@/components/BeforeAfter";
import { type Product } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { Shield, Truck, Award, CheckCircle2 } from "lucide-react";

interface ProductOverviewProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function ProductOverview({ products, onAddToCart }: ProductOverviewProps) {
  const { toast } = useToast();

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const featuredProducts = products.filter(p => p.isPodiatristPick);
  const otherProducts = products.filter(p => !p.isPodiatristPick);

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-medium tracking-wider mb-4 uppercase" style={{ color: '#593f32' }}>
              Professional Relief Solutions
            </p>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#283653' }} data-testid="text-overview-headline">
              Podiatrist-Selected Relief Products
            </h1>
            <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed" data-testid="text-overview-description">
              Clinically proven solutions for plantar fasciitis relief, carefully chosen for real, lasting results
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="flex flex-col items-center text-center" data-testid="trust-badge-podiatrist">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(89, 63, 50, 0.15)' }}>
                <Award className="h-6 w-6" style={{ color: '#593f32' }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: '#283653' }}>Podiatrist Approved</p>
            </div>
            <div className="flex flex-col items-center text-center" data-testid="trust-badge-shipping">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(211, 180, 149, 0.2)' }}>
                <Truck className="h-6 w-6" style={{ color: '#593f32' }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: '#283653' }}>Fast AU Shipping</p>
            </div>
            <div className="flex flex-col items-center text-center" data-testid="trust-badge-guarantee">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(238, 233, 227, 0.5)' }}>
                <Shield className="h-6 w-6" style={{ color: '#d3b495' }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: '#283653' }}>Money-Back Guarantee</p>
            </div>
            <div className="flex flex-col items-center text-center" data-testid="trust-badge-quality">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mb-3" style={{ backgroundColor: 'rgba(89, 63, 50, 0.15)' }}>
                <CheckCircle2 className="h-6 w-6" style={{ color: '#593f32' }} />
              </div>
              <p className="text-sm font-semibold" style={{ color: '#283653' }}>Clinically Tested</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <BeforeAfter />

          {featuredProducts.length > 0 && (
            <>
              <div className="mb-10 mt-16">
                <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#283653' }} data-testid="text-featured-section">
                  Podiatrist's Picks
                </h2>
                <p className="text-base text-foreground/70">Our top recommendations for plantar fasciitis relief</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}

          {otherProducts.length > 0 && (
            <>
              <div className="mb-10">
                <h2 className="text-3xl md:text-4xl font-bold mb-3" style={{ color: '#283653' }} data-testid="text-other-products-section">
                  All Relief Products
                </h2>
                <p className="text-base text-foreground/70">Complete selection of podiatrist-approved solutions</p>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
