import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider, useQuery } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { ComparisonProvider } from "@/lib/ComparisonContext";
import { ComparisonBar } from "@/components/ComparisonBar";
import Home from "@/pages/Home";
import ProductOverview from "@/pages/ProductOverview";
import Shop from "@/pages/Shop";
import Learn from "@/pages/Learn";
import About from "@/pages/About";
import Cart from "@/pages/Cart";
import Testimonials from "@/pages/Testimonials";
import FootHealthQuiz from "@/pages/FootHealthQuiz";
import QuizResults from "@/pages/QuizResults";
import Compare from "@/pages/Compare";
import Resources from "@/pages/Resources";
import NotFound from "@/pages/not-found";
import { useState, useEffect } from "react";
import { type Product, type CartItem } from "@shared/schema";

function Router() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const { toast } = useToast();

  const { data: products = [], isLoading, error, refetch } = useQuery<Product[]>({
    queryKey: ['/api/products'],
    retry: 2,
    staleTime: 5 * 60 * 1000,
  });

  useEffect(() => {
    if (products.length === 0) return;

    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart) as CartItem[];
        
        const validCart = parsedCart
          .map((item) => {
            const product = products.find(p => p.id === item.productId);
            
            if (!product || !product.variantId) {
              console.warn(`Removing invalid cart item: ${item.title}`);
              return null;
            }
            
            return {
              ...item,
              variantId: product.variantId,
              price: product.price,
            };
          })
          .filter((item): item is CartItem => item !== null);

        if (validCart.length !== parsedCart.length) {
          toast({
            title: "Cart updated",
            description: "Some items in your cart were no longer available and have been removed.",
          });
        }

        setCartItems(validCart);
      } catch (e) {
        console.error("Failed to parse saved cart", e);
        localStorage.removeItem('cart');
      }
    }
  }, [products, toast]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleAddToCart = (product: Product) => {
    if (!product.variantId) {
      toast({
        title: "Product unavailable",
        description: "This product cannot be added to cart at this time. Please try again later.",
        variant: "destructive",
      });
      return;
    }

    setCartItems((prev) => {
      const existingItem = prev.find((item) => item.productId === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.productId === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: `${product.id}-${Date.now()}`,
          productId: product.id,
          variantId: product.variantId,
          title: product.title,
          price: product.price,
          quantity: 1,
          image: product.image,
        },
      ];
    });

    toast({
      title: "Added to cart",
      description: `${product.title} has been added to your cart.`,
    });
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Add some products to your cart before checking out.",
        variant: "destructive",
      });
      return;
    }

    setIsCheckingOut(true);

    try {
      const lineItems = cartItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lineItems }),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: "Unknown error" }));
        
        if (response.status === 501 && errorData.isDemoMode) {
          throw new Error("Checkout is currently in demo mode. To enable full checkout functionality, please configure your Shopify store credentials.");
        }
        
        throw new Error(errorData.error || "Failed to create checkout");
      }

      const checkout = await response.json();
      
      if (!checkout.webUrl) {
        throw new Error("No checkout URL received");
      }

      window.location.href = checkout.webUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      setIsCheckingOut(false);
      
      toast({
        title: "Checkout failed",
        description: error instanceof Error ? error.message : "There was an error processing your checkout. Please try again.",
        variant: "destructive",
      });
    }
  };

  const cartItemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load products"
        message="We couldn't load the product catalog. Please check your connection and try again."
        onRetry={() => refetch()}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation cartItemCount={cartItemCount} />
      <main className="flex-1 pb-20">
        <Switch>
          <Route path="/">
            <Home />
          </Route>
          <Route path="/products">
            <ProductOverview products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route path="/shop">
            <Shop products={products} onAddToCart={handleAddToCart} />
          </Route>
          <Route path="/learn">
            <Learn />
          </Route>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/testimonials">
            <Testimonials />
          </Route>
          <Route path="/quiz">
            <FootHealthQuiz />
          </Route>
          <Route path="/quiz/results/:id">
            <QuizResults />
          </Route>
          <Route path="/compare">
            <Compare onAddToCart={handleAddToCart} />
          </Route>
          <Route path="/resources">
            <Resources />
          </Route>
          <Route path="/cart">
            <Cart
              cartItems={cartItems}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
              onCheckout={handleCheckout}
              isCheckingOut={isCheckingOut}
            />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </main>
      <ComparisonBar />
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ComparisonProvider>
          <Toaster />
          <Router />
        </ComparisonProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
