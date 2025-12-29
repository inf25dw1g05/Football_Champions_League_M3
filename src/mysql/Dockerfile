FROM mysql:8.0
ENV MYSQL_ROOT_PASSWORD='0000'
ENV MYSQL_DATABASE='champions_league'
COPY my.cnf /etc/mysql/conf.d/my.cnf
COPY ./mysql-init/ /docker-entrypoint-initdb.d/
EXPOSE 3306