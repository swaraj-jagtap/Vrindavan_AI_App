"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Send } from "lucide-react"

export function FloatingChatButton() {
  const [input, setInput] = useState("")
  const [isFocused, setIsFocused] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // You can tweak this threshold based on your hero section brightness
  const isDarkBg = scrollY < 300

  const handleSend = () => {
    if (input.trim()) {
      window.location.href = `/ai-assistant?query=${encodeURIComponent(input)}`
    }
  }

  return (
    <motion.div
      className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 w-[90%] max-w-md"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
    >
      <div
        className={`flex items-center gap-2 px-4 py-2 rounded-full border-2 shadow-lg backdrop-blur-xl transition-all duration-500
          ${
            isDarkBg
              ? "bg-white/20 text-white placeholder-white/70 border-green-300 shadow-[0_0_15px_rgba(34,197,94,0.7)]"
              : "bg-white/80 text-black placeholder-black/50 border-green-400 shadow-[0_0_15px_rgba(34,197,94,0.8)]"
          }
          ${isFocused ? "scale-[1.02]" : "scale-100"}
        `}
      >
        <input
          type="text"
          placeholder="Ask Vrindavan AI..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="flex-1 bg-transparent outline-none placeholder-inherit text-inherit"
        />
        <button
          onClick={handleSend}
          className={`p-2 rounded-full transition ${
            isDarkBg
              ? "bg-white/20 hover:bg-white/30"
              : "bg-green-100 hover:bg-green-200"
          }`}
          aria-label="Send Message"
        >
          <Send
            className={`w-5 h-5 transition ${
              isDarkBg ? "text-white" : "text-black"
            }`}
          />
        </button>
      </div>
    </motion.div>
  )
}
