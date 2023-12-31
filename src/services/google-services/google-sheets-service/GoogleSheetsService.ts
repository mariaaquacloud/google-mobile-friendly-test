import {google} from 'googleapis';
import {sheets_v4 as sheets} from 'googleapis';

export class GoogleSheetsService {
  private client: Promise<sheets.Sheets>;

  private auth = new google.auth.GoogleAuth({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  constructor(apiKey: string) {
    this.client = this.getClient(apiKey);
  }

  private async getClient(apiKey: string): Promise<sheets.Sheets> {
    const authClient = this.auth.fromAPIKey(apiKey);
    google.options({auth: authClient});

    return google.sheets({version: 'v4'});
  }

  public async readUrls(
    spreadsheetId: string,
    range: string
  ): Promise<sheets.Schema$ValueRange> {
    return new Promise<sheets.Schema$ValueRange>(
      // eslint-disable-next-line no-async-promise-executor
      async (resolve, reject) => {
        try {
          const client = await this.client;

          const response = await client.spreadsheets.values.get({
            spreadsheetId: spreadsheetId,
            range: range,
          });

          resolve(response.data);
        } catch (error) {
          reject(error);
        }
      }
    );
  }
}
