FROM node:18-alpine
RUN npm install -g mysql2
WORKDIR /server
COPY package.json .
RUN npm install --force
COPY . .
RUN mv test.env.test .env
EXPOSE 2000
EXPOSE 3306
CMD ["npm", "run", "start"]