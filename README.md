# Chateer

P2P chat over WebRTC.

[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![Build Status](https://travis-ci.org/codealchemist/peer-chat.svg?branch=master)](https://travis-ci.org/codealchemist/peer-chat)

## Live app

[https://chateer.tk](https://chateer.tk)

## Development

Clone the repo, install dependencies and start the app.

```
git clone https://github.com/codealchemist/peer-chat
cd peer-chat
npm i
npm start
```

## About

**Chateer** is a chat application that leverages [WebRTC data channels](https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Using_data_channels)
to establish communication between peers.

Signaling, the process used to exchange networking information between peers,
is done using [WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API).

**Chateer** is intentionally limited to connect just two peers.

The first peer, called the _initiator_, is the one who creates a chat and can get a link to share it.

Once the share url is opened the signaling phase starts and a p2p connection is established ASAP.

The share url can only be used once.

If any peer tries to re-open the url the connection will be lost and a new one will be required to reestablish communication.

## Testing

**Chateer** uses [Jest](https://jestjs.io) and [Enzyme](https://github.com/airbnb/enzyme) for unit testing.

The coverage is really low at this point and this is something that needs to be enhanced.

Run unit tests during development (uses watch mode):

`npm run test:watch`

Run unit tests for CI operations (single pass, silent):

`npm test`
