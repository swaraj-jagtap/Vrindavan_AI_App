"use client"
import { useState } from "react"
import { motion } from "framer-motion"
import { Check, MessageCircle } from "lucide-react"
import { Reveal } from "./reveal"
import { BlurPanel } from "./blur-panel"
import { AnimatedText } from "./animated-text"

export function NewsletterSection() {
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleWhatsAppClick = () => {
    window.open("https://chat.whatsapp.com/JWL45EibnoCJAcsoIw7gTQ", "_blank")
    setIsSubmitted(true)
  }

  return (
    <section className="py-20 lg:py-32">
      <div className="container-custom">
        <Reveal>
          <div className="max-w-2xl mx-auto">
            <BlurPanel className="p-8 lg:p-12 bg-white/40 backdrop-blur-md grain-texture">
              <div className="text-center mb-8">
                <h2 className="text-3xl lg:text-4xl font-bold text-neutral-900 mb-4">
                  <AnimatedText text="Join our plant " delay={0.2} />
                  <span className="italic font-light">
                    <AnimatedText text="community." delay={0.5} />
                  </span>
                </h2>
                <p className="text-lg text-neutral-600">
                  Join our Vrindavan Garden WhatsApp group for expert plant care tips, new arrivals, exclusive offers,
                  and grow your collection with our curated selections.
                </p>
              </div>

              {!isSubmitted ? (
                <motion.button
                  onClick={handleWhatsAppClick}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-4 rounded-full font-medium transition-all duration-200 flex items-center justify-center gap-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <MessageCircle size={20} />
                  Join Vrindavan Garden WhatsApp Group
                </motion.button>
              ) : (
                <motion.div
                  className="text-center py-8"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check size={24} className="text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-neutral-900 mb-2">Welcome to Vrindavan Garden</h3>
                  <p className="text-neutral-600">
                    Thank you for joining our WhatsApp community. You'll receive our gardening tips, new plant arrivals,
                    and exclusive member-only offers.
                  </p>
                </motion.div>
              )}

              <p className="text-xs text-neutral-500 text-center mt-6">
                We respect your privacy. You can leave the group anytime.
              </p>
            </BlurPanel>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
