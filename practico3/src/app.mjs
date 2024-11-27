import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';  // Importar esta función de Node.js para convertir URL a path
import { connectDB } from './config/dbConfig.mjs';
import superHeroRoutes from './routes/superHeroRoutes.mjs';  // Importa las rutas de superhéroes
import { obtenerTodosLosSuperHeroesController } from './controllers/superheroesController.mjs';
import methodOverride from 'method-override';


dotenv.config(); // Cargar variables de entorno

const app = express();

// Obtener la ruta base donde estarán las vistas
const __filename = fileURLToPath(import.meta.url);  // Convertir URL a path
const __dirname = path.dirname(__filename);  // Obtener el directorio base

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));  // Carpeta donde estarán tus vistas

// Configurar la carpeta estática
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para procesar formularios (debe ir primero para procesar los datos enviados)
app.use(express.urlencoded({ extended: true })); // Procesar formularios


// Middleware para sobrescribir métodos HTTP desde query string (_method)
app.use(methodOverride((req, res) => {
    if (req.query && typeof req.query._method === 'string') {
        console.log('Middleware _method encontrado en query string:', req.query._method); // Log adicional
        return req.query._method;
        }

    if (req.body && typeof req.body._method === 'string') {
            console.log('Middleware _method detectado en el cuerpo:', req.body._method);
            return req.body._method;
    }
    return null;
}));


// Middleware para registrar el método sobrescrito (para depuración)
app.use((req, res, next) => {
    console.log('Middleware _method:', req.body._method);
    next();
});

// Middleware para procesar solicitudes JSON
app.use(express.json());

// Middleware para registrar las solicitudes
app.use((req, res, next) => {
    console.log(`Solicitud: ${req.method} ${req.url}`);
    next();
});

// Conectar a la base de datos y manejar errores de conexión
connectDB().catch(err => {
    console.error('Error al conectar a la base de datos:', err);
    process.exit(1);  // Detiene el servidor si hay un error con la base de datos
});


// Rutas de superhéroes (debe estar aquí, después de las configuraciones)
app.use(superHeroRoutes);  // Aquí activamos las rutas de superhéroes

// Ruta para mostrar el dashboard con la lista de superhéroes
app.get('/dashboard', obtenerTodosLosSuperHeroesController);  // Usamos esta ruta para mostrar todos los superhéroes

// Ruta para manejar errores 404 (en caso de que la ruta no exista)
app.use((req, res) => {
    res.status(404).render('404', { mensaje: "Ruta no encontrada" }); // Renderiza una página de error personalizada
});

// Configuración del puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
