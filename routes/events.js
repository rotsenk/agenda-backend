/**
 * Event Routes
 * /api/events
 */
// crear todo el CRUD
const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');// muestra los errores
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { isDate } = require('../helpers/isDate');
const router = Router();

// todas tienen que pasar por la validación jwt
router.use(validarJWT);

// Obtener eventos
router.get('/', getEventos);

// Crear un nuevo evento
router.post(
    '/',
    [
        check('title', 'El título es obligatorio').not().isEmpty(),
        check('start', 'Fecha de inicio es obligatoria').custom( isDate ),
        check('end', 'Fecha fin es obligatoria').custom( isDate ),
        validarCampos
    ],
    crearEvento
);

// Actualizar evento
router.put('/:id', actualizarEvento);

// Actualizar evento
router.delete('/:id', eliminarEvento);

module.exports = router;