import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star, ThumbsUp, CheckCircle2 } from "lucide-react";
import { type Review } from "@shared/schema";
import { useState } from "react";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [helpful, setHelpful] = useState(review.helpful);
  const [hasVoted, setHasVoted] = useState(false);
  const { toast } = useToast();

  const handleHelpful = async () => {
    if (hasVoted) return;

    try {
      await apiRequest("PATCH", `/api/reviews/${review.id}/helpful`);
      setHelpful(helpful + 1);
      setHasVoted(true);
      queryClient.invalidateQueries({ queryKey: ['/api/reviews'] });
      
      toast({
        title: "Thank you!",
        description: "Your feedback helps others make informed decisions.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to record your feedback. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex gap-1" data-testid={`review-rating-${review.id}`}>
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`h-4 w-4 ${
              index < rating
                ? "fill-yellow-400 text-yellow-400"
                : "text-muted-foreground/30"
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <Card data-testid={`review-card-${review.id}`}>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h4 className="font-semibold text-foreground">{review.customerName}</h4>
              {review.verifiedPurchase && (
                <div className="flex items-center gap-1 text-xs text-green-600 bg-green-600/10 px-2 py-1 rounded-full">
                  <CheckCircle2 className="h-3 w-3" />
                  Verified Purchase
                </div>
              )}
            </div>
            {renderStars(review.rating)}
          </div>
          <span className="text-sm text-muted-foreground">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h5 className="font-semibold text-foreground mb-2">{review.title}</h5>
        <p className="text-muted-foreground mb-4">{review.comment}</p>

        {review.storyText && (
          <div className="bg-primary/5 rounded-lg p-4 mb-4">
            <p className="text-sm italic text-muted-foreground">&quot;{review.storyText}&quot;</p>
          </div>
        )}

        {(review.beforePhoto || review.afterPhoto) && (
          <div className="grid grid-cols-2 gap-4 mb-4">
            {review.beforePhoto && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">Before</p>
                <img 
                  src={review.beforePhoto} 
                  alt="Before"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            )}
            {review.afterPhoto && (
              <div>
                <p className="text-xs text-muted-foreground mb-2">After</p>
                <img 
                  src={review.afterPhoto} 
                  alt="After"
                  className="rounded-lg w-full h-48 object-cover"
                />
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-2 pt-4 border-t">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHelpful}
            disabled={hasVoted}
            className="text-muted-foreground"
            data-testid={`button-helpful-${review.id}`}
          >
            <ThumbsUp className={`h-4 w-4 mr-2 ${hasVoted ? "fill-current" : ""}`} />
            Helpful ({helpful})
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
