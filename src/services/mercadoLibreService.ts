// src/services/MercadoLibreService.ts

import fetch from 'node-fetch';
import { Token } from '../models/Token';
import { Product } from '../models/Product';

class MercadoLibreService {
    private clientId: string = process.env.MLA_CLIENT_ID || '';
    private clientSecret: string = process.env.MLA_CLIENT_SECRET || '';
    private redirectUri: string = process.env.MLA_REDIRECT_URI || '';
    private accessToken: string = '';
    private refreshToken: string = '';

    constructor() {
        this.loadAccessToken();
    }

    private async loadAccessToken() {
        const tokenData = await Token.findOne({ where: { id: 1 } });
        if (tokenData) {
            this.accessToken = tokenData.accessToken;
            this.refreshToken = tokenData.refreshToken;
            this.scheduleRefresh(tokenData.expiresIn);
        } else {
            this.refreshAccessToken();
        }
    }

    private async refreshAccessToken() {
        const tokenResponse = await fetch(`https://api.mercadolibre.com/oauth/token?grant_type=refresh_token&client_id=${this.clientId}&client_secret=${this.clientSecret}&refresh_token=${this.refreshToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!tokenResponse.ok) {
            throw new Error('Failed to refresh access token');
        }

        const tokenData = await tokenResponse.json();
        this.accessToken = tokenData.access_token;
        this.refreshToken = tokenData.refresh_token;

        await Token.upsert({
            id: 1,
            accessToken: this.accessToken,
            refreshToken: this.refreshToken,
        });

        this.scheduleRefresh(tokenData.expires_in);
    }

    private scheduleRefresh(expiresIn: number) {
        setTimeout(() => this.refreshAccessToken(), (expiresIn - 60) * 1000);
    }

    public async getProducts() {
        const response = await fetch('https://api.mercadolibre.com/users/{user_id}/items/search', {
            headers: {
                'Authorization': `Bearer ${this.accessToken}`
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        return data.results;
    }

    public async updateProduct(product: Product) {
        const response = await fetch(`https://api.mercadolibre.com/items/${product.sku}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                price: product.price_MLA,
                available_quantity: product.stock_MLA
            })
        });

        if (!response.ok) {
            throw new Error('Failed to update product');
        }

        const data = await response.json();
        return data;
    }
}

export default MercadoLibreService;