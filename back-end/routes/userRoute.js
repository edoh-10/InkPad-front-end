const express = require('express');
const router = express.Router();
const multer = require('multer')
const { authenticateToken } = require("../controller/authController");
const userController = require('../controller/userController');

// stockage temporaire
const upload = multer({ dest: 'uploads/'})

// routes pour mettre à jour les infos de l'user
 router.put('/user/:id', authenticateToken, upload.single('avatar'), userController.updateProfile);
router.post('/request/resetpass',  userController.requestPasswordReset)

module.exports = router;