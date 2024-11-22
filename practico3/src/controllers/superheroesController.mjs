import { validationResult } from 'express-validator';
import SuperHero from '../models/SuperHero.mjs';  // Modelo de superhéroe
import { eliminarSuperheroePorId, eliminarSuperheroePorNombre, obtenerTodosLosSuperHeroes } from '../services/superheroesService.mjs';  // Servicios de eliminación
//import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';  // Repositorio para operaciones con la base de datos

import mongoose from 'mongoose';  // Asegúrate de que mongoose esté importado




// Mostrar el formulario para agregar un superhéroe
export const mostrarFormularioAgregar = (req, res) => {
    res.render('addSuperhero');  // Renderiza el archivo addSuperhero.ejs
};




// Mostrar el formulario para agregar un superhéroe
export const mostrarFormularioEditar = (req, res) => {
    res.render('editSuperhero'); // Renderiza el archivo addSuperhero.ejs
};

// Obtener todos los superhéroes y renderizar el dashboard
export async function obtenerSuperheroes(req, res) {
    try {
        // Obtener todos los superhéroes desde la base de datos
        const superheroes = await SuperHero.find();
        res.render('dashboard', { superheroes: superheroes });
    } catch (error) {
        console.error('Error al obtener los superhéroes:', error);
        res.status(500).send('Error al obtener los superhéroes');
    }
}

// Eliminar un superhéroe por nombre
export async function eliminarSuperheroePorNombreController(req, res) {
    const { nombre } = req.params; // Obtener el nombre del superhéroe desde los parámetros de la URL

    if (!nombre) {
        return res.status(400).json({ error: 'El nombre del superhéroe es obligatorio' });
    }

    try {
        // Llamar al servicio que elimina el superhéroe por nombre
        const superheroeEliminado = await eliminarSuperheroePorNombre(nombre);

        // Verificar si se encontró y eliminó al superhéroe
        if (!superheroeEliminado) {
            return res.status(404).json({ error: 'Superhéroe no encontrado' });
        }

        // Responder con el superhéroe eliminado si todo sale bien
        return res.status(200).json({ mensaje: 'Superhéroe eliminado con éxito', superheroe: superheroeEliminado });
    } catch (error) {
        console.error('Error al eliminar el superhéroe:', error);
        return res.status(500).json({ error: 'Error al eliminar el superhéroe' });
    }
}


// Eliminar un superhéroe por ID
export async function eliminarSuperheroeController(req, res) {
    const { id } = req.params;  // Obtén el ID del superhéroe desde la URL
    console.log(`Solicitud DELETE recibida para el ID: ${id}`);  // Imprime el ID en consola

    try {
        // Usa la función de servicio para eliminar el superhéroe
        const eliminado = await eliminarSuperheroePorId(id);

        if (!eliminado) {
            return res.status(404).json({ mensaje: 'Superhéroe no encontrado' });
        }

        // Redirige al dashboard después de eliminar el superhéroe
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error al eliminar el superhéroe:', error);
        res.status(500).send({ mensaje: 'Error al eliminar el superhéroe' });
    }
}



// Actualizar un superhéroe
export async function actualizarSuperheroeController(req, res) {
    const { id } = req.params;
    const data = req.body;

    try {
        const superHeroeActualizado = await SuperHero.findByIdAndUpdate(
            { _id: id },
            data,
            { new: true }
        );

        if (!superHeroeActualizado) {
            return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
        }

        res.status(200).json({ mensaje: "Actualización exitosa", superheroe: superHeroeActualizado });
    } catch (error) {
        res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
    }
}



