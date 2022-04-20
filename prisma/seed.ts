import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

const todoData: Prisma.TodoCreateInput[] = [
    {
        title: 'Task 1',
        description: 'Unfinnished task example',
        completed: false
    },
    {
        title: 'Task 2',
        description: 'Finnsihed task example',
        completed: true
    }
]

async function main() {
    console.log(`Start seeding ...`)
    for (const u of todoData) {
        const todo = await prisma.todo.create({
            data: u,
        })
        console.log(`Created todo with id: ${todo.id}`)
    }
    console.log(`Seeding finished.`)
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })