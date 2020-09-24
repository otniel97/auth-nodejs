// ====================================================
//      Messages Response
// ====================================================

const successMsg = (res, code, message, data) => {
    return res.status(code).json({
        ok: true,
        message,
        data
    });
}

const errorMsg = (res, code, message, error) => {
    return res.status(code).json({
        ok: false,
        message,
        err: error.message
    });
}

module.exports = {
    successMsg,
    errorMsg
}