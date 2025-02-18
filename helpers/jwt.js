const jwt = require('jsonwebtoken');

// esta función recibe lo que necesito colocar como payload en mi token
const generarJWT = ( uid, name ) => {

    return new Promise(( resolve, reject ) => {
        const payload = { uid, name };

        jwt.sign( payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, ( err, token ) => {
            if ( err ) {
                console.log(err);
                reject('No se pudo generar el token')
            }

            resolve( token );
        })
    })

}

module.exports = {
    generarJWT
}