import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Mail, CheckCircle2 } from "lucide-react";

interface NewsletterSignupProps {
  variant?: "inline" | "card";
}

export function NewsletterSignup({ variant = "inline" }: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      await apiRequest("POST", "/api/newsletter/subscribe", {
        email,
        isActive: true,
      });
      
      queryClient.invalidateQueries({ queryKey: ['/api/newsletter'] });
      
      setIsSuccess(true);
      setEmail("");
      
      toast({
        title: "Successfully subscribed!",
        description: "You'll receive expert care tips and exclusive offers in your inbox.",
      });
    } catch (error: any) {
      if (error.message?.includes("already subscribed")) {
        toast({
          title: "Already subscribed",
          description: "This email is already on our newsletter list.",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to subscribe. Please try again.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (variant === "card") {
    return (
      <div className="bg-gradient-to-br from-primary to-primary/80 rounded-2xl p-8 md:p-10 text-center">
        <Mail className="h-12 w-12 text-white mx-auto mb-4" />
        <h3 className="text-2xl font-bold text-white mb-3">
          Get Expert Care Tips
        </h3>
        <p className="text-white/90 mb-6 max-w-md mx-auto">
          Subscribe to receive evidence-based plantar fasciitis treatment advice, exclusive offers, and new product updates.
        </p>
        
        {isSuccess ? (
          <div className="bg-white/10 rounded-lg p-6">
            <CheckCircle2 className="h-12 w-12 text-white mx-auto mb-3" />
            <p className="text-white font-semibold">Thank you for subscribing!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
              data-testid="input-newsletter-email"
            />
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-white text-primary hover:bg-white/90"
              data-testid="button-newsletter-subscribe"
            >
              {isSubmitting ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        )}
      </div>
    );
  }

  // Inline variant
  return (
    <div>
      <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
        <Mail className="h-5 w-5 text-primary" />
        Newsletter
      </h4>
      {isSuccess ? (
        <div className="bg-green-600/10 border border-green-600/20 rounded-lg p-3">
          <p className="text-sm text-green-600 flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Successfully subscribed!
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-2">
          <Input
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            data-testid="input-newsletter-email-footer"
          />
          <Button
            type="submit"
            disabled={isSubmitting}
            size="sm"
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            data-testid="button-newsletter-subscribe-footer"
          >
            {isSubmitting ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      )}
    </div>
  );
}
