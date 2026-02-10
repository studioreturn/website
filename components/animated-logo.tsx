"use client"

import { useState, useEffect, useRef } from "react"

interface AnimatedLogoProps {
  color: string
  size?: number
}

export function AnimatedLogo({ color, size = 48 }: AnimatedLogoProps) {
  const [currentAnimation, setCurrentAnimation] = useState(3) // Start with animation #3 (eyes moving around)
  const [nextAnimation, setNextAnimation] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const [cacheBust, setCacheBust] = useState<Record<number, number>>({
    1: 0,
    2: 0,
    3: 0
  })
  const animationTimerRef = useRef<NodeJS.Timeout | null>(null)
  const transitionTimerRef = useRef<NodeJS.Timeout | null>(null)

  const handleHover = () => {
    if (isAnimating || !isMounted) return
    
    if (animationTimerRef.current) {
      clearTimeout(animationTimerRef.current)
    }
    if (transitionTimerRef.current) {
      clearTimeout(transitionTimerRef.current)
    }
    
    const next = (currentAnimation % 3) + 1
    
    // First, fade out current animation
    setNextAnimation(null)
    
    // After fade out, load and show next animation
    setTimeout(() => {
      // Start loading the next animation with new cache bust
      setCacheBust(prev => ({
        ...prev,
        [next]: Date.now()
      }))
      
      // Show next animation
      setNextAnimation(next)
      
      // After crossfade completes, make next the current
      transitionTimerRef.current = setTimeout(() => {
        setCurrentAnimation(next)
        setNextAnimation(null)
        transitionTimerRef.current = null
      }, 250)
    }, 100) // Brief delay between fade out and fade in
    
    setIsAnimating(true)
    
    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false)
      animationTimerRef.current = null
    }, 3200)
  }

  const isBlue = color === "#1100FF"

  useEffect(() => {
    // Small delay to ensure SVG transforms are applied before showing
    const mountTimer = setTimeout(() => {
      setIsMounted(true)
    }, 50)
    
    // Initial animation timer
    animationTimerRef.current = setTimeout(() => {
      setIsAnimating(false)
      animationTimerRef.current = null
    }, 3200)
    
    return () => {
      clearTimeout(mountTimer)
      if (animationTimerRef.current) {
        clearTimeout(animationTimerRef.current)
      }
      if (transitionTimerRef.current) {
        clearTimeout(transitionTimerRef.current)
      }
    }
  }, [])

  return (
    <div 
      onMouseEnter={handleHover}
      className="inline-flex items-center justify-center cursor-pointer relative"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        filter: isBlue ? 'brightness(0) saturate(100%) invert(11%) sepia(100%) saturate(7466%) hue-rotate(246deg) brightness(91%) contrast(148%)' : 'none',
        opacity: isMounted ? 1 : 0,
        transition: isMounted ? 'opacity 0.2s ease-in-out' : 'none',
      }}
    >
      {[1, 2, 3].map((num) => {
        const isCurrent = currentAnimation === num
        const isNext = nextAnimation === num
        const shouldShow = isCurrent || isNext
        
        // Only render non-current animations after mount to prevent flash
        if (!isMounted && num !== currentAnimation) {
          return null
        }
        
        return (
          <object
            key={`smile-${num}`}
            data={`/smile-${num}.svg?t=${cacheBust[num]}`}
            type="image/svg+xml"
            width={size}
            height={size}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              opacity: shouldShow ? 1 : 0,
              visibility: shouldShow ? 'visible' : 'hidden',
              pointerEvents: 'none',
              position: 'absolute',
              top: 0,
              left: 0,
              transition: 'opacity 0.2s ease-in-out',
              zIndex: isNext ? 2 : (isCurrent ? 1 : 0),
            }}
            aria-label="Return logo"
          />
        )
      })}
    </div>
  )
}
