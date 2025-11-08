"use client"

import { useEffect, useRef, useState } from "react"
import { Volume2, VolumeX } from "lucide-react"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { CollectionStrip } from "@/components/collection-strip"
import { MaterialsSection } from "@/components/materials-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { Footer } from "@/components/footer"
import { FloatingChatButton } from "@/components/floating-chat-button"

export default function HomePage() {
  const [isMuted, setIsMuted] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audio = new Audio("/birds.mp3") 
    audio.loop = false 
    audio.volume = 0
    audioRef.current = audio

    // play after first user click
    const startAudio = () => {
      audio.play().then(() => {
        setIsPlaying(true)
        let v = 0
        const fadeIn = setInterval(() => {
          if (v < 0.15) {
            v += 0.01
            audio.volume = v
          } else clearInterval(fadeIn)
        }, 200)

        // stop audio automatically after 20 sec
        setTimeout(() => {
          fadeOutAndStop(audio)
        }, 20000)
      }).catch(() => {})

      document.removeEventListener("click", startAudio)
    }

    const fadeOutAndStop = (audioElement: HTMLAudioElement) => {
      let v = audioElement.volume
      const fadeOut = setInterval(() => {
        if (v > 0.01) {
          v -= 0.01
          audioElement.volume = v
        } else {
          clearInterval(fadeOut)
          audioElement.pause()
          audioElement.currentTime = 0
          setIsPlaying(false)
        }
      }, 200)
    }

    document.addEventListener("click", startAudio)
    return () => {
      document.removeEventListener("click", startAudio)
      audio.pause()
    }
  }, [])

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <main className="min-h-screen relative">
      {/* 🔊 Floating Mute Button (visible only while audio is playing) */}
      {isPlaying && (
        <button
          onClick={toggleMute}
          className="fixed bottom-6 right-6 z-50 bg-white/80 backdrop-blur-md p-3 rounded-full shadow-md hover:bg-green-100 transition"
          title={isMuted ? "Unmute Nature Sounds" : "Mute Nature Sounds"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-green-700" />
          ) : (
            <Volume2 className="w-5 h-5 text-green-700" />
          )}
        </button>
      )}

      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CollectionStrip />
      <MaterialsSection />
      <TestimonialsSection />
      <ContactSection />
      <NewsletterSection />
      <Footer />
      <FloatingChatButton />
    </main>
  )
}
