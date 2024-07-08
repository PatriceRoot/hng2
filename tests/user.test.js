import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import userRoutes from '../routes/user.route.js';
import authRoutes from '../routes/auth.route.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/api', userRoutes);

let accessToken;
let userId;

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;

  const res = await request(app)
    .post('/auth/register')
    .send({
      firstName: 'John',
      lastName: 'Smith',
      email: 'john.smith@example.com',
      password: 'password123',
      phone: '1231231234'
    });

  accessToken = res.body.data.accessToken;
  userId = res.body.data.user.userId;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('User Endpoints', () => {
  it('should get user details for the logged in user', async () => {
    const res = await request(app)
      .get(`/api/users/${userId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body.data).toHaveProperty('email', 'john.smith@example.com');
  });
});
