FROM node:12.4.0
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 4500
CMD npm run start