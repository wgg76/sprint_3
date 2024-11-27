import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


connectDB();


app.use('/api', superHeroRoutes);


app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});