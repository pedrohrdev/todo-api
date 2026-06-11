import { tasksService } from '../services/tasks.service';
import { Request, Response, } from 'express'
import { AppError } from "../errors/AppError";
import { assertAuthenticated } from '../middleware/auth-assertion.middleware';

export async function createTaskController(
    req: Request,
    res: Response
) {

    assertAuthenticated(req);

    const userId = req.user.id; 
    const fields = req.body;

    try {

        await tasksService.createTask(userId, fields);

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
    req: Request,
    res: Response
) {

    assertAuthenticated(req);

    const taskId = parseInt(req.params.id as string);
    const userId = req.user.id;
    const fields = req.body;

    if(isNaN(taskId)) {
        return res.status(400).json(
            {
                message: "Invalid task id"
            }
        );
    }

    try {

        await tasksService.updateTask(taskId, userId, fields);

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
                message: `Cannot update task. error message: ${error}`
            }
        )           

    }

}

export async function getTasksController(
    req: Request,
    res: Response
) {

    assertAuthenticated(req);

    const userId = req.user.id;

    try {

        const tasks = await tasksService.getTasks(userId);

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

export async function getTaskByIdController(
    req: Request,
    res: Response
) {

    assertAuthenticated(req);

    const taskId = parseInt(req.params.id as string);
    const userId = req.user.id;

    if(isNaN(taskId)) {
        return res.status(400).json(
            {
                message: "Invalid task id"
            }
        );
    }

    try {

        const task = await tasksService.getTaskById(taskId, userId);
        
        res.status(200).json(task);

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
                message: `Cannot get task. error message: ${error}`
            }
        )
    }

}

export async function deleteTaskController(
    req: Request,
    res: Response
) {

    assertAuthenticated(req);

    const taskId = parseInt(req.params.id as string);
    const userId = req.user.id;
    
    if(isNaN(taskId)) {
        return res.status(400).json(
            {
                message: "Invalid task id"
            }
        );
    }

    try {

        await tasksService.deleteTask(taskId, userId);

        res.status(200).json(
            {
                message: "Task deleted successfully!"
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
                message: `Cannot delete task. error message: ${error}`
            }
        )
    }

}