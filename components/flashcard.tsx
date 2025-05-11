"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Heart } from "lucide-react"

interface FlashcardProps {
  frontContent: string
  backImage: string
}

export function Flashcard({ frontContent, backImage }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }

  return (
    <div
      className="perspective-1000 h-[300px] w-full cursor-pointer group"
      onClick={handleFlip}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="button"
      tabIndex={0}
      aria-label={`Flashcard ${frontContent}, click to flip`}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          handleFlip()
        }
      }}
    >
      <div
        className={cn(
          "relative w-full h-full transition-transform duration-700 transform-style-3d",
          isFlipped ? "rotate-y-180" : "",
        )}
      >
        {/* Front of card */}
        <Card
          className={cn(
            "absolute w-full h-full backface-hidden flex items-center justify-center p-6 bg-gradient-to-br from-pink-100 to-rose-200 border-2 border-pink-300 shadow-lg rounded-xl overflow-hidden transition-all duration-300",
            isHovered && !isFlipped ? "shadow-xl scale-[1.02]" : "",
            isFlipped ? "invisible" : "visible",
          )}
        >
          <div className="text-center relative z-10">
            <div className="text-xl md:text-2xl font-bold text-pink-800 mb-3 leading-relaxed">{frontContent}</div>
            <p className="text-sm text-pink-700 mt-2 font-medium">点击查看照片</p>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-10">
              <Heart className="w-40 h-40 text-pink-400" fill="#FBCFE8" />
            </div>
          </div>

          <div className="absolute top-0 right-0 m-3">
            <Heart
              className={`w-6 h-6 text-pink-500 transition-transform duration-500 ${isHovered && !isFlipped ? "scale-125" : "scale-100"}`}
              fill="#FBCFE8"
            />
          </div>

          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-pink-200/70 to-transparent"></div>
        </Card>

        {/* Back of card */}
        <Card
          className={cn(
            "absolute w-full h-full backface-hidden rotate-y-180 overflow-hidden border-2 border-pink-300 shadow-lg rounded-xl transition-all duration-300",
            isHovered && isFlipped ? "shadow-xl scale-[1.02]" : "",
            isFlipped ? "visible" : "invisible",
          )}
        >
          <div className="relative w-full h-full">
            <Image
              src={backImage || "/placeholder.svg"}
              alt={`Memory: ${frontContent}`}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-pink-900/50 to-transparent"></div>
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <p className="font-medium text-sm">{frontContent}</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
