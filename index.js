const express = require('express');
require('dotenv').config();

// crear el servidor de express
const app = express();// express como una función

// directorio público
app.use( express.static('public') );

// rutas
app.use( '/api/auth', require('./routes/auth') );
// todo: CRUD: Eventos

// escuchar peticiones
// no poner puerto 3000, sino diferente 3001, 4000
app.listen( process.env.PORT, () => {
    console.log(`servidor corriendo en puerto ${ process.env.PORT }`);
})