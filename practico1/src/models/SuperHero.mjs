import mongoose from "mongoose";

const superheroeSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    nombreSuperHeroe: { type: String, required: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    // Validación de poderes
    poderes: {
        type: [String],
        validate: {
            validator: function(poderes) {
                // Validación: poderes debe ser un array no vacío, con strings sin espacios y longitud entre 3 y 60
                if (!Array.isArray(poderes)) return false;
                return poderes.every(poder => 
                    typeof poder === 'string' &&
                    poder.trim().length >= 3 &&
                    poder.trim().length <= 60 &&
                    !/\s/.test(poder) // Asegurarse que no tenga espacios en blanco
                );
            },
            message: 'Los poderes deben ser un array de strings, sin espacios en blanco, con longitud entre 3 y 60 caracteres.'
        },
        required: true
    },
    aliados: [String],
    enemigos: [String],
    creado: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-07' });

const SuperHero = mongoose.models.SuperHero || mongoose.model('SuperHero', superheroeSchema);

export default SuperHero;
