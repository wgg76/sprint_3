import SuperHero from '../models/SuperHero.mjs';
import IRepository from './IRepository.mjs';

class SuperHeroRepository extends IRepository {



    async eliminarSuperheroePorNombre(nombre) {
        try {
            return await SuperHero.findOneAndDelete({ nombreSuperHeroe: new RegExp(`^${nombre}$`, 'i') });
        } catch (error) {
            console.error('Error al eliminar el superhéroe por nombre:', error);
            throw new Error('Error al eliminar el superhéroe');
        }
    }
    





    async eliminarSuperheroe(id) {
        try {
            const superHeroeEliminado = await SuperHero.findOneAndDelete({ id: Number(id) });
            return superHeroeEliminado;
        } catch (error) {
            console.error('Error al eliminar el superhéroe:', error);
            throw new Error('Error al eliminar el superhéroe');
        }
    }
    




    async actualizarSuperheroe(id, data) {
        try {
          console.log('ID:', id);
          console.log('Datos para actualizar:', data);
      
          // Verifica si la edad está en los datos y es válida
          if (data.edad && typeof data.edad === 'number') {
            console.log('Edad válida recibida:', data.edad);
          } else {
            console.log('No se recibió una edad válida.');
          }
      
          const actualizado = await SuperHero.findOneAndUpdate(
            { id: Number(id) },  // Buscar por el campo 'id'
            data,  // Los datos para actualizar
            { new: true }
          );
      
          if (!actualizado) {
            throw new Error('Superhéroe no encontrado');
          }
      
          console.log('Resultado de actualización:', actualizado);
          return actualizado;
        } catch (error) {
          console.error('Error al actualizar el superhéroe:', error);
          throw new Error('Error al actualizar el superhéroe');
        }
      }
      
      
    
    



    async obtenerId(id) {
        try {
            const superHero = await SuperHero.findOne({ id: Number(id) });
            
            if (!superHero) {
                console.log('Superhéroe no encontrado.');
                return { message: 'Superhéroe no encontrado' };
            }
            
            return superHero;
        } catch (error) {
            console.error('Error al obtener el superhéroe por ID:', error);
            throw new Error('Error al obtener el superhéroe');
        }
    }

    obtenerTodos() {
        try {
            return SuperHero.find({});
        } catch (error) {
            console.error('Error al obtener todos los superhéroes:', error);
            throw new Error('Error al obtener los superhéroes');
        }
    }

    buscarPorAtributo(atributo, valor) {
        try {
            let query;
            
            // Verifica si el valor es un número o una cadena
            if (!isNaN(valor)) {
                // Si es un número, realiza una búsqueda exacta
                query = { [atributo]: Number(valor) };
            } else {
                // Si es una cadena, aplica una expresión regular para búsqueda insensible a mayúsculas
                query = { [atributo]: new RegExp(valor, 'i') };
            }
            
            return SuperHero.find(query);
        } catch (error) {
            console.error('Error al buscar superhéroes por atributo:', error);
            throw new Error('Error en la búsqueda de superhéroes');
        }
    }

    async obtenerMayoresDe30() {
        return await SuperHero.find({
            edad: { $gt: 30 },
            planetaOrigen: 'Tierra',
            $expr: { $gte: [{ $size: "$poderes" }, 2] },
            
        });    






}
 
 }




export default new SuperHeroRepository();

