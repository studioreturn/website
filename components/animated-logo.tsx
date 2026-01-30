"use client"

import { useState, useEffect, useCallback } from "react"

interface AnimatedLogoProps {
  color: string
  size?: number
}

export function AnimatedLogo({ color, size = 32 }: AnimatedLogoProps) {
  const [isAnimating, setIsAnimating] = useState(false)
  const [hasPlayedInitial, setHasPlayedInitial] = useState(false)

  const triggerAnimation = useCallback(() => {
    setIsAnimating(true)
    // Animation duration - enough time for the full sequence
    setTimeout(() => {
      setIsAnimating(false)
    }, 2400)
  }, [])

  // Trigger animation on initial mount
  useEffect(() => {
    if (!hasPlayedInitial) {
      // Small delay to ensure component is fully mounted
      const timer = setTimeout(() => {
        triggerAnimation()
        setHasPlayedInitial(true)
      }, 400)
      return () => clearTimeout(timer)
    }
  }, [hasPlayedInitial, triggerAnimation])

  const handleMouseEnter = () => {
    if (!isAnimating) {
      triggerAnimation()
    }
  }

  // Scale factor to fit the logo into the desired size
  const scale = size / 40

  return (
    <div
      onMouseEnter={handleMouseEnter}
      className="cursor-pointer"
      style={{ display: "inline-flex", alignItems: "center" }}
    >
      <svg
        width={52 * scale}
        height={40 * scale}
        viewBox="0 0 52 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ overflow: "visible" }}
      >
        <style>
          {`
            /* Eyes look around with natural, curious movement */
            @keyframes eyeLookAround {
              0%, 100% { transform: translate(0, 0); }
              10% { transform: translate(1.2px, -0.8px); }
              25% { transform: translate(1.5px, 0.3px); }
              40% { transform: translate(-0.5px, 0.8px); }
              55% { transform: translate(-1.2px, 0px); }
              70% { transform: translate(0.3px, -0.5px); }
              85% { transform: translate(0.8px, 0.2px); }
            }

            /* Quick, playful blink */
            @keyframes eyeBlink {
              0%, 35%, 45%, 100% { transform: scaleY(1); }
              40% { transform: scaleY(0.05); }
            }

            /* Gentle squint for expression */
            @keyframes eyeSquint {
              0%, 100% { transform: scaleY(1) scaleX(1); }
              50% { transform: scaleY(0.85) scaleX(1.05); }
            }

            /* Smile sways gently side to side */
            @keyframes smileSway {
              0%, 100% { transform: translateY(0) rotate(0deg); }
              20% { transform: translateY(-0.5px) rotate(0.8deg); }
              40% { transform: translateY(0.3px) rotate(-0.5deg); }
              60% { transform: translateY(-0.2px) rotate(0.6deg); }
              80% { transform: translateY(0.4px) rotate(-0.3deg); }
            }

            /* Smile stretches happily */
            @keyframes smileHappy {
              0%, 100% { transform: scaleX(1) scaleY(1); }
              30% { transform: scaleX(1.03) scaleY(0.97); }
              50% { transform: scaleX(0.98) scaleY(1.02); }
              70% { transform: scaleX(1.02) scaleY(0.99); }
            }

            /* Slight bounce for energy */
            @keyframes smileBounce {
              0%, 100% { transform: translateX(0); }
              25% { transform: translateX(0.4px); }
              50% { transform: translateX(-0.3px); }
              75% { transform: translateX(0.2px); }
            }

            .eye-top, .eye-bottom {
              transform-origin: center;
              transform-box: fill-box;
            }

            .eye-top.animating {
              animation:
                eyeLookAround 2s cubic-bezier(0.4, 0, 0.2, 1),
                eyeBlink 2s ease-in-out 0.6s,
                eyeSquint 2.2s ease-in-out 0.3s;
            }

            .eye-bottom.animating {
              animation:
                eyeLookAround 2s cubic-bezier(0.4, 0, 0.2, 1) 0.08s,
                eyeBlink 2s ease-in-out 0.6s,
                eyeSquint 2.2s ease-in-out 0.35s;
            }

            .smile {
              transform-origin: center;
              transform-box: fill-box;
            }

            .smile.animating {
              animation:
                smileSway 2s cubic-bezier(0.4, 0, 0.2, 1),
                smileHappy 2.2s ease-in-out 0.1s,
                smileBounce 1.8s ease-in-out 0.2s;
            }
          `}
        </style>

        {/* Top Eye */}
        <rect
          className={`eye-top ${isAnimating ? "animating" : ""}`}
          x="0"
          y="4"
          width="4.5"
          height="4.5"
          fill={color}
        />

        {/* Bottom Eye */}
        <rect
          className={`eye-bottom ${isAnimating ? "animating" : ""}`}
          x="0"
          y="22"
          width="4.5"
          height="4.5"
          fill={color}
        />

        {/* Smile (curved bracket) */}
        <g className={`smile ${isAnimating ? "animating" : ""}`}>
          <path
            d="M13.5 40C18.5 33.3 22 26.6 22 20C22 17.4 21.7 14.8 21.1 12.2C20.6 10.1 19.9 8.1 19 6.2C18.4 5 17.2 2.9 15 0H17.7C20.3 3.5 22.2 7 23.5 10.5C24.6 13.5 25.1 16.6 25.1 20C25.1 23.7 24.4 27.3 23 30.8C21.6 34.3 19.8 37.3 17.7 40H13.5Z"
            fill={color}
          />
        </g>
      </svg>
    </div>
  )
}
