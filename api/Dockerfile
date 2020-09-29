FROM node:alpine

EXPOSE 5000

WORKDIR /usr/src
COPY tsconfig.json tsconfig.json
COPY package.json package.json

RUN yarn install --production=true && \
    yarn cache clean

COPY src src

RUN yarn global add typescript && \
    tsc --build ./tsconfig.json && \
    yarn global remove typescript && \
    yarn cache clean

CMD node ./dist/index.js
