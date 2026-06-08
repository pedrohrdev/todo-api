import { tasksRepository } from '../repository/tasks.repository';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/tasks.schema';

async function createTaskService(
    userId: number,
    fields: CreateTaskInput
) {

    return tasksRepository.createTask(userId, fields);

};

async function updateTaskService(
    id: number,
    fields: UpdateTaskInput
) {

    return tasksRepository.updateTask(id, fields);

};

export const taskService = { createTaskService, updateTaskService }