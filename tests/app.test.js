const request = require('supertest');
const app = require('../app/index');

// Mock de la base de datos para pruebas sin PostgreSQL real
jest.mock('../app/db', () => {
  const mockQuery = jest.fn();
  return {
    pool: { query: mockQuery },
    initDb: jest.fn().mockResolvedValue(),
  };
});

const { pool } = require('../app/db');

describe('API Lista de Tareas', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /health responde con status ok', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('GET /tareas devuelve un array', async () => {
    pool.query.mockResolvedValueOnce({ rows: [] });
    const res = await request(app).get('/tareas');
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('POST /tareas sin titulo devuelve 400', async () => {
    const res = await request(app).post('/tareas').send({});
    expect(res.statusCode).toBe(400);
  });

  test('POST /tareas con titulo devuelve 201', async () => {
    pool.query.mockResolvedValueOnce({
      rows: [{ id: 1, titulo: 'Comprar pan', completada: false }],
    });
    const res = await request(app).post('/tareas').send({ titulo: 'Comprar pan' });
    expect(res.statusCode).toBe(201);
    expect(res.body.titulo).toBe('Comprar pan');
  });

  test('DELETE /tareas/:id devuelve 404 si no existe', async () => {
    pool.query.mockResolvedValueOnce({ rowCount: 0, rows: [] });
    const res = await request(app).delete('/tareas/999');
    expect(res.statusCode).toBe(404);
  });
});