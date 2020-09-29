#!/bin/sh

build() {
  echo ======================= $1 =======================
  docker build ./$1 \
    --rm=false \
    -t reign/$1
}

if [ $1 ]; then
  build "$1"
else
  build api
  build web
  build populate-posts
fi
