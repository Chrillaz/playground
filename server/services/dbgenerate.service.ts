import path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({path: path.resolve(__dirname, '../../.env')});

import { db } from '../models';

db.sequelize.sync({force: true}).then(async (sequelize) => {

    try {

        console.log('DB GENERATED.');
    } catch(err) {

        console.log('GENERATE ERROR ', err);
    } finally {
        
        process.exit();
    }
});
