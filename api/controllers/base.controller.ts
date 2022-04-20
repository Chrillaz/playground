import { Request, Response } from 'express';
import { ValidationChain, validationResult } from 'express-validator';

export default abstract class Controller<T> {

    static STATUS_CODES = {
        ok: 200,
        created: 201,
        no_content: 204,
        bad_request: 400,
        unauthorized: 401,
        not_found: 404
    }

    constructor(protected readonly model: T) {}

    jsonResponse<T>(res: Response<T>, status: keyof typeof Controller.STATUS_CODES, data: T) {

        return res.status(Controller.STATUS_CODES[status]).json(data);
    }

    async validate (req: Request, res: Response, validations: ValidationChain[]) {

        await Promise.all(validations.map(validation => validation.run(req)));
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {
            
            res.status(Controller.STATUS_CODES['bad_request']);

            throw errors.mapped() || new Error('Invalid input');
        }
    }
}