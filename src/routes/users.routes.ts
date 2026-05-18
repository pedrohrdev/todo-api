// users.routes.ts
import express from 'express';
import { createUser, loginUser } from '../controllers/users.controllers';

const router = express.Router();

router.post('/register', createUser);  // POST /users/register
router.post('/login', loginUser);       // POST /users/login

export default router;