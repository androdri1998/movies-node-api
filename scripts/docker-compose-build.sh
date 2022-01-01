#!/bin/sh
cd base-project
yarn build

# to do this to each forder service used at docker-compose
# cd ..
# cd another-project
# yarn build

docker-compose build --no-cache
docker-compose up -d
