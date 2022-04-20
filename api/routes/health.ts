import { Router } from 'express';

export const healthRouter = () => {

    const router = Router();

    router.get('/', async (_req, res) => {
    
        return res.status(200).json({ status: 'ok' });
    });

    return router;
}
