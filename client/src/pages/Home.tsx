import { Hero } from "@/components/Hero";
import { AboutSection } from "@/components/AboutSection";
import { ProductShowcase } from "@/components/ProductShowcase";
import { QuizCTA } from "@/components/QuizCTA";
import { NewsletterSignup } from "@/components/NewsletterSignup";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <ProductShowcase />
      <QuizCTA />
      <div className="py-16 bg-background">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <NewsletterSignup variant="card" />
        </div>
      </div>
    </div>
  );
}
