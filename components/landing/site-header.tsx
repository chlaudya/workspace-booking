"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, ShoppingCart, X } from "lucide-react";
import { SiteBrand } from "@/components/landing/site-brand";
import { motionEase } from "@/lib/motion";
import { smoothScrollToId } from "@/lib/scroll";
import { siteNavLinks } from "@/lib/site-nav";
import { cn } from "@/lib/utils";
import { HeaderNavPills } from "@/components/landing/header-nav-pills";

type SiteHeaderProps = {
  itemCount?: number;
  onOpenMobileCart?: () => void;
  onGetStarted?: () => void;
};

export function SiteHeader({
  itemCount = 0,
  onOpenMobileCart,
  onGetStarted,
}: SiteHeaderProps) {
  const reduceMotion = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleGetStarted = () => {
    setMenuOpen(false);
    if (onGetStarted) {
      onGetStarted();
      return;
    }
    smoothScrollToId("nomad-presets");
  };

  const handleNav = (id: string) => {
    setMenuOpen(false);
    smoothScrollToId(id);
  };

  return (
    <motion.header
      initial={reduceMotion ? false : { opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: motionEase }}
      className="sticky top-0 z-50 border-b border-primary/10 bg-background/90 shadow-[0_1px_0_0_oklch(0.55_0.15_145/0.06)] backdrop-blur-xl"
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent"
      />

      <div className="mx-auto flex h-[3.25rem] max-w-7xl items-center justify-between gap-3 px-4 sm:h-14 sm:gap-4 sm:px-6 lg:px-8">
        <SiteBrand
          showTagline
          onClick={() => smoothScrollToId("hero")}
        />

        <HeaderNavPills />

        <div className="flex shrink-0 items-center gap-2">
          {onOpenMobileCart && (
            <button
              type="button"
              onClick={onOpenMobileCart}
              className="relative rounded-full border border-border/60 bg-background/80 p-2 text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 lg:hidden"
              aria-label={`Open cart, ${itemCount} items`}
            >
              <ShoppingCart className="h-4 w-4" />
              {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[9px] font-bold text-primary-foreground">
                  {itemCount}
                </span>
              )}
            </button>
          )}

          <button
            type="button"
            onClick={handleGetStarted}
            className="group hidden items-center gap-1.5 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25 transition-all hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/30 active:scale-[0.98] sm:inline-flex"
          >
            Start your setup
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            className="rounded-full border border-border/60 bg-background/80 p-2 text-foreground transition-colors hover:border-primary/30 hover:bg-primary/5 md:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            {menuOpen ? (
              <X className="h-4 w-4" />
            ) : (
              <Menu className="h-4 w-4" />
            )}
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border/50 bg-background/98 transition-[max-height] duration-300 md:hidden",
          menuOpen ? "max-h-80" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1.5 px-4 py-3">
          {siteNavLinks.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              className="rounded-xl border border-transparent bg-secondary/30 px-3 py-2.5 text-left transition-all hover:border-primary/15 hover:bg-primary/5 active:scale-[0.99]"
            >
              <span className="block text-sm font-semibold text-foreground">
                {link.label}
              </span>
              <span className="mt-0.5 block text-xs text-muted-foreground">
                {link.hint}
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={handleGetStarted}
            className="mt-2 inline-flex items-center justify-center gap-1.5 rounded-full bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/25"
          >
            Start your setup
            <ArrowRight className="h-3.5 w-3.5" />
          </button>
        </nav>
      </div>
    </motion.header>
  );
}
