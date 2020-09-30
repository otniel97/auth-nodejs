// ====================================================
//      Routes API: Donation
//      By ARYA Team ©
// ====================================================

const express = require('express');
const authController = require('../controllers/auth');
const authMiddleware = require('../middlewares/auth');
const api = express.Router();

// =================================
// Sign in de usuarios
// =================================
api.post('/signIn', authController.signIn);

// =================================
// Google Sign in de usuarios
// =================================
api.post('/googleSignIn', authController.googleSignIn);


// =================================
// Cambiar contraseña
// =================================
api.put('/changePassword', authMiddleware.authenticate, authController.changePassword);

module.exports = api;