'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import { motionEase, motionDuration } from '@/lib/motion';
import { smoothScrollTo } from '@/lib/scroll';
import { LandingPersonas } from '@/components/landing/landing-personas';
import { LandingBenefits } from '@/components/landing/landing-benefits';
import { HowItWorks } from '@/components/landing/how-it-works';

const heroItem = (delay: number, reduceMotion: boolean | null) =>
  reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: motionDuration.base, delay, ease: motionEase },
      };

export function LandingHero({ onGetStarted }: { onGetStarted: () => void }) {
  const stepsRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const handleSeeFlow = () => {
    smoothScrollTo(stepsRef.current);
  };

  return (
    <>
      <section className="relative overflow-hidden">
        <motion.div
          className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,oklch(0.55_0.15_145/0.12),transparent)]"
          initial={false}
        />
        <motion.div
          className="absolute inset-0 overflow-hidden pointer-events-none"
          initial={false}
        >
          <motion.div
            className="absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-primary/8 blur-3xl"
            animate={
              reduceMotion
                ? undefined
                : { scale: [1, 1.08, 1], opacity: [0.3, 0.5, 0.3] }
            }
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>

        <div className="relative z-10 mx-auto max-w-7xl px-4 pb-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
          <motion.div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-6">
              <motion.div
                {...heroItem(0, reduceMotion)}
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/25 bg-background/80 px-4 py-2 text-sm font-medium text-primary shadow-sm backdrop-blur-md"
              >
                <Sparkles className="h-4 w-4" />
                Built for digital nomads in Bali
                <span className="inline-flex items-center gap-1 rounded-full bg-amber-500/15 px-2 py-0.5 text-amber-600 dark:text-amber-400">
                  <Star className="h-3 w-3 fill-current" />
                  4.9
                </span>
              </motion.div>

              <motion.h1
                {...heroItem(0.08, reduceMotion)}
                className="font-serif text-4xl font-bold leading-[1.08] tracking-tight text-foreground sm:text-5xl lg:text-[3.25rem]"
              >
                Build your ideal workspace.
                <span className="mt-1 block bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  We deliver it today.
                </span>
              </motion.h1>

              <motion.p
                {...heroItem(0.16, reduceMotion)}
                className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground"
              >
                A premium rental experience for nomad professionals. Build your
                setup in 3D, see transparent pricing instantly, and move from
                request to delivery with trust signals at every step.
              </motion.p>

              <motion.div
                {...heroItem(0.24, reduceMotion)}
                className="mt-8 flex flex-col gap-3 sm:flex-row"
              >
                <button
                  onClick={onGetStarted}
                  className="group inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 font-semibold text-primary-foreground shadow-xl shadow-primary/30 transition-all duration-300 hover:bg-primary/90 hover:shadow-2xl hover:shadow-primary/35 active:scale-[0.98]"
                >
                  Start Building
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </button>
                <button
                  onClick={handleSeeFlow}
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-border bg-background/60 px-8 py-4 font-semibold text-foreground backdrop-blur-sm transition-all hover:border-primary/40 hover:bg-primary/5 active:scale-[0.98]"
                >
                  <PlayCircle className="h-4 w-4 text-primary" />
                  How It Works
                </button>
              </motion.div>

              <motion.div
                {...heroItem(0.32, reduceMotion)}
                className="mt-8 grid gap-3 sm:grid-cols-3"
              >
                {[
                  'No hidden fees',
                  'No payment until host confirms',
                  'Proof Center records',
                ].map((label) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-2 rounded-xl bg-secondary/60 px-3 py-2 text-xs font-medium text-muted-foreground"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-primary" />
                    {label}
                  </span>
                ))}
              </motion.div>
            </div>

            <motion.div
              {...heroItem(0.12, reduceMotion)}
              className="lg:col-span-6"
            >
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -6, rotate: 0.5 }}
                transition={{ duration: 0.45, ease: motionEase }}
                className="relative mx-auto max-w-2xl"
              >
                <motion.div
                  aria-hidden
                  className="absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-primary/20 via-transparent to-accent/15 blur-2xl"
                />
                <div className="relative rounded-[1.75rem] border border-border/60 bg-card/90 p-3 shadow-2xl shadow-black/10 backdrop-blur-xl">
                  <div className="mb-3 flex items-center gap-2 px-2">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
                    <span className="ml-2 text-xs text-muted-foreground">
                      monis.rent/builder
                    </span>
                  </div>

                  <div className="relative aspect-[16/10] overflow-hidden rounded-2xl ring-1 ring-border/50">
                    <Image
                      src="/bali-workspace-hero.jpg"
                      alt="Workspace builder interface preview"
                      fill
                      priority
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  </div>

                  <div className="absolute -bottom-5 left-8 rounded-2xl border border-border/80 bg-background/95 px-4 py-3 shadow-xl backdrop-blur-md">
                    <p className="text-sm font-semibold text-foreground">
                      Est. weekly from $24
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Desk + Chair + Monitor setup
                    </p>
                  </div>
                  <div className="absolute -top-4 right-8 rounded-full border border-primary/30 bg-background/95 px-4 py-1.5 shadow-lg backdrop-blur-md">
                    <p className="text-xs font-bold text-primary">
                      Trust score 98.9%
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <LandingPersonas />
      <LandingBenefits />

      <motion.div className="mx-auto max-w-7xl px-4 pb-16 pt-4 sm:px-6 lg:px-8">
        <HowItWorks ref={stepsRef} onGetStarted={onGetStarted} />
      </motion.div>
    </>
  );
}
