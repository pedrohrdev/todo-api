import { tasksRepository } from '../repository/tasks.repository';
import { CreateTaskInput, UpdateTaskInput } from '../schemas/tasks.schema';

async function createTask(
    userId: number,
    fields: CreateTaskInput
) {

    return tasksRepository.createTask(userId, fields);

};

async function updateTask(
    id: number,
    userId: number,
    fields: UpdateTaskInput
) {

    return tasksRepository.updateTask(id, userId, fields);

};

async function getTasks(userId: number) {

    return tasksRepository.getTasks(userId);

}

async function getTaskById(id: number, userId: number) {

    return tasksRepository.getTaskById(id, userId);

}

async function deleteTask(id: number, userId: number) {

    return tasksRepository.deleteTask(id, userId);

}

export const tasksService = {
    createTask,
    updateTask,
    getTasks,
    getTaskById,
    deleteTask
};