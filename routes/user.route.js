import express from 'express';
import { getUserById } from '../controllers/user.controller.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/:id', auth, getUserById);

export default router;
