const express = require('express');
const {register, login, me, authenticateToken} = require('../controller/authController')

const router = express.Router();

// route pour l'inscription
router.post('/auth/register', register);

// route pour la connexion
router.post('/auth/login', login);

// route pour récupérer les infos de l'user ainsi que de ses notes
router.get('/auth/me', authenticateToken, me);


// router.put('/auth/:id', authenticateToken, meUpDate);

authenticateToken;

module.exports = router;