const express = require('express');
const router = express.Router();
const {authenticateToken} = require('../controller/authController')
const {getAllPublicNotes, getOnPublicNotes} = require('../controller/publicNotesController');


// publiques notes routes
router.get('/public/notes', authenticateToken, getAllPublicNotes); // toutes les notes
router.get('/public/note/:id', getOnPublicNotes); // une note

module.exports = router;
