import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Package, Truck, Clock, MapPin } from "lucide-react";

interface ShippingOption {
  id: string;
  name: string;
  cost: number;
  duration: string;
  description: string;
}

interface ShippingCalculatorProps {
  subtotal: number;
  onShippingSelect?: (option: ShippingOption) => void;
}

export function ShippingCalculator({ subtotal, onShippingSelect }: ShippingCalculatorProps) {
  const [postcode, setPostcode] = useState("");
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [error, setError] = useState("");

  const calculateShipping = () => {
    setError("");
    
    // Validate Australian postcode (4 digits)
    if (!/^\d{4}$/.test(postcode)) {
      setError("Please enter a valid 4-digit Australian postcode");
      return;
    }

    const postcodeNum = parseInt(postcode);
    
    // Determine if metro or regional
    // Metro areas: Sydney (2000-2249), Melbourne (3000-3207), Brisbane (4000-4179),
    // Perth (6000-6214), Adelaide (5000-5199)
    const isMetro = 
      (postcodeNum >= 2000 && postcodeNum <= 2249) || // Sydney
      (postcodeNum >= 3000 && postcodeNum <= 3207) || // Melbourne
      (postcodeNum >= 4000 && postcodeNum <= 4179) || // Brisbane
      (postcodeNum >= 6000 && postcodeNum <= 6214) || // Perth
      (postcodeNum >= 5000 && postcodeNum <= 5199);   // Adelaide

    const options: ShippingOption[] = [];

    if (subtotal >= 100) {
      // Free shipping for orders over $100
      options.push({
        id: "free",
        name: "Free Standard Shipping",
        cost: 0,
        duration: isMetro ? "3-5 business days" : "5-7 business days",
        description: "Free shipping on orders over $100",
      });
    }

    // Standard shipping
    options.push({
      id: "standard",
      name: "Standard Shipping",
      cost: isMetro ? 8.95 : 12.95,
      duration: isMetro ? "3-5 business days" : "5-7 business days",
      description: isMetro ? "Delivery to metro areas" : "Delivery to regional areas",
    });

    // Express shipping
    options.push({
      id: "express",
      name: "Express Shipping",
      cost: isMetro ? 15.95 : 22.95,
      duration: isMetro ? "1-2 business days" : "2-3 business days",
      description: "Faster delivery option",
    });

    setShippingOptions(options);
    
    // Auto-select the cheapest option
    if (options.length > 0) {
      setSelectedOption(options[0].id);
      if (onShippingSelect) {
        onShippingSelect(options[0]);
      }
    }
  };

  const handleOptionSelect = (optionId: string) => {
    setSelectedOption(optionId);
    const option = shippingOptions.find(opt => opt.id === optionId);
    if (option && onShippingSelect) {
      onShippingSelect(option);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Package className="h-5 w-5 text-primary" />
          Calculate Shipping
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="postcode" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Australian Postcode
          </Label>
          <div className="flex gap-2">
            <Input
              id="postcode"
              type="text"
              placeholder="e.g., 2000"
              value={postcode}
              onChange={(e) => setPostcode(e.target.value)}
              maxLength={4}
              className="flex-1"
              data-testid="input-postcode"
            />
            <Button 
              onClick={calculateShipping}
              className="bg-primary hover:bg-primary/90 text-primary-foreground"
              data-testid="button-calculate-shipping"
            >
              Calculate
            </Button>
          </div>
          {error && (
            <p className="text-sm text-destructive" data-testid="text-error">
              {error}
            </p>
          )}
        </div>

        {shippingOptions.length > 0 && (
          <div className="space-y-3 pt-4 border-t">
            <Label className="text-base font-semibold">Shipping Options</Label>
            <RadioGroup value={selectedOption} onValueChange={handleOptionSelect}>
              {shippingOptions.map((option) => (
                <div
                  key={option.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border-2 transition-colors ${
                    selectedOption === option.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover-elevate"
                  }`}
                  data-testid={`shipping-option-${option.id}`}
                >
                  <RadioGroupItem value={option.id} id={option.id} className="mt-1" />
                  <label htmlFor={option.id} className="flex-1 cursor-pointer">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <Truck className="h-4 w-4 text-primary" />
                          <span className="font-semibold text-foreground">{option.name}</span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-1">
                          {option.description}
                        </p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          <span>{option.duration}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        {option.cost === 0 ? (
                          <span className="text-lg font-bold text-green-600">FREE</span>
                        ) : (
                          <span className="text-lg font-bold text-foreground">
                            ${option.cost.toFixed(2)}
                          </span>
                        )}
                      </div>
                    </div>
                  </label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {subtotal < 100 && subtotal > 0 && shippingOptions.length === 0 && (
          <div className="bg-blue/5 border border-blue/20 rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Tip:</strong> Add $
              {(100 - subtotal).toFixed(2)} more to qualify for free shipping!
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
