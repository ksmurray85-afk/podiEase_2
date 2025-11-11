import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Heart, Target, Award, Users } from "lucide-react";
import podiatristImage from/"attached_assets/Untitled design (1)_1762596396469.jpg";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <div className="bg-primary/5 py-16 md:py-24">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-section-mobile md:text-section text-foreground mb-6" data-testid="text-about-headline">
                Expert Care for Every Step
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed" data-testid="text-about-intro">
                PodiEase was founded on a simple belief: everyone deserves access to professional-grade foot care solutions backed by podiatric expertise.
              </p>
            </div>
            <div className="flex justify-center">
              <div
                className="w-64 h-64 rounded-full bg-cover bg-center border-4 border-primary shadow-lg"
                style={{ backgroundImage: `url("${podiatristImage}")` }}
                data-testid="img-about-podiatrist"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        <section data-testid="section-mission">
          <h2 className="text-subsection text-foreground mb-6 text-center">Our Mission</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                PodiEase is an Australian podiatrist-led e-commerce store specialising in plantar fasciitis relief and foot comfort. We're dedicated to helping Australians take every step with confidence through clinically informed products designed to reduce pain, improve alignment, and restore comfort.
              </p>
            </CardContent>
          </Card>
        </section>

        <section data-testid="section-vision">
          <h2 className="text-subsection text-foreground mb-6 text-center">Our Vision</h2>
          <Card className="max-w-4xl mx-auto">
            <CardContent className="p-8 text-center">
              <p className="text-lg text-muted-foreground leading-relaxed">
                To become Australia's most trusted authority in plantar fasciitis relief, empowering individuals to reclaim their mobility, comfort, and quality of life through evidence-based solutions and expert podiatric guidance.
              </p>
            </CardContent>
          </Card>
        </section>

        <section data-testid="section-values">
          <h2 className="text-subsection text-foreground mb-8 text-center">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <ValueCard
              icon={<Award className="h-8 w-8" />}
              title="Professional Integrity"
              description="Every recommendation grounded in clinical evidence and podiatric best practice"
            />
            <ValueCard
              icon={<Heart className="h-8 w-8" />}
              title="Patient-Centered Care"
              description="Customers are individuals seeking relief, approached with empathy and respect"
            />
            <ValueCard
              icon={<Target className="h-8 w-8" />}
              title="Transparency"
              description="Clear explanations of why products work and when professional care is needed"
            />
            <ValueCard
              icon={<Users className="h-8 w-8" />}
              title="Accessibility"
              description="Professional-grade treatment tools accessible to all Australians"
            />
          </div>
        </section>

        <section className="bg-primary/5 rounded-lg p-8 md:p-12 text-center" data-testid="section-cta">
          <h2 className="text-subsection text-foreground mb-4">
            Where Science Meets Your Sole
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            From premium orthotic insoles to heel cushions and recovery aids, each item at PodiEase is carefully selected and podiatrist-approved for real, lasting results.
          </p>
          <Link href="/shop">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground" data-testid="button-start-shopping">
              Start Shopping
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

function ValueCard({ icon, title, description }: ValueCardProps) {
  return (
    <Card className="text-center">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-center text-primary">
          {icon}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
      </CardContent>
    </Card>
  );
}
