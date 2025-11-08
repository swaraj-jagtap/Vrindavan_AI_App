"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

export function FloatingChatButton() {
  return (
    <motion.div
      className="fixed bottom-8 right-8 z-40"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: 0.5 }}
    >
      <Link
        href="/ai-assistant"
        className="flex items-center justify-center w-16 h-16 bg-white/30 backdrop-blur-md border border-white/20 text-white rounded-full shadow-lg transition-all hover:shadow-xl font-bold text-lg" // Modified for glass effect
        aria-label="Open AI Assistant"
        title="Chat with AI Assistant"
      >
        <Image
          src="/AI.png"
          alt="AI Assistant Icon"
          width={70}
          height={70}
        />
      </Link>
    </motion.div>
  )
}