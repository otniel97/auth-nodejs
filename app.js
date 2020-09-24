// ====================================================
//      Configuración del servidor
//      By AYRA Team ©
// ====================================================

require('./config/env.js')

require('dotenv').config();

const express = require('express');

const json = require('express');

const morgan = require('morgan');

const bodyParser = require('body-parser');

const fileUpload = require('express-fileupload');

const cors = require('cors');

const db = require('./models');

const app = express();

const path = require('path');

//ver peticiones por consola
app.use(morgan('dev'));

//obtener resultados de peticiones en formato json
app.use(json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//Habilitar carpeta publica
app.use(express.static(path.resolve(__dirname, '../public')));

// carga de archivos
app.use(fileUpload());

app.use(cors());

app.options('*', cors());

//configuración global de rutas
app.use(require('./routes/index'));

db.sequelize.authenticate().then(() => {
        console.log('Conectado a base de datos')
        app.listen(process.env.PORT, () => {
            console.log('Escuchando el puerto:', 3000);
        });
    })
    .catch(err => {
        console.log(err);
    })

module.exports = app;