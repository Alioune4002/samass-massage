
import nodemailer from 'nodemailer';

export const sendEmail = async ({ to, subject, text }) => {
  
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', 
    port: 587,
    secure: false, 
    auth: {
      user: 'samassbysam@gmail.com',
      pass: 'kstn wumi wvyn xxxv', 
    },
  });

  
  const mailOptions = {
    from: 'samassbysam@gmail.com',
    to,
    subject,
    text,
  };

  
  try {
    await transporter.sendMail(mailOptions);
    console.log('Email envoyé avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'envoi de l\'email:', error);
    throw error;
  }
};
