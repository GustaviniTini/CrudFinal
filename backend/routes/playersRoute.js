import express from 'express';
import { Player } from '../models/crudModel.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = express.Router();

//Guardar un nuevo jugador
router.post('/players', authRequired, async (request, response) => {
    try {
        if (
            !request.body.nombre ||
            !request.body.posicion ||
            !request.body.edad || 
            !request.user.id
        ) {
            return response.status(400).send({
                message: 'Send all requiered fields: nombre, posicion, edad',
            });
        }
        const newPlayer = {
            nombre: request.body.nombre,
            posicion: request.body.posicion,
            edad: request.body.edad,
            user: request.user.id
        };

        const player = await Player.create(newPlayer);

        return response.status(201).send(player);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

//Ruta para obtener todos los jugadores de la bdd
router.get('/players', authRequired, async (request, response) => {
    try {
        const players = await Player.find({
            user: request.user.id
        });

        return response.status(200).json({
            count: players.length,
            data: players
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});

//Ruta para obtener un jugador de la bdd
router.get('/players/:id', authRequired, async (request, response) => {
    try {

        const { id } = request.params;

        const player = await Player.findById(id);

        return response.status(200).json(player);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});


//Ruta para actualizar jugador
router.put('/players/:id', authRequired, async (request, response) => {
    try {
        if (
            !request.body.nombre ||
            !request.body.posicion ||
            !request.body.edad
        ) {
            return response.status(400).send({
                message: 'Send all requiered fields: nombre, posicion, edad',
            });
        }

        const { id } = request.params;

        const result = await Player.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Jugador no encontrado' });

        }
        return response.status(200).json({ message: 'Jugador actualizado correctamente' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });

    }
});

//Ruta para eliminar un jugador
router.delete('/players/:id', authRequired, async (request, response) => {
    try {
        const { id } = request.params;

        const result = await Player.findByIdAndDelete(id, request.body);
        if (!result) {
            return response.status(404).json({ message: 'Jugador no encontrado' });

        }
        return response.status(200).json({ message: 'Jugador eliminado correctamente' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


export default router;