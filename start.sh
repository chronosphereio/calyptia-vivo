#!/bin/sh 
set -eux

if [ ! -d node_modules ]; then
	# first run, install dependencies
	yarn
fi

exec yarn dev "$@"
