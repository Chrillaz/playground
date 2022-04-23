FROM node:lts as builder

WORKDIR /srv/apps

RUN apt-get update \
    && apt-get install -y wait-for-it

COPY .entrypoint/node ./scripts/

COPY api/package*json ./api/

COPY package*json tsconfig*json ./

RUN npm install \ 
    && cp /usr/bin/wait-for-it ./scripts/ \
    && chmod +x ./scripts/* 

COPY . .

# Api server.
FROM node:lts as development

COPY --from=builder /srv/apps .

EXPOSE ${API_PORT}

ENTRYPOINT [ "./scripts/start_api_service.sh" ]

# npx entrypoint.
FROM development as npx

ENTRYPOINT [ "npx" ]
