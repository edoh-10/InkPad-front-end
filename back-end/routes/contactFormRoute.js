const {postMessage} = require('../controller/contactFormController');
const express = require('express');
const router = express.Router();


// routes pour la création du formulaire
router.post('/contact', postMessage);

module.exports = router;