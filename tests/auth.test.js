import request from 'supertest';
import app from '../index.js';

let server;

beforeAll(() => {
  process.env.PORT = 5001; // Use a different port for testing
  server = require('../index'); // Start the server
});

afterAll(done => {
  server.close(done); // Close the server after tests
});

test('should respond with a status code of 200', async () => {
  const response = await request(server).get('/some-endpoint');
  expect(response.statusCode).toBe(200);
});


describe('Auth Endpoints', () => {
  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password123',
        phone: '1234567890'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('data');
  });

  it('should login an existing user', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
