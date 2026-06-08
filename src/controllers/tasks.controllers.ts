import { taskService } from '../services/tasks.service';
import { Request, Response, } from 'express'
import { AppError } from "../errors/AppError";

async function createTaskController(
    req: Request,
    res: Response
) {

    const userId = req.user!.id; 
    const fields = req.body;

    try {

        await taskService.createTaskService(userId, fields);

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