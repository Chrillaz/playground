import { Router } from 'express';
import { EntityBadRequest } from '../models/entity/entity.exceptions';
import { EntityService } from '../services/entity.service';

export const entityRouter = () => {

    const router = Router();

    const entityService = new EntityService();

    router.get('/', async (req, res, next) => {

        try {

            const entities = await entityService.getAll();
            return res.status(200).json(entities);
        } catch (err) {
            next(err);
        }
    })
    
    router.get('/:id', async (req, res, next) => {

        try {
            const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

            if (!uuidRegex.test(req.params.id)) {

                throw new EntityBadRequest('Not valid.');
            }
            
            const entity = await entityService.getById(req.params.id);
            return res.status(200).json(entity);
        } catch (err) {
            next(err);
        }
    })

    router.post('/', async (req, res, next) => {
        try {

            const nameRegex = /^[a-zA-Z ]{2,30}$/;

            if (!('name' in req.body) || !nameRegex.test(req.body.name)) {
                
                throw new EntityBadRequest('Not valid.');
            }

            const entity = await entityService.create(req.body);
            return res.status(201).json(entity);
        } catch (err) {
            next(err);
        }
    })

    return router;
}
