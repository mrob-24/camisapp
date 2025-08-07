import { connect } from 'mongoose';
import express, { json } from 'express';
const app = express();
import path from 'path';
import routes from './rutas/rutasUsuario.js';
import routesCamiseta from './rutas/camisaRutas.js';
import verificarToken from './seguridad/auth.js';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a MongoDB
const mongoURI = 'mongodb+srv://2022184:132@cluster0.sz0btgr.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true
};

connect(mongoURI, options)
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error de conexión:', err));

// Middleware
app.use(json());
app.use('/api/usuarios', routes);
app.use('/api/camisetas', routesCamiseta);


// Rutas
app.get('/camisa', verificarToken, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'camisa.html'));
});

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/registro', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'registro.html'));
});

app.get('/carrusel', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'carrusel.html'));
});

// Puerto
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Servidor API escuchando en http://localhost:', PORT);
});
