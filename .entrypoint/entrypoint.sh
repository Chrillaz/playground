#! /bin/bash

./wait-for-it process.env.MYSQL_DATABASE:process.env.MYSQL_PORT -- \
    npx prisma generate \
    && npx prisma migrate dev \
    && npm run api:dev
