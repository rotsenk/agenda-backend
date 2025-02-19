/**
 * Event Routes
 * /api/events
 */

// crear todo el CRUD
const { Router } = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const router = Router();

// todas tienen que pasar por la validación jwt

// Obtener eventos
router.get('/', validarJWT, getEventos);

// Crear un nuevo evento
router.post('/', validarJWT, crearEvento);

// Actualizar evento
router.put('/:id', validarJWT, actualizarEvento);

// Actualizar evento
router.delete('/:id', validarJWT, eliminarEvento);

module.exports = router;