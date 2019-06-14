# Stellar Anchor Server – Example Implementation
[![CircleCI](https://circleci.com/gh/stellar/stellar-anchor-server.svg?style=shield)](https://circleci.com/gh/accordeiro/stellar-anchor-server) [![Coverage Status](https://coveralls.io/repos/github/stellar/stellar-anchor-server/badge.svg?branch=master)](https://coveralls.io/github/accordeiro/stellar-anchor-server?branch=master)

This project is a WIP example implementation of a Stellar anchor server.

Its goal is to provide a community example implementation of [SEP 6](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0006.md) (and related SEPs [9](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0009.md), [10](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0010.md) and [12](https://github.com/stellar/stellar-protocol/blob/master/ecosystem/sep-0012.md)) to make it easier for anchors to integrate with the Stellar network, and enable wallets to seamlessly integrate with said anchor.

You can check the project's roadmap [here](https://github.com/stellar/stellar-anchor-server/milestones).

## Running the project locally

This project was built using node Dubnium (`v10.16.0`), npm `v6.9.0` and TypeScript `v3.3.3333`.

1. Install npm
1. Inside the repo's root, install the project's dependencies: `$ npm install`
1. You'll need a `.env` file (or the equivalent env vars defined). We provide a sample one, which you can copy and modify: `$ cp .env.example .env`
1. Run the project: `$ npm start`

## Running the tests

1. Install the dependencies as described in the previous section.
1. Run the tests: `$ npm test`
