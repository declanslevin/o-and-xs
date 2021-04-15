#!/bin/bash

set -eu

REPO_ROOT="$(git rev-parse --show-toplevel)"

cd $REPO_ROOT
yarn ts-node server/index.ts
