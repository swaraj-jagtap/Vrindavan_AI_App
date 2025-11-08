"use client"

import { useState, useRef, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Send } from "lucide-react"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import { ContactSection } from "@/components/contact-section"

interface Message {
  id: string
  text: string
  sender: "user" | "ai"
  timestamp: Date
}

const plantQuestions = [
  "What plants are best for beginners?",
  "How often should I water my plants?",
  "Which plants purify air indoors?",
  "How to care for succulents?",
  "Best plants for low-light areas?",
]

const aiResponses: { [key: string]: string } = {
  beginners:
    "Great question! For beginners, we recommend Pothos, Snake Plants, and Spider Plants. They're forgiving, require minimal care, and adapt well to various light conditions. All are available at Vrindavan Garden!",
  watering:
    "Watering frequency depends on the plant type. Generally, most indoor plants prefer their soil to dry out slightly between waterings. Check soil moisture with your finger—if it's dry 1-2 inches deep, it's time to water. Our staff can provide specific guidance for each plant.",
  air: "Excellent for air purification! Snake Plants, Pothos, Boston Ferns, and Peace Lilies are top choices. They remove toxins and increase oxygen levels. We have a dedicated Air-Purifying collection at Vrindavan Garden.",
  succulents:
    "Succulents love bright light and well-draining soil. Water sparingly—only when soil is completely dry. They prefer neglect over overwatering! Perfect for desks and shelves. Visit us to see our extensive succulent collection.",
  lowlight:
    "Low-light lovers include Pothos, ZZ Plants, and Cast Iron Plants. They're perfect for offices and bathrooms. Come visit Vrindavan Garden to find the ideal low-light companion for your space!",
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hello! 🌱 Welcome to Vrindavan Garden's Plant Assistant. I'm here to help you find the perfect plants and answer any care questions. How can I help you today?",
      sender: "ai",
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      sender: "user",
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsLoading(true)

    // Simulate AI response delay
    setTimeout(() => {
      let responseText = ""

      if (text.toLowerCase().includes("beginner")) {
        responseText = aiResponses.beginners
      } else if (text.toLowerCase().includes("water")) {
        responseText = aiResponses.watering
      } else if (text.toLowerCase().includes("air") || text.toLowerCase().includes("purif")) {
        responseText = aiResponses.air
      } else if (text.toLowerCase().includes("succulent")) {
        responseText = aiResponses.succulents
      } else if (text.toLowerCase().includes("low-light") || text.toLowerCase().includes("shade")) {
        responseText = aiResponses.lowlight
      } else {
        responseText =
          "That's a great question! For more specific guidance, please visit our nursery or contact our plant experts. We're always happy to help you find the perfect green companion!"
      }

      const aiMessage: Message = {
        id: Date.now().toString(),
        text: responseText,
        sender: "ai",
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiMessage])
      setIsLoading(false)
    }, 500)
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-neutral-900 mb-3">Plant Expert Chat</h1>
            <p className="text-neutral-600">
              Get instant answers about plant care, recommendations, and growing tips from our AI plant expert.
            </p>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Chat Section */}
            <div className="lg:col-span-2">
              {/* Chat Container */}
              <Card className="bg-white border border-neutral-200 rounded-2xl overflow-hidden flex flex-col h-[600px] shadow-lg">
                {/* Messages Area */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                          message.sender === "user"
                            ? "bg-green-600 text-white rounded-br-none"
                            : "bg-neutral-100 text-neutral-900 rounded-bl-none"
                        }`}
                      >
                        <p className="text-sm">{message.text}</p>
                        <span
                          className={`text-xs mt-1 block ${message.sender === "user" ? "text-green-100" : "text-neutral-500"}`}
                        >
                          {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </span>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="bg-neutral-100 text-neutral-900 px-4 py-3 rounded-lg rounded-bl-none">
                        <div className="flex space-x-2">
                          <div className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-neutral-400 rounded-full animate-bounce"
                            style={{ animationDelay: "0.4s" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-neutral-200 p-4 bg-neutral-50">
                  <div className="flex gap-3">
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleSendMessage(inputValue)}
                      placeholder="Ask about plants, care tips..."
                      className="flex-1 px-4 py-2 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent"
                    />
                    <Button
                      onClick={() => handleSendMessage(inputValue)}
                      disabled={!inputValue.trim() || isLoading}
                      className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>

              {/* Quick Questions */}
              <div className="mt-8">
                <p className="text-sm font-semibold text-neutral-600 mb-4">Common questions:</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {plantQuestions.map((question, idx) => (
                    <Button
                      key={idx}
                      onClick={() => handleSendMessage(question)}
                      variant="outline"
                      className="justify-start text-left h-auto py-3 px-4 border-neutral-200 hover:border-green-600 hover:bg-green-50"
                    >
                      {question}
                    </Button>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              {/* Direct Contact Card */}
              <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 p-6 rounded-2xl">
                <h3 className="text-lg font-bold text-neutral-900 mb-6">Get in Touch</h3>

                <div className="space-y-5">
                  {/* Phone */}
                  <a
                    href="tel:+918765432109"
                    className="flex items-start gap-4 group hover:bg-white/50 p-3 rounded-lg transition-colors"
                  >
                    <Phone className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide font-semibold">Call Us</p>
                      <p className="text-sm font-semibold text-neutral-900 group-hover:text-green-600 transition-colors">
                        +91 8765 432 109
                      </p>
                    </div>
                  </a>

                  {/* Email */}
                  <a
                    href="mailto:hello@vrindavangarden.in"
                    className="flex items-start gap-4 group hover:bg-white/50 p-3 rounded-lg transition-colors"
                  >
                    <Mail className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide font-semibold">Email</p>
                      <p className="text-sm font-semibold text-neutral-900 group-hover:text-green-600 transition-colors break-all">
                        hello@vrindavangarden.in
                      </p>
                    </div>
                  </a>

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide font-semibold">Location</p>
                      <p className="text-sm font-semibold text-neutral-900">
                        Vrindavan Garden Nursery
                        <br />
                        Botanica Lane, Green City
                        <br />
                        India
                      </p>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-4">
                    <Clock className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs text-neutral-500 uppercase tracking-wide font-semibold">Hours</p>
                      <p className="text-sm font-semibold text-neutral-900">Mon - Sun: 9 AM - 6 PM</p>
                    </div>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="mt-6 space-y-3 border-t border-green-200 pt-6">
                  <Button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg">
                    Visit Us Today
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full border-green-600 text-green-600 hover:bg-green-50 font-semibold rounded-lg bg-transparent"
                  >
                    Request a Consultation
                  </Button>
                </div>
              </Card>

              {/* Tips Card */}
              <Card className="bg-white border border-neutral-200 p-6 rounded-2xl">
                <h4 className="font-semibold text-neutral-900 mb-4">Plant Care Tips</h4>
                <ul className="space-y-3 text-sm text-neutral-600">
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Water when top 1-2 inches of soil is dry</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Most plants prefer indirect bright light</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Rotate plants weekly for even growth</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="text-green-600 font-bold">•</span>
                    <span>Wipe leaves monthly to remove dust</span>
                  </li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </div>
      <ContactSection />
      <Footer />
    </main>
  )
}
