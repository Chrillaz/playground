import { fetchHandler } from '@/utilities';
import { api } from '../api';

export interface IMessage {
    id: string;
    message: string;
}

const service = 'messages';

export const getAll = async (): Promise<IMessage[]> => {

    const [error, messages] = await fetchHandler<IMessage[]>(api.get(service)); 

    if ( error ) {

        console.log(error);
    }
    
    return messages;
}

export const getById = async (id: string): Promise<IMessage> => {

    const [error, message] = await fetchHandler<IMessage>(api.get(`${service}/${id}`));

    if ( error ) {

        console.log(error);
    }
    
    return message;
}

export const create = async (payload: IMessage): Promise<IMessage> => {

    const [error, message] = await fetchHandler<IMessage>(api.post(service, payload));
    
    if ( error ) {

        console.log(error);
    }

    return message;
}

export const updateById = async (payload: IMessage): Promise<IMessage> => {

    const [error, message] = await fetchHandler<IMessage>(api.put(`${service}/${payload.id}`, payload));

    if ( error ) {

        console.log(error);
    }

    return message;
}

export const removeById = async (id: string): Promise<Boolean> => {

    const [error, removed] = await fetchHandler<Boolean>(api.delete(`${service}/${id}`));

    if ( error ) {

        console.log(error);
    }

    return removed;
}
