const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');

const crearUsuario = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
        
        if ( usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Correo ya existe con otro usuario.'
            })
        }
        
        usuario = new Usuario( req.body );

        // encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync( password, salt );

        await usuario.save();
    
        res.status(201).json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        })
    }
}

const loginUsuario = async ( req, res = response ) => {

    const { email, password } = req.body;

    try {

        let usuario = await Usuario.findOne({ email });
        
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'Email no existe.'
            })
        }

        // confirmar passwords
        const validPassword = bcrypt.compareSync( password, usuario.password );

        if ( !validPassword ) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }

        // generar nuestro JWT
        res.json({
            ok: true,
            uid: usuario.id,
            name: usuario.name
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor comunicarse con el administrador'
        })
    }
}

const revalidarToken = ( req, res = response ) => {
    res.json({
        ok: true,
        msg: 'renew'
    })
}


module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}