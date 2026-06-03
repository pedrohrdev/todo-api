import { z } from 'zod';

export const createTaskSchema = z.object(
    {

        title: z.
            string()
            .min(3, 'Title must be at least 3 characters long.')
            .max(100, 'Title must be a maximum of 100 characters long.'),

        description: z.
            string()
            .max(500, 'Description must be a maximum of 500 characters.')
            .optional(),

        type_task: z
            .enum(
                ['daily', 'weekly', 'monthly', 'yearly']
            )
            .default('daily'),

        status: z
            .enum(
                ['pending', 'in_progress', 'done']
            )
            .default('pending')
    }
)

export const updateTaskSchema = createTaskSchema.partial();
