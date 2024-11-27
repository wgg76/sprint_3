import mongoose from "mongoose";

const superheroeSchema = new mongoose.Schema({
    id: { type: Number, unique: true },
    nombreSuperHeroe: { type: String, required: true, index: true },
    nombreReal: { type: String, required: true },
    edad: { type: Number, min: 0 },
    planetaOrigen: { type: String, default: 'Desconocido' },
    debilidad: String,
    poderes: {
        type: [String],
        validate: {
            validator: function(poderes) {
                return poderes.every(poder => typeof poder === 'string' && poder.trim().length >= 3 && poder.trim().length <= 60);
            },
            message: 'Cada poder debe ser un string entre 3 y 60 caracteres.'
        },
        required: false
    },
    aliados: [String],
    enemigos: [String],
    creado: { type: String },
    createdAt: { type: Date, default: Date.now }
}, { collection: 'Grupo-07' });

const SuperHero = mongoose.models.SuperHero || mongoose.model('SuperHero', superheroeSchema);

export default SuperHero;

