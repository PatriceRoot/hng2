import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import authRoutes from '../routes/auth.route.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);

beforeAll(async () => {
  // Optionally, you can set up a test database or prepare the existing one.
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Auth Endpoints', () => {
  it('should register a user successfully', async () => {
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
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data.user).toHaveProperty('email', 'john.doe@example.com');
  });

  it('should fail to register a user with missing fields', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        firstName: 'John',
        email: 'john.doe@example.com',
        password: 'password123',
      });

    expect(res.statusCode).toEqual(422);
    expect(res.body).toHaveProperty('errors');
    expect(res.body.errors[0]).toHaveProperty('field', 'lastName');
  });

  it('should log in a user successfully', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'password123'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body.data).toHaveProperty('accessToken');
    expect(res.body.data.user).toHaveProperty('email', 'john.doe@example.com');
  });

  it('should fail to log in with incorrect credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'john.doe@example.com',
        password: 'wrongpassword'
      });

    expect(res.statusCode).toEqual(401);
    expect(res.body).toHaveProperty('status', 'Bad request');
  });
});
