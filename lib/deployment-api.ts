import { WebClient } from '@slack/web-api';

class DeploymentAPI {
    get channnel(): string {
        return this._channnel;
    }

    set channnel(value: string) {
        this._channnel = value;
    }

    private _webclient: WebClient;
    private _channnel: string;

    constructor(webClient: WebClient, channel: string) {
        this._webclient = webClient;
        this._channnel = channel;
    }

    public sendDeploymentStartMessage() {
        (async () => {
            await this._webclient.chat.postMessage({
                channel: this._channnel,
                text: 'Test',
            });
        })();
    }

}

export { DeploymentAPI }
