import { WebClient } from '@slack/web-api';
import { DeploymentAPI } from '../lib/deployment-api';
const {GitLabCISlackAPI} = require('../lib/index');

jest.genMockFromModule('@slack/web-api');

let mockSendDeploymentStartMessage = jest.fn(() => {
    return Promise.resolve();
})

jest.mock('../lib/deployment-api', () => {
    return {
        DeploymentAPI: jest.fn().mockImplementation(() => {
            return {
                build: () => {},
                sendDeploymentStartMessage: mockSendDeploymentStartMessage,
                gitlabDeploymentOptions: () => {},
            };
        })
    }
});

jest.mock('@slack/web-api', () => {
    return {
        WebClient: jest.fn().mockImplementation((t: string) => {
            return {};
        }),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

describe('Test', () => {
    it('Initial Test', async () => {

        const slackAPI = new GitLabCISlackAPI({
            deploymentApiOptions: {
            },
            slackToken: '',
        }).deploymentApi(new DeploymentAPI().build()).build();

        await slackAPI.sendDeploymentStartedMessage();
        // @ts-ignore
        expect(mockSendDeploymentStartMessage.mock.calls.length).toEqual(1);
    });
})
