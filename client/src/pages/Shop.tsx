import { useState } from "react";
import { ProductCard } from "@/components/ProductCard";
import { Input } from "@/components/ui/input";
import { type Product } from "@shared/schema";
import { Search, Shield, Truck, Award, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShopProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export default function Shop({ products, onAddToCart }: ShopProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddToCart = (product: Product) => {
    onAddToCart(product);
    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <section className="py-16 md:py-24" style={{ backgroundColor: '#f8f9fa' }}>
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-xs sm:text-sm font-medium tracking-wider mb-4 uppercase" style={{ color: '#593f32' }}>
              Professional Relief Solutions
            </p>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight" style={{ color: '#283653' }} data-testid="text-shop-headline">
              Relief Products
            </h1>
            <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto leading-relaxed mb-8" data-testid="text-shop-description">
              Browse our complete collection of podiatrist-approved plantar fasciitis relief products
            </p>

            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-background"
                data-testid="input-search-products"
              />
            </div>
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
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground" data-testid="text-no-products">
                No products found matching your search.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="grid-products">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onAddToCart={handleAddToCart}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
