## Playground

### Envs
```
## Database
MYSQL_ROOT_PASSWORD
MYSQL_DATABASE
MYSQL_USER
MYSQL_PASSWORD
MYSQL_PORT=3306
MYSQL_URL="mysql://root:${MYSQL_ROOT_PASSWORD}@${MYSQL_DATABASE}:${MYSQL_PORT}/${MYSQL_DATABASE}"

## Api
API_PORT=5001
API_VERSION=v1

## Client
CLIENT_PORT=3000
```

## Install dependencies
```bash
npm install
```

### Start mysql and build app service
```bash 
docker compose up -d --build
```

### Interact with Prisma CLI
```bash
docker compose run --entrypoint npx --rm prisma prisma migrate dev
```