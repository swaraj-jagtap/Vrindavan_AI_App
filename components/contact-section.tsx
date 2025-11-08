"use client"

import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, Clock, Calendar } from "lucide-react"
import { useState } from "react"
import Link from "next/link"

export function ContactSection() {
  const [showScheduleForm, setShowScheduleForm] = useState(false)

  const handleCall = () => {
    window.location.href = "tel:+919767126970"
  }

  const handleEmail = () => {
    window.location.href = "mailto:swarajjagtap077@gmail.com"
  }

  const handleScheduleConsultation = () => {
    setShowScheduleForm(true)
    const subject = "Schedule a Consultation at Vrindavan Garden"
    const body =
      "Hello,\n\nI would like to schedule a free consultation with your plant experts.\n\nPlease let me know available time slots.\n\nThank you!"
    window.location.href = `mailto:swarajjagtap077@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white via-gray-50 to-gray-100 relative overflow-hidden text-gray-800">
      <div className="absolute inset-0 bg-[url('/images/leaf-pattern.svg')] opacity-5 bg-repeat"></div>

      <div className="container-custom max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-black mb-4">Get in Touch with Our Experts</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our plants or need help choosing the right one? We're here to make your green journey
            effortless and joyful.
          </p>
        </div>

        {/* Contact Cards */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
  {/* Phone */}
  <Card
    className="relative overflow-hidden border-0 p-6 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    onClick={handleCall}
  >
    {/* Animated Gradient Background */}
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-green-100 to-emerald-200 bg-[length:200%_200%] animate-gradientMove rounded-2xl"></div>

    {/* Foreground */}
    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="bg-white/70 p-3 rounded-full mb-4 shadow-sm">
        <Phone className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="font-semibold text-black mb-2">Call Us</h3>
      <p className="text-gray-800 font-medium text-sm">+91 9767 126 970</p>
      <p className="text-xs text-gray-600 mt-2">Mon - Sun: 8 AM - 11 PM</p>
    </div>
  </Card>

  {/* Email */}
  <Card
    className="relative overflow-hidden border-0 p-6 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg hover:scale-[1.02] cursor-pointer"
    onClick={handleEmail}
  >
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-green-100 to-emerald-200 bg-[length:200%_200%] animate-gradientMove rounded-2xl"></div>

    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="bg-white/70 p-3 rounded-full mb-4 shadow-sm">
        <Mail className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="font-semibold text-black mb-2">Email</h3>
      <p className="text-gray-800 font-medium text-sm break-all">swarajjagtap077@gmail.com</p>
      <p className="text-xs text-gray-600 mt-2">We reply within 24 hours</p>
    </div>
  </Card>

  {/* Location */}
  <Card className="relative overflow-hidden border-0 p-6 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-green-100 to-emerald-200 bg-[length:200%_200%] animate-gradientMove rounded-2xl"></div>

    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="bg-white/70 p-3 rounded-full mb-4 shadow-sm">
        <MapPin className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="font-semibold text-black mb-2">Visit Us</h3>
      <p className="text-sm text-gray-800">
        Vrindavan Garden
        <br />
        Pune, India
      </p>
      <button
        onClick={() => window.open("https://maps.app.goo.gl/kib2BbdYHhTUfRAY9?g_st=ipc", "_blank")}
        className="text-xs text-green-700 hover:text-green-800 mt-2 font-semibold"
      >
        Get Directions →
      </button>
    </div>
  </Card>

  {/* Hours */}
  <Card className="relative overflow-hidden border-0 p-6 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg hover:scale-[1.02]">
    <div className="absolute inset-0 bg-gradient-to-br from-gray-100 via-green-100 to-emerald-200 bg-[length:200%_200%] animate-gradientMove rounded-2xl"></div>

    <div className="relative z-10 flex flex-col items-center text-center">
      <div className="bg-white/70 p-3 rounded-full mb-4 shadow-sm">
        <Clock className="w-6 h-6 text-green-600" />
      </div>
      <h3 className="font-semibold text-black mb-2">Hours</h3>
      <p className="text-sm text-gray-800">
        Mon - Sun
        <br />9 AM - 8:30 PM
      </p>
      <p className="text-xs text-gray-600 mt-2">Open all days</p>
    </div>
  </Card>
</div>


        {/* Main CTA */}
        <Card className="relative overflow-hidden border-0 p-12 text-gray-900 rounded-2xl shadow-md mb-16 transition-all duration-500 hover:shadow-lg hover:scale-[1.01]">
  {/* Animated Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-green-100 to-emerald-600 bg-[length:200%_200%] animate-gradientMove rounded-2xl"></div>

  {/* Content Overlay */}
  <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
    <div className="flex-1">
      <h3 className="text-3xl font-bold mb-3 text-black">
        Ready to Transform Your Space?
      </h3>
      <p className="text-gray-700 text-lg max-w-xl">
        Connect with our plant experts today — from choosing your first plant
        to designing an entire green corner, we’ll help you every step of the way.
      </p>
    </div>

    <div className="flex flex-col gap-3 min-w-max">
      <button
        onClick={handleCall}
        className="flex items-center justify-center gap-2 bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-lg font-semibold shadow-sm transition-all"
      >
        <Phone className="w-4 h-4" />
        Call Now
      </button>

      <button
        onClick={handleEmail}
        className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-sm"
      >
        <Mail className="w-4 h-4" />
        Email Us
      </button>
    </div>
  </div>
</Card>



        {/* Consultation Section */}
<Card className="relative overflow-hidden border-0 p-10 rounded-2xl shadow-md transition-all duration-500 hover:shadow-lg hover:scale-[1.01]">
  {/* Animated Gradient Background */}
  <div className="absolute inset-0 bg-gradient-to-r from-gray-100 via-green-100 to-emerald-200 bg-[length:200%_200%] animate-gradientMove rounded-2xl"></div>

  {/* Foreground Content */}
  <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10">
    {/* Left: Schedule Consultation */}
    <div>
      <h4 className="text-xl font-bold text-black mb-3">Schedule a Consultation</h4>
      <p className="text-gray-800 mb-5">
        Our plant experts help you design your ideal space with healthy, vibrant plants that match your light
        and lifestyle. Book a free session today.
      </p>
      <Link
        href="/schedule"
        className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all shadow-sm"
      >
        <Calendar className="w-4 h-4 inline mr-2" />
        Schedule Consultation
      </Link>
    </div>

    {/* Right: Why Choose Us */}
    <div>
      <h4 className="text-xl font-bold text-black mb-4">Why Choose Vrindavan Garden?</h4>
      <ul className="space-y-3 text-sm text-gray-800">
        <li className="flex gap-3">
          <span className="text-green-600 font-bold">✓</span>
          <span>Expert guidance on plant selection & care</span>
        </li>
        <li className="flex gap-3">
          <span className="text-green-600 font-bold">✓</span>
          <span>Premium, healthy plants & accessories</span>
        </li>
        <li className="flex gap-3">
          <span className="text-green-600 font-bold">✓</span>
          <span>Eco-friendly and sustainable sourcing</span>
        </li>
        <li className="flex gap-3">
          <span className="text-green-600 font-bold">✓</span>
          <span>Lifetime plant care support</span>
        </li>
      </ul>
    </div>
  </div>
</Card>

      </div>
    </section>
  )
}
