#!/bin/bash

set -eu

REPO_ROOT="$(git rev-parse --show-toplevel)"

cd $REPO_ROOT/server
watchexec --restart --watch index.ts -- yarn ts-node server/index.ts
