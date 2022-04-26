# Builder
FROM node:lts as builder

WORKDIR /usr/src

COPY package*json .

WORKDIR /usr/src/api

COPY api/package*json .

WORKDIR /usr/src/client

COPY client/package*.json .

WORKDIR /usr/src

RUN npm install \
    && npm cache clean --force

COPY . .

# App development Service
FROM node:lts as development

ENV NODE_ENV=development

WORKDIR /usr/src

COPY --from=builder /usr/src .

RUN apt-get update \
    && apt-get install -y wait-for-it \
    && chmod +x /usr/bin/wait-for-it \
    && chmod +x /usr/src/.entrypoint/*

EXPOSE 80

ENTRYPOINT [ "./.entrypoint/app_entrypoint.sh" ]
