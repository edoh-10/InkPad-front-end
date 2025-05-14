// utils/sendEmail.js
const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  // 1. Créer un transporteur (comment envoyer l'email)
  // Pour des tests, Ethereal Email est excellent (https://ethereal.email/)
  // Pour la production, utilisez un vrai service SMTP (SendGrid, Mailgun, Gmail avec "less secure app access" ou OAuth2)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    // Pour Ethereal, si vous avez des problèmes de certificat auto-signé en local :
    // tls: {
    //   rejectUnauthorized: false 
    // }
  });

  // 2. Définir les options de l'email
  const mailOptions = {
    from: process.env.EMAIL_FROM, // Adresse d'expéditeur
    to: options.to, // Adresse du destinataire
    subject: options.subject, // Sujet
    text: options.text, // Corps du message en texte brut
    html: options.html, // Corps du message en HTML (optionnel)
  };

  // 3. Envoyer l'email
  await transporter.sendMail(mailOptions);
  console.log(`Email envoyé à ${options.to} avec le sujet "${options.subject}"`);
};

module.exports = sendEmail;