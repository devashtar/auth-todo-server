import { Request as R, Response as S, NextFunction as N } from "express";

export default function(err: Error, _req: R, res: S, next: N) {

    switch(err.name) {
        case 'CheckExistUserExeption':
            res.status(404).send(err.message);
            break;
        case 'UserValidator':
            res.status(400).send(err.message);
            break;
        case 'СheckFreeEmail':
            res.status(400).send(err.message);
            break;
        case 'InvalidUserAccount':
            res.status(401).send(err.message);
            break;
        case 'CheckAuthHeader':
            res.status(401).send(err.message);
            break;
        case 'InvalidRequestExeption':
            res.status(400).send(err.message);
            break;
        case 'InvalidTokenExeption':
            res.status(400).send(err.message);
            break;
        case 'ServiceAccessExeption':
            res.status(503).send('Сервис временно недоступен!');
            break;
        case 'TaskNotFoundExeption':
            res.status(404).send(err.message);
            break;
        default:
            next(err);
    }        
}