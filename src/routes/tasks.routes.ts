import express from 'express';
import { 
    createTaskController,
    updateTaskController,
    getTasksController,
    getTaskByIdController,
    deleteTaskController
} from '../controllers/tasks.controllers';
import { createTaskSchema, updateTaskSchema } from '../schemas/tasks.schema';

import { authMiddleware } from '../middleware/auth.middleware';
import { validate } from '../validators/validate';

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

// GET /tasks/:id
router.get(
    '/:id',
    authMiddleware,
    getTaskByIdController
)

// DELETE /tasks/:id
router.delete(
    '/:id',
    authMiddleware,
    deleteTaskController
)

export default router;