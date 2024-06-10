# Użyj obrazu node do budowania aplikacji
FROM node:14 AS build

# Ustaw katalog roboczy
WORKDIR /app

# Skopiuj pliki package.json i package-lock.json
COPY package*.json ./

# Zainstaluj zależności
RUN npm install

# Skopiuj resztę plików
COPY . .

# Ustawienie zmiennej środowiskowej i zapisanie do pliku .env
ARG REACT_APP_SERVER_IP
ENV REACT_APP_SERVER_IP=$REACT_APP_SERVER_IP

RUN echo "REACT_APP_SERVER_IP=$REACT_APP_SERVER_IP" > .env

# Zbuduj aplikację
RUN npm run build

# Użyj obrazu nginx do serwowania aplikacji
FROM nginx:alpine

# Usuń domyślną konfigurację nginx
RUN rm -rf /usr/share/nginx/html/*

# Skopiuj zbudowaną aplikację do katalogu serwowania nginx
COPY --from=build /app/build /usr/share/nginx/html

# Otwórz port 80
EXPOSE 80

# Uruchom nginx
CMD ["nginx", "-g", "daemon off;"]
