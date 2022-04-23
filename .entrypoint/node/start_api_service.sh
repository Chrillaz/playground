#! /bin/bash

./scripts/wait-for-it process.env.MYSQL_DATABASE:process.env.MYSQL_PORT -- \
    npx prisma generate \
    && npm run api:dev
