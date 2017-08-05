FROM node:7.4.0-alpine

RUN mkdir -p /server
WORKDIR /server

COPY package.json /server/

RUN npm install
COPY .babelrc ./
COPY db/ ./db
COPY *.js ./
COPY models/ ./models
COPY migrations/ ./migrations
COPY client/ ./client
COPY api/ ./api

RUN npm run build

EXPOSE 5000

VOLUME /server/db

CMD [ "npm", "start" ]
