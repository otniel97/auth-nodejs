// ====================================================
//      AUTH SERVICE
// ====================================================

const User = require('../models').User;
const bcrypt = require('bcryptjs');
let jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const Role = require('../models').Role;
const { successMsg, errorMsg } = require('../utils/responses');

async function signIn(req, res) {
    try {
        let body = req.body;

        const user = await User.findOne({
            where: {
                [Op.or]: [{
                        username: {
                            [Op.eq]: body.user
                        }
                    },
                    {
                        email: {
                            [Op.eq]: body.user
                        }
                    }
                ]
            },
            include: [Role]
        });
        if (!user)
            successMsg(res, 404, `El usuario no existe en el sistema`);

        if (!bcrypt.compareSync(body.password, user.password))
            successMsg(res, 200, `Contraseña incorrecta`);
        else {
            if (!user.status)
                successMsg(res, 200, `Usuario bloqueado`);

            let token = jwt.sign({ user: user }, process.env.SEED, { expiresIn: process.env.EXPIRATION_DATE });

            user.lastLoginAt = new Date();
            await user.save();

            user.token = token;
            successMsg(res, 200, `Inicio de sesión correcto`, token);
        }

    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error);
    }
}

//================================
//       Cambiar contraseña
//================================
async function changePassword(req, res) {
    try {
        let body = req.body;
        if (body.newPassword !== body.newPasswordConfirm)
            return res.status(400).json({
                ok: false,
                message: 'Contraseñas no coinciden',
            });

        const id = req.user.id;
        const user = await User.findOne({ where: { id } });
        if (!bcrypt.compareSync(body.password, user.password))
            return res.status(200).json({
                ok: false,
                message: 'Contraseña incorrecta'
            });

        bcrypt.genSalt(10, async function(error, salt) {
            bcrypt.hash(body.newPassword, salt, async function(error, hash) {
                if (error)
                    errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
                user.set({ password: hash })
                await user.save()
                const msg = user.username ?
                    `se actualizo la contraseña de ${user.username}` :
                    'actualización exitosa'

                successMsg(res, 200, msg, user)
            })
        })
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

module.exports = {
    signIn,
    changePassword
}