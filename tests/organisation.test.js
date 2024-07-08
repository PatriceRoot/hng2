import request from 'supertest';
import express from 'express';
import bodyParser from 'body-parser';
import organisationRoutes from '../routes/organisation.route.js';
import authRoutes from '../routes/auth.route.js';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const app = express();

app.use(bodyParser.json());
app.use('/auth', authRoutes);
app.use('/api', organisationRoutes);

let accessToken;
let orgId;

beforeAll(async () => {
  await prisma.$executeRaw`TRUNCATE TABLE "Organisation" CASCADE;`;
  await prisma.$executeRaw`TRUNCATE TABLE "User" CASCADE;`;

  const res = await request(app)
    .post('/auth/register')
    .send({
      firstName: 'Jane',
      lastName: 'Doe',
      email: 'jane.doe@example.com',
      password: 'password123',
      phone: '0987654321'
    });

  accessToken = res.body.data.accessToken;
  orgId = res.body.data.user.organisations[0].orgId;
});

afterAll(async () => {
  await prisma.$disconnect();
});

describe('Organisation Endpoints', () => {
  it('should get all organisations for the logged in user', async () => {
    const res = await request(app)
      .get('/api/organisations')
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body.data.organisations).toHaveLength(1);
    expect(res.body.data.organisations[0]).toHaveProperty('name', "Jane's Organisation");
  });

  it('should get a single organisation by id', async () => {
    const res = await request(app)
      .get(`/api/organisations/${orgId}`)
      .set('Authorization', `Bearer ${accessToken}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body.data).toHaveProperty('name', "Jane's Organisation");
  });

  it('should create a new organisation', async () => {
    const res = await request(app)
      .post('/api/organisations')
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        name: 'New Organisation',
        description: 'Description for new organisation'
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty('status', 'success');
    expect(res.body.data).toHaveProperty('name', 'New Organisation');
  });

  it('should add a user to an organisation', async () => {
    const res = await request(app)
      .post(`/api/organisations/${orgId}/users`)
      .set('Authorization', `Bearer ${accessToken}`)
      .send({
        userId: 1
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'success');
  });
});
