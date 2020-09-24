// ====================================================
//      Middleware Auth
// ====================================================

let jwt = require('jsonwebtoken');

//======================================
//Middleware para usuario autenticado
//======================================

let authenticate = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).json({
            ok: false,
            message: "No se ha encontrado header de autorización"
        });
    }

    var token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, process.env.SEED, (error, data) => {
        if (error)
            return res.status(500).json({
                ok: false,
                message: "Ha ocurrido un error",
                error
            });
        req.user = data.user;
        next();
    });
}

module.exports = {
    authenticate
}