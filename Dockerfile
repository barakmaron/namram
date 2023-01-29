FROM node:18-alpine
WORKDIR /client .
COPY ./client .
RUN mv test.env.local.test .env.local
RUN npm install
RUN npm run start
EXPOSE 3000
