"use client"

import { motion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import Image from "next/image"
import { Leaf, Sprout, Flower } from "lucide-react"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"

export function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const imageScale = useTransform(scrollYProgress, [0, 1], [1.05, 0.95])
  const imageY = useTransform(scrollYProgress, [0, 1], [0, -50])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 100])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  const AnimatedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    return (
      <span>
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: delay + index * 0.03,
              ease: [0.21, 0.47, 0.32, 0.98],
            }}
            style={{ display: char === " " ? "inline" : "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </span>
    )
  }

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Background Image with Enhanced Cinematic Effects */}
      <motion.div
        className="absolute inset-0"
        style={{ scale: imageScale, y: imageY }}
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <Image
          src="/premium-plants-luxury-home-interior-design.jpg"
          alt="Vrindavan Garden - Premium plants in modern luxury home"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={100} // Ensure highest quality
        />
        {/* Increased black overlay for better text contrast, and added subtle vignette */}
        <div className="absolute inset-0 bg-black/30 bg-gradient-to-t from-black/20 via-transparent to-black/10" />
      </motion.div>

      {/* Content - text with increased prominence */}
      <motion.div
        className="relative z-10 h-full flex items-center justify-center"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <div className="container-custom text-center text-white">
          <Reveal>
            <h1 className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-extrabold leading-none tracking-tight mb-6 text-shadow-lg">
              <AnimatedText text="Premium plants for" delay={0.5} />
              <br />
              <span className="italic font-light"> {/* Kept italic light for style, but overall h1 is bolder */}
                <AnimatedText text="spaces that thrive." delay={1.1} />
              </span>
            </h1>
          </Reveal>

          <Reveal delay={0.2}>
            <motion.p
              className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto text-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              Expertly curated botanical collections, sustainable practices, timeless greenery for modern living.
            </motion.p>
          </Reveal>
        </div>
      </motion.div>

      {/* Info Strip */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 z-20 flex justify-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <BlurPanel className="mx-6 mb-6 px-6 py-4 bg-black/24 backdrop-blur-md border-white/20">
          <div className="flex items-center justify-center gap-6 text-white/90">
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span className="text-sm">Healthy & thriving plants</span>
            </div>
            <div className="flex items-center gap-2">
              <Sprout className="w-4 h-4 text-lime-400" />
              <span className="text-sm">Expert care included</span>
            </div>
            <div className="flex items-center gap-2">
              <Flower className="w-4 h-4 text-pink-400" />
              <span className="text-sm">Satisfaction guaranteed</span>
            </div>
          </div>
        </BlurPanel>
      </motion.div>
    </section>
  )
}