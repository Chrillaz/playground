FROM debian:buster-slim as wait-for-it

# Get wait for it script
RUN apt-get update && apt-get install -y wait-for-it

FROM node:lts as base

WORKDIR /srv/apps

COPY .entrypoint/node ./scripts/

COPY prisma/ ./prisma/

COPY api/package*json ./api/

COPY package*json tsconfig*json ./

RUN npm install

# Api server development
FROM base as development

COPY --from=base . .

COPY --from=wait-for-it /usr/bin/wait-for-it ./scripts/

RUN chmod +x ./scripts/*

EXPOSE ${API_PORT}

ENTRYPOINT [ "./scripts/start_api_service.sh" ]
