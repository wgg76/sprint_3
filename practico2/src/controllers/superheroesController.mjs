    import { validationResult } from 'express-validator';
    
    import { obtenerSuperHeroePorId, obtenerTodosLosSuperHeroes, 
    buscarSuperHeroesPorAtributo, obtenerSuperHeroesMayoresDe30 } from '../services/superheroesService.mjs';

    import { renderizarSuperHeroe, renderizarListaSuperheroes } from '../views/responseView.mjs';

    import SuperHero from '../models/SuperHero.mjs';

    import SuperHeroRepository from '../repositories/SuperHeroRepository.mjs';

    import { eliminarSuperheroePorId } from '../services/superheroesService.mjs';

    import { eliminarSuperheroePorNombre } from '../services/superheroesService.mjs';

   

    export const mostrarFormularioAgregar = (req, res) => {
        res.render('addSuperhero'); // Renderiza el archivo addSuperhero.ejs
    };
      
        




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
    
    
    




    

    export async function eliminarSuperheroeController(req, res) {
        console.log('Entrando a eliminarSuperheroeController');
    
        // Verifica el parámetro recibido
        const { id } = req.params;
        console.log('ID recibido en req.params:', id);
    
        try {
            // Llama al servicio para eliminar al superhéroe
            const superHeroeEliminado = await eliminarSuperheroePorId(id);
            console.log('Resultado de eliminarSuperheroePorId:', superHeroeEliminado);
    
            // Verifica si se encontró y eliminó el superhéroe
            if (!superHeroeEliminado) {
                console.log('Superhéroe no encontrado con el ID:', id);
                return res.status(404).json({ error: 'Superhéroe no encontrado' });
            }
    
            console.log('Superhéroe eliminado con éxito:', superHeroeEliminado);
            return res.status(200).json({
                mensaje: 'Superhéroe eliminado con éxito',
                superheroe: superHeroeEliminado,
            });
        } catch (error) {
            // Captura y registra cualquier error
            console.error('Error al eliminar el superhéroe:', error);
            return res.status(500).json({ error: 'Error al eliminar el superhéroe' });
        }
    }
    
















    export async function actualizarSuperheroeController(req, res) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errores: errors.array() });
        }
    
        const { id } = req.params;
        const data = req.body;
    
        try {
            const superHeroeActualizado = await SuperHeroRepository.actualizarSuperheroe(id, data);
    
            if (!superHeroeActualizado) {
                return res.status(404).json({ mensaje: "Superhéroe no encontrado" });
            }
    
            res.status(200).json({ mensaje: "Actualización exitosa", superheroe: superHeroeActualizado });
        } catch (error) {
            res.status(500).json({ mensaje: "Error interno del servidor", error: error.message });
        }
    }



  


export async function obtenerSuperHeroePorIdController(req, res){
    const { id } = req.params;
    const superheroe = await obtenerSuperHeroePorId(id);
    
    if(superheroe){
        res.send(renderizarSuperHeroe(superheroe));
    }
    else{
        res.status(404).send({mensaje: "Superheroe no encontrado"});
    }
}

export async function obtenerTodosLosSuperHeroesController(req, res){
    const superheroes = await obtenerTodosLosSuperHeroes();

     // Renderiza y formatea la lista de superhéroes
    const listaRenderizada = renderizarListaSuperheroes(superheroes);
    // Envía la respuesta como JSON
    res.json(listaRenderizada);
}

export async function buscarSuperheroesPorAtributoController(req, res){
    const {atributo, valor} = req.params;
    const superheroes = await buscarSuperHeroesPorAtributo(atributo, valor);

    if(superheroes.length > 0){
        res.send(renderizarListaSuperheroes(superheroes));
    }
    else{
        res.status(404).send({mensaje: "No se encontraron Superheroes con ese atributo"});
    }
}

export async function obtenerSuperHeroesMayoresDe30Controller(req, res){
    const superheroes = await obtenerSuperHeroesMayoresDe30();
    res.send(renderizarListaSuperheroes(superheroes));


}

export const crearSuperHeroeController = async (req, res) => {
    // Verificamos si hay errores de validación
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });  // Si hay errores, los mostramos
    }
  
    const { id, nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;
  
    try {
      // Creamos el nuevo superhéroe con los datos recibidos
      const newSuperHero = new SuperHero({
        id,
        nombreSuperHeroe,
        nombreReal,
        edad,
        planetaOrigen,
        debilidad,
        poderes,
        aliados,
        enemigos,
      });
  
      // Guardamos el superhéroe en la base de datos
      await newSuperHero.save();
  
      // Respondemos con el superhéroe creado
      return res.status(201).json({
        mensaje: 'Superhéroe creado con éxito',
        superheroe: newSuperHero,
      });
    } catch (error) {
      // Si ocurre un error en la creación
      return res.status(500).json({ mensaje: 'Error al crear el superhéroe', error: error.message });
    }
  };