// ====================================================
//      Controller Auth
// ====================================================

const { errorMsg } = require('../utils/responses');
const serviceAuth = require('../services/auth');

//======================================
// Sign in
//======================================
async function signIn(req, res) {
    try {
        await serviceAuth.signIn(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//======================================
// Google Sign in
//======================================
async function googleSignIn(req, res) {
    try {
        await serviceAuth.googleSignIn(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

//=================================
// Cambiar contraseña
//=================================
async function changePassword(req, res) {
    try {
        await serviceAuth.changePassword(req, res)
    } catch (error) {
        errorMsg(res, 500, 'Ha ocurrido un error', error)
    }
}

module.exports = {
    signIn,
    googleSignIn,
    changePassword
}