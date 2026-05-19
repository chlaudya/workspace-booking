/** Shared motion tokens — keep durations/easing consistent across sections */
export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionDuration = {
  fast: 0.35,
  base: 0.55,
  slow: 0.75,
} as const;

/** Spring presets — snappy product-marketing feel */
export const motionSpring = {
  soft: { type: "spring" as const, damping: 32, stiffness: 260, mass: 0.9 },
  snappy: { type: "spring" as const, damping: 28, stiffness: 360, mass: 0.75 },
  playful: { type: "spring" as const, damping: 22, stiffness: 320, mass: 0.85 },
} as const;

const baseTransition = {
  duration: motionDuration.base,
  ease: motionEase,
} as const;

const fastTransition = {
  duration: motionDuration.fast,
  ease: motionEase,
} as const;

const slowTransition = {
  duration: motionDuration.slow,
  ease: motionEase,
} as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: baseTransition,
  },
};

export const fadeUpSpringVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.985 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: motionSpring.snappy,
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: baseTransition,
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.96, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: { ...motionSpring.soft, opacity: { duration: 0.4 } },
  },
};

export const revealVariants = {
  hidden: {
    opacity: 0,
    y: 16,
    clipPath: "inset(100% 0 0 0 round 12px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0 round 12px)",
    transition: slowTransition,
  },
};

export const slideDownVariants = {
  hidden: { opacity: 0, y: -14, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: fastTransition,
  },
};

export const slideInLeftVariants = {
  hidden: { opacity: 0, x: -20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: baseTransition,
  },
};

export const slideInRightVariants = {
  hidden: { opacity: 0, x: 20, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: baseTransition,
  },
};

export const sectionVariants = {
  fadeUp: fadeUpVariants,
  fadeUpSpring: fadeUpSpringVariants,
  fadeIn: fadeInVariants,
  scaleIn: scaleInVariants,
  reveal: revealVariants,
  slideDown: slideDownVariants,
  slideInLeft: slideInLeftVariants,
  slideInRight: slideInRightVariants,
} as const;

export type SectionVariant = keyof typeof sectionVariants;

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 18, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ...baseTransition,
      duration: motionDuration.slow,
    },
  },
};

export const staggerItemScaleVariants = {
  hidden: { opacity: 0, scale: 0.94, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    scale: 1,
    filter: "blur(0px)",
    transition: motionSpring.playful,
  },
};

export const staggerItemSlideLeftVariants = {
  hidden: { opacity: 0, x: -16, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: motionSpring.snappy,
  },
};

export const staggerItemSlideRightVariants = {
  hidden: { opacity: 0, x: 16, filter: "blur(3px)" },
  visible: {
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: motionSpring.snappy,
  },
};

export const staggerItemFadeVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: fastTransition,
  },
};

export const staggerItemRevealVariants = {
  hidden: {
    opacity: 0,
    y: 12,
    clipPath: "inset(100% 0 0 0 round 8px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    clipPath: "inset(0% 0 0 0 round 8px)",
    transition: slowTransition,
  },
};

export const staggerEntranceVariants = {
  up: staggerItemVariants,
  scale: staggerItemScaleVariants,
  slideLeft: staggerItemSlideLeftVariants,
  slideRight: staggerItemSlideRightVariants,
  fade: staggerItemFadeVariants,
  reveal: staggerItemRevealVariants,
} as const;

export type StaggerEntrance = keyof typeof staggerEntranceVariants;

export const reducedMotionVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.01 } },
};

/** Default viewport trigger — element ~15% visible before animating */
export const defaultViewportAmount = 0.15;

/** @deprecated Prefer motionSpring.snappy — kept for modal/drawer transitions */
export const springTransition = motionSpring.snappy;
