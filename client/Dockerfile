FROM node:20-alpine as build-step
WORKDIR /app
COPY . .
WORKDIR /app/client
RUN npm install

ENTRYPOINT ["npm", "start"]