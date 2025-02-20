const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
    
    const eventos = await Evento.find()
                                .populate('user', 'name'); 
    
    return res.json({
        ok: true,
        eventos
    });
};

const crearEvento = async (req, res = response) => {
    const evento = new Evento( req.body );

    try {
        evento.user = req.uid;
        // grabar en la base de datos el evento guardado
        const eventoGuardado = await evento.save();

        return res.json({
            ok: true,
            evento: eventoGuardado
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contáctese con el admin...'
        });
    }
};

const actualizarEvento = async (req, res = response) => {
    // tomar el id que le pasamos en la url, api/events/123123
    const eventoId = req.params.id;
    const uid = req.uid;

    // interacción en la bd
    try{
        const evento = await Evento.findById( eventoId );

        if ( !evento ) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese id'
            });
        }

        // verificar que la misma persona que creó el evento, pueda actualizarlo
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }
        
        const nuevoEvento = {
            ...req.body,
            user: uid
        }
        
        const eventoActualizado = await Evento.findByIdAndUpdate( eventoId, nuevoEvento, { new: true } );
        
        return res.json({
            ok: true,
            evento: eventoActualizado 
        });

    }
    catch ( error ){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contáctese con el admin...'
        });
    }
};

const eliminarEvento = async (req, res = response) => {
    // tomar el id que le pasamos en la url, api/events/123123
    const eventoId = req.params.id;
    const uid = req.uid;

    // interacción en la bd
    try{
        const evento = await Evento.findById( eventoId );

        if (!evento) {
            return res.status(404).json({
                ok: false,
                msg: 'Evento no encontrado por ese id'
            });
        }

        // verificar que la misma persona que creó el evento, pueda borrarlo
        if ( evento.user.toString() !== uid ) {
            return res.status(401).json({
                ok: false,
                msg: 'No tiene privilegio de eliminar este evento'
            });
        }
        
        await Evento.findByIdAndDelete( eventoId );
        
        // se podría enviar la ref al viejo documento que se eliminó
        return res.json({
            ok: true,
            msg: "Evento Eliminado con Éxito!" 
        });

    }
    catch ( error ){
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Contáctese con el admin...'
        });
    }
};

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento
}