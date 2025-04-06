FROM postgres:16-alpine

COPY init.sql /docker-entrypoint-initdb.d/

ENV POSTGRES_USER=root \
    POSTGRES_PASSWORD=secret \
    POSTGRES_DB=myapp