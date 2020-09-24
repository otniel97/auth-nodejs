// ====================================================
//      Routes API: User
// ====================================================

const express = require('express');
const userController = require('../controllers/user');
const authMiddleware = require('../middlewares/auth.js');
const api = express.Router();

// =================================
// Todos los usuarios
// =================================
api.get('/all', [authMiddleware.authenticate], userController.getUsers);

// =================================
// Todos los usuarios por status
// =================================
api.get('/all/:status', [authMiddleware.authenticate], userController.getUsersByStatus);

// ==============================
// Un usuario por id
// ==============================
api.get('/:id', [authMiddleware.authenticate], userController.getUserById);

// ==================================
// Crear nuevo usuario administrador
// ==================================
api.post('/save', userController.saveUser);

// =============================
// Editar usuario
// =============================
api.put('/:id', [authMiddleware.authenticate], userController.updateUser);

// ====================================
// Cambiar estatus de usuario
// ====================================
api.put('/status/:id', [authMiddleware.authenticate], userController.statusUser);

// ================================
// Actualizar foto de perfil
// ================================
api.put('/:id/imageProfile', [authMiddleware.authenticate], userController.updateImageProfile);

// ====================================
// Cambiar notifications de usuario
// ====================================
api.put('/notifications/:id', [authMiddleware.authenticate], userController.notificationsUser);

module.exports = api;