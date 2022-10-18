#!/bin/bash
set -eu
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

INGRESS_TIMEOUT=${INGRESS_TIMEOUT:-120s}

echo "Deploying Nginx ingress controller"
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml
kubectl wait --namespace ingress-nginx \
  --for=condition=ready pod \
  --selector=app.kubernetes.io/component=controller \
  --timeout="$INGRESS_TIMEOUT"

echo "Setting up Vivo ingress"
kubectl apply -f "$SCRIPT_DIR"/ingress.yaml
echo "Ingress setup complete"
