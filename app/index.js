require('dotenv').config();
const express = require('express');
const routes = require('./routes');
const { initDb } = require('./db');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/', routes);

// Página raíz simple
app.get('/', (req, res) => {
  res.send('<h1>Lista de Tareas Simple</h1><p>API disponible en /tareas</p>');
});

// Iniciar servidor solo si no estamos en modo test
if (process.env.NODE_ENV !== 'test') {
  initDb()
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Servidor escuchando en puerto ${PORT}`);
      });
    })
    .catch((err) => {
      console.error('Error al inicializar la base de datos:', err);
      process.exit(1);
    });
}

module.exports = app;