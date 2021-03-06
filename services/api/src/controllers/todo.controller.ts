import TodoModel from '@models/todo.model';
import { NextFunction, Request, Response } from 'express';
import { body, matchedData, param } from 'express-validator';
import Controller from './base.controller';

export default class TodoController extends Controller<TodoModel> {

    async createTodo (req: Request, res: Response, next: NextFunction) {

        try {
            
            await this.validateRequest(req, [
                body('title').isString(),
                body('description').optional().isString()
            ]);

            const todo = await this.model.create(matchedData(req) as any);

            return this.jsonResponse<typeof todo>(res, 'ok', todo);
        } catch (error) {
            next(error);
        }
    }
    
    async getTodos (_req: Request, res: Response, next: NextFunction) {

        try {

            const todos = await this.model.read();

            return this.jsonResponse<typeof todos>(res, 'ok', todos);
        } catch (error) {
            next(error);
        }
    }

    async getTodo (req: Request, res: Response, next: NextFunction) {

        try {

            await this.validateRequest(req, [param('id').isUUID(4)]);

            const todo = await this.model.read(matchedData(req).id);

            return this.jsonResponse<typeof todo>(res, 'ok', todo);
        } catch (error) {
            next(error);
        }
    }

    async updateTodo (req: Request, res: Response, next: NextFunction) {

        try {

            await this.validateRequest(req, [
                param('id').isUUID(4),
                body('title').optional().isString(),
                body('description').optional().isString(),
                body('completed').optional().isBoolean()
            ]);

            const { id, ...payload } = matchedData(req);

            const todo = await this.model.update(id, payload as any);

            return this.jsonResponse<typeof todo>(res, 'created', todo);
        } catch (error) {
            next(error);
        }
    }

    async deleteTodo (req: Request, res: Response, next: NextFunction) {

        try {

            await this.validateRequest(req, [param('id').isUUID(4)]);

            const deleted = await this.model.delete(matchedData(req).id);

            return this.jsonResponse<typeof deleted>(res, 'ok', deleted);
        } catch (error) {
            next(error);
        }
    }
}
