// ====================================================
//      Controller Role
// ====================================================

const serviceRole = require('../services/role')
const { errorMsg } = require('../utils/responses');

//======================================
//Mostrar todos los roles
//======================================
async function getRoles(req, res) {
    try {
        await serviceRole.getRoles(req, res)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==========================================
//Mostrar todos los roles por estatus
//==========================================
async function getRolesByStatus(req, res) {
    try {
        await serviceRole.getRolesByStatus(req, res)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=================================
//Mostrar rol por id
//=================================
async function getRoleById(req, res) {
    try {
        await serviceRole.getRoleById(req, res)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Crear rol
//==============================
async function saveRole(req, res) {
    let body = req.body;

    let role = {
        name: body.name,
        description: body.description,
        status: true
    }
    body.object = role;

    try {
        await serviceRole.saveRole(req, res)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }

}

//==============================
// Actualizar tarea
//==============================
async function updateRole(req, res) {
    try {
        await serviceRole.updateRoleById(req, res)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//==============================
// Cambiar status de tarea
//==============================
async function updateRoleStatus(req, res) {
    try {
        await serviceRole.updateRoleStatusById(req, res)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//==============================
//  Eliminar tarea
//==============================
async function deleteRole(req, res) {
    try {
        await serviceRole.deleteRoleById(req, res)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

module.exports = {
    getRoles,
    getRolesByStatus,
    getRoleById,
    saveRole,
    updateRole,
    updateRoleStatus,
    deleteRole
}