import express from 'express';
import userRouter from '../router/user.router';
import todoRouter from '../router/todo.router';
import checkAuthMiddleware from '../middlewares/check.authorization.header';
import checkExistUser from '../middlewares/check.exist.user';
const route = express.Router();

route.use('/api', userRouter);
route.use('/todo/:userid/tasks', checkAuthMiddleware, checkExistUser, todoRouter)

export default route;