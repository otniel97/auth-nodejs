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

//================================
//     Google client id 767564570938-44jfm6620b04l8gar3ritv335910jc88.apps.googleusercontent.com
//================================

process.env.CLIENT_ID = process.env.CLIENT_ID || '57107022367-045ci6mlhlr3taj59ha0u50okk5de2b6.apps.googleusercontent.com';