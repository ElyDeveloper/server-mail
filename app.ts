import express from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import routes from './router/routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware para analizar el cuerpo de las solicitudes
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Usar las rutas definidas en routes.ts
app.use('/', routes);

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
