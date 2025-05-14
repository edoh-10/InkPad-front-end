const User = require('../model/User');
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const crypto = require('crypto');
const sendEmail = require('../utils/sendEmail'); // Un utilitaire pour envoyer des emails
const jwt = require('jsonwebtoken');

// Upload image et sauvegarde de l'utilisateur
exports.updateProfile = async (req, res) => {
    try {
        const userId = req.params.id;

        // const filePath = req.file.path;

        let avatar;
        if(req.file){
            const filePath = req.file.path;
            const result = await cloudinary.uploader.upload(filePath, {
                folder: 'user-profiles',
            });
            fs.unlinkSync(filePath);
            avatar = result.secure_url;
        }

        // construction des données à mettre à jour 
        const updateData = {
            ...(req.body.username && {username: req.body.username}),
            ...(req.body.email && {email: req.body.email}),
            ...(req.body.bio && {bio: req.body.bio}),
            ...(avatar && {avatar}),
        };

        // mise à jour dans la base de donné
        const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
            new: true,
        });

        if(!updatedUser){
            return res.status(404).json({message: "Utilisateur non trouvé"});
        }

        res.status(200).json({message: 'Profil mis à jour', updatedUser})
    } catch (error) {
        console.error("Erreur backend : ", error); 
        res.status(500).json({message: 'Erreur', error: error.message});
    }
} 


exports.requestPasswordReset = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: 'Veuillez fournir une adresse e-mail.' });
    }

    const user = await User.findOne({ email });
    if (!user) {
      // Pour ne pas révéler si un email existe, on renvoie toujours un message de succès générique
      console.log(`Tentative de réinitialisation pour email non trouvé: ${email}`);
      return res.status(200).json({ message: 'Si votre e-mail est enregistré, vous recevrez un lien de réinitialisation.' });
    }

    // Générer le token de réinitialisation
    const resetToken = user.createPasswordResetToken();
    await user.save({ validateBeforeSave: false }); // Sauvegarder le token haché et l'expiration, désactiver les validations pour ne pas interférer avec le mot de passe

    // Créer l'URL de réinitialisation pour l'e-mail
    const resetURL = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const messageBody = `Bonjour ${user.name},\n\nVous avez demandé une réinitialisation de votre mot de passe pour InkPad. Veuillez cliquer sur le lien suivant, ou le copier-coller dans votre navigateur, pour compléter le processus :\n\n${resetURL}\n\nSi vous n'avez pas demandé cette réinitialisation, veuillez ignorer cet e-mail. Ce lien expirera dans 10 minutes.\n\nCordialement,\nL'équipe InkPad`;

    try {
      await sendEmail({
        to: user.email,
        subject: 'Réinitialisation de votre mot de passe InkPad',
        text: messageBody,
        // html: '<h1>Version HTML ici</h1>' // Optionnel
      });
      res.status(200).json({ message: 'Un e-mail de réinitialisation a été envoyé à votre adresse.' });
    } catch (emailError) {
      console.error("Erreur lors de l'envoi de l'e-mail de réinitialisation:", emailError);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save({ validateBeforeSave: false });
      return res.status(500).json({ message: "Erreur lors de l'envoi de l'e-mail. Veuillez réessayer." });
    }

  } catch (error) {
    console.error("Erreur dans requestPasswordReset:", error);
    res.status(500).json({ message: 'Erreur serveur.' });
  }
};


exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;

    if (!token || !newPassword) {
      return res.status(400).json({ message: 'Veuillez fournir le token et le nouveau mot de passe.' });
    }

    // Hacher le token reçu pour le comparer à celui stocké
    const hashedToken = crypto
      .createHash('sha256')
      .update(token)
      .digest('hex');

    const user = await User.findOne({
      passwordResetToken: hashedToken,
      passwordResetExpires: { $gt: Date.now() }, // Vérifier que le token n'est pas expiré
    });

    if (!user) {
      return res.status(400).json({ message: 'Jeton invalide ou expiré. Veuillez refaire une demande.' });
    }

    // Définir le nouveau mot de passe (le hook pre('save') s'occupera du hachage)
    user.password = newPassword;
    user.passwordResetToken = undefined; // Invalider le token
    user.passwordResetExpires = undefined; // Invalider l'expiration
    await user.save();

    // Optionnel : connecter l'utilisateur directement ou lui envoyer un email de confirmation
    // Pour l'instant, on confirme juste
    res.status(200).json({ message: 'Mot de passe réinitialisé avec succès. Vous pouvez maintenant vous connecter.' });

  } catch (error) {
    console.error("Erreur dans resetPassword:", error);
    res.status(500).json({ message: 'Erreur serveur lors de la réinitialisation du mot de passe.' });
  }
};



// module.exports = {meUpDate};