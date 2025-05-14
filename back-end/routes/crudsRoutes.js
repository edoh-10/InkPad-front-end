const express = require('express');
const {allNotes, oneNote, createANote, changeNote, deleteNote} = require('../controller/crudsControler');
const {authenticateToken} = require('../controller/authController');


const router = express.Router();

router.get('/notes', allNotes);
router.get('/notes/:id', oneNote); 
router.post('/notes', authenticateToken, createANote);
router.put('/notes/:id', changeNote);
router.delete('/notes/:id', deleteNote);

module.exports = router; 