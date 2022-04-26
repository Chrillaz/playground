#!/bin/bash

/usr/bin/wait-for-it $MYSQL_DATABASE:$MYSQL_PORT -- npx prisma generate \
    && npx prisma migrate dev \
    && npm run api:dev \
    && npm run client:dev
