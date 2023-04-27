#!/bin/bash
set -eu

REMOTE_PORT=${REMOTE_PORT:-9010}

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
    if [[ -n "$PF_HTTP_PID" ]]; then
        kill -9 "$PF_HTTP_PID"
    fi
}

PF_HTTP_PID=""

trap cleanup err EXIT

# Set up local port forward to an ephemeral port and extract that port
LOCAL_HTTP_PORT=$(find_unused_port)

kubectl -n "${NAMESPACE:-default}" port-forward --address 127.0.0.1 svc/calyptia-vivo "${LOCAL_HTTP_PORT}:$REMOTE_PORT" &
PF_HTTP_PID=$!

echo "Using local port: $LOCAL_HTTP_PORT"
echo "Sending command"
until curl "$@" "http://localhost:${LOCAL_HTTP_PORT}"; do
    # Back off if an issue at startup with constructing the forward
    sleep 5
done

# Kill the port-forward now
kill -9 "$PF_HTTP_PID"
PF_HTTP_PID=""
