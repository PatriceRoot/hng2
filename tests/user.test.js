import request from 'supertest';
import app from '../index.js';

describe('User Endpoints', () => {
  it('should fetch a user by ID', async () => {
    const loginRes = await request(app)
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });
    const token = loginRes.body.data.accessToken;

    const res = await request(app)
      .get('/api/users/1')
      .set('Authorization', `Bearer ${token}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('data');
  });
});
