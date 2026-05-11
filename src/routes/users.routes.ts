import express from 'express';
import { supabase } from '../lib/supabase';

import { createUser } from '../controllers/users.controllers';

// Create a new router instance
const router = express.Router();

// Route to create a new user
router.post('/users', createUser);

export default router;