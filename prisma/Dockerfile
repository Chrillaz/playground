FROM debian:buster-slim as wait-for-it

# Get wait for it script
RUN apt-get update && apt-get install -y wait-for-it

FROM node:lts as development

WORKDIR /srv/apps/prisma 

COPY --from=wait-for-it /usr/bin/wait-for-it .

COPY .entrypoint/node/entrypoint.sh .

COPY . .

RUN chmod +x ./entrypoint.sh && chmod +x ./wait-for-it

EXPOSE ${PRISMA_PORT}

ENTRYPOINT [ "./entrypoint.sh" ]