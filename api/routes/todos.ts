import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import TodoController from '../controllers/todo.controller';
import TodoModel from '../models/todo.model';

export const todoRouter = (prisma: PrismaClient) => {

    const todos = Router();

    const controller = new TodoController(new TodoModel(prisma.todo));

    todos
        .post('/', controller.createTodo.bind(controller))
        .get('/', controller.getTodos.bind(controller))
        .get('/:id', controller.getTodo.bind(controller))
        .put('/:id', controller.updateTodo.bind(controller))
        .delete('/:id', controller.deleteTodo.bind(controller));

    return todos;
}