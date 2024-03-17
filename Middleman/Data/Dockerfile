# Użyj oficjalnego obrazu MongoDB
FROM mongo:latest

# Ustaw zmienną środowiskową MONGO_INITDB_ROOT_USERNAME
ENV MONGO_INITDB_ROOT_USERNAME root

# Ustaw zmienną środowiskową MONGO_INITDB_ROOT_PASSWORD
ENV MONGO_INITDB_ROOT_PASSWORD root

# Ustaw zmienną środowiskową MONGO_INITDB_DATABASE
ENV MONGO_INITDB_DATABASE middleman

# Skopiuj plik skryptu do obrazu
COPY init-mongo.js /docker-entrypoint-initdb.d/

# Wystaw port 27017
EXPOSE 27017
