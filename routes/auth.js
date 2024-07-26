/** Rutas de usuarios / auth
 * host + /api/auth
 */

const { Router } = require('express');
const router = Router();

const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth');

// e n d p o i n t s
// para nuevos usuarios
router.post( '/new', crearUsuario );

// posteo directo al /auth para login
router.post( '/', loginUsuario );

// del token autenticar de forma pasiva
router.get( '/renew', revalidarToken );


module.exports = router;