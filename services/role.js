// ====================================================
//      CRUD ROLE SERVICE
// ====================================================

const Role = require('../models').Role;
const { successMsg, errorMsg } = require('../utils/responses');

//==============================================
//Mostrar todas las items
//==============================================
async function getRoles(req, res) {
    try {
        const roles = await Role.findAll()

        roles.length ?
            successMsg(res, 200, 'correcto', roles) :
            successMsg(res, 200, 'No existen datos registrados')

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================================
//Mostrar todas las items por estatus
//==============================================
async function getRolesByStatus(req, res) {
    const status = req.params.status;
    try {
        const roles = await Role.findAll({ where: { status } })

        roles.length ?
            successMsg(res, 200, 'correcto', roles) :
            successMsg(res, 200, `No hay datos registrados con el estatus ${status}`)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=================================
//Mostrar item por id
//=================================
async function getRoleById(req, res) {
    const id = req.params.id;
    try {
        const role = await Role.findOne({ where: { id } })

        role
            ?
            successMsg(res, 200, 'correcto', role) :
            successMsg(res, 200, `No hay datos registrados con el id: ${id}`)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Crear objeto
//==============================
async function saveRole(req, res) {
    try {
        const role = await Role.create(req.body.object)

        const msg = role.name ?
            `${role.name} creado con exito` :
            'creación exitosa!'

        successMsg(res, 200, msg, role)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Lo sentimos!, hemos  cometido un error', error)
    }
}

//==============================
//Actualizar item
//==============================
async function updateRoleById(req, res) {
    const id = req.params.id;
    try {
        const role = await Role.findOne({ where: { id } })

        if (!role)
            successMsg(res, 200, `No se encontraron resultados para el id: ${id}.`)
        else {
            role.set({...req.body })
            await role.save()
            const msg = role.name ?
                `Se edito ${ role.name } con exito` :
                'Actualización de datos exitosa'

            successMsg(res, 200, msg, role)
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//=====================================
//Activar desactivar item
//=====================================
async function updateRoleStatusById(req, res) {
    const id = req.params.id;
    try {
        const role = await Role.findOne({ where: { id } })

        if (!role)
            successMsg(res, 200, `No existe datos para el id: ${id}`)
        else {
            role.set({ status: !role.status })
            await role.save()

            const msg = role.name ?
                `se actualizo el estatus de ${role.name}` :
                'actualización exitosa'

            successMsg(res, 200, msg, role)
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//==================================
//Eliminar item por id
//==================================
async function deleteRoleById(req, res) {
    const id = req.params.id;
    try {
        const role = await Role.destroy({ where: { id } })

        role === 1 ?
            successMsg(res, 200, 'Registro eliminado con éxito', role) :
            successMsg(res, 200, `No existe datos para el id: ${id}.`, )
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `No se pudo eliminar el item con id: ${id}.`)
    }
}

module.exports = {
    getRoles,
    getRolesByStatus,
    getRoleById,
    saveRole,
    updateRoleById,
    deleteRoleById,
    updateRoleStatusById,
}