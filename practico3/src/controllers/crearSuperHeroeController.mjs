import SuperHero from '../models/SuperHero.mjs'; // Asegúrate de que la ruta sea correcta

export const actualizarSuperheroe = async (id, data) => {
    try {
      const superheroeActualizado = await SuperHero.findByIdAndUpdate(id, data, { new: true });
      return superheroeActualizado;
    } catch (error) {
      throw new Error('Error al actualizar el superhéroe');
    }
  };








// Controlador para crear un nuevo superhéroe
export const crearSuperHeroeController = async (req, res) => {
    const { id, nombreSuperHeroe, nombreReal, edad, planetaOrigen, debilidad, poderes, aliados, enemigos } = req.body;

    // Validación básica
    if (!id || !nombreSuperHeroe || !nombreReal) {
        return res.status(400).json({ error: 'Faltan datos requeridos: id, nombreSuperHeroe y nombreReal son obligatorios.' });
    }

    try {
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
        await newSuperHero.save();
        return res.status(201).json(newSuperHero);
    } catch (error) {
        return res.status(500).json({ error: 'Error al crear el superhéroe' });
    }
};