// src/services/googleSheetsService.ts

import { google } from 'googleapis';

class GoogleSheetsService {
    private sheets: any;

    constructor() {
        const auth = new google.auth.GoogleAuth({
            keyFile: 'path/to/service-account.json',
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });
        this.sheets = google.sheets({ version: 'v4', auth });
    }

    public async readSpreadsheet(spreadsheetId: string, range: string) {
        const response = await this.sheets.spreadsheets.values.get({
            spreadsheetId,
            range,
        });
        return response.data.values;
    }
}

export default new GoogleSheetsService();