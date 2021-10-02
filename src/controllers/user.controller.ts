import { Request as R, Response as S, NextFunction as N } from "express";
import userService from '../services/user.service';

class UserController {

    async reg(req: R, res: S, next: N) {
        try {
            await userService.reg(req.body);
            res.status(200).send('Вы успешно зарегистрированы!');
        } catch(e) {
            next(e);
        }
    }

    async auth(req: R, res: S, next: N) {
        try {            
            const tokensAndUserIdObj = await userService.auth(req.body, req.fingerprint!.hash);
            
            res.status(200).json(tokensAndUserIdObj);
        } catch(e) {
            next(e);
        }
    }

    async refreshToken(req: R, res: S, next: N) {
        try {
            const tokenObj = await userService.refreshToken(req.body.refreshToken);

            res.status(200).json(tokenObj)
        } catch(e) {
            next(e);
        }
    }

    async logout(req: R, res: S, next: N) {
        try {
            await userService.logout(req.headers.authorization!);

            res.status(200).end('Вы вышли из своего аккаунта!');
        } catch(e) {
            next(e);
        }
    }

}

export default new UserController();