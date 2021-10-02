import { Request as R, Response as S, NextFunction as N } from "express";
import { getCustomRepository } from "typeorm";
import { UserRepository } from "../repositories/user.repository";
import { CheckExistUserExeption, InvalidRequestExeption } from "../exceptions/user.exeption";

export default async function(req: R, _res: S, next: N):Promise<void> {
    try {
        if (req.params && req.params.userid && typeof req.params.userid === 'string') {
            const user = await getCustomRepository(UserRepository).findUserByID(req.params.userid);
            
            if (user) {               
                next();
            } else {
                throw new CheckExistUserExeption('Not found!');
            }
            
        } else {
            throw new InvalidRequestExeption('Invalid request!');
        }
        
    } catch(e) {
        next(e);
    }

}