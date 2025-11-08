"use client"

import { Phone, Mail, Calendar } from "lucide-react"

export function QuickContactInfo() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom max-w-5xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Call Us Card */}
          <div className="border border-green-200 rounded-lg p-8 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Call Us</h3>
                <a
                  href="tel:+919767126970"
                  className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors"
                >
                  +91 9767 126 970
                </a>
                <p className="text-xs text-neutral-500 mt-2">Mon-Sun: 9 AM - 6 PM</p>
              </div>
            </div>
          </div>

          {/* Email Card */}
          <div className="border border-green-200 rounded-lg p-8 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                <Mail className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Email</h3>
                <a
                  href="mailto:swarajjagtap077@gmail.com"
                  className="text-green-600 font-semibold text-sm hover:text-green-700 transition-colors break-all"
                >
                  swarajjagtap077@gmail.com
                </a>
                <p className="text-xs text-neutral-500 mt-2">Reply within 24 hours</p>
              </div>
            </div>
          </div>

          {/* Hours Card */}
          <div className="border border-green-200 rounded-lg p-8 bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-shadow">
            <div className="flex items-start gap-4">
              <div className="bg-green-100 p-3 rounded-full flex-shrink-0">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-neutral-900 mb-2">Hours</h3>
                <p className="text-sm text-neutral-600 leading-relaxed">
                  Mon - Sun
                  <br />9 AM - 6 PM
                </p>
                <p className="text-xs text-neutral-500 mt-2">Open all days</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
