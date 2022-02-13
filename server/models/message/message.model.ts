import { Model, STRING, UUID, UUIDV4 } from 'sequelize';
import { db } from '..';

export interface IMessageModel {
    id: string;
    message: String;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date;
}

export class Message extends Model<IMessageModel, Partial<IMessageModel>> {}

Message.init({
    id: {
        primaryKey: true,
        type: UUID,
        defaultValue: UUIDV4
    },
    message: {
        type: STRING,
        defaultValue: ''
    }
},
{
    timestamps: true,
    sequelize: db.sequelize
});
