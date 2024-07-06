import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser } from '../controllers/auth.controller.js';

const router = express.Router();

router.post('/register', [
  body('firstName').notEmpty().withMessage('First name is required'),
  body('lastName').notEmpty().withMessage('Last name is required'),
  body('email').isEmail().withMessage('Email is invalid').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required')
], registerUser);

router.post('/login', [
  body('email').isEmail().withMessage('Email is invalid').notEmpty().withMessage('Email is required'),
  body('password').notEmpty().withMessage('Password is required')
], loginUser);

export default router;
