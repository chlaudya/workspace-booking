/** Shared motion tokens — keep durations/easing consistent across sections */
export const motionEase = [0.22, 1, 0.36, 1] as const;

export const motionDuration = {
  fast: 0.35,
  base: 0.55,
  slow: 0.7,
} as const;

export const fadeUpVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.base, ease: motionEase },
  },
};

export const fadeInVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: motionDuration.base, ease: motionEase },
  },
};

export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: motionDuration.base, ease: motionEase },
  },
};

export const slideDownVariants = {
  hidden: { opacity: 0, y: -12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.fast, ease: motionEase },
  },
};

export const staggerContainerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.04,
    },
  },
};

export const staggerItemVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: motionDuration.base, ease: motionEase },
  },
};

export const springTransition = {
  type: 'spring' as const,
  damping: 28,
  stiffness: 320,
};
