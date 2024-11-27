export function renderizarSuperHeroe(superheroe){
    
  return {
      "id": superheroe._id,
      "Nombre Super Heroe": superheroe.nombreSuperHeroe, 
      "Nombre Real": superheroe.nombreReal,
      Edad: superheroe.edad,
      "PlanetaOrigen": superheroe.planetaOrigen,
      Debilidad: superheroe.debilidad,
      Poderes: superheroe.poderes,
      Aliados: superheroe.aliados,
      Enemigos: superheroe.enemigos
  };
}

export function renderizarListaSuperheroes(superheroes){
  return superheroes.map(superheroe => renderizarSuperHeroe(superheroe));
}