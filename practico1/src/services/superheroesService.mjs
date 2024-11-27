import SuperHeroRepository from "../repositories/SuperHeroRepository.mjs";

export async function obtenerSuperHeroePorId($id){
    return await SuperHeroRepository.obtenerId($id);
}

export async function obtenerTodosLosSuperHeroes() {
    return await SuperHeroRepository.obtenerTodos();
}

export async function buscarSuperHeroesPorAtributo(atributo, valor){
    return await SuperHeroRepository.buscarPorAtributo(atributo, valor);
}

export async function obtenerSuperHeroesMayoresDe30(){
    return await SuperHeroRepository.obtenerMayoresDe30();
}

export async function eliminarSuperheroePorId(id) {
    return await SuperHeroRepository.eliminarSuperheroe(id);
}

export async function eliminarSuperheroePorNombre(nombreSuperHeroe) {
    return await SuperHeroRepository.eliminarSuperheroePorNombre(nombreSuperHeroe);
}

