import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import yogaImage from "/attached_assets/yoga.jpg";
import walkingImage from "/attached_assets/walk.jpg";
import insolesImage from "/attached_assets/insoles.jpg";
import bedImage from "/attached_assets/bed.jpg";

export function Hero() {
  return (
    <section className="relative w-full min-h-[600px] lg:h-[85vh] flex items-stretch overflow-hidden">
      <div className="flex flex-col lg:flex-row w-full">
        <div className="flex-1 bg-white flex items-center justify-center px-8 sm:px-12 lg:px-16 py-16 lg:py-20">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm font-medium tracking-wider mb-4 uppercase" style={{ color: '#593f32' }} data-testid="text-hero-tagline">
              Step into Comfort, Leave Pain Behind
            </p>
            
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight" style={{ color: '#283653' }} data-testid="text-hero-headline">
              Relief for Plantar Fasciitis, Designed by Experts
            </h1>
            
            <p className="text-base sm:text-lg text-foreground/80 mb-8 leading-relaxed" data-testid="text-hero-subheadline">
              At PodiEase, we combine podiatry know-how with smart design to create insoles and supports that tackle plantar fasciitis head-on. Our tools help you move freely and comfortably every day.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/products">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground w-full sm:w-auto"
                  data-testid="button-shop-products"
                >
                  Shop Now
                </Button>
              </Link>
              <Link href="/learn">
                <Button
                  size="lg"
                  variant="outline"
                  style={{ color: '#593f32', borderColor: '#d3b495' }}
                  className="text-base px-8 py-6 border-2 hover:bg-[#d3b495]/5 w-full sm:w-auto"
                  data-testid="button-learn-more"
                >
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-2 gap-0 min-h-[400px] lg:min-h-0">
          <div className="relative overflow-hidden">
            <img 
              src={yogaImage} 
              alt="Woman doing foot massage exercise on yoga mat"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden flex items-center justify-center p-8" style={{ background: 'linear-gradient(135deg, rgba(89, 63, 50, 0.08), rgba(211, 180, 149, 0.12))' }}>
            <img 
              src={insolesImage} 
              alt="Premium orthotic insoles with arch support"
              className="w-full h-full object-contain"
            />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src={bedImage} 
              alt="Person resting with compression sleeve for recovery"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="relative overflow-hidden">
            <img 
              src={walkingImage} 
              alt="Feet walking on grass in morning sunlight"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
