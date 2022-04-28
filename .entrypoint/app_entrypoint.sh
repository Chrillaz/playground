#!/bin/bash

/usr/bin/wait-for-it $MYSQL_HOST:$MYSQL_PORT -- \
    npx prisma generate --schema=./services/prisma/schema.prisma \
    && npx prisma migrate dev --schema=./services/prisma/schema.prisma \
    && npm run api:dev 
