import { DeploymentAPI, DeploymentAPIOptions, GitLabDeploymentAPIOptions } from '../lib/deployment-api';

import { WebClient } from '@slack/web-api';

jest.genMockFromModule('@slack/web-api');

let mockPostMessage = jest.fn(() => {
    return Promise.resolve();
});

jest.mock('@slack/web-api', () => {
    return {

        WebClient: jest.fn().mockImplementation(() => {
            return {
                chat: {
                    postMessage: mockPostMessage,
                },
            };
        }),
    };
});

beforeEach(() => {
    jest.clearAllMocks();
});

const defaultChannel = "releases";
const expectedDeploymentStartMessage = ":rocket: *Deployment Job started!*\n<https://gitlab.com/undefined|undefined> was started with Job <https://gitlab.com/undefined/-/jobs/undefined|#undefined> by undefined.\nCommit: <https://gitlab.com/undefined/commit/undefined|undefined> - *Git Ref*: `undefined`"


describe('Deployment API Tests', () => {

    const mockWebClient = new WebClient();
    describe('No options given', () => {
        it('It should instantiate with default options', async () => {
            // @ts-ignore
            let deploymentAPI = new DeploymentAPI().webClient(mockWebClient).build();
            await deploymentAPI.sendDeploymentStartMessage();
            // @ts-ignore
            expect(mockPostMessage).toBeCalledTimes(1);

            // @ts-ignore
            expect(mockPostMessage.mock.calls[0][0]).toEqual({channel: defaultChannel, text: expectedDeploymentStartMessage});
        });
    });

    describe('Not all options given',  () => {
        it("it should fill the other options when empty", async () => {
            let options = {} as GitLabDeploymentAPIOptions;
            let deploymentAPI = new DeploymentAPI().webClient(mockWebClient).build();
            await deploymentAPI.sendDeploymentStartMessage();

            // @ts-ignore
            expect(mockPostMessage.mock.calls[0][0]).toEqual({
                channel: defaultChannel,
                text: expectedDeploymentStartMessage
            });
        });

        it("it should fill the channel name from new options", async () => {
            let options = { channel: 'anotherchannel'} as GitLabDeploymentAPIOptions;
            let deploymentAPI = new DeploymentAPI().gitlabDeploymentOptions(options).webClient(mockWebClient).build();
            await deploymentAPI.sendDeploymentStartMessage();

            // @ts-ignore
            expect(mockPostMessage.mock.calls[0][0]).toEqual({
                channel: 'anotherchannel',
                text: expectedDeploymentStartMessage
            });
        });
    });
});
