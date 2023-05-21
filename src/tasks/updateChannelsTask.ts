// src/tasks/updateChannelsTask.ts

import cron from 'node-cron';
import GoogleSheetsService from '../services/googleSheetsService';
import MercadoLibreService from '../services/mercadoLibreService';
import WooCommerceService from '../services/wooCommerceService';

class UpdateChannelsTask {
    constructor() {
        // Run the task every day at 12:00 AM
        cron.schedule('0 0 * * *', this.run);
    }

    private async run() {
        // Read data from Google Sheets
        const data = await GoogleSheetsService.readSpreadsheet('YOUR_SPREADSHEET_ID', 'Sheet1!A1:G100000'); // Replace with your spreadsheet ID and range
        for (const row of data) {
            const [sku, price_bwk, price_atopems, price_MLA, stock_bwk, stock_atopems, stock_MLA] = row;
            // Update MercadoLibre
            await MercadoLibreService.updateProduct(sku, price_MLA, stock_MLA);
            // Update WooCommerce One Channel
            await WooCommerceService.updateProduct(sku, price_bwk, stock_bwk);
            // Update WooCommerce Two Channel
            await WooCommerceService.updateProduct(sku, price_atopems, stock_atopems);
        }
    }
}

export default new UpdateChannelsTask();