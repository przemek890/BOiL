FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm install -g serve

COPY runtime-env.sh ./

RUN chmod +x runtime-env.sh

EXPOSE 3000

CMD ["sh", "-c", "./runtime-env.sh && serve -s build"]
