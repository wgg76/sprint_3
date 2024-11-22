import express from 'express';
import { 
    obtenerSuperHeroePorIdController, 
    obtenerTodosLosSuperHeroesController, 
    obtenerSuperHeroesMayoresDe30Controller, 
    buscarSuperheroesPorAtributoController, 
    crearSuperHeroeController, 
    actualizarSuperheroeController, 
    eliminarSuperheroeController, 
    eliminarSuperheroePorNombreController, 
    mostrarFormularioAgregar,
    agregarSuperheroeController,
    mostrarFormularioEditar,
    editarSuperheroeController,
} from '../controllers/superheroesController.mjs';

const router = express.Router();

// Ruta para obtener los datos del superhéroe y mostrar el formulario de edición
router.get('/heroes/:id/editar', obtenerSuperHeroePorIdController);  // Obtener datos del superhéroe
//router.get('/heroes/:id/editar', mostrarFormularioEditar);  // Mostrar el formulario con los datos actuales

// Ruta para actualizar un superhéroe
router.put('/heroes/:id/editar', editarSuperheroeController);  // Para actualizar el superhéroe

// Ruta para agregar un superhéroe
router.post('/heroes', crearSuperHeroeController); 
router.post('/heroes', agregarSuperheroeController);

// Rutas para obtener todos los superhéroes
router.get('/heroes', obtenerTodosLosSuperHeroesController);
router.get('/heroes/mayores30', obtenerSuperHeroesMayoresDe30Controller);
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController);

// Ruta para mostrar el formulario de agregar superhéroe
router.get('/heroes/agregar', mostrarFormularioAgregar);  // Para mostrar el formulario de agregar

// Ruta para actualizar un superhéroe por ID
router.put('/heroes/:id', actualizarSuperheroeController);  // Para actualizar un superhéroe

// Ruta para eliminar un superhéroe por ID
router.delete('/heroes/:id', eliminarSuperheroeController);  // Para eliminar un superhéroe

// Ruta para eliminar un superhéroe por Nombre
router.delete('/heroes/nombre/:nombre', eliminarSuperheroePorNombreController);

export default router;

