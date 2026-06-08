import { supabase } from '../lib/supabase';
import { createTaskSchema, updateTaskSchema } from '../schemas/tasks.schema';
import { z } from 'zod';

type CreateTaskInput = z.infer<typeof updateTaskSchema>;
type UpdateTaskInput = z.infer<typeof updateTaskSchema>;

async function createTask(
    userId: number,
    fields: CreateTaskInput
) {

    const { data, error } = await supabase
        .from('tasks')
        .insert(
            [
                {
                    user_id: userId,
                    ...fields
                }
            ]
        )
        .select()
        .single();

    return { data, error };

}

async function updateTask(
    id: number,
    fields: UpdateTaskInput
) {

    const { data, error } = await supabase
        .from('tasks')
        .update(fields)
        .eq('id', id)
        .select()
        .single();

    return { data, error };
}

export const tasksRepository = { createTask, updateTask}