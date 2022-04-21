#! /bin/bash

./wait-for-it playground_dev_db:3306 -- npx prisma generate && npx prisma migrate dev && npm run api:dev
