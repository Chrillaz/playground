import { NextFunction, Request, Response } from 'express';
import { EntityBadRequest, EntityError } from '../models/entity/entity.exceptions';

function entityErrorHandler(
    error: TypeError | EntityError | EntityBadRequest,
    req: Request,
    res: Response,
    next: NextFunction
) {
    
    if (error instanceof EntityBadRequest) {

        return res.status(error.error.code).json(error);
    }

    if (error instanceof EntityError) {

        return res.status(error.error.code).json(error);
    }

    return res.status(500).json(new EntityError('Something went wrong.'));
}

export default entityErrorHandler;