import { Request as R, Response as S, NextFunction as N } from "express";
import { CheckAuthHeader } from "../exceptions/user.exeption";
import tokenValidator from '../validators/token.validator';

export default async function(req: R, _res: S, next: N):Promise<void> {
    try {
        const authHeader = req.headers.authorization;

        if (typeof authHeader === 'string' && authHeader.length > 0) {
            const str = authHeader.split(' ')[1];

            if (typeof str === 'string') {
                tokenValidator(str);
                next();                
            } else {
                throw new CheckAuthHeader('Unauthorized user!');
            }

        } else {
            throw new CheckAuthHeader('Unauthorized user');
        }

    } catch(e) {
        next(e);
    }

}