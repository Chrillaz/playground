import { Entity, IEntityModel } from '../models/entity/entity.model';

export class EntityService {

    static get entityAttributes() {

        return ['id', 'name'];
    }

    async getAll(): Promise<Entity[]> {

        return await Entity.findAll() || [];
    }

    async getById(id: string): Promise<Entity> {

        return await Entity.findByPk(id, {
            attributes: EntityService.entityAttributes
        });
    }

    async create(payload: Partial<IEntityModel>): Promise<Entity> {

        return await Entity.create(payload);
    }
}