FROM node:alpine

EXPOSE 4000

WORKDIR /usr/src
COPY original-tsconfig.json tsconfig.json

WORKDIR /usr/src/services/current
COPY tsconfig.json tsconfig.json
COPY package.json package.json

RUN yarn install --production=true && \
    yarn global add typescript && \
    yarn cache clean

COPY src src
RUN yarn build

CMD yarn start