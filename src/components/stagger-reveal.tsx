"use client";
import { Children, type ReactNode, type ElementType } from "react";
import { motion, type Variants } from "framer-motion";
// Newer Motion package: import { motion, type Variants } from "motion/react";

type Preset = "default" | "slower" | "faster";

type Ease = [number, number, number, number];

type PresetConfig = {
  stagger: number;
  delay: number;
  distance: number;
  duration: number;
  ease: Ease;
};

const PRESETS: Record<Preset, PresetConfig> = {
  // Longer glide, more travel, expo-style deceleration = buttery.
  default: {
    stagger: 0.14,
    delay: 0.1,
    distance: 40,
    duration: 0.8,
    ease: [0.16, 1, 0.3, 1],
  },
  slower: {
    stagger: 0.26,
    delay: 0.2,
    distance: 56,
    duration: 1.15,
    ease: [0.16, 1, 0.3, 1],
  },
  faster: {
    stagger: 0.08,
    delay: 0.05,
    distance: 28,
    duration: 0.55,
    ease: [0.22, 1, 0.36, 1],
  },
};

type StaggerRevealProps = {
  children: ReactNode;
  preset?: Preset;
  stagger?: number; // gap between each child
  delay?: number; // delay before the first child fires
  distance?: number; // how far up each child travels (px)
  duration?: number; // per-child animation length
  whenInView?: boolean; // trigger on scroll into view instead of on mount
  once?: boolean; // (scroll mode) only animate the first time
  as?: ElementType;
  className?: string;
};

export function StaggerReveal({
  children,
  preset = "default",
  stagger,
  delay,
  distance,
  duration,
  whenInView = true,
  once = true,
  as = "div",
  ...props
}: StaggerRevealProps) {
  const base = PRESETS[preset];
  // Individual props override the preset when provided.
  const cfg = {
    stagger: stagger ?? base.stagger,
    delay: delay ?? base.delay,
    distance: distance ?? base.distance,
    duration: duration ?? base.duration,
    ease: base.ease,
  };
  const MotionTag = motion[as as keyof typeof motion] as ElementType;

  const container: Variants = {
    hidden: {},
    show: {
      transition: { delayChildren: cfg.delay, staggerChildren: cfg.stagger },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: cfg.distance, filter: "blur(5px)" },
    show: {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: cfg.duration, ease: cfg.ease },
    },
  };

  const trigger = whenInView
    ? { whileInView: "show", viewport: { once, margin: "-10% 0px" } }
    : { animate: "show" };

  return (
    <MotionTag variants={container} initial="hidden" {...trigger} {...props}>
      {Children.map(children, (child, i) => (
        <motion.div key={i} variants={item}>
          {child}
        </motion.div>
      ))}
    </MotionTag>
  );
}
