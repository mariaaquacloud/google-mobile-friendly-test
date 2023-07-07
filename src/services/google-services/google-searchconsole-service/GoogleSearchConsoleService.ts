import {google} from 'googleapis';
import {searchconsole_v1 as searchconsole} from 'googleapis';

export class GoogleSearchConsoleService {
  private client: Promise<searchconsole.Searchconsole>;
  private apiKey: string;

  private auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/cloud-platform'],
  });

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = this.getClient();
  }

  private async getClient(): Promise<searchconsole.Searchconsole> {
    const authClient = this.auth.fromAPIKey(this.apiKey);
    google.options({auth: authClient});

    return google.searchconsole({version: 'v1'});
  }

  public async mobileFriendlyTestRun(
    url: string
  ): Promise<searchconsole.Schema$RunMobileFriendlyTestResponse> {
    return new Promise<searchconsole.Schema$RunMobileFriendlyTestResponse>(
      // eslint-disable-next-line no-async-promise-executor
      async (resolve, reject) => {
        try {
          const client = await this.client;

          const response = await client.urlTestingTools.mobileFriendlyTest.run({
            requestBody: {
              requestScreenshot: false,
              url: url,
            },
          });

          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      }
    );
  }
}
