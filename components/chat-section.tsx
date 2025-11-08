"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, MessageCircle } from "lucide-react"

export function ChatSection() {
  const [messages, setMessages] = useState<Array<{ id: string; text: string; sender: "user" | "bot" }>>([
    {
      id: "1",
      text: "Hello! Welcome to Vrindavan Garden. How can I help you today?",
      sender: "bot",
    },
  ])
  const [input, setInput] = useState("")

  const handleSendMessage = () => {
    if (input.trim()) {
      const newMessage = {
        id: Date.now().toString(),
        text: input,
        sender: "user" as const,
      }
      setMessages([...messages, newMessage])
      setInput("")

      // Simulate bot response
      setTimeout(() => {
        const botResponses = [
          "That's a great question! Our plant specialists can provide personalized recommendations. Would you like to schedule a consultation?",
          "I'd be happy to help! We have a wide range of indoor and outdoor plants. What type of space are you looking to fill?",
          "Thanks for your interest! For more detailed information, please contact our team at hello@vrindavangarden.in or call +91 8765 432 109.",
          "Our plants are sourced with sustainability in mind. Feel free to visit our store to see our full collection!",
        ]
        const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)]
        setMessages((prev) => [
          ...prev,
          {
            id: (Date.now() + 1).toString(),
            text: randomResponse,
            sender: "bot",
          },
        ])
      }, 800)
    }
  }

  return (
    <section className="py-16 bg-white">
      <div className="container-custom max-w-4xl">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center gap-3 mb-4">
            <div className="bg-green-100 p-3 rounded-full">
              <MessageCircle className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h2 className="text-4xl font-bold text-neutral-900 mb-4">AI Plant Assistant</h2>
          <p className="text-lg text-neutral-600">
            Chat with our AI to get instant plant care advice and product recommendations
          </p>
        </div>

        <Card className="border border-green-200 overflow-hidden shadow-lg">
          {/* Chat Messages */}
          <div className="h-96 overflow-y-auto bg-neutral-50 p-6 flex flex-col gap-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.sender === "user"
                      ? "bg-green-600 text-white rounded-br-none"
                      : "bg-white border border-green-200 text-neutral-900 rounded-bl-none"
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="bg-white border-t border-green-200 p-4">
            <div className="flex gap-3">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                placeholder="Ask about plants, care tips, or availability..."
                className="flex-1 px-4 py-3 border border-green-200 rounded-lg focus:outline-none focus:border-green-600 transition-colors"
              />
              <Button
                onClick={handleSendMessage}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                Send
              </Button>
            </div>
            <p className="text-xs text-neutral-500 mt-3">
              For detailed consultations, please call +91 8765 432 109 or visit our store.
            </p>
          </div>
        </Card>

        {/* CTA Section */}
        <div className="mt-8 text-center">
          <p className="text-neutral-600 mb-4">Need personalized assistance?</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:+918765432109"
              className="inline-block bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Call Our Experts
            </a>
            <a
              href="mailto:hello@vrindavangarden.in"
              className="inline-block border border-green-600 hover:bg-green-50 text-green-600 px-8 py-3 rounded-lg font-semibold transition-colors"
            >
              Email Us
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
