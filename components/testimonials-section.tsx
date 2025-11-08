"use client"

import { Card } from "@/components/ui/card"
import { Play, X } from "lucide-react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function TestimonialsSection() {
  const testimonials = [
    {
      id: "1",
      name: "Priya Sharma",
      quote: "Vrindavan Garden transformed my home into a peaceful green oasis. Their plant quality and guidance are unmatched.",
      thumbnail: "/woman-with-plant.jpg",
      videoUrl: "https://www.youtube.com/embed/fzMpbBzWjK4",
    },
    {
      id: "2",
      name: "Rajesh Kumar",
      quote: "The variety and health of their plants are impressive. My clients love the landscapes we’ve created with them!",
      thumbnail: "/man-with-monstera.jpg",
      videoUrl: "https://www.youtube.com/embed/AkGISMt9blk",
    },
    {
      id: "3",
      name: "Ananya Desai",
      quote: "Every visit to Vrindavan Garden feels like a retreat. The staff are so passionate and helpful!",
      thumbnail: "/woman-holding-plant.jpg",
      videoUrl: "https://www.youtube.com/embed/jfi28_5fpjM",
    },
    {
      id: "4",
      name: "Amit Verma",
      quote: "They offer unique species and rare finds! My projects have flourished with their high-quality plants.",
      thumbnail: "/man-with-plants-office.jpg",
      videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    },
    {
      id: "5",
      name: "Neha Patel",
      quote: "Their indoor plant styling ideas are just fabulous! My followers adore every corner inspired by Vrindavan Garden.",
      thumbnail: "/girl2.jpg",
      videoUrl: "https://www.youtube.com/embed/hY7m5jjJ9mM",
    },
    {
      id: "6",
      name: "Karan Singh",
      quote: "Our office greenery setup was done by Vrindavan Garden – it brought life, freshness, and focus to our workspace.",
      thumbnail: "/man1.jpg",
      videoUrl: "https://www.youtube.com/embed/ScMzIvxBSi4",
    },
    {
      id: "7",
      name: "Simran Kaur",
      quote: "Our cafe aesthetics completely changed thanks to their curated plants. Customers now love the ambience!",
      thumbnail: "/girl3.jpg",
      videoUrl: "https://www.youtube.com/embed/Zi_XLOBDo_Y",
    },
    {
      id: "8",
      name: "Arjun Mehta",
      quote: "They helped me build my balcony garden from scratch. The result – pure serenity every morning!",
      thumbnail: "/man2.jpg",
      videoUrl: "https://www.youtube.com/embed/kXYiU_JCYtU",
    },
    {
      id: "9",
      name: "Riya Sen",
      quote: "Vrindavan Garden’s plants bring positivity and calm energy to my yoga studio. Highly recommend them!",
      thumbnail: "/girl4.jpg",
      videoUrl: "https://www.youtube.com/embed/tAGnKpE4NCI",
    },
    {
      id: "10",
      name: "Nikhil Joshi",
      quote: "Bought my first indoor plants here – their care tips made it so easy to maintain! Love the customer support.",
      thumbnail: "/man3.jpg",
      videoUrl: "https://www.youtube.com/embed/3JZ_D3ELwOQ",
    },
  ]

  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [clickedId, setClickedId] = useState<string | null>(null)

  const activeId = hoveredId || clickedId
  const activeTestimonial = testimonials.find((t) => t.id === activeId)

  return (
    <section className="py-20 bg-neutral-50">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-lg text-neutral-600">
            Join thousands of happy plant parents across India
          </p>
        </div>

        {/* Video cards (Top 3 for visual highlight) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.slice(0, 3).map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group relative cursor-pointer overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition-shadow"
              onClick={() =>
                setActiveVideo(
                  activeVideo === testimonial.videoUrl ? null : testimonial.videoUrl
                )
              }
            >
              {activeVideo === testimonial.videoUrl ? (
                <div className="relative w-full h-48 sm:h-64">
                  <iframe
                    className="w-full h-full rounded-xl"
                    src={`${testimonial.videoUrl}?autoplay=1`}
                    title={testimonial.name}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      setActiveVideo(null)
                    }}
                    className="absolute top-2 right-2 bg-black/60 hover:bg-black/80 text-white p-1.5 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative h-48 overflow-hidden bg-neutral-200">
                    <img
                      src={testimonial.thumbnail}
                      alt={testimonial.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <div className="bg-green-600 rounded-full p-3">
                        <Play className="w-5 h-5 text-white fill-white" />
                      </div>
                    </div>
                  </div>
                  <div className="p-6 text-center">
                    <h3 className="font-semibold text-neutral-900 mb-3">
                      {testimonial.name}
                    </h3>
                    <p className="text-neutral-700 italic text-sm">
                      "{testimonial.quote}"
                    </p>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>

        {/* Scrollable Avatars */}
        <div className="flex overflow-x-auto gap-6 pb-6 scrollbar-hide justify-start md:justify-center">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              onMouseEnter={() => setHoveredId(testimonial.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() =>
                setClickedId((prev) =>
                  prev === testimonial.id ? null : testimonial.id
                )
              }
              className={`relative flex-shrink-0 rounded-full border-2 cursor-pointer transition-transform duration-300 ${
                activeId === testimonial.id
                  ? "border-green-600 scale-110"
                  : "border-transparent hover:scale-105"
              }`}
            >
              <img
                src={testimonial.thumbnail}
                alt={testimonial.name}
                className="w-20 h-20 md:w-24 md:h-24 rounded-full object-cover shadow-sm"
              />
            </div>
          ))}
        </div>

        {/* Active testimonial text */}
        <div className="mt-10 flex justify-center min-h-[160px]">
          <AnimatePresence mode="wait">
            {activeTestimonial && (
              <motion.div
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className="max-w-2xl bg-white p-8 rounded-2xl shadow-lg border border-green-100 text-center"
              >
                <h4 className="font-semibold text-neutral-900 text-lg mb-3">
                  {activeTestimonial.name}
                </h4>
                <p className="text-neutral-700 italic text-base leading-relaxed">
                  "{activeTestimonial.quote}"
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
