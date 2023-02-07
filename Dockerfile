FROM fluent/fluent-bit:2.0.9 as flb-downloader

FROM node:18 as builder

WORKDIR /build
COPY . .
RUN chown -R node:node /build
USER node

RUN yarn install --network-timeout 1000000 && yarn build
RUN ./node_modules/.bin/tsc --noEmit false --outDir tsbuild

# TODO: require full node for dependencies
# https://github.com/calyptia/vivo/issues/23
FROM node:18-slim as prod

# hadolint ignore=DL3008
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install --no-install-recommends -y \
    libsasl2-2 \
    libyaml-0-2 \
    libpq5 \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY --from=flb-downloader /fluent-bit /fluent-bit
COPY --from=builder /build/.next/ ./.next/
COPY --from=builder /build/package.json .
COPY --from=builder /build/yarn.lock .
COPY --from=builder /build/tsbuild/server/ server/
COPY --from=builder /build/tsbuild/common/ common/

RUN chown -R node:node /app
USER node
RUN yarn install --network-timeout 1000000 --production && yarn cache clean

ENV NODE_ENV=production
EXPOSE 5489
EXPOSE 24224

# Default to single user mode to simplify deployment
CMD [ "node", "server/index.js" ]

# dev target handles working with local files for development
FROM node:18 as dev

COPY --from=flb-downloader /fluent-bit /fluent-bit
COPY ./start.sh /usr/local/bin/start.sh

USER node
WORKDIR /home/node/code

EXPOSE 5489
EXPOSE 24224

# Supports passing parameters
ENTRYPOINT [ "/usr/local/bin/start.sh" ]
