import { WebClient } from '@slack/web-api';

interface DeploymentAPIOptions {
    deploymentStartHeadline: string;
    deploymentSuccessfulHeadline: string;
    deploymentFailedHeadline: string;
    channel: string;

}

interface GitLabDeploymentAPIOptions extends DeploymentAPIOptions {
    commitId: string;
    projectName: string;
    jobId: string;
    gitRef: string;
    author: string;
}

const DEFAULT_DEPLOYMENT_OPTIONS = {
    channel: 'releases',
    deploymentStartHeadline: 'Deployment Job started!',
    deploymentSuccessfulHeadline: 'Deployment Job successful!',
    deploymentFailedHeadline: 'Deployment Job failed!',
} as GitLabDeploymentAPIOptions;

class DeploymentAPI {

    private _webclient: WebClient | undefined;
    private _deploymentApiOptions: GitLabDeploymentAPIOptions;
    private _built: boolean = false;

    build(): DeploymentAPI {
        this._built = true;
        return this;
    }

    constructor( options: GitLabDeploymentAPIOptions = DEFAULT_DEPLOYMENT_OPTIONS) {
        this._deploymentApiOptions = options;
    }

    gitlabDeploymentOptions(options: GitLabDeploymentAPIOptions): DeploymentAPI {
        this._deploymentApiOptions =
            {
                ...DEFAULT_DEPLOYMENT_OPTIONS,
                ...options,
            };
        return this;
    }

    public channel(channel: string): DeploymentAPI {
        this._deploymentApiOptions.channel = channel;
        return this;
    }

    webClient(webClient: WebClient): DeploymentAPI {
        this._webclient = webClient;
        return this;
    }

    buildDeploymentSuccessfulMessage(): string {
        let headerMessage = this._deploymentApiOptions.deploymentSuccessfulHeadline;

        let icon = ':white_check_mark:';
        let projectUrl = this.buildProjectUrl();
        let projectMarkdown = `<${projectUrl}|${this._deploymentApiOptions.projectName}>`;

        let jobUrl = this.buildJobUrl();
        let jobId = this._deploymentApiOptions.jobId;
        let jobMarkdown = `<${jobUrl}|#${jobId}>`;

        let author = this._deploymentApiOptions.author;

        let commitMarkdownLink = `<${this.buildCommitRefLink()}|${this._deploymentApiOptions.commitId}>`;
        let gitRef = `${this._deploymentApiOptions.gitRef}`;
        let message = `${icon} *${headerMessage}*\n` +
            `${projectMarkdown} was successful with Job ${jobMarkdown} by ${author}.\n` +
            `Commit: ${commitMarkdownLink} - *Git Ref*: \`${gitRef}\``;

        return message;
    }

    buildDeploymentFailedMessage(): string {
        let headerMessage = this._deploymentApiOptions.deploymentFailedHeadline;
        let icon = ':x:';
        let projectUrl = this.buildProjectUrl();
        let projectMarkdown = `<${projectUrl}|${this._deploymentApiOptions.projectName}>`;

        let jobUrl = this.buildJobUrl();
        let jobId = this._deploymentApiOptions.jobId;
        let jobMarkdown = `<${jobUrl}|#${jobId}>`;

        let author = this._deploymentApiOptions.author;

        let commitMarkdownLink = `<${this.buildCommitRefLink()}|${this._deploymentApiOptions.commitId}>`;
        let gitRef = `${this._deploymentApiOptions.gitRef}`;
        let message = `${icon} *${headerMessage}*\n` +
            `${projectMarkdown} failed at Job ${jobMarkdown} by ${author}.\n` +
            `Commit: ${commitMarkdownLink} - *Git Ref*: \`${gitRef}\``;

        return message;
    }

    buildCommitRefLink(): string {
        return `https://gitlab.com/${this._deploymentApiOptions.projectName}/commit/${this._deploymentApiOptions.commitId}`;
    }

    buildProjectUrl() {
        return `https://gitlab.com/${this._deploymentApiOptions.projectName}`
    }

    buildJobUrl() {
        return `https://gitlab.com/${this._deploymentApiOptions.projectName}/-/jobs/${this._deploymentApiOptions.jobId}`;
    }

    buildDeploymentStartMessage(): string {
        let headerMessage = this._deploymentApiOptions.deploymentStartHeadline;
        let icon = ':rocket:';
        let projectUrl = this.buildProjectUrl();
        let projectMarkdown = `<${projectUrl}|${this._deploymentApiOptions.projectName}>`;

        let jobUrl = this.buildJobUrl();
        let jobId = this._deploymentApiOptions.jobId;
        let jobMarkdown = `<${jobUrl}|#${jobId}>`;

        let author = this._deploymentApiOptions.author;

        let commitMarkdownLink = `<${this.buildCommitRefLink()}|${this._deploymentApiOptions.commitId}>`;
        let gitRef = `${this._deploymentApiOptions.gitRef}`;
        let message = `${icon} *${headerMessage}*\n` +
            `${projectMarkdown} was started with Job ${jobMarkdown} by ${author}.\n` +
            `Commit: ${commitMarkdownLink} - *Git Ref*: \`${gitRef}\``;

        return message;
    }

    public async sendDeploymentStartMessage() {
        const message = this.buildDeploymentStartMessage();
        await this.sendMessage(message);
    }

    public async sendDeploymentSuccessfulMessage() {
        const message = this.buildDeploymentSuccessfulMessage();
        await this.sendMessage(message);
    }

    async sendDeploymentFailedMessage() {
        const message = this.buildDeploymentFailedMessage();
        await this.sendMessage(message);
    }

    async sendMessage(message: string) {
        if(!this._built || this._webclient === undefined) {
            throw new Error("You have to run build() and define a webClient before using the DeploymentAPI");
        }
        await this._webclient.chat.postMessage({
            channel: this._deploymentApiOptions.channel,
            text: message,
        });
    }
}

export { DeploymentAPI, GitLabDeploymentAPIOptions, DeploymentAPIOptions }
