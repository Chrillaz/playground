import { Request, Response } from 'express'
export class EntityError extends Error {

    constructor(message) {
        super(message);
        this.name = 'EntityError';
    }
}

export class EntityNotFound extends EntityError {};

export class EntityBadRequest extends EntityError {};

export const entityErrorHandler = (
    error: Error | EntityError, 
    req: Request, 
    res: Response, 
    next: (...params: any[]) => unknown
) => {

    if (error instanceof EntityBadRequest) {

        res.status(400);
        return res.send({
            httpsStatus: 400,
            message: error.message
        })
    }

    if (error instanceof EntityNotFound) {

        res.status(404);
        return res.send({
            httpsStatus: 404,
            message: error.message
        })
    }

    if (error instanceof EntityError) {
        
        res.status(500);
        return res.send({
            httpStatus: 500,
            message: error.message
        })
    }

    next(error);
}