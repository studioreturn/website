"use client"

import { useRef, useState, useImperativeHandle, forwardRef } from "react"
import Lottie, { LottieRefCurrentProps } from "lottie-react"
import animationData from "@/public/globe-lottie.json"

export interface GlobeLottieIconHandle {
  startAnimation: () => void
}

interface GlobeLottieIconProps {
  size?: number
}

export const GlobeLottieIcon = forwardRef<GlobeLottieIconHandle, GlobeLottieIconProps>(
  ({ size = 48 }, ref) => {
    const lottieRef = useRef<LottieRefCurrentProps>(null)
    const [hasAppeared, setHasAppeared] = useState(false)
    const [hasStarted, setHasStarted] = useState(false)
    const [useWorldAnimation, setUseWorldAnimation] = useState(true)
    const isAppearingRef = useRef(false)
    const isAnimatingRef = useRef(false)
    const isHoveredRef = useRef(false)

    useImperativeHandle(ref, () => ({
      startAnimation: () => {
        if (lottieRef.current && !hasAppeared && !isAppearingRef.current) {
          setHasStarted(true)
          isAppearingRef.current = true
          isAnimatingRef.current = true
          // Play the "in-world" animation (frames 0-70)
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
      
      if (isHoveredRef.current && hasAppeared) {
        handleMouseEnter()
      }
    }

    const handleMouseEnter = () => {
      isHoveredRef.current = true
      
      if (!hasAppeared || !lottieRef.current || isAnimatingRef.current) return

      isAnimatingRef.current = true

      if (useWorldAnimation) {
        // Play "hover-world" animation (frames 70-130)
        lottieRef.current.playSegments([70, 130], true)
      } else {
        // Play "loop-world" animation (frames 140-200)  
        lottieRef.current.playSegments([140, 200], true)
      }
      
      // Toggle for next hover
      setUseWorldAnimation(!useWorldAnimation)
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
            if (isAnimatingRef.current && lottieRef.current?.animationItem) {
              if (lottieRef.current.animationItem.isPaused) {
                lottieRef.current.animationItem.play()
              }
            }
          }}
          style={{
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            filter: 'brightness(0) saturate(100%) invert(11%) sepia(100%) saturate(7466%) hue-rotate(246deg) brightness(91%) contrast(148%)', // Convert to brand blue #1100FF
          }}
        />
      </div>
    )
  }
)

GlobeLottieIcon.displayName = "GlobeLottieIcon"
