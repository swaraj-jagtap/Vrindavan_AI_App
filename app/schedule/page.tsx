"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User, Mail, Phone } from "lucide-react"

export default function SchedulePage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    preferredDate: "",
    preferredTime: "",
    message: "",
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setError(null)
  }

  // ✅ WhatsApp-only submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const whatsappNumber = "919767126970" // 👈 your WhatsApp number (no +)
      const message = encodeURIComponent(
        `🌿 *New Consultation Request*\n\n` +
        `👤 *Name:* ${formData.name}\n` +
        `📧 *Email:* ${formData.email}\n` +
        `📞 *Phone:* ${formData.phone}\n` +
        `📅 *Preferred Date:* ${formData.preferredDate || "Not specified"}\n` +
        `⏰ *Preferred Time:* ${formData.preferredTime || "Not specified"}\n` +
        `💬 *Message:* ${formData.message || "No additional message"}`
      )

      const whatsappURL = `https://wa.me/${whatsappNumber}?text=${message}`
      window.open(whatsappURL, "_blank")

      setSubmitted(true)
      setFormData({ name: "", email: "", phone: "", preferredDate: "", preferredTime: "", message: "" })

      setTimeout(() => {
        setSubmitted(false)
      }, 5000)
    } catch (error) {
      console.error("Error redirecting to WhatsApp:", error)
      setError("An error occurred. Please try contacting us directly at +91 9767 126 970")
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <div className="sticky top-0 z-15 bg-white border-b border-green-100">
        <div className="container-custom max-w-5xl mx-auto py-10 px-10 flex items-center gap-10">
          <Link href="/" className="inline-flex items-center gap-2 text-green-600 hover:text-green-700 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back</span>
          </Link>
          <h1 className="text-2xl md:text-4xl font-bold text-green-800">Schedule a Consultation</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="container-custom max-w-3xl mx-auto py-12 px-4">
        <div className="bg-white border border-green-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-2">Tell Us About Your Needs</h2>
          <p className="text-neutral-600 mb-8">
            Our plant experts will review your consultation request and connect with you on WhatsApp.
          </p>

          {submitted && (
            <div className="mb-6 p-4 bg-green-100 border border-green-300 rounded-lg">
              <p className="text-green-800 font-medium">✅ Message ready in WhatsApp!</p>
              <p className="text-green-700 text-sm mt-1">
                Please review and send the message in WhatsApp to confirm your consultation.
              </p>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 bg-red-100 border border-red-300 rounded-lg">
              <p className="text-red-800 font-medium">Error: {error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Full Name *</label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Your full name"
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Email Address *</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="your@email.com"
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="+91 XXXXXXXXXX"
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>

              {/* Preferred Date */}
              <div>
                <label className="block text-sm font-medium text-neutral-900 mb-2">Preferred Date</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                  <input
                    type="date"
                    name="preferredDate"
                    value={formData.preferredDate}
                    onChange={handleChange}
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Preferred Time */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">Preferred Time</label>
              <div className="relative">
                <Clock className="absolute left-3 top-3 w-5 h-5 text-neutral-400" />
                <select
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Select a time</option>
                  <option value="9:00 AM - 10:00 AM">9:00 AM - 10:00 AM</option>
                  <option value="10:00 AM - 11:00 AM">10:00 AM - 11:00 AM</option>
                  <option value="11:00 AM - 12:00 PM">11:00 AM - 12:00 PM</option>
                  <option value="12:00 PM - 1:00 PM">12:00 PM - 1:00 PM</option>
                  <option value="2:00 PM - 3:00 PM">2:00 PM - 3:00 PM</option>
                  <option value="3:00 PM - 4:00 PM">3:00 PM - 4:00 PM</option>
                  <option value="4:00 PM - 5:00 PM">4:00 PM - 5:00 PM</option>
                  <option value="5:00 PM - 6:00 PM">5:00 PM - 6:00 PM</option>
                </select>
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-neutral-900 mb-2">Tell Us About Your Space</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Describe your space, lighting conditions, and plant preferences..."
                rows={4}
                className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || submitted}
              className="w-full bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-3 rounded-lg transition-colors duration-200"
            >
              {loading ? "Opening WhatsApp..." : submitted ? "Message Ready!" : "Send via WhatsApp"}
            </button>

            <p className="text-xs text-neutral-500 text-center">
              * Required fields. You’ll be redirected to WhatsApp to send your request.
            </p>
          </form>
        </div>
      </div>
    </main>
  )
}
