import express from 'express';
import { getAllOrganisations, getOrganisationById } from '../controllers/organisation.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', auth, getAllOrganisations);
router.get('/:orgId', auth, getOrganisationById);

export default router;
