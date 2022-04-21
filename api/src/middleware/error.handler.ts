import Exception from '@models/exception.model';
import { Request, Response } from 'express';

export const errorHandler = (error: unknown, _req: Request, res: Response) => {

    if (error instanceof Exception) {
        
        return res.status(error.getCode()).json({
            name: error.name,
            status: 'error',
            message: error.getMessage()
        })
    }

    return res.status(500).json({
        name: '',
        status: 'error',
        message: 'Internal server error.'
    })
}