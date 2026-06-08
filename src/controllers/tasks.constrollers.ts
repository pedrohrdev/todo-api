import { taskService } from '../services/tasks.service';
import { Request, Response, } from 'express'
import { AppError } from "../errors/AppError";

async function createTaskController(
    req: Request,
    res: Response
) {

    const { title, description, type_task, status } = req.body;
    const userId = req.user.id; 

    try {

        await taskService.createTaskService(userId, { title, description, type_task, status });

        res.status(201).json(
            {
                message: "Task created successfully!"
            }
        )

    } catch(error) {

        if(error instanceof AppError) {

            return res.status(error.statusCode).json(
                {
                    message: error.message
                }
            );

        }

        return res.status(500).json(
            {
                message: `Cannot create task. error message: ${error}`
            }
        )          

    }

}