ARG vivo_base_path="/vivo"

#########
FROM node:22-alpine as frontend-builder
ARG vivo_base_path

# Set the working directory to /app inside the container
WORKDIR /app

# Copy source files
COPY packages/frontend .

ENV NEXT_PUBLIC_VIVO_BASE_PATH=${vivo_base_path}
# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
SHELL ["/bin/ash", "-eo", "pipefail", "-c"]
RUN \
      apk add --no-cache git openssh && \
      yarn install --frozen-lockfile --network-timeout 1000000000 && \
      yarn next build && \
      yarn next export && \
      # There's no way to change absolute URL references in css files using next.js
      # config, so fix with sed (any urls that start with "/" will be prefixed)
      #
      # A possible more robust alternative (that wasn't tested) is writing a webpack loader
      # to perform the substituion during next.js build
      # https://github.com/vercel/next.js/discussions/36349#discussioncomment-2614989
      find out -name '*.css' -print0 | xargs -0 sed "s@url(/@url($NEXT_PUBLIC_VIVO_BASE_PATH/@g" -i

#########
FROM golang:1.22 as service-builder

# Ensure we produce a static binary to prevent issues between this image and the production one
ARG TARGETOS TARGETARCH
ENV GOOS=$TARGETOS GOARCH=$TARGETARCH CGO_ENABLED=0

# Working directory
WORKDIR /app

# Copy source files
COPY packages/service .

# Build the go app
RUN go build -o vivo-service -trimpath -tags netgo,osusergo .

######## Fluent Bit
FROM fluent/fluent-bit:2.2.2 as production
ARG vivo_base_path

### Set working directory
WORKDIR /app

### Copy built binary application from 'builder' image
COPY --from=service-builder /app/vivo-service .
### Copy frontend static files into "frontend" subdirectory
COPY --from=frontend-builder /app/out frontend
COPY packages/service/fluent-bit.conf .

# Expose ports
# ============

# Fluent Bit Forward Input
EXPOSE 24224

# Fluent Bit HTTP Input
EXPOSE 9880

# Fluent Bit webserver
EXPOSE 2020

# Fluent Bit vivo exporter
EXPOSE 2025

# Golang vivo proxy
EXPOSE 3000

### Run the binary application
ENV PATH="$PATH:/fluent-bit/bin/:/app/"
ENV NEXT_PUBLIC_VIVO_BASE_PATH=${vivo_base_path}

ENTRYPOINT ["/app/vivo-service", "-F", "./frontend"]
