FROM node:22.15.1-alpine

RUN npm install -g nodemon

WORKDIR /app

COPY package.json .

RUN npm install

RUN npm run dev

COPY . .

EXPOSE 4000

CMD ["npm","run", "dev"]
