import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';


dotenv.config();


const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());


connectDB();

// Configuración de EJS como motor de vistas
app.set('view engine', 'ejs');
app.set('views', './views'); // Carpeta donde están las vistas

// Asegúrate de que tu aplicación pueda manejar formularios
app.use(express.urlencoded({ extended: true }));


app.use('/api', superHeroRoutes);


app.use((req, res) => {
    res.status(404).send({ mensaje: "Ruta no encontrada" });
});


app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});