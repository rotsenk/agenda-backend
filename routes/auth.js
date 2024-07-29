/** Rutas de usuarios / auth
 * host + /api/auth
 */

const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

// e n d p o i n t s
// para nuevos usuarios
router.post(
    '/new',
    [// middlewares
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 })
    ],
    crearUsuario
);

// posteo directo al /auth para login
router.post(
    '/',
    [// middlewares
        check('email', 'El email es obligatorio').isEmail(),
        check('password', 'El password debe de ser de 6 caracteres').isLength({ min:6 })
    ],
    loginUsuario
);

// del token autenticar de forma pasiva
router.get('/renew', revalidarToken);


module.exports = router;