'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { useRef } from 'react';
import {
  Sparkles,
  Truck,
  Calendar,
  Shield,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
  Star,
} from 'lucide-react';
import Image from 'next/image';
import {
  AnimatedSection,
  StaggerGroup,
  StaggerItem,
} from '@/components/motion/animated-section';
import { motionEase, motionDuration } from '@/lib/motion';

const benefitCards = [
  {
    icon: Truck,
    title: 'Same-Day Delivery',
    description: 'We deliver and set up your workstation anywhere in Bali.',
    chip: 'Free delivery',
  },
  {
    icon: Calendar,
    title: 'Flexible Rentals',
    description: 'Rent weekly or monthly with no lock-in contracts.',
    chip: 'No minimum',
  },
  {
    icon: Shield,
    title: 'Verified Rental Protection',
    description:
      'Identity checks, signed terms, and timestamped proof records on every booking.',
    chip: 'Trust-first',
  },
];

const steps = [
  {
    number: '01',
    title: 'Pick Your Setup',
    description:
      'Choose your desk, chair, monitor, and accessories in the 3D canvas.',
  },
  {
    number: '02',
    title: 'Confirm Rental',
    description: 'See transparent weekly pricing and checkout in minutes.',
  },
  {
    number: '03',
    title: 'Start Working',
    description: 'We deliver, install, and you are productive the same day.',
  },
];

