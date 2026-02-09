"use client"

import { cn } from "@/lib/utils"
import { ICON_DURATION_MULTIPLIER } from "@/lib/icon-animation"
import type { HTMLMotionProps, Variants } from "motion/react"
import { motion, useAnimation, useReducedMotion } from "motion/react"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"

export interface BoltIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface BoltIconProps extends HTMLMotionProps<"div"> {
  size?: number
  duration?: number
  isAnimated?: boolean
}

const BoltIcon = forwardRef<BoltIconHandle, BoltIconProps>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 24,
      duration = 1,
      isAnimated = true,
      ...props
    },
    ref,
  ) => {
    const controls = useAnimation()
    const reduced = useReducedMotion()
    const isHoverAnimatingRef = useRef(false)
    const d = duration * ICON_DURATION_MULTIPLIER

    useImperativeHandle(ref, () => ({
        startAnimation: () =>
          reduced
            ? controls.start("normal")
            : controls.start("animate", { duration: 1.2 * d, ease: "easeInOut" }),
        stopAnimation: () => controls.start("normal"),
    }), [controls, d, reduced])

    const handleEnter = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        if (isAnimated && !reduced && !isHoverAnimatingRef.current) {
          isHoverAnimatingRef.current = true
          const t = { duration: 1.2 * d, ease: "easeInOut" as const }
          controls.start("animateReverse", {
            ...t,
            onComplete: () => {
              controls.start("animate", {
                ...t,
                onComplete: () => {
                  isHoverAnimatingRef.current = false
                  controls.start("normal")
                },
              })
            },
          })
        }
        onMouseEnter?.(e as React.MouseEvent<HTMLDivElement>)
      },
      [controls, d, reduced, isAnimated, onMouseEnter],
    )

    const handleLeave = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        // Don't cancel: let the current reverse→forward sequence finish
        onMouseLeave?.(e as React.MouseEvent<HTMLDivElement>)
      },
      [onMouseLeave],
    )

    const iconVariants: Variants = {
      hidden: { opacity: 0, scale: 1, rotate: 0 },
      normal: { opacity: 1, scale: 1, rotate: 0 },
      animate: {
        opacity: 1,
        scale: [1, 1.08, 0.95, 1],
        rotate: [0, -2, 2, 0],
        transition: { duration: 1.2 * d, ease: "easeInOut", repeat: 0 },
      },
      animateReverse: {
        opacity: 1,
        scale: [1, 0.95, 1.08, 1],
        rotate: [0, 2, -2, 0],
        transition: { duration: 1.2 * d, ease: "easeInOut", repeat: 0 },
      },
    }

    const pathVariants: Variants = {
      hidden: { pathLength: 0 },
      normal: { pathLength: 1 },
      animate: {
        pathLength: [0, 1],
        transition: { duration: 1.3 * d, ease: "easeInOut", repeat: 0 },
      },
      animateReverse: {
        pathLength: [1, 0],
        transition: { duration: 1.3 * d, ease: "easeInOut", repeat: 0 },
      },
    }

    const circleVariants: Variants = {
      hidden: { opacity: 0, scale: 1 },
      normal: { scale: 1, opacity: 1 },
      animate: {
        scale: [1, 1.3, 0.9, 1],
        opacity: [1, 0.6, 1],
        transition: { duration: 1.1 * d, ease: "easeInOut", repeat: 0 },
      },
      animateReverse: {
        scale: [1, 0.9, 1.3, 1],
        opacity: [1, 0.6, 1],
        transition: { duration: 1.1 * d, ease: "easeInOut", repeat: 0 },
      },
    }

    return (
      <motion.div
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        {...props}
      >
        <motion.svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          animate={controls}
          initial="hidden"
          variants={iconVariants}
        >
          <motion.path
            d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
            variants={pathVariants}
          />
          <motion.circle cx="12" cy="12" r="4" variants={circleVariants} />
        </motion.svg>
      </motion.div>
    )
  },
)

BoltIcon.displayName = "BoltIcon"
export { BoltIcon }
