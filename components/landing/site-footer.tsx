"use client";

import { AnimatedSection } from "@/components/motion/animated-section";
import { SiteBrand } from "@/components/landing/site-brand";
import { smoothScrollToId } from "@/lib/scroll";
import { siteNavLinks } from "@/lib/site-nav";

const companyLinks = [
  { label: "monis.rent", href: "https://monis.rent" },
  { label: "Contact", href: "mailto:hello@monis.rent" },
] as const;

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <AnimatedSection className="mb-20 mt-16 border-t border-border/80 lg:mb-0">
      <footer className="bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8 lg:py-12">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="sm:col-span-2 lg:col-span-2">
              <SiteBrand />
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Design your Bali workspace in minutes. Same-day delivery, flexible
                weekly rentals, and trust-first booking for digital nomads.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Product
              </p>
              <ul className="mt-3 space-y-2">
                {siteNavLinks.map((link) => (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => smoothScrollToId(link.id)}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Company
              </p>
              <ul className="mt-3 space-y-2">
                {companyLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border/60 pt-6 sm:flex-row">
            <p className="text-xs text-muted-foreground">
              © {year} monis.rent · Made for digital nomads in Bali
            </p>
            <p className="text-xs text-muted-foreground">
              Prototype — booking & payments simulated
            </p>
          </div>
        </div>
      </footer>
    </AnimatedSection>
  );
}
