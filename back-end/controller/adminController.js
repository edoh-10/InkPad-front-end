const User = require("../model/User");
const Note = require("../model/notes");
const Message = require("../model/contactForm");

// controller pour que l'admin puisse récupérer tous les utilisateurs
const getAllUsers = async (req, res) => {
  try {
    const getUsers = await User.find();
    if (getUsers) {
      res.status(200).json(getUsers);
    }
    console.log(getUsers)
  } catch (error) {}
};

// controller pour que l'admin puisse changer le rôle de l'utilisateur
const changeUserRole = async (req, res) => {
  try {
    const changeRole = await User.findByIdAndUpdate(
      req.params.id,
      { role: req.body.role },
      { new: true }
    );
    res.status(200).json(changeRole);
  } catch (error) {}
};

// controller pour que l'admin puisse supprimer un utilisateur
const deleteUser = async (req, res) => {
  try {
    const deleteOnUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json(deleteOnUser)
  } catch (error) {}
};

// controller pour que l'admin puisse récupérer toutes les notes
const getAllNotes = async (req, res) => {
  try {
    const allNotes = await Note.find().populate("user");
    res.status(200).json(allNotes);
  } catch (error) {
    res.status(500).json({message: error.message})
  }
};

// controller pour que l'admin puisse récupérer les messages envoyés pas le formulaire de contact
const getMessage = async (req, res) => {
    try {
        const getMsg = await Message.find();
        res.status(200).json(getMsg);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

module.exports = { getAllUsers, changeUserRole, deleteUser, getAllNotes, getMessage };
