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

    errorResponse (res: Response, status: keyof typeof Controller.STATUS_CODES, error: string) {

        return this.jsonResponse<Record<'error' | 'message', string>>(res, status, { error: status, message: error });
    }

    async validateRequest (req: Request, res: Response, validations: ValidationChain[]) {

        await Promise.all(validations.map(validation => validation.run(req)));
        
        const errors = validationResult(req);
        
        if (!errors.isEmpty()) {

            return this.errorResponse(res, 'bad_request', errors.mapped()?.id?.msg || 'Invalid input.');
        }
    }
}