import { api } from './api';
import { httpHandle } from '@utilities';

export interface ITodo {
    id?: string;
    title: string;
    description: string;
    completed: boolean;
}

const service = 'todos';

export const createTodo = async (payload: ITodo, alive: boolean = false) => {

    const [error, todo] = await httpHandle<ITodo>(
        api.post(service, payload),
        { alive }
    );

    if (error) {

        console.log(error);
        return;
    }

    return todo;
}

export const getTodos = async (alive: boolean = false) => {

    const [error, todos] = await httpHandle<ITodo[]>(
        api.get(service),
        { alive }
    );

    if (error) {

        console.log(error);
        return;
    }

    return todos;
}

export const getTodo = async (id: string, alive: boolean = false) => {

    const [error, todo] = await httpHandle<ITodo>(
        api.get(`${service}/${id}`),
        { alive }
    );

    if (error) {

        console.log(error);
        return;
    }

    return todo;
}

export const updateTodo = async (payload: ITodo & { id: string }, alive: boolean = false) => {

    const [error, todo] = await httpHandle<ITodo>(
        api.put(`${service}/${payload.id}`, payload),
        { alive }
    );

    if (error) {

        console.log(error);
        return;
    }

    return todo;
}

export const deleteTodo = async (id: string, alive: boolean = false) => {

    const [error, todo] = await httpHandle<boolean>(
        api.delete(`${service}/${id}`),
        { alive }
    );

    if (error) {

        console.log(error);
        return;
    }

    return todo;
}