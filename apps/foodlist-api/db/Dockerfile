FROM ubuntu as builder
COPY ./sql-scripts /build/sql-scripts
COPY ./create_init_sql.sh /build/sql-scripts
WORKDIR /build/sql-scripts
RUN bash create_init_sql.sh

FROM postgres:14.2
COPY --from=builder /build/sql-scripts/init.sql /docker-entrypoint-initdb.d/init.sql
ENV POSTGRES_PASSWORD=mysecretpassword

