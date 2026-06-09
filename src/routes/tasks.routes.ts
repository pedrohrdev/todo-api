import express from 'express';
import { createTaskController } from '../controllers/tasks.controllers';
import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../validators/validate';
import { createTaskSchema, updateTaskSchema } from '../schemas/tasks.schema';

const router = express.Router();

// POST /tasks
router.post(
    '/',
    authMiddleware,
    validate(createTaskSchema),
    createTaskController
);

export default router;