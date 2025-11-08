"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ProductCard } from "./product-card"
import { QuickLookModal } from "./quick-look-modal"
import { Reveal } from "./reveal"

const featuredProducts = [
  {
    id: "1",
    name: "Monstera Deliciosa",
    price: "₹2,499",
    image: "/monstera-deliciosa-plant-pot-indoor.jpg",
    badge: "Popular" as const,
    materials: ["Air-purifying", "Low maintenance"],
    swatches: [
      { name: "Mature", color: "#2D5016" },
      { name: "Fresh Green", color: "#52B788" },
      { name: "Light Variegated", color: "#95D5B2" },
    ],
    quickLookImages: ["/monstera-deliciosa-full-view.jpg", "/monstera-deliciosa-leaves-detail.jpg", "/monstera-deliciosa-pot.jpg"],
    dimensions: "Height: 45-60cm | Pot: 8 inch",
    careInfo: "Water when soil is dry. Indirect bright light. Humidity: 50-60%.",
  },
  {
    id: "2",
    name: "Pothos Golden Vine",
    price: "₹249",
    image: "/pothos-golden-vine-hanging-plant.jpg",
    badge: "Best Seller" as const,
    materials: ["Vining", "Air-purifying"],
    swatches: [
      { name: "Deep Green", color: "#1B4332" },
      { name: "Golden", color: "#D4A574" },
      { name: "Lime Green", color: "#A8E6CF" },
    ],
    quickLookImages: ["/pothos-golden-plant-hanging.jpg", "/pothos-vines-detail.jpg", "/pothos-in-hanging-basket.jpg"],
    dimensions: "Vine Length: 30-60cm | Pot: 6 inch",
    careInfo: "Water every 1-2 weeks. Tolerates low light. Easy to propagate.",
  },
  {
    id: "3",
    name: "Fiddle Leaf Fig",
    price: "₹2,999",
    image: "/fiddle-leaf-fig-floor-plant-tall.jpg",
    badge: "Premium" as const,
    materials: ["Statement plant", "Large leaves"],
    swatches: [
      { name: "Forest Green", color: "#2D3E3F" },
      { name: "Vibrant Green", color: "#52B788" },
      { name: "Light Sage", color: "#B7D4A8" },
    ],
    quickLookImages: ["/fiddle-leaf-fig-full-plant.jpg", "/fiddle-leaf-fig-leaves.jpg", "/fiddle-leaf-fig-interior.jpg"],
    dimensions: "Height: 90-120cm | Pot: 12 inch",
    careInfo: "Bright indirect light. Water when top 2 inches dry. Rotate weekly.",
  },
]

export function FeaturedProducts() {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleQuickLook = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  return (
    <section className="py-20 lg:py-32" id="featured-products">
      <div className="container-custom">
        <Reveal>
          <div className="text-left mb-16">
            <h2 className="text-4xl text-neutral-900 mb-4 lg:text-6xl">
              Featured <span className="italic font-light">Plants</span>
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl">
              Discover our most popular botanical specimens, each selected for beauty and resilience. Perfect for any
              indoor space.
            </p>
          </div>
        </Reveal>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          initial="hidden"
          animate="visible"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.3,
              },
            },
          }}
        >
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.8,
                    ease: [0.21, 0.47, 0.32, 0.98],
                  },
                },
              }}
            >
              <Reveal delay={index * 0.1}>
                <ProductCard product={product} onQuickLook={handleQuickLook} />
              </Reveal>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <QuickLookModal product={selectedProduct} isOpen={isModalOpen} onClose={closeModal} />
    </section>
  )
}
