"use client"

import { cn } from "@/lib/utils"
import { ICON_DURATION_MULTIPLIER } from "@/lib/icon-animation"
import type { Variants } from "motion/react"
import { motion, useAnimation, useReducedMotion } from "motion/react"
import type { HTMLAttributes } from "react"
import { forwardRef, useCallback, useImperativeHandle, useRef } from "react"

export interface LoaderPinwheelIconHandle {
  startAnimation: () => void
  stopAnimation: () => void
}

interface LoaderPinwheelIconProps extends HTMLAttributes<HTMLDivElement> {
  size?: number
  duration?: number
  isAnimated?: boolean
}

const LoaderPinwheelIcon = forwardRef<
  LoaderPinwheelIconHandle,
  LoaderPinwheelIconProps
>(
  (
    {
      onMouseEnter,
      onMouseLeave,
      className,
      size = 28,
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

    const svgWrapperVariants: Variants = {
      hidden: { opacity: 0 },
      normal: { opacity: 1 },
      animate: { opacity: 1 },
      animateReverse: { opacity: 1 },
    }

    const gVariants: Variants = {
      hidden: { opacity: 0, rotate: 0 },
      normal: { opacity: 1, rotate: 0 },
      animate: {
        opacity: 1,
        rotate: 360,
        transition: { duration: 1 * d, ease: "linear" },
      },
      animateReverse: {
        opacity: 1,
        rotate: -360,
        transition: { duration: 1 * d, ease: "linear" },
      },
    }

    useImperativeHandle(ref, () => ({
      startAnimation: () =>
        reduced
          ? controls.start("normal")
          : controls.start("animate", { duration: 1 * d, ease: "linear" }),
      stopAnimation: () => controls.start("normal"),
    }), [controls, d, reduced])

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isAnimated && !reduced && !isHoverAnimatingRef.current) {
          isHoverAnimatingRef.current = true
          const t = { duration: 1 * d, ease: "linear" as const }
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
        onMouseEnter?.(e)
      },
      [controls, d, reduced, isAnimated, onMouseEnter],
    )

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        // Don't cancel: let the current reverse→forward sequence finish
        onMouseLeave?.(e)
      },
      [onMouseLeave],
    )

    return (
      <div
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <motion.svg
          fill="none"
          height={size}
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          width={size}
          xmlns="http://www.w3.org/2000/svg"
          animate={controls}
          initial="hidden"
          variants={svgWrapperVariants}
        >
          <motion.g
            animate={controls}
            initial="hidden"
            variants={gVariants}
          >
            <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
            <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
            <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
          </motion.g>
          <circle cx="12" cy="12" r="10" />
        </motion.svg>
      </div>
    )
  },
)

LoaderPinwheelIcon.displayName = "LoaderPinwheelIcon"

export { LoaderPinwheelIcon }
