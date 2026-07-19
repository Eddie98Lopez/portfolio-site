"use client";

import * as React from "react";
import { motion, type Variants, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

interface HighlightedTextProps extends HTMLMotionProps<"span"> {
  trigger?: "hover" | "viewport" | "controlled";
  isHovered?: boolean; // New state to receive from parent
  color?: string;
}

const highlight: Variants = {
  hidden: { scaleX: 0 },
  visible: { scaleX: 1 },
};

export function HighlightedText({
  trigger = "viewport",
  isHovered = false,
  color,
  className,
  children,
  ...props
}: HighlightedTextProps) {
  // Conditionally assign Framer Motion controls based on the selected trigger
  const control = React.useMemo(() => {
    if (trigger === "hover") {
      return { whileHover: "visible" as const };
    }
    if (trigger === "viewport") {
      return {
        whileInView: "visible" as const,
        viewport: { once: true, amount: 0.6 },
      };
    }
    if (trigger === "controlled") {
      return {
        animate: isHovered ? "visible" : "hidden",
      };
    }
    return {};
  }, [trigger, isHovered]);

  return (
    <motion.span
      initial="hidden"
      className={cn("relative inline-block isolate", className)}
      {...control}
      {...props}
    >
      <motion.span
        aria-hidden
        variants={highlight}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
          delay: trigger === "viewport" ? 0.3 : 0,
        }}
        className={cn(
          "absolute -inset-x-[0.07em] -inset-y-[0.1em] -z-10 origin-left",
          !color && "bg-(--secondary-base)",
        )}
        style={color ? { backgroundColor: color } : undefined}
      />
      <span className="relative">{children}</span>
    </motion.span>
  );
}
