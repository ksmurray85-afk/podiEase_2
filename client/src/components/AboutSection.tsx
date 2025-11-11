import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import podiatristImage from "/attached_assets/kim pic.jpg";

export function AboutSection() {
  return (
    <section className="py-16 md:py-24" style={{ background: 'linear-gradient(to right, rgba(89, 63, 50, 0.04), rgba(211, 180, 149, 0.06))' }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center md:justify-end">
            <div className="relative">
              <div className="absolute -inset-4 rounded-full opacity-30 blur-xl" style={{ backgroundColor: 'rgba(211, 180, 149, 0.3)' }}></div>
              <div
                className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-cover bg-center border-4 shadow-2xl relative"
                style={{ backgroundImage: `url("${podiatristImage}")`, borderColor: '#d3b495' }}
                data-testid="img-podiatrist"
              />
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-wider mb-2 uppercase" style={{ color: '#593f32' }}>
              Expert Care, Personal Touch
            </p>
            
            <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" style={{ color: '#283653' }} data-testid="text-about-headline">
              Hi, I'm Your Podiatrist
            </h2>
            
            <div className="text-base md:text-lg text-foreground/80 leading-relaxed space-y-4" data-testid="text-about-description">
              <p>
                As a qualified podiatrist with years of experience treating plantar fasciitis, I've personally selected every product in this store based on clinical evidence and real patient outcomes.
              </p>
              <p>
                You're not just buying products—you're getting professional guidance backed by podiatric expertise and a commitment to your comfort and recovery.
              </p>
            </div>

            <div className="pt-2">
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="text-base px-8 py-6 border-2"
                  style={{ color: '#593f32', borderColor: '#d3b495' }}
                  data-testid="button-read-story"
                >
                  Read My Story
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
