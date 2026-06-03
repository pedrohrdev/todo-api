import { supabase } from '../lib/supabase';

async function createTask(
    userId: number,
    title: string,
    description: string | undefined,
    type_task: string,
    status: string
) {

    const { data, error } = await supabase
        .from('tasks')
        .insert(
            [
                {
                    user_id: userId,
                    title,
                    description,
                    type_task,
                    status
                }
            ]
        )
        .select()
        .single();

    return { data, error };

}