export async function obtenerSuperHeroePorIdController(req, res) {
    let { id } = req.params;

    try {
        // Si el id es numérico, convertirlo a string para poder buscarlo
        if (!isNaN(id)) {
            // Buscar en la base de datos por el campo 'id' (no por el '_id')
            const superheroe = await SuperHero.findOne({ id: Number(id) });

            if (!superheroe) {
                return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
            }

            res.render('editSuperhero', { superheroe });
        } else if (mongoose.Types.ObjectId.isValid(id)) {
            // Si el id es un ObjectId válido
            const superheroe = await SuperHero.findById(id);  // Buscar por _id

            if (!superheroe) {
                return res.status(404).send({ mensaje: "Superhéroe no encontrado" });
            }

            res.render('editSuperhero', { superheroe });
        } else {
            // Si no es un id válido ni numérico ni un ObjectId
            return res.status(400).json({ mensaje: "ID no válido" });
        }
    } catch (error) {
        console.error('Error al obtener el superhéroe:', error);
        res.status(500).send({ mensaje: "Error al obtener los datos del superhéroe" });
    }
}






// Actualizar un superhéroe por ID en la base de datos
export async function editarSuperheroeController(req, res) {
    const { id } = req.params;
    const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;

    // Validación de datos
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errores: errors.array() });
    }

    try {
        // Actualizar el superhéroe en la base de datos usando _id
        const superHeroeActualizado = await SuperHero.findByIdAndUpdate(
            id,
            { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos },
            { new: true }  // Retorna el objeto actualizado
        );

        if (!superHeroeActualizado) {
            return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
        }

        // Redirigir al dashboard después de la actualización
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error al actualizar el superhéroe:', error);
        res.status(500).send({ mensaje: "Error al actualizar el superhéroe" });
    }
}





// Obtener todos los superhéroes y renderizar en dashboard
export async function obtenerTodosLosSuperHeroesController(req, res) {
    try {
        // Llamada a la función de servicio
        const superheroes = await obtenerTodosLosSuperHeroes();
        res.render('dashboard', { superheroes: superheroes });
    } catch (error) {
        console.error('Error al obtener los superhéroes:', error);
        res.status(500).send('Error al obtener los superhéroes');
    }
}

// Buscar superhéroes por atributo
export async function buscarSuperheroesPorAtributoController(req, res) {
    const { atributo, valor } = req.params;
    const superheroes = await buscarSuperHeroesPorAtributo(atributo, valor);

    if (superheroes.length > 0) {
        res.send(renderizarListaSuperheroes(superheroes));
    } else {
        res.status(404).send({ mensaje: "No se encontraron Superhéroes con ese atributo" });
    }
}

// Obtener superhéroes mayores de 30
export async function obtenerSuperHeroesMayoresDe30Controller(req, res) {
    const superheroes = await obtenerSuperHeroesMayoresDe30();
    res.send(renderizarListaSuperheroes(superheroes));
}

// Crear un nuevo superhéroe
export const crearSuperHeroeController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;

    try {
        const newSuperHero = new SuperHero({
            
            nombreSuperHeroe,
            nombreReal,
            edad,
            planetaOrigen,
            debilidad,
            poderes,
            aliados,
            enemigos,
        });

        await newSuperHero.save();

        return res.status(201).json({
            mensaje: 'Superhéroe creado con éxito',
            superheroe: newSuperHero,
        });
    } catch (error) {
        return res.status(500).json({ mensaje: 'Error al crear el superhéroe', error: error.message });
    }
}

// Agregar un nuevo superhéroe
export async function agregarSuperheroeController(req, res) {
    const { nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;
    console.log(req.body);  // Imprime los datos recibidos

    try {
        // Crear un nuevo superhéroe sin necesidad de un id
        const nuevoSuperHeroe = new SuperHero({
            nombreSuperHeroe,
            nombreReal,
            edad,
            planetaOrigen: planetaOrigen || 'Desconocido',
            debilidad,
            poderes: poderes ? poderes.split(',') : [],
            aliados: aliados ? aliados.split(',') : [],
            enemigos: enemigos ? enemigos.split(',') : [],
        });

        // Guardar el superhéroe en la base de datos
        await nuevoSuperHeroe.save();

        // Redirigir al dashboard para ver la lista actualizada
        res.redirect('/dashboard');
    } catch (error) {
        console.error('Error al agregar el superhéroe:', error);
        res.status(500).send('Error al agregar el superhéroe');
    }
}

