import { NextResponse } from 'next/server'
import { Resend } from 'resend'

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)
    const { name, email, message } = await request.json()

    console.log('Contact form submission received:', { name, email, hasMessage: !!message })

    // Validate required fields
    if (!name || !email || !message) {
      console.error('Missing required fields:', { name: !!name, email: !!email, message: !!message })
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Send email via Resend
    console.log('Attempting to send email via Resend...')
    const result = await resend.emails.send({
      from: 'Return Contact Form <contact@studioreturn.co>',
      to: 'hello@studioreturn.co',
      subject: `Contact Form: ${name}`,
      replyTo: email,
      text: `From: ${email}\n\n${message}`,
      html: `
        <div style="font-family: monospace; line-height: 1.6;">
          <p><strong>From:</strong> ${email}</p>
          <p><strong>Name:</strong> ${name}</p>
          <hr style="border: none; border-top: 1px solid #ccc; margin: 20px 0;" />
          <p><strong>Message:</strong></p>
          <p style="white-space: pre-wrap;">${message}</p>
        </div>
      `,
    })

    console.log('Resend API response:', result)

    return NextResponse.json({ success: true, emailId: result.data?.id })
  } catch (error) {
    console.error('Contact form error:', error)
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    )
  }
}
