import { api } from './api';
import { httpHandle } from '@utilities';

export interface ITodo {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
}

const service = 'todos';

export const createTodo = async (payload: ITodo) => {

    const [error, todo] = await httpHandle<ITodo>(api.post(service, payload));

    if (error) {

        console.log(error);
        return;
    }

    return todo;
}

export const getTodos = async () => {

    const [error, todos] = await httpHandle<ITodo[]>(api.get(service));

    if (error) {

        console.log(error);
        return;
    }

    return todos;
}

export const getTodo = async (id: string) => {

    const [error, todo] = await httpHandle<ITodo>(api.get(`${service}/${id}`));

    if (error) {

        console.log(error);
        return;
    }

    return todo;
}

export const updateTodo = async (payload: ITodo & { id: string }) => {

    const [error, todo] = await httpHandle<ITodo>(api.put(`${service}/${payload.id}`, payload));

    if (error) {

        console.log(error);
        return;
    }

    return todo;
}

export const deleteTodo = async (id: string) => {

    const [error, todo] = await httpHandle<boolean>(api.delete(`${service}/${id}`));

    if (error) {

        console.log(error);
        return;
    }

    return todo;
}