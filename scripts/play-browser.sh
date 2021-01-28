#!/bin/bash

set -eu

REPO_ROOT="$(git rev-parse --show-toplevel)"

yarn sass:compile
open $REPO_ROOT/server/index.html
cd $REPO_ROOT/server/ && node index.js
