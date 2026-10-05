const express = require('express');
const { pool } = require('./db');

const router = express.Router();

// GET /tareas - Listar todas las tareas
router.get('/tareas', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tareas ORDER BY id ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /tareas - Crear una tarea
router.post('/tareas', async (req, res) => {
  const { titulo } = req.body;
  if (!titulo) {
    return res.status(400).json({ error: 'El campo "titulo" es obligatorio' });
  }
  try {
    const result = await pool.query(
      'INSERT INTO tareas (titulo) VALUES ($1) RETURNING *',
      [titulo]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /tareas/:id - Marcar como completada
router.put('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      'UPDATE tareas SET completada = NOT completada WHERE id = $1 RETURNING *',
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /tareas/:id - Eliminar una tarea
router.delete('/tareas/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('DELETE FROM tareas WHERE id = $1 RETURNING *', [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ error: 'Tarea no encontrada' });
    }
    res.json({ mensaje: 'Tarea eliminada', tarea: result.rows[0] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /health - Healthcheck
router.get('/health', (req, res) => {
  res.json({ status: 'ok', version: process.env.APP_VERSION || 'v1.0.0' });
});

module.exports = router;