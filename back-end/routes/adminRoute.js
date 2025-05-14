const express = require('express');
const router = express.Router();
const isAdminMidleWare = require('../middlewares/isAdmin');
const {authenticateToken} = require('../controller/authController');
const {getAllUsers, changeUserRole, deleteUser, getAllNotes, getMessage} = require('../controller/adminController');


// router.use(isAdminMidleWare);
// router.use(authenticateToken);

// les routes
router.get('/admin/users', authenticateToken, getAllUsers);
router.put('/users/:userId/role', authenticateToken, changeUserRole);
router.delete('/admin/notes', authenticateToken, deleteUser);
router.get('/admin/notes', authenticateToken, getAllNotes);
router.get('/admin/message', authenticateToken, getMessage);

module.exports = router;