#!/bin/sh
cd $1
yarn build
docker-compose build --no-cache $2

docker-compose up --force-recreate -d
cd ..