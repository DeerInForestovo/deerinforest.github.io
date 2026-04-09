#!/bin/bash
cd "$(dirname "$0")/site" && npx gatsby clean && yarn build && npx gatsby serve
