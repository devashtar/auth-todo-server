import { AbstractRepository, EntityRepository } from "typeorm";
import { Task } from "../entity/Task";
import { TaskNotFoundExeption } from "../exceptions/todo.exeption";

@EntityRepository(Task)
export class TaskRepository extends AbstractRepository<Task> {

    async getAll(user_id: string):Promise<Task[]> {
        try {
            const tasks = await this.repository.find({where: { user_id }});

            return tasks;
        } catch(e) {
            throw new Error('Произошла ошибка в getAll!');
        }
    }

    async createTask(task: Task):Promise<Task> {
        try {
            const taskObj = await this.manager.save(task);  // Here Task object
            const { id, title, completed } = taskObj;
            return { id, title, completed };
        } catch(e) {
            throw new Error('Произошла ошибка в createTask!');
        }
    }

    async updateTask(id: string, updateObj: any):Promise<Task> {
        try {
            await this.repository
                .createQueryBuilder()
                .update()
                .set(updateObj)
                .where("id = :id", { id })
                .execute();

            const task = await this.repository.findOne(id);
            if (!task) throw new TaskNotFoundExeption('Task not found!');
                
            return task;   
        } catch(e) {
            if (e instanceof TaskNotFoundExeption) {
                throw e;
            } else {
                throw new Error('Произошла ошибка в deleteTaskById!');
            }
        }
    }

    async deleteTaskById(id: string):Promise<void> {
        try {
            await this.repository.delete(id);

            return;
        } catch(e) {
            throw new Error('Произошла ошибка в deleteTaskById!');
        }
    }

    async deleteAllTasksByUserId(user_id: string):Promise<void> {
        try {
            await this.repository
                .createQueryBuilder()
                .delete()
                .where("user_id = :user_id", { user_id })
                .execute();

            return;
        } catch(e) {
            throw new Error('Произошла ошибка в deleteAllTasksByUserId!');
        }
    }
}