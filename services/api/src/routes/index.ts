import { PrismaClient } from '@prisma/client';
import { errorHandler } from '../middleware/error.handler';
import { healthRouter } from './health';
import { todoRouter } from './todos';

export default function ( app: any, VERSION: string ) {

    const prisma = new PrismaClient();

    app.use(
        `/api/${VERSION}/todos`, 
        todoRouter(prisma)
    );

    app.use(
        `/api/${VERSION}/health`, 
        healthRouter()
    );

    app.use(errorHandler);
}