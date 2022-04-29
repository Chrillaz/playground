FROM node:lts as builder

WORKDIR /usr/src

COPY package*json tsconfig*json .env ./

WORKDIR /usr/src/services/client

COPY services/client/package*json .

WORKDIR /usr/src

RUN npm install typescript@4.6.3 \
    && npm install --workspace=services/client \
    && npm cache clean --force

WORKDIR /usr/src/services/client

COPY services/client/ .

WORKDIR /usr/src

FROM node:lts-alpine3.14 as development

WORKDIR /usr/src

COPY --from=builder /usr/src .

ENTRYPOINT [ "npm" ]
