FROM fluent/fluent-bit:1.8 as flb-downloader

FROM node:18

COPY --from=flb-downloader /fluent-bit /fluent-bit
COPY dockerfiles/start.sh /usr/local/bin/start.sh

USER node

WORKDIR /home/node/code

CMD ["start.sh"]

EXPOSE 5489
EXPOSE 24224
