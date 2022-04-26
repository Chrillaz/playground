FROM node:lts as builder

WORKDIR /usr/src

COPY package*json .

WORKDIR /usr/src/services/client

COPY services/client/package*json .

WORKDIR /usr/src

RUN npm install \
    && npm cache clean --force

COPY package-lock.json tsconfig*json ./

WORKDIR /usr/src/services/client

COPY services/client/ .

FROM node:lts-alpine3.14

WORKDIR /usr/src

COPY --from=builder /usr/src .

EXPOSE ${CLIENT_PORT}

ENTRYPOINT [ "npm", "run", "client:dev" ]