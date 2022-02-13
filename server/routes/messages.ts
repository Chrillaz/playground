import { Router } from 'express';
import { MessageBadRequest } from '../models/message/message.exceptions';
import { MessageService } from '../services/message.service';

export const messageRouter = () => {

    const router = Router();

    const messageService = new MessageService();

    router.get('/', async (req, res, next) => {

        try {

            const messages = await messageService.getAll();
            return res.status(200).json(messages);
        } catch (err) {
            next(err);
        }
    })
    
    router.get('/:id', async (req, res, next) => {

        try {
            const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

            if (!uuidRegex.test(req.params.id)) {

                throw new MessageBadRequest('Not valid.');
            }
            
            const message = await messageService.getById(req.params.id);
            return res.status(200).json(message);
        } catch (err) {
            next(err);
        }
    })

    router.post('/', async (req, res, next) => {

        try {

            const messageRegex = /^[a-zA-Z ]{2,30}$/;

            if (!('message' in req.body) || !messageRegex.test(req.body.message)) {
                
                throw new MessageBadRequest('Not valid.');
            }

            const message = await messageService.create(req.body);
            return res.status(201).json(message);
        } catch (err) {
            next(err);
        }
    })

    router.put('/:id', async (req, res, next) => {

        try {

            const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

            if (!uuidRegex.test(req.params.id)) {

                throw new MessageBadRequest('Not valid.');
            }

            const message = await messageService.updateById(req.body);
            return res.status(200).json(message);
        } catch (err) {
            next(err);
        }
    })

    router.delete('/:id', async (req, res, next) => {

        try {

            const deleted = await messageService.removeById(req.params.id);
            return res.status(200).json({deleted});
        } catch (err) {
            next(err);
        }
    })

    return router;
}
