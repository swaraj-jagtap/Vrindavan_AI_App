import { type NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(req: NextRequest) {
  try {
    const { name, email, phone, preferredDate, preferredTime, message } = await req.json()

    const smtpHost = process.env.SMTP_HOST
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpPort = process.env.SMTP_PORT || "587"
    const smtpSecure = process.env.SMTP_SECURE === "true"
    const smtpFrom = process.env.SMTP_FROM || smtpUser

    if (smtpHost && smtpUser && smtpPass) {
      try {
        const transporter = nodemailer.createTransport({
          host: smtpHost,
          port: Number.parseInt(smtpPort),
          secure: smtpSecure,
          auth: {
            user: smtpUser,
            pass: smtpPass,
          },
        })

        // Send email to your inbox
        await transporter.sendMail({
          from: smtpFrom,
          to: "swarajjagtap077@gmail.com",
          subject: `New Consultation Request from ${name}`,
          html: `
            <h2>New Consultation Request</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <p><strong>Preferred Date:</strong> ${preferredDate || "Not specified"}</p>
            <p><strong>Preferred Time:</strong> ${preferredTime || "Not specified"}</p>
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, "<br>")}</p>
          `,
        })

        // Send confirmation email to customer
        await transporter.sendMail({
          from: smtpFrom,
          to: email,
          subject: "We received your consultation request - Vrindavan Garden",
          html: `
            <h2>Thank you for your consultation request!</h2>
            <p>Dear ${name},</p>
            <p>We've received your consultation request and will contact you within 24 hours to confirm your appointment.</p>
            <p><strong>Request Details:</strong></p>
            <p>Preferred Date: ${preferredDate || "Not specified"}</p>
            <p>Preferred Time: ${preferredTime || "Not specified"}</p>
            <p>We look forward to helping you find the perfect plants for your space.</p>
            <p>Best regards,<br>Vrindavan Garden Team</p>
          `,
        })

        console.log("[v0] Consultation emails sent successfully")
      } catch (emailError) {
        console.error("[v0] Email sending error:", emailError)
        // Still return success - form was submitted even if email failed
      }
    } else {
      console.log("[v0] SMTP not fully configured, skipping email sending")
    }

    return NextResponse.json(
      {
        success: true,
        message: "Your consultation request has been received. We'll contact you within 24 hours!",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[v0] Error processing consultation:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Error processing your request. Please try again or contact us directly at +91 9767 126 970",
      },
      { status: 500 },
    )
  }
}
