require("dotenv").config();
const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// controller pour l'inscription
const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User registered successfully", newUser });
  } catch (error) {
    res.status(500).json({ error: "Erreur de l'inscription" });
  }
};

// controller pour la connexion
const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    // const nowUser = await User.find({ email })

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Email ou mot de pass incorrect" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, user });
  } catch (error) {
    res.status(500).json({ error: "connexion échouer" });
  }
};

// controller pour récupérer les infos de l'user ainsi que de ses notes
const me = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select("-password").populate("notes");
 
    if (!user) {
      return res.status(404).json({ error: "utilisateur non trouver" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la récupération des infos" });
  }
};

// controller pour mettre à jour les infos de l'user
// const meUpDate = async (req, res) => {
//   try {
//     const ID = req.params.id;
//     const {username, email, bio, avatar} = req.body;
//     // console.log(req.body)
//     // const user = await User.findById(req.user.userId).select("-password").populate("notes");
//     const userUpdate = await User.findByIdAndUpdate({_id: ID}, {username, email, bio, avatar}, {new: true, runValidators: true,})
//     // console.log(userUpdate)
 
//     if (!userUpdate) { 
//       return res.status(404).json({ error: "utilisateur non trouver" });
//     }

//     res.json(userUpdate);
//   } catch (error) {
//     res.status(500).json({ error: "Erreur lors de la récupération des infos" });
//   }
// };

// middleware pour protéger les routes
const authenticateToken = (req, res, next) => {
  const authHeader = req.header("Authorization");
  console.log("Authorization Header reçu:", authHeader); // Ajoute ce log
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
      console.log("Erreur: Aucun token trouvé.");
      return res.status(403).json({ error: "Accès refusé. Aucun token fourni." });
  }

  try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("Décodage réussi, utilisateur", req.user); // Vérification
      next();
  } catch (error) {
      console.log("Erreur JWT", error.message);
      res.status(401).json({ error: "Token invalide ou expiré." });
  }
};

module.exports = { register, login, me, authenticateToken };
