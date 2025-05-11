"use client"

import { useState, useEffect, useRef } from "react"
import { Flashcard } from "@/components/flashcard"
import { Button } from "@/components/ui/button"
import { Volume2, VolumeX, Heart } from "lucide-react"
import { FloatingHearts } from "@/components/floating-hearts"

export default function Home() {
  const [isMuted, setIsMuted] = useState(false)
  const [displayText, setDisplayText] = useState("")
  const [typingComplete, setTypingComplete] = useState(false)
  const fullText = "母亲节快乐！"
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    // Initialize audio
    if (audioRef.current) {
      audioRef.current.volume = 0.3
      audioRef.current.loop = true
    }

    // Typewriter effect
    let currentIndex = 0
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setDisplayText(fullText.substring(0, currentIndex + 1))
        currentIndex++
      } else {
        clearInterval(typingInterval)
        setTypingComplete(true)
      }
    }, 300) // Adjust typing speed here (milliseconds)

    return () => clearInterval(typingInterval)
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.play()
      } else {
        audioRef.current.pause()
      }
      setIsMuted(!isMuted)
    }
  }

  // Images for the flashcards - using the uploaded photos
  const images = [
    "/images/mom1.png",
    "/images/mom2.png",
    "/images/mom3.png",
    "/images/mom4.png",
    "/images/mom5.png",
    "/images/mom6.png",
  ]

  // Card titles - updated to use the Chinese phrases provided
  const cardTitles = [
    "多么温馨的目光",
    "永远在背后带出温暖",
    "在春风化雨的时候暖透我的心",
    "一生眷顾无言地送赠",
    "教我坚毅望著前路",
    "教我跌倒不应放弃",
  ]

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-red-100 p-6 overflow-hidden relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingHearts />
      </div>

      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-pink-200/50 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-pink-200/50 to-transparent"></div>

      <audio ref={audioRef} src="/mothersdaybgm.mp3" autoPlay />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="flex justify-end mb-4">
          <Button
            variant="outline"
            size="icon"
            onClick={toggleMute}
            className="rounded-full bg-white/80 hover:bg-white shadow-md border-pink-200"
            aria-label={isMuted ? "Unmute background music" : "Mute background music"}
          >
            {isMuted ? <VolumeX className="h-5 w-5 text-pink-600" /> : <Volume2 className="h-5 w-5 text-pink-600" />}
          </Button>
        </div>

        <div className="relative mb-16 mt-8">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
            <Heart className="h-12 w-12 text-pink-400 animate-pulse" fill="#FBCFE8" />
          </div>

          <div className="text-center bg-white/60 backdrop-blur-sm py-8 px-4 rounded-2xl shadow-xl border border-pink-200">
            <h1 className="text-5xl md:text-7xl font-bold text-center bg-gradient-to-r from-pink-600 via-rose-500 to-red-500 bg-clip-text text-transparent min-h-[80px]">
              {displayText}
              <span
                className={
                  displayText.length < fullText.length
                    ? "inline-block w-1 h-8 bg-pink-600 ml-1 animate-blink"
                    : "hidden"
                }
              ></span>
            </h1>

            <p
              className={`mt-4 text-pink-700 text-lg max-w-2xl mx-auto transition-opacity duration-1000 ${typingComplete ? "opacity-100" : "opacity-0"}`}
            >
              Thank you 阿妈！
            </p>
          </div>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-12 transition-all duration-1000 ${typingComplete ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
        >
          {images.map((image, index) => (
            <Flashcard key={index} frontContent={cardTitles[index]} backImage={image} />
          ))}
        </div>
      </div>
    </main>
  )
}
