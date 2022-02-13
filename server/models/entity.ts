import { Model, STRING, UUID, UUIDV4 } from 'sequelize';
import { db } from '.';

export interface IEntityModel {
    id: string;
    name: String;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export class Entity extends Model<IEntityModel, Partial<IEntityModel>> {}

Entity.init({
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    name: {
        type: STRING(32),
        defaultValue: ''
    }
},
{
    timestamps: true,
    sequelize: db.sequelize
});
