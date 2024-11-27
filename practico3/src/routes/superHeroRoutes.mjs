import express from 'express';
import {
    obtenerSuperHeroePorIdController,
    obtenerTodosLosSuperHeroesController,
    obtenerSuperHeroesMayoresDe30Controller,
    buscarSuperheroesPorAtributoController,
    //crearSuperHeroeController,
    //actualizarSuperheroeController,
    eliminarSuperheroeController,
    eliminarSuperheroePorNombreController,
    mostrarFormularioAgregar,
    agregarSuperheroeController,
    //mostrarFormularioEditar,
    editarSuperheroeController,
} from '../controllers/superheroesController.mjs';

const router = express.Router();

// CRUD Básico de Superhéroes

// Mostrar todos los superhéroes
router.get('/heroes', obtenerTodosLosSuperHeroesController);

// Agregar un superhéroe
router.get('/heroes/agregar', mostrarFormularioAgregar); // Mostrar formulario
router.post('/heroes', agregarSuperheroeController); // Procesar formulario

// Editar un superhéroe
router.get('/heroes/:id/editar', obtenerSuperHeroePorIdController); // Muestra el formulario de edición
// Ruta para editar un superhéroe
router.put('/heroes/:id', editarSuperheroeController); // Actualiza los datos del superhéroe

// Eliminar un superhéroe
router.delete('/api/heroes/delete/:id', eliminarSuperheroeController); // Eliminar por ID
router.delete('/api/heroes/nombre/:nombre', eliminarSuperheroePorNombreController); // Eliminar por nombre

// Funcionalidades adicionales
router.get('/heroes/mayores30', obtenerSuperHeroesMayoresDe30Controller); // Obtener mayores de 30
router.get('/heroes/buscar/:atributo/:valor', buscarSuperheroesPorAtributoController); // Buscar por atributo

export default router;


