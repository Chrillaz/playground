import { Message, IMessageModel } from '../models/message/message.model';
import { MessageNotFound } from '../models/message/message.exceptions';

export class MessageService {

    static get messageAttributes() {

        return ['id', 'message'];
    }

    async getAll(): Promise<Message[]> {

        return await Message.findAll({ order: [['updatedAt', 'ASC']]}) || [];
    }

    async getById(id: string): Promise<Message> {

        const message = await Message.findByPk(id, {
            attributes: MessageService.messageAttributes
        });

        if (message == null) {

            throw new MessageNotFound('Nothing here.');
        }

        return message;
    }

    async create(payload: Partial<IMessageModel>): Promise<Message> {

        return await Message.create(payload);
    }

    async updateById(payload: Partial<IMessageModel>): Promise<Message> {

        const message = await Message.update(
            { message: payload.message },
            { where: { id: payload.id } }
        );

        return this.getById(payload.id);
    }

    async removeById(id: string): Promise<Boolean> {

        const rows = await Message.destroy({
            where: { id }
        })

        return rows > 0;
    }
}