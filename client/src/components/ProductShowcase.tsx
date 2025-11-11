import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import insolesImage from "@assets/openart-image_9d-kGvJq_1762396887010_raw_1762436859148.jpg";
import nightSplintImage from "@assets/253_2716-360x360_1762437042640.webp";
import footRollerImage from "@assets/highroller-webslider-001-360x360_1762437042641.webp";
import kinesioTapeImage from "@assets/1227_2027-360x360_1762437042644.webp";
import compressionSockImage from "@assets/FS4-Sock-No-Show-Black-360x360_1762437042646.webp";
import archSupportImage from "@assets/Foot-Arch-Support-Plantar-Fasciitis-Wrap-600px-360x360_1762437042647.webp";
import ankleSleeveImage from "@assets/FS6-Black-2_1762437042649.webp";

const images = [
  { src: insolesImage, alt: "Premium orthotic insoles with arch support" },
  { src: nightSplintImage, alt: "Night splint for plantar fasciitis" },
  { src: footRollerImage, alt: "Foot roller for massage and relief" },
  { src: kinesioTapeImage, alt: "Grip-it kinesiology tape for plantar fasciitis" },
  { src: compressionSockImage, alt: "Compression sock for foot support" },
  { src: archSupportImage, alt: "Arch support wrap for plantar fasciitis" },
  { src: ankleSleeveImage, alt: "Compression ankle sleeve for recovery" },
];

export function ProductShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-16 md:py-24 bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-xs sm:text-sm font-medium tracking-wider text-foreground/70 mb-2 uppercase">
              Clinically Proven Solutions
            </p>
            
            <h2 
              className="text-4xl md:text-5xl font-bold text-[#0a1628] leading-tight"
              data-testid="text-showcase-heading"
            >
              Podiatrist-Selected Relief Products
            </h2>
            <p 
              className="text-base md:text-lg text-foreground/80"
              data-testid="text-showcase-subheading"
            >
              Each product chosen for clinical effectiveness and patient satisfaction
            </p>
            <div className="pt-2">
              <Link href="/products">
                <Button
                  size="lg"
                  className="text-base px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground"
                  data-testid="button-shop-showcase"
                >
                  Shop Now
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative w-full aspect-[4/3] overflow-hidden rounded-lg bg-muted">
            {images.map((image, index) => (
              <img
                key={index}
                src={image.src}
                alt={image.alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                  index === currentIndex ? "opacity-100" : "opacity-0"
                }`}
                data-testid={`showcase-image-${index}`}
              />
            ))}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-white w-8"
                      : "bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  data-testid={`showcase-dot-${index}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
