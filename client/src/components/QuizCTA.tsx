import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { Footprints, ArrowRight, CheckCircle2 } from "lucide-react";

export function QuizCTA() {
  return (
    <section className="py-16 md:py-24" style={{ background: 'linear-gradient(to bottom, rgba(211, 180, 149, 0.08), rgba(89, 63, 50, 0.04))' }}>
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-block p-4 rounded-full mb-6" style={{ backgroundColor: 'rgba(211, 180, 149, 0.25)' }}>
            <Footprints className="h-12 w-12" style={{ color: '#593f32' }} />
          </div>
          
          <p className="text-xs sm:text-sm font-medium tracking-wider mb-4 uppercase" style={{ color: '#593f32' }}>
            Personalized Product Matching
          </p>
          
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight" style={{ color: '#283653' }}>
            Not Sure Which Product is Right for You?
          </h2>
          <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto">
            Take our 2-minute podiatrist-designed quiz to get personalized product recommendations based on your specific symptoms and lifestyle
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-10">
          <div className="bg-background rounded-lg p-6 text-center border-2 border-transparent hover:border-[#d3b495]/30 transition-colors">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(211, 180, 149, 0.2)' }}>
              <CheckCircle2 className="h-6 w-6" style={{ color: '#593f32' }} />
            </div>
            <h3 className="font-semibold mb-2" style={{ color: '#283653' }}>Quick & Easy</h3>
            <p className="text-sm text-muted-foreground">
              Just 5 simple questions about your pain and lifestyle
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 text-center border-2 border-transparent hover:border-[#d3b495]/30 transition-colors">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(89, 63, 50, 0.15)' }}>
              <CheckCircle2 className="h-6 w-6" style={{ color: '#593f32' }} />
            </div>
            <h3 className="font-semibold mb-2" style={{ color: '#283653' }}>Expert Algorithm</h3>
            <p className="text-sm text-muted-foreground">
              Based on podiatry research and clinical experience
            </p>
          </div>
          <div className="bg-background rounded-lg p-6 text-center border-2 border-transparent hover:border-[#d3b495]/30 transition-colors">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: 'rgba(211, 180, 149, 0.2)' }}>
              <CheckCircle2 className="h-6 w-6" style={{ color: '#593f32' }} />
            </div>
            <h3 className="font-semibold mb-2" style={{ color: '#283653' }}>Personalized Results</h3>
            <p className="text-sm text-muted-foreground">
              Get your top 3 product recommendations instantly
            </p>
          </div>
        </div>

        <div className="text-center">
          <Link href="/quiz">
            <Button 
              size="lg" 
              className="bg-primary hover:bg-primary/90 text-primary-foreground text-lg px-8"
              data-testid="button-start-quiz"
            >
              Start Recommendation Quiz
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
