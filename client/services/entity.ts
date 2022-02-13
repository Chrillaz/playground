import axios from 'axios';

export interface IEntety {
    id: string;
    name: string;
}

export const getAll = async (): Promise<IEntety[]> => {

    const entities = await axios.get<IEntety[]>('/api/v1/entities');
    return entities.data;
}

export const getById = async (id: string): Promise<IEntety> => {

    const entity = await axios.get<IEntety>(`/api/v1/entities/${id}`);

    return entity.data;
}

export const create = async (payload: {name: string}): Promise<IEntety> => {

    const entity = await axios.post<IEntety>('/api/v1/entities', payload);

    return entity.data;
}
