"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card } from "@/components/ui/card"
import { Phone, Mail, MapPin, ArrowLeft } from "lucide-react"
import Link from "next/link"

interface Testimonial {
  id: string
  name: string
  title: string
  quote: string
}

const testimonials: Testimonial[] = [
  {
    id: "1",
    name: "Priya Sharma",
    title: "Interior Designer, Mumbai",
    quote:
      "Vrindavan Garden has the most beautiful plant collection. My clients love the plants I source from here!",
  },
  {
    id: "2",
    name: "Rajesh Kumar",
    title: "Architect, Bangalore",
    quote:
      "The quality and care instructions are exceptional. Every plant arrives healthy and thriving.",
  },
  {
    id: "3",
    name: "Ananya Desai",
    title: "Home Enthusiast, Delhi",
    quote:
      "Best plant source in town. The staff knows everything about plant care and is always helpful!",
  },
  {
    id: "4",
    name: "Vikram Singh",
    title: "Corporate Office Manager, Pune",
    quote:
      "Transformed our office into a green space. Plants from Vrindavan Garden are thriving!",
  },
  {
    id: "5",
    name: "Neha Patel",
    title: "Student, Ahmedabad",
    quote:
      "Perfect starter plants for my dorm. Easy to care for and the price is unbeatable!",
  },
  {
    id: "6",
    name: "Amit Verma",
    title: "Yoga Studio Owner, Gurgaon",
    quote:
      "Created the perfect calming environment with their premium plant collection. Highly recommended!",
  },
]

export default function TestimonialsPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="flex-1 container-custom py-12">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center text-green-600 hover:text-green-800 transition-colors mb-10 group font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Home
        </Link>

        {/* Page Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold text-neutral-900 mb-4">
            Customer Stories
          </h1>
          <p className="text-lg text-neutral-600">
            Hear from our happy customers about their plant journey with
            Vrindavan Garden.
          </p>
        </div>

        {/* Text Testimonials Only */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <blockquote className="text-neutral-700 italic mb-4">
                “{testimonial.quote}”
              </blockquote>
              <h3 className="text-lg font-semibold text-neutral-900">
                {testimonial.name}
              </h3>
              <p className="text-sm text-green-600 font-medium">
                {testimonial.title}
              </p>
            </Card>
          ))}
        </div>

        {/* Quick Contact Cards */}
        <div className="max-w-4xl mx-auto mb-8">
          <h2 className="text-2xl font-bold text-neutral-900 mb-6 text-center">
            Get in Touch
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Phone Card */}
            <a
              href="tel:+919767126970"
              className="bg-green-50 hover:bg-green-100 border-2 border-green-200 rounded-xl p-6 text-center transition-colors group"
            >
              <Phone className="w-8 h-8 text-green-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-neutral-900 mb-2">Call Us</h3>
              <p className="text-sm text-neutral-600">
                Mon–Sun: 8 AM – 11 PM
              </p>
              <p className="text-green-600 font-medium">9767126970</p>
            </a>

            {/* Email Card */}
            <a
              href="mailto:swarajjagtap077@gmail.com"
              className="bg-blue-50 hover:bg-blue-100 border-2 border-blue-200 rounded-xl p-6 text-center transition-colors group"
            >
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-neutral-900 mb-2">Email Us</h3>
              <p className="text-sm text-neutral-600">We reply within 24 hrs</p>
              <p className="text-blue-600 font-medium text-sm">
                swarajjagtap077@gmail.com
              </p>
            </a>

            {/* Visit Card */}
            <a
              href="#contact"
              className="bg-amber-50 hover:bg-amber-100 border-2 border-amber-200 rounded-xl p-6 text-center transition-colors group"
            >
              <MapPin className="w-8 h-8 text-amber-600 mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="font-semibold text-neutral-900 mb-2">Visit Us</h3>
              <p className="text-sm text-neutral-600">Vrindavan Garden</p>
              <button
                onClick={() =>
                  window.open(
                    "https://maps.app.goo.gl/kib2BbdYHhTUfRAY9?g_st=ipc",
                    "_blank"
                  )
                }
                className="text-xs text-orange-500 hover:text-green-700 mt-2 font-semibold"
              >
                Get directions
              </button>
            </a>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
