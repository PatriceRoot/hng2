import express from 'express';
import { getUserById } from '../controllers/user.controller.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

router.get('/users/:id', authenticateToken, getUserById);

export default router;
