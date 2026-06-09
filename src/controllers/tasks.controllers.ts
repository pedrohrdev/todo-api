import { taskService } from '../services/tasks.service';
import { Request, Response, } from 'express'
import { AppError } from "../errors/AppError";

export async function createTaskController(
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

export async function updateTaskController(
    req: Request<{ id: string }>,
    res: Response
) {

    const taskId = parseInt(req.params.id as string);
    const userId = req.user!.id;
    const fields = req.body;

    if(isNaN(taskId)) {
        return res.status(400).json(
            {
                message: "Invalid task id"
            }
        );
    }

    try {

        await taskService.updateTaskService(taskId, userId, fields);

        res.status(200).json(
            {
                message: "Task updated successfully!"
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

export async function getTasksController(
    req: Request,
    res: Response
) {

    const userId = req.user!.id;

    try {

        const tasks = await taskService.getTasksService(userId);

        res.status(200).json(tasks);

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
                message: `Cannot get tasks. error message: ${error}`
            }
        )
    }

}