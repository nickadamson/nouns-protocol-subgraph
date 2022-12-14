#!/usr/bin/env bash

npx get-graphql-schema https://api.thegraph.com/subgraphs/name/nickadamson/nouns-builder-mainnet > ./types/nouns-builder-graph-schema.graphql
