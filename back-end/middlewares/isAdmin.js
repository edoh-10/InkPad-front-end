const jws = require("jsonwebtoken");

module.exports = function (req, res, next) {
  if (!req.user) {
    res
      .status(401)
      .json({ message: "Accès non autorisé, token manquant ou invalide." });
  }
  console.log(req.user)
  if (req.user.role !== admin) {
    return res
      .status(403)
      .json({ message: "Accès refusé. Permissions administrateur requises." });
  }

  next();
};
