import { NextFunction, Request, Response } from 'express';
import { MessageBadRequest, MessageError, MessageNotFound } from '../models/message/message.exceptions';

function messageErrorHandler(
    error: TypeError | MessageError | MessageBadRequest,
    req: Request,
    res: Response,
    next: NextFunction
) {
    
    if (error instanceof MessageBadRequest) {

        return res.status(error.error.code).json(error);
    }

    if (error instanceof MessageNotFound) {

        return res.status(error.error.code).json(error);
    }

    if (error instanceof MessageError) {

        return res.status(error.error.code).json(error);
    }

    return res.status(500).json(new MessageError('Something went wrong.'));
}

export default messageErrorHandler;