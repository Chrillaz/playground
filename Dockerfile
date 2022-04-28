FROM node:lts as builder

ARG SERVICE

WORKDIR /usr/src

COPY package*json tsconfig*json .env ./

WORKDIR /usr/src/services/${SERVICE}

COPY services/${SERVICE}/package*json .

WORKDIR /usr/src

RUN npm install typescript@4.6.3 \
    && npm install --workspace=services/${SERVICE} \
    && npm cache clean --force

WORKDIR /usr/src/services/${SERVICE}

COPY services/${SERVICE}/ .

WORKDIR /usr/src

FROM node:lts-alpine3.14 as development

WORKDIR /usr/src

COPY --from=builder /usr/src .

ENTRYPOINT [ "npm" ]
