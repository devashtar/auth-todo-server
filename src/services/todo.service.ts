import { getCustomRepository } from 'typeorm';
import { TaskRepository } from '../repositories/todo.repository';
import { Task } from '../entity/Task';

class TodoService {

    async getAll(userId: string):Promise<Task[]> {
        try {
            const todoRepo = getCustomRepository(TaskRepository);
            const arrayTask = await todoRepo.getAll(userId);
            
            return arrayTask;
        } catch(e) {
            throw e;
        } 
    }

    async createTask(user_id: string, title: string):Promise<Task> {
        try {
            const todoRepo = getCustomRepository(TaskRepository);

            const task = new Task();
            task.user_id = user_id;
            task.title = title;

            const taskObj = await todoRepo.createTask(task);
            
            return taskObj;
        } catch(e) {
            throw e;
        }
    }

    async updateTask(taskId: string, updateObj: any):Promise<Task> {
        try {
            const todoRepo = getCustomRepository(TaskRepository);

            const taskObj = await todoRepo.updateTask(taskId, updateObj);

            return taskObj;
        } catch(e) {
            throw e;
        }
    }

    async deleteTaskById(taskId: string):Promise<void> {
        try {
            const todoRepo = getCustomRepository(TaskRepository);

            await todoRepo.deleteTaskById(taskId);
            
            return;
        } catch(e) {
            throw e;
        }
    }

    async deleteAllTasksByUserId(userId: string):Promise<void> {
        try {
            const todoRepo = getCustomRepository(TaskRepository);

            await todoRepo.deleteAllTasksByUserId(userId);

            return;
        } catch(e) {
            throw e;
        }
    }

}

export default new TodoService();