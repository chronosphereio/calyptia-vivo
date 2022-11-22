#!/bin/bash
set -eu

# Simple script to wrap a call to curl in a one-shot port-forward for it.
function find_unused_port() {
    local portnum
    while true; do
        portnum=$(shuf -i 1025-65535 -n 1)
        if ! lsof -Pi ":$portnum" -sTCP:LISTEN; then
            echo "$portnum"
            return 0
        fi
    done
    echo -1
    return 1
}

function cleanup() {
    if [[ -n "$PF_PID" ]]; then
        kill -9 "$PF_PID"
    fi
}

PF_PID=""

trap cleanup err EXIT

# Set up local port forward to an ephemeral port and extract that port
LOCAL_PORT=$(find_unused_port)

kubectl -n "${NAMESPACE:-default}" port-forward --address 127.0.0.1 svc/calyptia-vivo "${LOCAL_PORT}:5489" &
PF_PID=$!

echo "Using local port: $LOCAL_PORT"

echo "Waiting for forward to stabilise"
while [[ $(curl -o /dev/null --silent --head --write-out '%{http_code}' "http://localhost:$LOCAL_PORT/healthz/") != "200" ]]; do
    sleep 1
done

echo "Sending command"
curl "$@" "http://localhost:${LOCAL_PORT}/sink/"

# Kill the port-forward now
kill -9 "$PF_PID"
