// app/api/contact/route.js

import nodemailer from 'nodemailer';

// Setup Nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // Your email address
    pass: process.env.EMAIL_PASSWORD, // Your email password (use app-specific password for Gmail)
  },
});

export async function POST(req) {
  const body = await req.json();
  const { name, email, message, emailUser } = body;

  console.log("Received message from:", name);

  // Construct the email message
  const mailOptions = {
    from: process.env.EMAIL_USER, // Sender's email
    to: process.env.RECIPIENT_EMAIL, // Recipient's email (your email)
    subject: `New Message from ${name}`,
    text: `
      You have received a new message:
      
      Name: ${name}
      Email: ${email}
      Message: ${message}
    `,
  };

  try {
    // Send the email using nodemailer
    await transporter.sendMail(mailOptions);

    // Respond back to the client
    return new Response(
      JSON.stringify({ success: true, message: "Email received!" }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ success: false, message: "Failed to send email" }),
      { status: 500 }
    );
  }
}
