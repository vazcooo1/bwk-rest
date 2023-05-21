// src/services/wooCommerceService.ts

import fetch from 'node-fetch';

class WooCommerceService {
    private baseUrl = 'https://yourstore.com/wp-json/wc/v3'; // Replace with your store URL
    private auth = 'Basic ' + Buffer.from('consumer_key:consumer_secret').toString('base64'); // Replace with your keys

    public async getProducts() {
        const response = await fetch(`${this.baseUrl}/products`, {
            headers: { 'Authorization': this.auth }
        });
        return response.json();
    }

    public async updateProduct(sku: string, price: number, stock: number) {
        const products = await this.getProducts();
        const product = products.find((p: any) => p.sku === sku);
        if (product) {
            const response = await fetch(`${this.baseUrl}/products/${product.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': this.auth,
                },
                body: JSON.stringify({
                    regular_price: price.toString(),
                    stock_quantity: stock,
                }),
            });
            return response.json();
        }
    }
}

export default new WooCommerceService();