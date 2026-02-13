"use client"

import { useRef, useState, useImperativeHandle, forwardRef } from "react"
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import animationData from "@/public/branding-lottie.json"

export interface BrandingLottieIconHandle {
  startAnimation: () => void
}

interface BrandingLottieIconProps {
  size?: number
}

export const BrandingLottieIcon = forwardRef<BrandingLottieIconHandle, BrandingLottieIconProps>(
  ({ size = 48 }, ref) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    const [hasAppeared, setHasAppeared] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const isAppearingRef = useRef(false)
    const isAnimatingRef = useRef(false)
    const isHoveredRef = useRef(false)

    useImperativeHandle(ref, () => ({
      startAnimation: () => {
        if (lottieRef.current && !hasAppeared && !isAppearingRef.current) {
          setHasStarted(true)
          isAppearingRef.current = true
          isAnimatingRef.current = true
          // Play the "in-reveal" animation (frames 0-70)
          lottieRef.current.playSegments([0, 70], true)
        }
      }
    }))

    const handleComplete = () => {
      if (isAppearingRef.current) {
        isAppearingRef.current = false
        setHasAppeared(true)
      }
      isAnimatingRef.current = false
      // Don't automatically trigger another animation - let user hover again
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      
      if (!hasAppeared || !lottieRef.current || isAnimatingRef.current) return

      isAnimatingRef.current = true

      // Play "hover-explode" animation (frames 70-190)
      lottieRef.current.playSegments([70, 190], true)
    }

    const handleMouseLeave = () => {
      isHoveredRef.current = false
    }

    return (
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          width: `${size}px`,
          height: `${size}px`,
          cursor: 'pointer',
          opacity: hasStarted ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={animationData}
          loop={false}
          autoplay={false}
          onComplete={handleComplete}
          onEnterFrame={() => {
            // Only resume if paused and actively animating - don't restart completed animations
            if (isAnimatingRef.current && lottieRef.current?.animationItem) {
              const animItem = lottieRef.current.animationItem
              if (animItem.isPaused && !animItem.isComplete) {
                animItem.play()
              }
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none', // Prevent Lottie from capturing mouse events
            filter: 'brightness(0) saturate(100%) invert(11%) sepia(100%) saturate(7466%) hue-rotate(246deg) brightness(91%) contrast(148%)', // Convert to brand blue #1100FF
          }}
        />
      </div>
    )
  }
)

BrandingLottieIcon.displayName = "BrandingLottieIcon"
