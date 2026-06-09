import express from 'express';
import { createTaskController, updateTaskController, getTasksController } from '../controllers/tasks.controllers';
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

// PUT /tasks/:id
router.put(
    '/:id',
    authMiddleware,
    validate(updateTaskSchema),
    updateTaskController
)

// GET /tasks
router.get(
    '/',
    authMiddleware,
    getTasksController
)

export default router;