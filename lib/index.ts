import { WebClient } from '@slack/web-api';
import { DeploymentAPI } from './deployment-api';

interface SlackOptions {
    deploymentChannel: string;
    slackToken: string;
}

class SlackAPI {
    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }


    get deploymentApi(): DeploymentAPI {
        return this._deploymentApi;
    }

    private _webClient: WebClient;
    private _deploymentApi: DeploymentAPI;
    private _token: string;

    constructor(options: SlackOptions) {
        this._token = options.slackToken;
        this._webClient = new WebClient(this._token);
        this._deploymentApi = new DeploymentAPI(this._webClient,
            options.deploymentChannel);
    }
}

export { SlackAPI };
