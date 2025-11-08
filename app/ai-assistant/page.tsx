'use client'

import { useState } from 'react'
import { Loader2, Send } from 'lucide-react'
import LivePlant from './LivePlant'

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    { sender: 'ai', text: '🌿 Hello! I’m your Vrindavan AI assistant. Tell me about your plant problem or ask for care advice.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSend = async () => {
    if (!input.trim()) return
    const newMessage = { sender: 'user', text: input }
    setMessages((prev) => [...prev, newMessage])
    setInput('')
    setLoading(true)

    try {
      const res = await fetch('/api/ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      })
      const data = await res.json()
      setMessages((prev) => [...prev, { sender: 'ai', text: data.reply }])
    } catch {
      setMessages((prev) => [...prev, { sender: 'ai', text: '❌ Unable to reach AI service.' }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-green-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-2xl p-6 flex flex-col">
        <h1 className="text-2xl font-semibold text-green-700 mb-4 text-center">
          🌱 Vrindavan AI Assistant
        </h1>

        <div className="flex-1 overflow-y-auto space-y-3 mb-4 max-h-[60vh]">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl max-w-[80%] ${
                msg.sender === 'ai'
                  ? 'bg-green-100 text-green-800 self-start'
                  : 'bg-blue-100 text-blue-800 self-end ml-auto'
              }`}
            >
              {msg.text}
            </div>
          ))}
          {loading && (
            <div className="flex items-center text-green-600">
              <Loader2 className="animate-spin mr-2" /> Thinking...
            </div>
          )}
        </div>

        <div className="flex border-t border-green-200 pt-3">
          <input
            className="flex-1 border border-green-300 rounded-l-xl px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your plant issue..."
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            className="bg-green-600 text-white px-4 rounded-r-xl hover:bg-green-700 transition"
          >
            <Send size={18} />
          </button>
        </div>

        {/* 👇 Add LivePlant component below the chat */}
        <div className="mt-6">
          <LivePlant />
        </div>
      </div>
    </div>
  )
}
