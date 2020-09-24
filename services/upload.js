// ====================================================
//      Service: Upload and get files
// ====================================================

const validType = ['users'];

let validExtentionImage = ['jpg', 'jpeg', 'png'];

const models = require('../models');

const { successMsg, errorMsg } = require('../utils/responses');

const fs = require('fs');

const path = require('path');

let noImagePath = path.resolve(__dirname, '../public/uploads/no-image.jpg');

let noImageUser = path.resolve(__dirname, '../public/images/user.png');

//=========================================
//Guardar archivos
//=========================================
let uploadFile = (req, res) => {

    let type = req.params.type;

    let id = req.params.id;

    let format = req.params.format;

    let fileUploaded = req.files.file; // El input de tener el name file

    if (validType.indexOf(type) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Carga de ' + type + ' no permitida.',
                type: type
            }
        });
    }

    let nameTokenFile = fileUploaded.name.split('.');

    let extention = nameTokenFile[nameTokenFile.length - 1].toLowerCase();

    if (format === 'image')
        validExtention = validExtentionImage;

    if (validExtention.indexOf(extention) < 0) {
        return res.status(400).json({
            ok: false,
            err: {
                message: 'Las extensiones válidas son: ' + validExtention.join(', '),
                ext: extention
            }
        });
    }

    let fileName = `${id}-${ new Date().getMilliseconds() }.${ extention }`

    fileUploaded.mv(`public/images/${type}/${fileName}`, (err) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }
        uploadByType(type, id, res, fileName, req);

    });

}

async function uploadByType(type, id, res, fileName, req) {
    switch (type) {
        case 'users':
            await uploadImageProfile(res, fileName, id);
        default:
            break;
    }
}

//=========================================
//Guardar imagen perfil de usuario
//=========================================
async function uploadImageProfile(res, fileName, id) {
    try {
        const user = await models.User.findOne({ where: { id } });

        if (!user)
            successMsg(res, 200, `No existe datos para el id: ${id}`);

        if (user.profilePicture !== '')
            deleteFile('users', user.profilePicture);

        user.set({ profilePicture: fileName })
        await user.save()
        const msg = user.username ?
            `se actualizó notificaciones de ${user.username}` :
            'actualización exitosa'

        successMsg(res, 200, msg, user)
    } catch (error) {
        console.error(error.toString())
        errorMsg(res, 500, `lo sentimos hemos cometido un error!`, error)
    }
}

//=========================================
//Eliminar archivo
//=========================================
let deleteFile = (type, fileName) => {

    let pathImg = path.resolve(__dirname, `../public/images/${ type }/${ fileName }`);
    if (fs.existsSync(pathImg)) {
        fs.unlinkSync(pathImg);
    }
}

//=========================================
//Obtener archivos
//=========================================
let getFile = (req, res) => {

    let type = req.params.type;
    let file = req.params.fileName;

    let pathImg = path.resolve(__dirname, `../public/images/${ type }/${ file }`);

    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        if (type == 'users') {
            res.sendFile(noImageUser);
        } else {
            res.sendFile(noImagePath);
        }

    }
}

module.exports = {
    uploadFile,
    deleteFile,
    getFile
}