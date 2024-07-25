const express = require('express');

// crear el servidor de express
const app = express();// express como una función


// rutas
app.get('/', (req, res) => {
    res.json({
        ok: true
    })
});



// escuchar peticiones
// no poner puerto 3000, sino diferente 3001, 4000
app.listen(4000, () => {
    console.log(`servidor corriendo en puerto ${4000}`)
})