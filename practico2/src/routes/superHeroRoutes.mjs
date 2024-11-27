import express from 'express';

import { obtenerSuperHeroePorIdController, obtenerTodosLosSuperHeroesController, obtenerSuperHeroesMayoresDe30Controller, buscarSuperheroesPorAtributoController, crearSuperHeroeController } from '../controllers/superheroesController.mjs';

import { actualizarSuperheroeController } from '../controllers/superheroesController.mjs';

import { eliminarSuperheroeController } from '../controllers/superheroesController.mjs';

import { eliminarSuperheroePorNombreController } from '../controllers/superheroesController.mjs';

import { validarSuperHeroe } from '../middlewares/validarSuperHeroe.mjs'; // Si tienes este middleware

// import { crearSuperHeroeController } from '../controllers/superheroesController.mjs'; // Duplicado

// import { validarSuperHeroe } from '../middlewares/validarSuperHeroe.mjs'; // Duplicado

import { mostrarFormularioAgregar } from '../controllers/superheroesController.mjs';


const router = express.Router();


router.get('/heroes', obtenerTodosLosSuperHeroesController);
router.get('/heroes/mayores30', obtenerSuperHeroesMayoresDe30Controller);
router.get('/heroes/:id', obtenerSuperHeroePorIdController);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

//Ruta para crear superheroe
router.post('/heroes', crearSuperHeroeController);

// Ruta para actualizar un superhéroe por ID
router.put('/heroes/:id', actualizarSuperheroeController);


// Ruta para eliminar un superhéroe por ID
router.delete('/heroes/:id', eliminarSuperheroeController);


// Ruta para eliminar un superhéroe por Nombre
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);

// router.put('/heroes/:id', validarSuperHeroe, actualizarSuperheroeController); // Esta ruta estaba duplicada
// Esta ruta ya se encuentra con el método PUT correcto

// router.post('/heroes', validarSuperHeroe, crearSuperHeroeController); // Esta ruta estaba duplicada
// Ya está definida antes sin duplicarse

router.get('api/heroes/agregar', mostrarFormularioAgregar);

router.put('/heroes/:id', validarSuperHeroe, actualizarSuperheroeController);


export default router;
