######### Go Builder
FROM golang:1.20 as builder

# Working directory
WORKDIR /app

ENV CGO_ENABLED=0

# Copy everything at /app
COPY . /app

# Build the go app
RUN go build -o vivo-service .

######## Fluent Bit
FROM fluent/fluent-bit:2.1.2 as production

### Set working directory
WORKDIR /app

### Copy built binary application from 'builder' image
COPY --from=builder /app/vivo-service .
COPY ./fluent-bit.conf .

# Expose ports
# ============

# Fluent Bit Forward Input
EXPOSE 24224

# Fluent Bit HTTP Input
EXPOSE 9880

# Fluent Bit webserver
EXPOSE 2020

# Vivo port
EXPOSE 2025

### Run the binary application
ENV PATH="$PATH:/fluent-bit/bin/:/app/"

ENTRYPOINT ["/app/vivo-service"]
