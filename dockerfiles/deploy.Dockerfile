FROM fluent/fluent-bit:1.8 as flb-downloader

FROM node:18 as builder

WORKDIR /build
COPY . .
RUN chown -R node:node /build
USER node

RUN yarn install
RUN yarn build
RUN ./node_modules/.bin/tsc --noEmit false --outDir tsbuild

FROM node:18 as prod

WORKDIR /app

COPY --from=flb-downloader /fluent-bit /fluent-bit
COPY --from=builder /build/.next/ ./.next/
COPY --from=builder /build/package.json .
COPY --from=builder /build/yarn.lock .
COPY --from=builder /build/tsbuild/server/ server/
COPY --from=builder /build/tsbuild/common/ common/
RUN chown -R node:node /app
USER node
RUN yarn install --production

ENV NODE_ENV=production
CMD ["node", "server/index.js"]

EXPOSE 3000
