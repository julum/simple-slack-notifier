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
const GitLabCISlackAPI = require('simple-slack-notifier');

const commitId = 'ba7b06204dfc05e140fe17e1c555169e0a1ffa30';
const token = '<Your Slack Application Token>';
const slack = new GitLabCISlackAPI();
slack.webClient(new WebClient(token)).gitlabOptions({
    commitId: commitId,
    projectName: '<GitLab Group>/<GitLab Project Name>',
    jobId: '123456789',
    gitRef: 'master',
    author: 'Super Developer',
}).build();
        
slack.sendDeploymentStartedMessage();
slack.sendDeploymentSuccessfulMessage();
slack.sendDeploymentFailedMessage();
```

### TypeScript
```typescript
import { GitLabCISlackAPI } from 'simple-slack-notifier';
import { WebClient } from '@slack/web-api';

const commitId = '<Commit Hash>';
const token = '<Your Slack Application Token>';
const slack = new GitLabCISlackAPI();
slack.webClient(new WebClient(token)).gitlabOptions({
    commitId: commitId,
    projectName: '<GitLab Group>/<GitLab Project Name>',
    jobId: '123456789',
    gitRef: 'master',
    author: 'Super Developer',
})
    .channel('myslackchannel').build();
        
slack.sendDeploymentStartedMessage();
slack.sendDeploymentSuccessfulMessage();
slack.sendDeploymentFailedMessage();
```

This will send three message your Slack Channel named `myslackchannel`.

## Test 
```sh
npm run test
```

## Coverage
```sh
npm run coverage
```
