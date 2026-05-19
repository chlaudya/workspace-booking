"use client";

import { useCallback, useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Box, Home, LayoutGrid, Sparkles, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motionSpring } from "@/lib/motion";
import { smoothScrollToId } from "@/lib/scroll";
import { siteNavLinks, type SiteNavLinkId } from "@/lib/site-nav";
import { cn } from "@/lib/utils";

const navIcons: Record<SiteNavLinkId, LucideIcon> = {
  hero: Home,
  personas: Users,
  benefits: Sparkles,
  "how-it-works": Box,
  "nomad-presets": LayoutGrid,
};

export function HeaderNavPills({ className }: { className?: string }) {
  const reduceMotion = useReducedMotion();
  const [activeId, setActiveId] = useState<SiteNavLinkId>(siteNavLinks[0].id);

  useEffect(() => {
    const sections = siteNavLinks
      .map((link) => document.getElementById(link.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        const id = visible[0]?.target.id as SiteNavLinkId | undefined;
        if (id && siteNavLinks.some((l) => l.id === id)) {
          setActiveId(id);
        }
      },
      {
        rootMargin: "-38% 0px -50% 0px",
        threshold: [0, 0.12, 0.28, 0.45],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const handleNav = useCallback((id: SiteNavLinkId) => {
    setActiveId(id);
    smoothScrollToId(id);
  }, []);

  return (
    <nav
      aria-label="Main"
      className={cn("relative hidden md:flex md:max-w-[min(100%,36rem)] xl:max-w-none", className)}
    >
      <motion.div
        className="relative flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-primary/10 bg-gradient-to-b from-secondary/90 to-secondary/50 p-1 shadow-[inset_0_1px_2px_oklch(0_0_0/0.04)] ring-1 ring-border/40 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.08 }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(ellipse_at_50%_0%,oklch(0.55_0.15_145/0.08),transparent_55%)]"
        />

        {siteNavLinks.map((link) => {
          const isActive = activeId === link.id;
          const Icon = navIcons[link.id];

          return (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNav(link.id)}
              aria-current={isActive ? "true" : undefined}
              title={link.label}
              className={cn(
                "relative z-10 flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-xs font-medium transition-colors duration-200 xl:gap-1.5 xl:px-3 xl:py-2 xl:text-[13px]",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {isActive && (
                <motion.span
                  layoutId="header-nav-active-pill"
                  className="absolute inset-0 rounded-full bg-card shadow-[0_1px_3px_oklch(0_0_0/0.08),0_0_0_1px_oklch(0.55_0.15_145/0.12)]"
                  transition={
                    reduceMotion
                      ? { duration: 0.01 }
                      : motionSpring.snappy
                  }
                />
              )}
              <Icon
                className={cn(
                  "relative z-10 h-3.5 w-3.5 shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground/70",
                )}
                strokeWidth={isActive ? 2.25 : 2}
              />
              <span className="relative z-10 whitespace-nowrap xl:hidden">
                {link.shortLabel}
              </span>
              <span className="relative z-10 hidden whitespace-nowrap xl:inline">
                {link.label}
              </span>
            </button>
          );
        })}
      </motion.div>
    </nav>
  );
}
