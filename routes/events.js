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
router.use( validarJWT );

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post('/', crearEvento);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Actualizar evento
router.delete('/:id', eliminarEvento);

module.exports = router;