FROM fluent/fluent-bit:2.0.5 as flb-downloader

FROM node:19 as builder

WORKDIR /build
COPY . .
RUN chown -R node:node /build
USER node

RUN yarn install && yarn build
RUN ./node_modules/.bin/tsc --noEmit false --outDir tsbuild

# TODO: require full node for dependencies
# https://github.com/calyptia/vivo/issues/23
FROM node:19 as prod

WORKDIR /app

COPY --from=flb-downloader /fluent-bit /fluent-bit
COPY --from=builder /build/.next/ ./.next/
COPY --from=builder /build/package.json .
COPY --from=builder /build/yarn.lock .
COPY --from=builder /build/tsbuild/server/ server/
COPY --from=builder /build/tsbuild/common/ common/

RUN chown -R node:node /app
USER node
RUN yarn install --production && yarn cache clean

ENV NODE_ENV=production
EXPOSE 5489
EXPOSE 24224

# Default to single user mode to simplify deployment
CMD [ "node", "server/index.js", "--single-user" ]

# dev target handles working with local files for development
FROM node:19 as dev

COPY --from=flb-downloader /fluent-bit /fluent-bit
COPY ./start.sh /usr/local/bin/start.sh

USER node
WORKDIR /home/node/code

EXPOSE 5489
EXPOSE 24224

# Supports passing parameters
ENTRYPOINT [ "/usr/local/bin/start.sh" ]
