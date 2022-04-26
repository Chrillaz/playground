FROM node:lts as builder

WORKDIR /usr/src

COPY package*json tsconfig*json ./

WORKDIR /usr/src/services/api

COPY services/api/package*json .

WORKDIR /usr/src

RUN npm install \
    && npm cache clean --force

WORKDIR /usr/src/services/api

COPY services/api/ .

WORKDIR /usr/src/services/prisma

COPY services/prisma/ .

FROM node:lts as development

WORKDIR /usr/src

COPY --from=builder /usr/src .

COPY .entrypoint/app_entrypoint.sh ./.entrypoint/

RUN apt-get update \
    && apt-get install -y wait-for-it \
    && chmod +x /usr/bin/wait-for-it \
    && chmod +x /usr/src/.entrypoint/*

EXPOSE ${API_PORT}

ENTRYPOINT [ "./.entrypoint/app_entrypoint.sh" ]