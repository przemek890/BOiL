FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY view_r_ins .

EXPOSE 3000

CMD ["npm", "start"]

