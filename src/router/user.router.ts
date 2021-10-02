import express from 'express';
import userController from '../controllers/user.controller';
import fingerprintMiddleware from '../middlewares/fp.middleware';
import checkAuthorizationHeader from '../middlewares/check.authorization.header';
const route = express.Router();


route.post('/reg', userController.reg);
route.post('/auth', fingerprintMiddleware, userController.auth);
route.post('/refresh-token', fingerprintMiddleware, userController.refreshToken);
route.get('/logout', checkAuthorizationHeader, userController.logout);  // if user haven't authorization, it allow you delete token by ID

export default route;