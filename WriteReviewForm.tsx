import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertReviewSchema, type InsertReview } from "@shared/schema";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { z } from "zod";

interface WriteReviewFormProps {
  productId: string;
  productTitle: string;
}

const reviewFormSchema = insertReviewSchema.extend({
  rating: z.number().min(1, "Please select a rating").max(5),
});

export function WriteReviewForm({ productId, productTitle }: WriteReviewFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<InsertReview>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      productId,
      productTitle,
      customerName: "",
      customerEmail: "",
      rating: 0,
      title: "",
      comment: "",
      verifiedPurchase: false,
      beforePhoto: undefined,
      afterPhoto: undefined,
      storyText: undefined,
    },
  });

  const onSubmit = async (data: InsertReview) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/reviews", data);
      
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      
      toast({
        title: "Review submitted!",
        description: "Thank you for sharing your experience with our products.",
      });
      
      form.reset();
      setOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit review. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const rating = form.watch("rating");

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-write-review">
          Write a Review
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Write a Review for {productTitle}</DialogTitle>
        </DialogHeader>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="rating"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rating *</FormLabel>
                  <FormControl>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((value) => (
                        <button
                          key={value}
                          type="button"
                          onClick={() => field.onChange(value)}
                          className="focus:outline-none"
                          data-testid={`rating-star-${value}`}
                        >
                          <Star
                            className={`h-8 w-8 transition-colors ${
                              value <= rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-muted-foreground/30 hover:text-yellow-400/50"
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="customerName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Your Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="John Smith" {...field} data-testid="input-customer-name" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="customerEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="john@example.com" {...field} data-testid="input-customer-email" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Review Title *</FormLabel>
                  <FormControl>
                    <Input placeholder="Summarize your experience" {...field} data-testid="input-review-title" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="comment"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Review *</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Tell us about your experience with this product..."
                      rows={5}
                      {...field}
                      data-testid="input-review-comment"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="storyText"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Your Story (Optional)</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Share your journey to relief..."
                      rows={3}
                      {...field}
                      value={field.value || ""}
                      data-testid="input-story-text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-4">
              <Button type="button" variant="outline" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                disabled={isSubmitting}
                data-testid="button-submit-review"
              >
                {isSubmitting ? "Submitting..." : "Submit Review"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
