import { supabase } from '../lib/supabase';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/tasks.schema';
import { AppError } from '../errors/AppError';

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

    if(error) throw new AppError(error.message, 400);    

    if(!data) throw new AppError("Failed to create task", 500);

    return data;

}

async function updateTask(
    id: number,
    userId: number,
    fields: UpdateTaskInput

) {

    const { data, error } = await supabase
        .from('tasks')
        .update(fields)
        .eq('id', id)
        .eq('user_id', userId)
        .select()
        .single();

    if(error) throw new AppError(error.message, 400);

    if(!data) throw new AppError("Task not found", 404); // ← adiciona

    return data;
}

async function getTasks(userId: number) {

    const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', userId);

    if(error) throw new AppError(error.message, 400);

    return data ?? [];

}

export const tasksRepository = { createTask, updateTask, getTasks}