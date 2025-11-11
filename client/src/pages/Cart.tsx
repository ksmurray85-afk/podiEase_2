import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { Link } from "wouter";
import { type CartItem } from "@shared/schema";
import { ShippingCalculator } from "@/components/ShippingCalculator";
import { useState, useEffect } from "react";

interface CartProps {
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, quantity: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
  isCheckingOut?: boolean;
}

export default function Cart({ cartItems, onUpdateQuantity, onRemoveItem, onCheckout, isCheckingOut = false }: CartProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0);
  const [shippingCost, setShippingCost] = useState(0);
  const [shippingCalculatorKey, setShippingCalculatorKey] = useState(0);
  const total = subtotal + shippingCost;

  // Reset shipping when cart contents change
  useEffect(() => {
    setShippingCost(0);
    setShippingCalculatorKey(prev => prev + 1);
  }, [subtotal]);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md px-4">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h1 className="text-2xl font-semibold text-foreground mb-4" data-testid="text-cart-empty">
            Your cart is empty
          </h1>
          <p className="text-muted-foreground mb-8">
            Browse our podiatrist-approved products to find relief for plantar fasciitis
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-start-shopping">
              Start Shopping
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-section-mobile md:text-section text-foreground mb-8" data-testid="text-cart-headline">
          Shopping Cart
        </h1>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id} data-testid={`card-cart-item-${item.id}`}>
                <CardContent className="p-6">
                  <div className="flex gap-6">
                    <div className="w-24 h-24 flex-shrink-0 bg-muted rounded-md overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                        data-testid={`img-cart-item-${item.id}`}
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground mb-2" data-testid={`text-cart-item-title-${item.id}`}>
                        {item.title}
                      </h3>
                      <p className="text-lg font-bold text-foreground mb-4" data-testid={`text-cart-item-price-${item.id}`}>
                        ${item.price}
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            data-testid={`button-decrease-${item.id}`}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <Input
                            type="number"
                            min="1"
                            value={item.quantity}
                            onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
                            className="w-16 text-center"
                            data-testid={`input-quantity-${item.id}`}
                          />
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            data-testid={`button-increase-${item.id}`}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => onRemoveItem(item.id)}
                          className="text-destructive hover:text-destructive"
                          data-testid={`button-remove-${item.id}`}
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="space-y-6">
            <ShippingCalculator 
              key={shippingCalculatorKey}
              subtotal={subtotal} 
              onShippingSelect={(option) => setShippingCost(option.cost)}
            />

            <Card className="sticky top-20">
              <CardContent className="p-6 space-y-4">
                <h2 className="text-xl font-semibold text-foreground mb-4" data-testid="text-order-summary">
                  Order Summary
                </h2>

                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-medium text-foreground" data-testid="text-subtotal">
                      ${subtotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-medium text-foreground" data-testid="text-shipping">
                      {shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3">
                    <div className="flex justify-between text-lg font-bold">
                      <span className="text-foreground">Total</span>
                      <span className="text-foreground" data-testid="text-total">
                        ${total.toFixed(2)} AUD
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  size="lg"
                  onClick={onCheckout}
                  disabled={isCheckingOut}
                  data-testid="button-checkout"
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </Button>

                <Link href="/shop">
                  <Button variant="outline" className="w-full" data-testid="button-continue-shopping">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
