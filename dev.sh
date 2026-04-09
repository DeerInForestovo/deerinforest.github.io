#!/bin/bash
cd "$(dirname "$0")/site"
sed -i 's/const DEFAULT_WAIT_TIMEOUT = 15 \* 1000/const DEFAULT_WAIT_TIMEOUT = 120 \* 1000/' \
  node_modules/gatsby/dist/utils/get-page-data.js
yarn dev
