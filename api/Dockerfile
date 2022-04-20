FROM debian:buster-slim as wait-for-it

# Get wait for it script
RUN apt-get update && apt-get install -y wait-for-it

FROM node:16

WORKDIR /app

ARG API_PORT

ARG NODE_ENV

ARG MYSQL_URL

ENV NODE_ENV=${NODE_ENV}

ENV MYSQL_URL=${MYSQL_URL}

COPY --from=wait-for-it /usr/bin/wait-for-it .

COPY .entrypoint/entrypoint.sh .

COPY package*.json .

COPY api/package*.json ./api/

# Set chmod and Install dependencies
RUN npm install && chmod +x ./entrypoint.sh \
    && chmod +x ./wait-for-it

COPY tsconfig*.json .

COPY prisma ./prisma/

COPY api ./api/

COPY .env .

EXPOSE ${API_PORT}

ENTRYPOINT [ "./entrypoint.sh" ]