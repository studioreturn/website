"use client"

import { cn } from "@/lib/utils"
import { ICON_DURATION_MULTIPLIER } from "@/lib/icon-animation"
import type { HTMLMotionProps, Variants } from "motion/react"
import { motion, useAnimation, useReducedMotion } from "motion/react"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"

export interface GlobeIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface GlobeIconProps extends HTMLMotionProps<"div"> {
  size?: number
  duration?: number
  isAnimated?: boolean
}

const GlobeIcon = forwardRef<GlobeIconHandle, GlobeIconProps>(
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
    const pathControls = useAnimation()
    const reduced = useReducedMotion()
    const isHoverAnimatingRef = useRef(false)
    const d = duration * ICON_DURATION_MULTIPLIER

    const svgTransition = {
      rotate: { duration: 1.4 * d, ease: "linear" as const },
      scale: { duration: 0.25 * d, ease: "easeOut" as const },
    }
    useImperativeHandle(ref, () => ({
      startAnimation: () => {
        if (reduced) {
          controls.start("normal")
          pathControls.start("normal")
        } else {
          controls.start("animate", { duration: 1.4 * d, transition: svgTransition })
          pathControls.start("animate", { duration: 0.4 * d, ease: "easeOut" })
        }
      },
      stopAnimation: () => {
        controls.start("normal")
        pathControls.start("normal")
      },
    }), [controls, pathControls, d, reduced])

    const handleEnter = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        if (isAnimated && !reduced && !isHoverAnimatingRef.current) {
          isHoverAnimatingRef.current = true
          pathControls.start("animateReverse", { duration: 0.4 * d, ease: "easeOut" })
          controls.start("animateReverse", {
            duration: 1.4 * d,
            transition: svgTransition,
            onComplete: () => {
              pathControls.start("animate", { duration: 0.4 * d, ease: "easeOut" })
              controls.start("animate", {
                duration: 1.4 * d,
                transition: svgTransition,
                onComplete: () => {
                  isHoverAnimatingRef.current = false
                  controls.start("normal")
                  pathControls.start("normal")
                },
              })
            },
          })
        }
        onMouseEnter?.(e as React.MouseEvent<HTMLDivElement>)
      },
      [controls, pathControls, d, reduced, isAnimated, onMouseEnter],
    )

    const handleLeave = useCallback(
      (e?: React.MouseEvent<HTMLDivElement>) => {
        // Don't cancel: let the current reverse→forward sequence finish
        onMouseLeave?.(e as React.MouseEvent<HTMLDivElement>)
      },
      [onMouseLeave],
    )

    const svgVariants: Variants = {
      hidden: { opacity: 0, scale: 1, rotate: 0 },
      normal: {
        opacity: 1,
        scale: 1,
        rotate: 0,
      },
      animate: {
        opacity: 1,
        scale: [1, 1.03, 1],
        rotate: 360,
        transition: {
          rotate: {
            duration: 1.4 * d,
            ease: "linear",
          },
          scale: {
            duration: 0.25 * d,
            ease: "easeOut",
          },
        },
      },
      animateReverse: {
        opacity: 1,
        scale: [1, 1.03, 1],
        rotate: -360,
        transition: {
          rotate: {
            duration: 1.4 * d,
            ease: "linear",
          },
          scale: {
            duration: 0.25 * d,
            ease: "easeOut",
          },
        },
      },
    }

    const outlineVariants: Variants = {
      hidden: { pathLength: 0, opacity: 0 },
      normal: {
        pathLength: 1,
        opacity: 1,
      },
      animate: {
        pathLength: [0.9, 1],
        opacity: [0.8, 1],
        transition: {
          duration: 0.35 * d,
          ease: "easeOut",
        },
      },
      animateReverse: {
        pathLength: [1, 0.9],
        opacity: [1, 0.8],
        transition: {
          duration: 0.35 * d,
          ease: "easeOut",
        },
      },
    }

    const orbitVariants: Variants = {
      hidden: { pathLength: 0, opacity: 0 },
      normal: {
        pathLength: 1,
        opacity: 1,
      },
      animate: {
        pathLength: [0, 1],
        opacity: [0.5, 1],
        transition: {
          duration: 0.4 * d,
          delay: 0.08 * d,
          ease: "easeOut",
        },
      },
      animateReverse: {
        pathLength: [1, 0],
        opacity: [1, 0.5],
        transition: {
          duration: 0.4 * d,
          ease: "easeOut",
        },
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
          variants={svgVariants}
        >
          <motion.circle
            cx="12"
            cy="12"
            r="10"
            variants={outlineVariants}
            initial="hidden"
            animate={pathControls}
          />
          <motion.path
            d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"
            variants={orbitVariants}
            initial="hidden"
            animate={pathControls}
          />
          <motion.path
            d="M2 12h20"
            variants={orbitVariants}
            initial="hidden"
            animate={pathControls}
          />
        </motion.svg>
      </motion.div>
    )
  },
)

GlobeIcon.displayName = "GlobeIcon"
export { GlobeIcon }
