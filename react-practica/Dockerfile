FROM node:12-alpine
WORKDIR /client
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3006
CMD npm start