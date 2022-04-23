# Development
FROM node:lts as development

WORKDIR /srv/apps

COPY package*json tsconfig*json ./

COPY client/package*.json ./client/

# Set chmod and Install dependencies
RUN npm install 

EXPOSE ${APP_PORT}

CMD [ "npm", "run", "client:dev" ]
