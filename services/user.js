// ====================================================
//      Service User
// ====================================================

const User = require('../models').User;
const Role = require('../models').Role;
const { Op } = require("sequelize");
const bcrypt = require('bcrypt');
const { uploadFile } = require('./upload');
const { successMsg, errorMsg } = require('../utils/responses');

//======================================
//Mostrar todos los usuarios
//======================================
async function getUsers(req, res) {
    try {
        const users = await User.findAll({
            include: [{
                model: Role,
                required: false,
            }]
        })

        users.length ?
            successMsg(res, 200, 'correcto', users) :
            successMsg(res, 200, 'No existen datos registrados')

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================================
//Mostrar todos los usuarios
//==============================================
async function getUsersByStatus(req, res) {
    try {
        const status = req.params.status;

        const users = await User.findAll({ where: { status } })

        users.length ?
            successMsg(res, 200, 'correcto', users) :
            successMsg(res, 200, `No hay datos registrados con el estatus ${status}`)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=================================
//Mostrar usuario por id
//=================================
async function getUserById(req, res) {
    try {
        const id = req.params.id;

        const user = await User.findOne({ where: { id } })

        user ?
            successMsg(res, 200, 'correcto', user) :
            successMsg(res, 200, `No hay datos registrados con el id: ${id}`)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//==============================
//Crear usuario
//==============================
async function saveUser(req, res) {
    try {
        let body = req.body;

        if (body.password !== body.passwordConfirm) {
            return res.status(400).json({
                ok: false,
                message: 'Contraseñas no coinciden',
            });
        }

        let checkRole = await Role.findOne({ where: { id: req.body.roleId } });
        if (!checkRole)
            return res.status(500).send({
                ok: false,
                message: `No existe el rol con id: ${req.body.roleId}`,
            });

        let checkUser = await User.findOne({
            where: {
                [Op.or]: [{
                        username: {
                            [Op.eq]: body.username
                        }
                    },
                    {
                        email: {
                            [Op.eq]: body.email
                        }
                    }
                ]
            }
        });

        //verificar si el usuario existe
        if (checkUser)
            return res.status(500).send({
                ok: false,
                message: 'Ya existe un usuario con este correo o nombre de usuario',
            });

        let newUser = {
            email: body.email,
            username: body.username,
            password: bcrypt.hashSync(body.password, 10),
            status: body.status || true,
            roleId: body.roleId,
            notifications: true
        }
        const user = await User.create(newUser);

        const msg = user.username ?
            `${user.username} creado con exito` :
            'creación exitosa!'

        successMsg(res, 200, msg, user)

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, 'Lo sentimos!, hemos  cometido un error', error)
    }
}

//==============================
//Actualizar usuario
//==============================
async function updateUser(req, res) {
    try {
        const id = req.params.id;

        let checkRole = await Role.findOne({ where: { id: req.body.roleId } });
        if (!checkRole)
            return res.status(500).send({
                ok: false,
                message: `No existe el rol con id: ${req.body.roleId}`,
            });

        let checkUser = await User.findOne({
            where: {
                [Op.or]: [{
                    username: {
                        [Op.eq]: body.username
                    }
                }]
            }
        });

        if (checkUser)
            return res.status(500).send({
                ok: false,
                message: 'Ya existe un usuario con este nombre de usuario',
            });

        const user = await User.findOne({ where: { id } })

        if (!user)
            successMsg(res, 200, `No se encontraron resultados para el id: ${id}.`)
        else {
            user.set({...req.body })
            await user.save()
            const msg = user.username ?
                `Se edito ${ user.username } con exito` :
                'Actualización de datos exitosa'

            successMsg(res, 200, msg, user)
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//=====================================
//Activar desactivar usuario
//=====================================
async function statusUser(req, res) {
    try {
        const id = req.params.id;

        const user = await User.findOne({ where: { id } })

        if (!user)
            successMsg(res, 200, `No existe datos para el id: ${id}`)
        else {
            user.set({ status: !user.status })
            await user.save()

            const msg = user.username ?
                `se actualizo el estatus de ${user.username}` :
                'actualización exitosa'

            successMsg(res, 200, msg, user)
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//=====================================
//Activar desactivar notificaciones
//=====================================
async function notificationsUser(req, res) {
    try {
        const id = req.params.id;

        const user = await User.findOne({ where: { id } })

        if (!user)
            successMsg(res, 200, `No existe datos para el id: ${id}`)
        else {
            user.set({ notifications: !user.notifications })
            await user.save()

            const msg = user.username ?
                `se actualizó notificaciones de ${user.username}` :
                'actualización exitosa'

            successMsg(res, 200, msg, user)
        }
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//=========================================
//Actualizar imagen de perfil
//=========================================
async function updateImageProfile(req, res) {
    try {
        if (!req.files) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: "No hay archivo seleccionado"
                }
            });
        }
        req.params.type = 'users';
        req.params.format = 'image';
        await uploadFile(req, res)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
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