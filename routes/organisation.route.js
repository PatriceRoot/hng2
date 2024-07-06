import express from 'express';
import { body } from 'express-validator';
import { authenticateToken } from '../middleware/auth.js';
import { getOrganisations, getOrganisationById, createOrganisation, addUserToOrganisation } from '../controllers/organisation.controller.js';

const router = express.Router();

router.get('/organisations', authenticateToken, getOrganisations);

router.get('/organisations/:orgId', authenticateToken, getOrganisationById);

router.post('/organisations', [
  authenticateToken,
  body('name').notEmpty().withMessage('Name is required')
], createOrganisation);

router.post('/organisations/:orgId/users', [
  authenticateToken,
  body('userId').notEmpty().withMessage('User ID is required')
], addUserToOrganisation);

export default router;
