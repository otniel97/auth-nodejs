// ====================================================
//      Rutas API
// ====================================================

const express = require('express');
const app = express();

//archivo de rutas de modelo role
app.use('/role', require('./role'));

//archivo de rutas de modelo user
app.use('/user', require('./user'));

//archivo de rutas de authentication
app.use('/auth', require('./auth'));

module.exports = app;