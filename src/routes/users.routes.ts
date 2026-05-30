// users.routes.ts
import express from 'express';
import { createUser, loginUser } from '../controllers/users.controllers';
import { validateCreateUser } from '../middleware/users.middleware';

const router = express.Router();

router.post('/register', validateCreateUser, createUser);  // POST /users/register
router.post('/login', loginUser);       // POST /users/login

export default router;