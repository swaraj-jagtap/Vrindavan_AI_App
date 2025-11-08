"use client"
import { motion } from "framer-motion"
import { Phone, Mail, MapPin, ArrowUpRight, Leaf } from "lucide-react"

export function Footer() {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    Explore: [
      { name: "Indoor Plants", href: "#" },
      { name: "Outdoor Plants", href: "#" },
      { name: "Flowering Plants", href: "#" },
      { name: "Succulents", href: "#" },
      { name: "Planters & Pots", href: "#" },
    ],
    About: [
      { name: "Our Story", href: "#" },
      { name: "Sustainability", href: "#" },
      { name: "Customer Stories", href: "#" },
      { name: "Gallery", href: "#" },
      { name: "Blog", href: "#" },
    ],
    Support: [
      { name: "Plant Care Guide", href: "#" },
      { name: "FAQ", href: "#" },
      { name: "Return Policy", href: "#" },
      { name: "Terms & Conditions", href: "#" },
      { name: "Privacy Policy", href: "#" },
    ],
  }

  return (
    <footer className="bg-gradient-to-b from-green-50 to-white border-t border-green-100">
      <div className="container-custom py-16 lg:py-20">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Leaf className="text-green-600" size={26} />
                <h3 className="text-2xl font-bold text-green-800">Vrindavan Garden</h3>
              </div>
              <p className="text-neutral-600 mb-6 leading-relaxed">
                Where nature meets elegance. Explore our curated plant collection, discover gardening joy, 
                and bring serenity into your home with every leaf.
              </p>

              {/* WhatsApp Contact */}
              <motion.a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-green-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-green-700 transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={18} />
                Chat on WhatsApp
              </motion.a>
            </motion.div>
          </div>

          {/* Links Sections */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-12">
              {Object.entries(footerLinks).map(([category, links], index) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h4 className="font-semibold text-green-800 mb-4">{category}</h4>
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a
                          href={link.href}
                          className="text-neutral-600 hover:text-green-700 transition-colors duration-200 group flex items-center"
                        >
                          {link.name}
                          <ArrowUpRight
                            size={14}
                            className="ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <motion.div
          className="pt-8 pb-4 border-t border-green-100 flex justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-6 text-sm text-neutral-500 text-center">
            <p>&copy; {currentYear} Vrindavan Garden Center. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="hover:text-green-700 transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-green-700 transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-green-700 transition-colors">
                Contact
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
