import request from 'supertest';
import app from '../index.js';

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
