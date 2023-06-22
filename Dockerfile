#########
FROM node:18-alpine as frontend-builder

# Set the working directory to /app inside the container
WORKDIR /app

# Copy source files
COPY packages/frontend .

# Install dependencies (npm ci makes sure the exact versions in the lockfile gets installed)
RUN apk add --no-cache git==2.40.1-r0 openssh==9.3_p1-r3 && yarn install && yarn next build && yarn next export

#########
FROM golang:1.20 as service-builder

ENV CGO_ENABLED=0

# Working directory
WORKDIR /app

# Copy source files
COPY packages/service .

# Build the go app
RUN go build -o vivo-service .

######## Fluent Bit
FROM fluent/fluent-bit:2.1.2 as production

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

# Golang vivo proxy
EXPOSE 8080

### Run the binary application
ENV PATH="$PATH:/fluent-bit/bin/:/app/"

ENTRYPOINT ["/app/vivo-service", "-F", "./frontend"]
