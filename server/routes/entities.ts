import { Application, Router } from 'express';
import { EntityService } from '../services/entity.service';
import { entityErrorHandler, EntityError } from '../midleware/exceptions/entity';

export const entityRouter = (app: Application) => {

    app.use(entityErrorHandler);

    const router = Router();

    const entityService = new EntityService();

    router.get('/', async (req, res) => {

        const entities = await entityService.getAll();
        return res.status(200).json(entities);
    })
    
    router.get('/:id', async (req, res) => {
    
        const entity = await entityService.getById(req.params.id);
        return res.status(200).json(entity);
    })

    router.post('/', async (req, res) => {

        const entity = await entityService.create(req.body);
        return res.status(200).json(entity);
    })

    return router;
}
