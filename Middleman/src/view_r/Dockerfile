FROM node:14 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ARG REACT_APP_SERVER_IP
ENV REACT_APP_SERVER_IP=$REACT_APP_SERVER_IP

RUN echo "REACT_APP_SERVER_IP=$REACT_APP_SERVER_IP" > .env

RUN npm run build

FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
