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


describe('Organisation Endpoints', () => {
  it('should fetch all organisations for a user', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });
    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .get('/api/organisations')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });

  it('should fetch an organisation by ID', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });
    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .get('/api/organisations/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
