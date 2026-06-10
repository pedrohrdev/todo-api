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
    userId: number,
    fields: UpdateTaskInput
) {

    return tasksRepository.updateTask(id, userId, fields);

};

async function getTasksService(userId: number) {

    return tasksRepository.getTasks(userId);

}

async function getTaskByIdService(id: number, userId: number) {

    return tasksRepository.getTaskById(id, userId);

}

async function deleteTaskService(id: number, userId: number) {

    return tasksRepository.deleteTask(id, userId);

}

export const taskService = { createTaskService, updateTaskService, getTasksService, getTaskByIdService, deleteTaskService };