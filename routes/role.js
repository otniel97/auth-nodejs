// ====================================================
//      Routes API: Role
// ====================================================

const express = require('express');
const roleController = require('../controllers/role');
const api = express.Router();

// =================================
// Todos los roles
// =================================
api.get('/all', roleController.getRoles);

// =================================
// Todos los roles por estatus
// =================================
api.get('/all/:status', roleController.getRolesByStatus);

// ==============================
// Un rol por id
// ==============================
api.get('/:id', roleController.getRoleById);

// ===============================
// Crear nuevo rol
// ===============================
api.post('/save', roleController.saveRole);

// ====================================
// Actualizar rol
// ====================================
api.put('/:id', roleController.updateRole);

// ====================================
// Actualizar status de rol
// ====================================
api.put('/:id/status', roleController.updateRoleStatus);

// ====================================
// Eliminar rol
// ====================================
api.delete('/:id', roleController.deleteRole);

module.exports = api;