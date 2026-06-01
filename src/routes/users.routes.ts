// users.routes.ts
import express from 'express';
import { createUser,loginUser } from '../controllers/users.controllers';
import { validate } from '../validators/validate';
import { createUserSchema } from '../schemas/users.schema';

const router = express.Router();

// POST /users/register
router.post(
    '/register',
    validate(createUserSchema),
    createUser

); 

// POST /users/login
router.post('/login', loginUser);

export default router;