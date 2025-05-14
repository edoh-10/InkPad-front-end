const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const crypto = require("crypto"); // Pour générer le token de réinitialisation

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    notes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Note" }],
    message: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
    bio: {
      type: String,
      default: "Passionné par la prise de notes et l'organisation.",
    },
    avatar: {
      type: String,
      default: function () {
        const initial = this.username ? this.username[0].toUpperCase() : "u";
        return `https://ui-avatars.com/api/?name=${initial}&background=random&color=fff`;
      },
    },
    role: {
      type: String,
      enum: ["user", "admin", "editor"], // Définissez les rôles possibles
      default: "user", // Rôle par défaut à l'inscription
    },
    passwordResetToken: String, // Pour stocker le token de réinitialisation haché
    passwordResetExpires: Date, // Date d'expiration du token
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) { 
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

// Méthode pour générer et hacher le token de réinitialisation de mot de passe
UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); // Génère un token simple

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex"); // Hache le token avant de le stocker

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Token expire dans 10 minutes

  return resetToken; // Retourne le token non haché (à envoyer par email)
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