const nomadProfiles = [
  {
    title: 'Remote Engineer',
    detail: 'Dual-screen focus with ergonomic support',
  },
  {
    title: 'Product Consultant',
    detail: 'Client-call ready with premium camera and audio',
  },
  {
    title: 'Indie Founder',
    detail: 'Lean setup that scales week by week',
  },
];

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
    stepsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section className="relative overflow-hidden border-b border-border/60">
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-background to-background"
        initial={false}
      />
      <motion.div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        initial={false}
      >
        <motion.div
          className="absolute -top-20 -right-20 h-72 w-72 rounded-full bg-primary/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1, 1.12, 1],
                  opacity: [0.2, 0.4, 0.2],
                }
          }
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-0 -left-20 h-72 w-72 rounded-full bg-accent/10 blur-3xl"
          animate={
            reduceMotion
              ? undefined
              : {
                  scale: [1.1, 1, 1.1],
                  opacity: [0.2, 0.4, 0.2],
                }
          }
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>

      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      <motion.div
        className="relative z-10 mx-auto max-w-7xl px-4 pb-14 pt-12 sm:px-6 lg:px-8 lg:pt-16"
        initial={false}
      >
        <div className="grid items-center gap-10 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <motion.div
              {...heroItem(0, reduceMotion)}
              className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              <Sparkles className="h-4 w-4" />
              Built for digital nomads in Bali
              <span className="inline-flex items-center gap-1 text-amber-500">
                <Star className="h-3 w-3 fill-current" />
                4.9
              </span>
            </motion.div>

            <motion.h1
              {...heroItem(0.08, reduceMotion)}
              className="font-serif text-4xl font-bold leading-tight text-foreground sm:text-5xl lg:text-6xl"
            >
              Build your ideal workspace.
              <span className="block text-primary">We deliver it today.</span>
            </motion.h1>

            <motion.p
              {...heroItem(0.16, reduceMotion)}
              className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground"
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-7 py-3.5 font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-primary/90 hover:shadow-xl hover:shadow-primary/30 active:scale-[0.98]"
              >
                Start Building
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
              <button
                onClick={handleSeeFlow}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card px-7 py-3.5 font-semibold text-foreground transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:border-primary/30 hover:bg-primary/5 active:scale-[0.98]"
              >
                <PlayCircle className="h-4 w-4 text-primary" />
                How It Works
              </button>
            </motion.div>

            <motion.div
              {...heroItem(0.32, reduceMotion)}
              className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground"
            >
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No hidden fees
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                No payment captured until host confirms
              </span>
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary" />
                Proof Center with time-stamped records
              </span>
            </motion.div>

            <StaggerGroup className="mt-6 grid gap-3 sm:grid-cols-3" immediate>
              {nomadProfiles.map((profile) => (
                <StaggerItem key={profile.title}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.25, ease: motionEase }}
                    className="rounded-xl border border-border/80 bg-card/80 p-3 backdrop-blur-sm transition-shadow duration-300 hover:shadow-md"
                  >
                    <p className="text-sm font-semibold text-foreground">
                      {profile.title}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {profile.detail}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <motion.div
            {...heroItem(0.12, reduceMotion)}
            className="lg:col-span-6"
          >
            <motion.div
              whileHover={reduceMotion ? undefined : { y: -4 }}
              transition={{ duration: 0.4, ease: motionEase }}
              className="relative mx-auto max-w-2xl rounded-3xl border border-border/70 bg-card p-3 shadow-2xl shadow-black/10"
            >
              <motion.div
                className="mb-3 flex items-center gap-2 px-2"
                initial={reduceMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.35, duration: 0.4 }}
              >
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-red-400/80"
                  initial={reduceMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.4, type: 'spring', stiffness: 400 }}
                />
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-yellow-400/80"
                  initial={reduceMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.45, type: 'spring', stiffness: 400 }}
                />
                <motion.div
                  className="h-2.5 w-2.5 rounded-full bg-green-400/80"
                  initial={reduceMotion ? false : { scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: 'spring', stiffness: 400 }}
                />
                <span className="ml-2 text-xs text-muted-foreground">
                  monis.rent/builder
                </span>
              </motion.div>

              <motion.div
                className="relative aspect-[16/10] overflow-hidden rounded-2xl"
                initial={reduceMotion ? false : { opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.6, ease: motionEase }}
              >
                <Image
                  src="/bali-workspace-hero.jpg"
                  alt="Workspace builder interface preview"
                  fill
                  priority
                  className="object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent"
                  initial={reduceMotion ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.45, duration: 0.5 }}
                />
              </motion.div>

              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55, duration: 0.45, ease: motionEase }}
                className="absolute -bottom-4 left-6 rounded-xl border border-border bg-background/95 px-3 py-2 shadow-lg backdrop-blur"
              >
                <p className="text-xs font-medium text-foreground">
                  Est. weekly from $24
                </p>
                <p className="text-[11px] text-muted-foreground">
                  Desk + Chair + Monitor setup
                </p>
              </motion.div>
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.45, ease: motionEase }}
                className="absolute -top-3 right-6 rounded-full border border-primary/30 bg-background/95 px-3 py-1 shadow-lg backdrop-blur"
              >
                <p className="text-[11px] font-semibold text-primary">
                  Trust score 98.9%
                </p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        <StaggerGroup className="mt-14 grid gap-4 md:grid-cols-3">
          {benefitCards.map((benefit) => (
            <StaggerItem key={benefit.title}>
              <motion.div
                whileHover={reduceMotion ? undefined : { y: -3 }}
                transition={{ duration: 0.3, ease: motionEase }}
                className="h-full rounded-2xl border border-border bg-card/90 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <motion.div
                  className="mb-4 flex items-center justify-between"
                  initial={false}
                >
                  <div className="rounded-lg bg-primary/10 p-2 text-primary">
                    <benefit.icon className="h-4 w-4" />
                  </div>
                  <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary">
                    {benefit.chip}
                  </span>
                </motion.div>
                <h3 className="text-base font-semibold text-foreground">
                  {benefit.title}
                </h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <AnimatedSection>
          <div
            ref={stepsRef}
            className="mt-12 scroll-mt-24 rounded-2xl border border-border bg-card/70 p-6 lg:p-8"
          >
            <p className="text-center text-xs font-semibold tracking-[0.22em] text-primary">
              HOW IT WORKS
            </p>
            <h2 className="mt-2 text-center font-serif text-2xl font-bold text-foreground lg:text-3xl">
              Go from idea to setup in 3 steps
            </h2>

            <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-3">
              {steps.map((step) => (
                <StaggerItem key={step.number}>
                  <motion.div
                    whileHover={reduceMotion ? undefined : { y: -2 }}
                    transition={{ duration: 0.25, ease: motionEase }}
                    className="rounded-xl border border-border bg-background/80 p-4 transition-shadow duration-300 hover:shadow-sm"
                  >
                    <p className="text-xs font-semibold text-primary">
                      {step.number}
                    </p>
                    <h3 className="mt-2 text-base font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>
        </AnimatedSection>
      </motion.div>
    </section>
  );
}
