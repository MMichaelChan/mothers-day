"use client"

import { useEffect, useState } from "react"
import { Heart } from "lucide-react"

interface FloatingHeart {
  id: number
  x: number
  size: number
  opacity: number
  duration: number
  delay: number
}

export function FloatingHearts() {
  const [hearts, setHearts] = useState<FloatingHeart[]>([])

  useEffect(() => {
    // Create initial hearts
    const initialHearts: FloatingHeart[] = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      x: Math.random() * 100, // random horizontal position
      size: Math.random() * 20 + 10, // random size between 10-30px
      opacity: Math.random() * 0.5 + 0.1, // random opacity between 0.1-0.6
      duration: Math.random() * 15 + 10, // random animation duration between 10-25s
      delay: Math.random() * 10, // random delay before animation starts
    }))

    setHearts(initialHearts)

    // Periodically add new hearts
    const interval = setInterval(() => {
      setHearts((prevHearts) => {
        // Remove some old hearts if there are too many
        if (prevHearts.length > 25) {
          return [
            ...prevHearts.slice(5),
            {
              id: Date.now(),
              x: Math.random() * 100,
              size: Math.random() * 20 + 10,
              opacity: Math.random() * 0.5 + 0.1,
              duration: Math.random() * 15 + 10,
              delay: 0,
            },
          ]
        }

        // Add a new heart
        return [
          ...prevHearts,
          {
            id: Date.now(),
            x: Math.random() * 100,
            size: Math.random() * 20 + 10,
            opacity: Math.random() * 0.5 + 0.1,
            duration: Math.random() * 15 + 10,
            delay: 0,
          },
        ]
      })
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {hearts.map((heart) => (
        <div
          key={heart.id}
          className="absolute bottom-0 animate-float"
          style={{
            left: `${heart.x}%`,
            width: `${heart.size}px`,
            height: `${heart.size}px`,
            opacity: heart.opacity,
            animationDuration: `${heart.duration}s`,
            animationDelay: `${heart.delay}s`,
          }}
        >
          <Heart className="w-full h-full text-pink-400" fill="#FBCFE8" />
        </div>
      ))}
    </div>
  )
}
