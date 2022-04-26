import { Prisma, PrismaClient } from '@prisma/client';

export interface ITodo extends Prisma.TodoSelect {}

export default class TodoModel {

    constructor(private readonly prisma: PrismaClient['todo']) {}

    createFields({title, description, completed}: Prisma.TodoCreateInput) {

        return Prisma.validator<Prisma.TodoCreateInput>()({
            title,
            description,
            completed
        })
    }

    selectFields({ title, description, completed }: ITodo) {

        return Prisma.validator<Prisma.TodoSelect>()({ 
            title, 
            description, 
            completed 
        });
    }

    async create(data: Prisma.TodoCreateInput): Promise<void> {

        await this.prisma.create({
            data: this.createFields(data)
        })
    }

    async read(id?: string) {

        if (!id) {

            return await this.prisma.findMany();
        }

        return await this.prisma.findUnique({
            where: { id }
        });
    }

    async update(id: string, data: Prisma.TodoCreateInput) {

        return await this.prisma.update({
            where: { id },
            data: this.createFields(data)
        });
    }

    async delete(id: string): Promise<boolean> {

        const todo = await this.prisma.delete({
            where: { id }
        });

        return !!todo;
    }
}