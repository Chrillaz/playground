import { Exception } from '@models/exception.model';
import { Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

enum ResponseCodes {
    ok = 200,
    created = 201,
    accepted = 202,
    non_authoritative_information = 203,
    no_content = 204,
}

export default abstract class Controller<T> {

    constructor(protected readonly model: T) {}

    jsonResponse<T>(res: Response<T>, status: keyof typeof ResponseCodes, data: T) {

        return res.status(ResponseCodes[status]).json(data);
    }

    async validateRequest (req: Request, validations: ValidationChain[]) {

        await Promise.all(validations.map(validation => validation.run(req)));
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {

            throw new Exception('bad_request', errors.mapped()?.id?.msg || 'Invalid input.');
        }
    }
}