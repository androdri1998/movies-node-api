#!/bin/sh
yarn build

cd ../another-project
yarn build

docker-compose build --no-cache
docker-compose up -d
