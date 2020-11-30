#!/bin/bash

set -eu

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd $REPO_ROOT/src

node main.js
