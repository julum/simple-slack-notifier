const {SlackAPI} = require('../lib/index');

describe('Test', () => {
    it('should be true', () => {
        const slackAPI = new SlackAPI({
            slackToken: '',
            deploymentChannel: 'releases'
        });
    });
})
