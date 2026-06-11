import express from 'express';
import dotenv from 'dotenv';
import { supabase } from './lib/supabase';

import usersRouter from './routes/users.routes';
import tasksRouter from './routes/tasks.routes';
import { AppError } from './errors/AppError';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    if (err instanceof AppError) {
        return res.status(err.statusCode).json({ message: err.message });
    }
    return res.status(500).json({ message: 'Internal server error' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(`Servidor rodando na porta ${PORT}`)

});