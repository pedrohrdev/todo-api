import express from 'express';

import { createUser } from '../controllers/users.controllers';
import { loginUser } from '../controllers/users.controllers';

// Create a new router instance
const router = express.Router();

// Route to create a new user
router.post('/', createUser);

// Route to login a user
router.post('/', loginUser)

export default router;