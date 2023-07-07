import * as services from './services/index';
import * as gcInterfaces from './interfaces/GoogleCloudInterfaces';

const apiKey = process.env.GOOGLE_AUTH_TOKEN as string;
const chunkSize = parseInt(process.env.CHUNK_SIZE as string);
const spreadsheetId = process.env.GOOGLE_SPREADSHEET_ID as string;
const spreadsheetRange = process.env.GOOGLE_SPREADSHEET_RANGE as string;

const urls: string[] = [];
const testResults: gcInterfaces.MobileFriendlyTestResult[] = [];

async function main() {
  const gSearchConsole = new services.GoogleSearchConsoleService(apiKey);
  const gSheets = new services.GoogleSheetsService(apiKey);

  const response = await gSheets.readUrls(spreadsheetId, spreadsheetRange);

  if (response.values) {
    response.values?.forEach(x => urls.push(...x));

    for (let index = 0; index < urls.length; index += chunkSize) {
      const response = await Promise.all(
        urls.slice(index, index + chunkSize).map(async url => {
          const response = await gSearchConsole.mobileFriendlyTestRun(url);

          return {
            status: response.testStatus?.status,
            result: response.mobileFriendliness,
            url: url,
          } as gcInterfaces.MobileFriendlyTestResult;
        })
      );

      testResults.push(...response);
    }
  }

  console.table(testResults);
}

main().catch(e => {
  console.error(e);
  throw e;
});
