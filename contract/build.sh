#!/bin/sh

echo ">> Building contract"

near-sdk-js build src/contract.ts build/near-crud.wasm
