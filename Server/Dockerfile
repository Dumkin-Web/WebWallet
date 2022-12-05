FROM node:12-alpine
WORKDIR /app
COPY . .
COPY package.json /app/package.json
RUN npm install
EXPOSE 3000 
USER node
CMD npm start