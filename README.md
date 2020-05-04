# Slack Notifier
[![Build Status](https://travis-ci.org/julum/simple-slack-notifier.svg?branch=master)](https://travis-ci.org/julum/simple-slack-notifier)
[![Coverage Status](https://coveralls.io/repos/github/julum/simple-slack-notifier/badge.svg?branch=master)](https://coveralls.io/github/julum/simple-slack-notifier?branch=master)
[![MIT license](https://img.shields.io/badge/License-MIT-blue.svg)](https://lbesson.mit-license.org/)

A Node.js Module to send Slack messages to a specific channel.

## Installation 
```sh
npm install simple-slack-notifier --save
yarn add simple-slack-notifier
```

## Usage
### Javascript
```javascript
const SlackAPI = require('simple-slack-notifier');

const slackApi = new SlackAPI({ token: '', deploymentChannel: 'releases'});
slackApi.deploymentApi.sendDeploymentStartMessage();
```

### TypeScript
```typescript
import { SlackAPI } from 'simple-slack-notifier';

const slackApi = new SlackAPI({ token: '', deploymentChannel: 'releases' });
slackApi.deploymentApi.sendDeploymentStartMessage();

```

## Test 
```sh
npm run test
```

## Coverage
```sh
npm run coverage
```
