FROM node:alpine

EXPOSE 3000

WORKDIR /usr/src
COPY tsconfig.json tsconfig.json
COPY package.json package.json

RUN yarn install --production=true && \
    yarn cache clean

COPY src src

RUN yarn add typescript && \
    yarn build && \
    yarn remove typescript && \
    yarn cache clean

CMD yarn start
