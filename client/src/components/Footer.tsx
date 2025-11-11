import { Link } from "wouter";
import { Mail, Phone, MapPin } from "lucide-react";
import { NewsletterSignup } from "./NewsletterSignup";

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4 text-background" data-testid="text-footer-about-title">
              About PodiEase
            </h3>
            <p className="text-sm text-background/80 leading-relaxed mb-4" data-testid="text-footer-mission">
              Australia's trusted podiatrist-led store for plantar fasciitis relief. Where science meets your sole.
            </p>
            <p className="text-sm font-medium text-primary" data-testid="text-footer-slogan">
              Expert care, delivered to your door.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-background" data-testid="text-footer-links-title">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/shop">
                  <span className="text-background/80 hover:text-background transition-colors cursor-pointer" data-testid="link-footer-shop">
                    Shop Products
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/learn">
                  <span className="text-background/80 hover:text-background transition-colors cursor-pointer" data-testid="link-footer-learn">
                    Learn About Plantar Fasciitis
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/about">
                  <span className="text-background/80 hover:text-background transition-colors cursor-pointer" data-testid="link-footer-about">
                    About Us
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/testimonials">
                  <span className="text-background/80 hover:text-background transition-colors cursor-pointer" data-testid="link-footer-testimonials">
                    Testimonials
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-background" data-testid="text-footer-service-title">
              Customer Service
            </h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors" data-testid="link-footer-shipping">
                  Shipping Information
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors" data-testid="link-footer-returns">
                  Returns & Refunds
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors" data-testid="link-footer-faq">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors" data-testid="link-footer-privacy">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4 text-background" data-testid="text-footer-contact-title">
              Contact Us
            </h3>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex items-start gap-2">
                <Mail className="h-4 w-4 mt-1 text-primary" />
                <a href="mailto:support@podiease.com.au" className="text-background/80 hover:text-background transition-colors" data-testid="link-footer-email">
                  support@podiease.com.au
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="h-4 w-4 mt-1 text-primary" />
                <a href="tel:1300123456" className="text-background/80 hover:text-background transition-colors" data-testid="link-footer-phone">
                  1300 123 456
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-1 text-primary" />
                <span className="text-background/80" data-testid="text-footer-location">
                  Sydney, Australia
                </span>
              </li>
            </ul>
            <div className="text-background">
              <NewsletterSignup variant="inline" />
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center">
          <p className="text-sm text-background/70" data-testid="text-footer-copyright">
            © {new Date().getFullYear()} PodiEase. All rights reserved. Australian podiatrist-led plantar fasciitis relief.
          </p>
        </div>
      </div>
    </footer>
  );
}
