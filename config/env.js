//======================
//Puerto rest server
//======================

process.env.PORT = process.env.PORT || 3000;

//================================
//            Entorno
//================================

process.env.NODE_ENV = process.env.NODE_ENV || 'development';

//================================
//       Vencimiento del token
//================================
process.env.EXPIRATION_DATE = '1000000h';

//================================
//     Seed de autenticación
//================================

process.env.SEED = process.env.SEED || 'secret-dev'

//================================
//     Cors client
//================================

process.env.CLIENT_CORS_URL = process.env.CLIENT_CORS_URL || 'http://localhost:8080';