import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";
import SuperHero from '../models/SuperHero.mjs';




export async function obtenerSuperHeroePorId(id){
    return await SuperHeroRepository.obtenerId(id);
}

//export async function obtenerTodosLosSuperHeroes() {
//    return await SuperHeroRepository.obtenerTodos();
//}

export async function buscarSuperHeroesPorAtributo(atributo, valor){
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperHeroesMayoresDe30(){
    return await SuperHeroRepository.obtenerMayoresDe30();
}

export async function eliminarSuperheroePorId(id) {
    try {
        // Intenta eliminar el superhéroe por ID
        const eliminado = await SuperHero.findByIdAndDelete(id);
        return eliminado; // Devuelve el superhéroe eliminado o null si no se encuentra
    } catch (error) {
        throw new Error('Error al eliminar el superhéroe');
    }
}


export async function eliminarSuperheroePorNombre(nombreSuperHeroe) {
    return await SuperHeroRepository.eliminarSuperheroePorNombre(nombreSuperHeroe);
}



export async function obtenerTodosLosSuperHeroes() {
    try {
        // Obtiene todos los superhéroes desde la base de datos
        return await SuperHero.find();
    } catch (error) {
        console.error('Error al obtener todos los superhéroes:', error);
        throw error; // Relanzar el error para manejarlo en el controlador
    }
}





