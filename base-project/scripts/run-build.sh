#!/bin/sh
PORT=[port of app] DEBUG=[level of debug. default value is 'app:*'] USER_DB=[username of postgres database] HOST_DB=[host of database. default value is database_pg] DATABASE_NAME=[database name] PASSWORD_DB=[password for postgres database] PORT_DB=[database port] SECRET=[secret to generate jwt token] node ./dist/server.js
