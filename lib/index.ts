import { WebClient } from '@slack/web-api';
import { DeploymentAPI, DeploymentAPIOptions, GitLabDeploymentAPIOptions } from './deployment-api';

interface GitlabCISlackOptions {
    projectName: string;
    jobId: string;
    author: string;
    commitId: string;
    gitRef: string;
}

class GitLabCISlackAPI {

    private _webClient: WebClient | undefined;
    private _deploymentApi: DeploymentAPI | undefined;
    private _gitlabOptions: GitlabCISlackOptions | undefined;
    private _channel: string | undefined;
    private _built: boolean = false;

    public deploymentApi(deploymentAPI: DeploymentAPI): GitLabCISlackAPI {
        this._deploymentApi = deploymentAPI;
        return this;
    }

    public build(): GitLabCISlackAPI {
        this._built = true;
        let deploymentApi = new DeploymentAPI();

        if (this._webClient) {
            deploymentApi.webClient(this._webClient);
        }

        deploymentApi.gitlabDeploymentOptions({
            commitId: this._gitlabOptions?.commitId,
            projectName: this._gitlabOptions?.projectName,
            author: this._gitlabOptions?.author,
            jobId: this._gitlabOptions?.jobId,
            gitRef: this._gitlabOptions?.gitRef,
            channel: this._channel,
        } as GitLabDeploymentAPIOptions);
        deploymentApi.build();
        this._deploymentApi = deploymentApi;
        return this;
    }

    constructor(options: GitlabCISlackOptions = {} as GitlabCISlackOptions) {
        this._gitlabOptions = options;
    }

    webClient(webClient: WebClient): GitLabCISlackAPI {
        this._webClient = webClient;
        return this;
    }

    channel(channel: string) {
        this._channel = channel;
    }

    public async sendDeploymentStartedMessage() {
        if (this._built && this._deploymentApi) {
            await this._deploymentApi.sendDeploymentStartMessage();
        } else {
            throw new Error('You have to build the Slack API before use. Please run build()');
        }
    }

    public async sendDeploymentSuccessfulMessage() {
        if (this._built && this._deploymentApi) {

            await this._deploymentApi.sendDeploymentSuccessfulMessage();
        } else {
            throw new Error('You have to build the Slack API before use. Please run build()');
        }
    }

    public async sendDeploymentFailedMessage() {
        if (this._built && this._deploymentApi) {

            await this._deploymentApi.sendDeploymentFailedMessage();
        } else {
            throw new Error('You have to build the Slack API before use. Please run build()');
        }
    }

    gitlabOptions(gitlabOptions: GitlabCISlackOptions): GitLabCISlackAPI {
        this._gitlabOptions = gitlabOptions;
        return this;
    }
}

export { GitLabCISlackAPI, GitlabCISlackOptions };
