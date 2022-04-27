FROM node:lts as builder

WORKDIR /usr/src

COPY package*json tsconfig*json .env ./

WORKDIR /usr/src/services/api

COPY services/api/package*json .

WORKDIR /usr/src

RUN npm install typescript@4.6.3 \
    && npm install --workspace=services/api \
    && npm cache clean --force

WORKDIR /usr/src/services/api

COPY services/api/ .

WORKDIR /usr/src/services/prisma

COPY services/prisma/ .

WORKDIR /usr/src

COPY .entrypoint/app_entrypoint.sh ./.entrypoint/

RUN apt-get update \
    && apt-get install -y wait-for-it \
    && chmod +x /usr/bin/wait-for-it \
    && chmod +x /usr/src/.entrypoint/*

FROM node:lts as development

WORKDIR /usr/src

COPY --from=builder /usr/src .

COPY --from=builder /usr/bin/wait-for-it /usr/bin/    

ENTRYPOINT [ "./.entrypoint/app_entrypoint.sh" ]