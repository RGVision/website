import nodemailer from "nodemailer";

interface ContactData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export async function sendContactEmail(data: ContactData) {
  const { name, email, phone, subject, message } = data;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f0f6fc; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #c9a55c, #a8843a); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #0a0a0f;">✉️ New Contact Enquiry</h1>
        <p style="margin: 8px 0 0; color: #0a0a0f; opacity: 0.8;">Vora Stays — Vision of Relaxed Accommodation</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #c9a55c; margin-bottom: 16px;">Contact Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Subject</td><td style="padding: 8px 0;">${subject}</td></tr>
        </table>
        <h2 style="color: #c9a55c; margin-bottom: 16px;">Message</h2>
        <div style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; border-left: 3px solid #c9a55c; line-height: 1.6;">
          ${message}
        </div>
      </div>
    </div>`;

  const mailOptions = {
    from: `"Vora Stays Contact" <${process.env.SMTP_USER || "noreply@vorastays.com"}>`,
    to: process.env.BOOKING_EMAIL_TO || process.env.SMTP_USER,
    subject: `Enquiry: ${subject} — ${name}`,
    html: htmlContent,
    replyTo: email,
  };

  if (!process.env.SMTP_USER) {
    console.log("📧 Contact Email (dev mode):", JSON.stringify(data, null, 2));
    return { success: true, dev: true };
  }

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
}

interface BookingData {
  name: string;
  email: string;
  phone: string;
  villaName: string;
  checkIn: string;
  checkOut: string;
  guests: number | string;
  specialRequests?: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendBookingEmail(bookingData: BookingData) {
  const { name, email, phone, villaName, checkIn, checkOut, guests, specialRequests } = bookingData;

  const htmlContent = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0a0a0f; color: #f0f6fc; border-radius: 16px; overflow: hidden;">
      <div style="background: linear-gradient(135deg, #c9a55c, #a8843a); padding: 32px; text-align: center;">
        <h1 style="margin: 0; font-size: 28px; color: #0a0a0f;">🏡 New Booking Request</h1>
        <p style="margin: 8px 0 0; color: #0a0a0f; opacity: 0.8;">Vora Stays — Vision of Relaxed Accommodation</p>
      </div>
      <div style="padding: 32px;">
        <h2 style="color: #c9a55c; margin-bottom: 16px;">Property</h2>
        <p style="font-size: 18px; margin-bottom: 24px;">${villaName}</p>
        <h2 style="color: #c9a55c; margin-bottom: 16px;">Guest Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Name</td><td style="padding: 8px 0;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Email</td><td style="padding: 8px 0;">${email}</td></tr>
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Phone</td><td style="padding: 8px 0;">${phone}</td></tr>
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Guests</td><td style="padding: 8px 0;">${guests}</td></tr>
        </table>
        <h2 style="color: #c9a55c; margin-bottom: 16px;">Stay Details</h2>
        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Check-in</td><td style="padding: 8px 0;">${checkIn}</td></tr>
          <tr><td style="padding: 8px 0; color: #b0b8c4;">Check-out</td><td style="padding: 8px 0;">${checkOut}</td></tr>
        </table>
        ${specialRequests ? `<h2 style="color: #c9a55c; margin-bottom: 16px;">Special Requests</h2><p style="background: rgba(255,255,255,0.05); padding: 16px; border-radius: 8px; border-left: 3px solid #c9a55c;">${specialRequests}</p>` : ""}
      </div>
    </div>`;

  const mailOptions = {
    from: `"Vora Stays" <${process.env.SMTP_USER || "noreply@vorastays.com"}>`,
    to: process.env.BOOKING_EMAIL_TO || process.env.SMTP_USER,
    subject: `New Booking: ${villaName} — ${name}`,
    html: htmlContent,
    replyTo: email,
  };

  if (!process.env.SMTP_USER) {
    console.log("📧 Booking Email (dev mode):", JSON.stringify(bookingData, null, 2));
    return { success: true, dev: true };
  }

  const info = await transporter.sendMail(mailOptions);
  return { success: true, messageId: info.messageId };
}
