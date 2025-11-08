"use client"

import { useRef, useEffect, useState } from "react"
import { motion, animate } from "framer-motion"
import Image from "next/image"
import { Reveal } from "./reveal"

const collections = [
  { id: "indoor-plants", name: "INDOOR PLANTS", image: "/indoor-potted-plants-living-room.jpg", count: "200 plants" },
  { id: "flowering-plants", name: "FLOWERING PLANTS", image: "/flowers.jpg", count: "250 plants" },
  { id: "succulents", name: "SUCCULENTS & CACTI", image: "/calming-therapeutic-plant-meditation.jpg", count: "15 plants" },
  { id: "rare-plants", name: "RARE & EXOTIC", image: "/orchid.jpg", count: "7 plants" },
  { id: "climbing-vines", name: "CLIMBING VINES", image: "/morningglory.jpg", count: "6 plants" },
  { id: "air-purifying", name: "AIR-PURIFYING", image: "/spathiphyllum.jpg", count: "10 plants" },
  { id: "shade-lovers", name: "SHADE LOVERS", image: "/poinsettia.jpg", count: "9 plants" },
  { id: "statement-plants", name: "STATEMENT PLANTS", image: "/statementPlant.jpg", count: "5 plants" },
  { id: "beginner-friendly", name: "BEGINNER FRIENDLY", image: "/zz plant.jpg", count: "11 plants" },
  { id: "pet-safe", name: "PET-SAFE PLANTS", image: "/areca.jpg", count: "8 plants" },
]

export function CollectionStrip() {
  const containerRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef<HTMLDivElement>(null)
  const [constraints, setConstraints] = useState({ left: 0, right: 0 })
  const [position, setPosition] = useState(0)

  useEffect(() => {
    const updateBounds = () => {
      if (containerRef.current && dragRef.current) {
        const containerWidth = containerRef.current.offsetWidth
        const contentWidth = dragRef.current.scrollWidth
        const maxDrag = containerWidth - contentWidth - 16 // Prevent overshoot
        setConstraints({ left: maxDrag, right: 0 })
      }
    }
    updateBounds()
    window.addEventListener("resize", updateBounds)
    return () => window.removeEventListener("resize", updateBounds)
  }, [])

  // Smooth drag motion
  const handleDragEnd = (_: any, info: any) => {
    const velocity = info.velocity.x
    const projected = position + velocity / 5
    let newPosition = Math.min(Math.max(projected, constraints.left), constraints.right)

    const controls = animate(position, newPosition, {
      type: "spring",
      stiffness: 100,
      damping: 20,
      onUpdate: (v) => setPosition(v),
    })

    return controls.stop
  }

  return (
    <section ref={containerRef} className="py-20 lg:py-32 overflow-hidden">
      <div className="mb-12">
        <Reveal>
          <div className="container-custom text-center px-4">
            <h2 className="text-neutral-900 mb-4 text-4xl md:text-6xl font-normal">Plant Collections</h2>
            <p className="text-base md:text-lg text-neutral-600 max-w-2xl mx-auto">
              Explore our carefully curated plant categories, each selected for quality, growth potential, and beauty.
            </p>
          </div>
        </Reveal>
      </div>

      <div className="relative w-full overflow-hidden">
        <motion.div
          ref={dragRef}
          className="flex gap-6 sm:gap-8 px-4 sm:px-6 cursor-grab active:cursor-grabbing"
          drag="x"
          dragConstraints={constraints}
          dragElastic={0.08}
          dragMomentum={true}
          style={{ x: position }}
          onDragEnd={handleDragEnd}
        >
          {collections.map((collection) => (
            <motion.div
              key={collection.id}
              className="flex-shrink-0 w-64 sm:w-72 md:w-80 group cursor-pointer"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden mb-4 shadow-md">
                <Image
                  src={collection.image || "/placeholder.svg"}
                  alt={collection.name}
                  fill
                  className="object-cover transition-all duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 240px, 320px"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-all duration-300" />

                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white drop-shadow-md">
                    <h3 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-wide mb-2">
                      {collection.name}
                    </h3>
                    <p className="text-sm opacity-90">{collection.count}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-8">
        <p className="text-sm text-neutral-500">← Drag or swipe to explore collections →</p>
      </div>
    </section>
  )
}
