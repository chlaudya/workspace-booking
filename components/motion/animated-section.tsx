"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
  type UseInViewOptions,
  type Variants,
} from "framer-motion";
import { useRef, type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import {
  defaultViewportAmount,
  fadeUpVariants,
  motionDuration,
  motionEase,
  reducedMotionVariants,
  sectionVariants,
  staggerContainerVariants,
  staggerEntranceVariants,
  type SectionVariant,
  type StaggerEntrance,
} from "@/lib/motion";

const defaultInViewMargin = "-72px 0px" as const;

type ViewportOptions = {
  immediate?: boolean;
  viewportMargin?: UseInViewOptions["margin"];
  /** 0–1 — how much of the element must be visible to trigger */
  amount?: number;
};

function useReveal({
  immediate = false,
  viewportMargin = defaultInViewMargin,
  amount = defaultViewportAmount,
}: ViewportOptions = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: viewportMargin, amount });
  const shouldShow = immediate || inView;

  return { ref, reduceMotion, shouldShow };
}

type AnimatedSectionProps = HTMLMotionProps<"div"> & {
  delay?: number;
  /** Skip scroll trigger — animate on mount (hero above the fold) */
  immediate?: boolean;
  /** Entrance animation preset */
  variant?: SectionVariant;
  viewportMargin?: UseInViewOptions["margin"];
  amount?: number;
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  immediate = false,
  variant = "fadeUpSpring",
  viewportMargin = defaultInViewMargin,
  amount = defaultViewportAmount,
  ...props
}: AnimatedSectionProps) {
  const { ref, reduceMotion, shouldShow } = useReveal({
    immediate,
    viewportMargin,
    amount,
  });
  const variants = reduceMotion
    ? reducedMotionVariants
    : sectionVariants[variant];

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion || shouldShow ? "visible" : "hidden"}
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerGroupProps = ComponentProps<typeof motion.div> &
  ViewportOptions & {
    /** Seconds between each child entrance */
    stagger?: number;
    /** Delay before the first child animates */
    delayChildren?: number;
    /** Stagger direction for lists */
    staggerFrom?: "first" | "last" | "center";
  };

export function StaggerGroup({
  children,
  className,
  immediate = false,
  stagger = 0.09,
  delayChildren = 0.04,
  staggerFrom = "first",
  viewportMargin = "-64px 0px",
  amount = defaultViewportAmount,
  ...props
}: StaggerGroupProps) {
  const { ref, reduceMotion, shouldShow } = useReveal({
    immediate,
    viewportMargin,
    amount,
  });

  const containerVariants: Variants = reduceMotion
    ? reducedMotionVariants
    : {
        hidden: staggerContainerVariants.hidden,
        visible: {
          transition: {
            staggerChildren: stagger,
            delayChildren,
            ...(staggerFrom === "last" && { staggerDirection: -1 }),
            ...(staggerFrom === "center" && { staggerFrom: "center" as const }),
          },
        },
      };

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : "hidden"}
      animate={reduceMotion || shouldShow ? "visible" : "hidden"}
      variants={containerVariants}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = ComponentProps<typeof motion.div> & {
  entrance?: StaggerEntrance;
};

export function StaggerItem({
  children,
  className,
  entrance = "up",
  ...props
}: StaggerItemProps) {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion
    ? reducedMotionVariants
    : staggerEntranceVariants[entrance];

  return (
    <motion.div variants={variants} className={cn(className)} {...props}>
      {children}
    </motion.div>
  );
}

type FadeUpProps = ComponentProps<typeof motion.div> & {
  delay?: number;
  /** Spring pop vs classic fade-up */
  spring?: boolean;
};

/** Lightweight fade-up without scroll observer — for nested content */
export function FadeUp({
  children,
  className,
  delay = 0,
  spring = true,
  ...props
}: FadeUpProps) {
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion
    ? reducedMotionVariants
    : spring
      ? sectionVariants.fadeUpSpring
      : fadeUpVariants;

  return (
    <motion.div
      initial={reduceMotion ? false : "hidden"}
      animate="visible"
      variants={variants}
      transition={{ delay }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

/** Re-export for custom motion.div wrappers that share viewport logic */
export { useReveal, defaultViewportAmount };
