import express from 'express';
import dotenv from 'dotenv';
import { supabase } from './lib/supabase';

import usersRouter from './routes/users.routes';

dotenv.config();

const app = express();
app.use(express.json());

app.use('users', usersRouter);

// Conection test
app.get('/health', async (req, res): Promise<void> => {

    const { data, error } = await supabase.from('users').select('*', { count: 'exact', head: true});
    
    if(error) {

        res.status(500).json(
            {
                error: error.message
            }
        )

        return

    };

    res.json(
        {
            ok: true, data
        }
    );

});

// Search for all active tasks
app.get('/tasks', async (req, res): Promise<void> => {

    const { data, error } = await supabase
        .from('tasks')
        .select('*, users(email)')
        .eq('is_active', true);

        if(error) {
            res.status(500).json(
                {
                    error: error.message
                }
            )

            return
        };

        res.json(data)

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`)

});