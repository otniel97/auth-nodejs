// ====================================================
//      Service User
// ====================================================

const { errorMsg } = require('../utils/responses');
const serviceUser = require('../services/user');

//======================================
//Mostrar todos los usuarios
//======================================
async function getUsers(req, res) {
    try {
        await serviceUser.getUsers(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================================
//Mostrar todos los usuarios
//==============================================
async function getUsersByStatus(req, res) {
    try {
        await serviceUser.getUsersByStatus(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=================================
//Mostrar usuario por id
//=================================
async function getUserById(req, res) {
    try {
        await serviceUser.getUserById(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Crear usuario
//==============================
async function saveUser(req, res) {
    try {
        await serviceUser.saveUser(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Actualizar usuario
//==============================
async function updateUser(req, res) {
    try {
        await serviceUser.updateUser(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=====================================
//Activar desactivar usuario
//=====================================
async function statusUser(req, res) {
    try {
        await serviceUser.statusUser(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=====================================
//Activar desactivar notificaciones
//=====================================
async function notificationsUser(req, res) {
    try {
        await serviceUser.notificationsUser(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=========================================
//Actualizar imagen de perfil
//=========================================
async function updateImageProfile(req, res) {
    try {
        await serviceUser.updateImageProfile(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

module.exports = {
    getUsers,
    getUsersByStatus,
    getUserById,
    saveUser,
    updateUser,
    statusUser,
    notificationsUser,
    updateImageProfile,
}