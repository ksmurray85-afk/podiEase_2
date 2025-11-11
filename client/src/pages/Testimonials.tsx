import { useQuery } from "@tanstack/react-query";
import { type Review } from "@shared/schema";
import { ReviewCard } from "@/components/ReviewCard";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { ErrorMessage } from "@/components/ErrorMessage";
import { Quote } from "lucide-react";

export default function Testimonials() {
  const { data: reviews = [], isLoading, error, refetch } = useQuery<Review[]>({
    queryKey: ['/api/reviews'],
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <ErrorMessage
        title="Failed to load testimonials"
        message="We couldn't load customer testimonials. Please try again."
        onRetry={() => refetch()}
      />
    );
  }

  const featuredReviews = reviews.filter(r => r.storyText || r.beforePhoto || r.afterPhoto).slice(0, 3);
  const regularReviews = reviews.filter(r => !featuredReviews.includes(r));

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-blue/5 py-20 md:py-32">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm font-semibold text-primary">Real Stories, Real Relief</span>
          </div>
          <h1 className="text-section-mobile md:text-section text-foreground mb-6">
            Success Stories from Our Community
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hear from Australians who found relief from plantar fasciitis with our podiatrist-approved products
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Featured Stories */}
        {featuredReviews.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Quote className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold text-foreground">Featured Success Stories</h2>
            </div>
            <div className="grid gap-8">
              {featuredReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </section>
        )}

        {/* All Reviews */}
        <section>
          <h2 className="text-3xl font-bold text-foreground mb-8">
            All Reviews ({reviews.length})
          </h2>
          {regularReviews.length > 0 ? (
            <div className="grid md:grid-cols-2 gap-6">
              {regularReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          ) : featuredReviews.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No reviews yet. Be the first to share your experience!
              </p>
            </div>
          ) : null}
        </section>
      </div>
    </div>
  );
}
