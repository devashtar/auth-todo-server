import express from 'express';
import todoController from '../controllers/todo.controller';
const route = express.Router({mergeParams: true});

route.get('/all', todoController.getAll);
route.post('/', todoController.createTask);
route.put('/:taskid', todoController.updateTask);
route.delete('/all', todoController.deleteAllTasksByUserId);
route.delete('/:taskid', todoController.deleteTaskById);

export default route;