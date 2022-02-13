import { Message, IMessageModel } from '../models/message/message.model';

export class MessageService {

    static get messageAttributes() {

        return ['id', 'message'];
    }

    async getAll(): Promise<Message[]> {

        return await Message.findAll() || [];
    }

    async getById(id: string): Promise<Message> {

        return await Message.findByPk(id, {
            attributes: MessageService.messageAttributes
        });
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