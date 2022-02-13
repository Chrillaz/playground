import { api } from './api';

export interface IMessage {
    id: string;
    message: string;
}

const service = 'messages';

export const getAll = async (): Promise<IMessage[]> => {

    try {

        const messages = await api.get<IMessage[]>(service);
        return messages.data;
    } catch (err) {
        console.log(err)
    }
}

export const getById = async (id: string): Promise<IMessage> => {

    try {

        const message = await api.get<IMessage>(`${service}/${id}`);
        return message.data;
    } catch (err) {
        console.log(err)
    }
}

export const create = async (payload: IMessage): Promise<IMessage> => {

    try {

        const message = await api.post<IMessage>(service, payload);
        return message.data;
    } catch (err) {
        console.log(err)
    }
}

export const updateById = async (payload: IMessage): Promise<IMessage> => {

    try {

        const message = await api.put<IMessage>(`${service}/${payload.id}`, payload);
        return message.data;
    } catch (err) {
        console.log(err);
    }
}

export const removeById = async (id: string): Promise<Boolean> => {

    try {

        const removed = await api.delete<Boolean>(`${service}/${id}`);
        return removed.data;
    } catch (err) {
        console.log(err);
    }
}
