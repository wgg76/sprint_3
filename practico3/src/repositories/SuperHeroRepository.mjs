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
            const superHeroeEliminado = await SuperHero.findOneAndDelete({ _id: id });
            return superHeroeEliminado;
        } catch (error) {
            console.error('Error al eliminar el superhéroe:', error);
            throw new Error('Error al eliminar el superhéroe');
        }
    }
    




    async actualizarSuperheroe(id, data) {
        try {
            console.log('ID recibido:', id);
            console.log('Datos para actualizar:', data);
    
            // Validar la edad si está presente en los datos
            if (data.edad !== undefined) {
                if (!Number.isInteger(data.edad) || data.edad < 0) {
                    throw new Error('La edad debe ser un número entero positivo.');
                }
                console.log('Edad válida:', data.edad);
            }
    
            // Realizar la actualización en la base de datos
            const actualizado = await SuperHero.findOneAndUpdate(
                { _id:id },  // Buscar por 'id' numérico
                data,  // Los datos para actualizar
                { new: true }  // Retornar el documento actualizado
            );
    
            if (!actualizado) {
                throw new Error('Superhéroe no encontrado');
            }
    
            console.log('Resultado de la actualización:', actualizado);
            return actualizado;
        } catch (error) {
            console.error('Error al actualizar el superhéroe:', error.message);
            throw new Error('Error al actualizar el superhéroe');
        }
    }
    
      
      
    
    



    async obtenerId(id) {
        try {
            const superHero = await SuperHero.findOne({ _id: id });
            
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

