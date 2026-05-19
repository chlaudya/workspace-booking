'use client';

import {
  motion,
  useInView,
  useReducedMotion,
  type HTMLMotionProps,
} from 'framer-motion';
import { useRef, type ComponentProps } from 'react';
import { cn } from '@/lib/utils';
import { fadeUpVariants, motionEase, motionDuration } from '@/lib/motion';

type AnimatedSectionProps = HTMLMotionProps<'div'> & {
  delay?: number;
  /** Skip scroll trigger — animate on mount (hero above the fold) */
  immediate?: boolean;
};

export function AnimatedSection({
  children,
  className,
  delay = 0,
  immediate = false,
  ...props
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-72px 0px' });
  const shouldShow = immediate || inView;

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : 'hidden'}
      animate={reduceMotion || shouldShow ? 'visible' : 'hidden'}
      variants={fadeUpVariants}
      transition={{ delay, ease: motionEase, duration: motionDuration.base }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

type StaggerGroupProps = ComponentProps<typeof motion.div> & {
  immediate?: boolean;
};

export function StaggerGroup({
  children,
  className,
  immediate = false,
  ...props
}: StaggerGroupProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: '-64px 0px' });
  const shouldShow = immediate || inView;

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : 'hidden'}
      animate={reduceMotion || shouldShow ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: 0.09,
            delayChildren: 0.05,
          },
        },
      }}
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
  ...props
}: ComponentProps<typeof motion.div>) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 18 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: motionDuration.base, ease: motionEase },
              },
            }
      }
      className={cn(className)}
      {...props}
    >
      {children}
    </motion.div>
  );
}
