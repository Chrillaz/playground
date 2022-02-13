import { EntityNotFound, EntityError, EntityBadRequest} from '../midleware/exceptions/entity';
import { Entity, IEntityModel } from '../models/entity';

export class EntityService {

    static get entityAttributes() {

        return ['id', 'name'];
    }

    async getAll(): Promise<Entity[]> {

        try {

            return await Entity.findAll() || [];
        } catch (err) {

            if (err.message) {

                throw new EntityError(err.message);
            }

            throw new EntityError('Something went wrong.');
        }
    }

    async getById(id: string): Promise<Entity> {

        try {

            const entity = await Entity.findByPk(id, {
                attributes: EntityService.entityAttributes
            });
    
            if (entity == null) {
                throw new EntityNotFound('Requested entity can not be found.');
            }
    
            return entity;
        } catch (err) {
            
            if (err.message) {

                throw new EntityError(err.message);
            }

            throw new EntityError('Something went wrong.');
        }
    }

    async create(payload: Partial<IEntityModel>): Promise<Entity> {

        try {

            if ('name' in payload && payload.name.length > 0) {

                return await Entity.create(payload);
            }

            throw new EntityBadRequest('Input not valid.')
        } catch (err) {

            if (err.message) {

                throw new EntityError(err.message);
            }

            throw new EntityError('Something went wrong.');
        }
    }
}