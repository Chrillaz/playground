import { Sequelize } from 'sequelize'
import { readdirSync } from 'fs';
import path from 'path';

interface IDb {
    sequelize: Sequelize;
    Sequelize: typeof Sequelize
    [model: string]: any;
}

const dbName = process.env.MYSQL_DATABASE as string
const dbUser = process.env.MYSQL_USER as string
const dbHost = process.env.MYSQL_HOST
const dbPassword = process.env.MYSQL_PASSWORD

const sequelize = new Sequelize(dbName, dbUser, dbPassword, {
    host: dbHost,
    dialect: 'mysql',
    logging: (str) => console.log(str),
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    }
})

const models = readdirSync(path.join(__dirname, '../models')).reduce((map, model) => {

    if (model.includes('.ts')) return map;

    return {...map, [model]: import(path.join(__dirname, `../models/${model}/${model}.model.ts`))};
}, {});

export const db: IDb = {
    sequelize: sequelize,
    Sequelize: Sequelize,
    ...models
};
