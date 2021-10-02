import { Request , Response as S, NextFunction as N } from "express";
import TodoService from '../services/todo.service';

interface R extends Request {
    params: {
        userid: string,
        taskid: string
    }
}

class TodoController {

    async getAll(req: R, res: S, next: N):Promise<void> {
        try {
            const arr = await TodoService.getAll(req.params.userid);

            res.status(200).json(arr);
        } catch(e) {
            next(e);
        }
    }

    async createTask(req: R, res: S, next: N):Promise<void> {
        try {
            const task = await TodoService.createTask(req.params.userid, req.body.title);
        
            res.status(200).json(task);
        } catch(e) {
            next(e);
        }
    }

    async updateTask(req: R, res: S, next: N):Promise<void> {
        try {
            const task = await TodoService.updateTask(req.params.taskid, req.body);

            res.status(200).json(task);
        } catch(e) {
            next(e);
        }
    }

    async deleteTaskById(req: R, res: S, next: N):Promise<void> {
        try {
            await TodoService.deleteTaskById(req.params.taskid);
            
            res.status(200).end('Task is removed!')
        } catch(e) {
            next(e);
        }
    }

    async deleteAllTasksByUserId(req: R, res: S, next: N):Promise<void> {
        try {
            await TodoService.deleteAllTasksByUserId(req.params.userid);
            
            res.status(200).end('All tasks is removed!')
        } catch(e) {
            next(e);
        }
    }
        
}

export default new TodoController();