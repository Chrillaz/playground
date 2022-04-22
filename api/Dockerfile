FROM debian:buster-slim as wait-for-it

# Get wait for it script
RUN apt-get update && apt-get install -y wait-for-it

# Development
FROM node:lts as development

WORKDIR /srv/apps

COPY --from=wait-for-it /usr/bin/wait-for-it .

COPY .entrypoint/entrypoint.sh \
    package*json \
    tsconfig*json \
    ./

COPY api/package*.json ./api/

# Set chmod and Install dependencies
RUN npm install \
    && chmod +x ./entrypoint.sh \
    && chmod +x ./wait-for-it

EXPOSE ${API_PORT}

ENTRYPOINT [ "./entrypoint.sh" ]

# Production
FROM node:lts-alpine as production

ENV NODE_ENV=production

WORKDIR /srv/apps

COPY package*json tsconfig*json ./

COPY api/package*json api/tsconfig*json ./api/

RUN npm install --silent --only=prod

COPY api/src/ ./api/src/

CMD [ "npm", "run", "api:start" ]