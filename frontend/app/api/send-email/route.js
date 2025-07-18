// app/api/send-email/route.js
import nodemailer from 'nodemailer';

export async function POST(req) {
  const { to, subject, text } = await req.json();

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Remplace par ton serveur email
    port: 587,
    secure: false,
    auth: {
      user: 'ton_email@gmail.com', // Remplace par ton email
      pass: 'ton_mot_de_passe_app', // Mot de passe d'application
    },
  });

  const mailOptions = {
    from: 'ton_email@gmail.com',
    to,
    subject,
    text,
  };

  try {
    await transporter.sendMail(mailOptions);
    return new Response(JSON.stringify({ message: 'Email envoyé avec succès' }), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de l\'envoi' }), { status: 500 });
  }
}