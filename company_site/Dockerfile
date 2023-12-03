FROM node:18-alpine 
WORKDIR /app
COPY package.json .
RUN npm install --force
COPY . .
RUN mv test.env.local.test .env.local
EXPOSE 3000
CMD ["npm", "start"]