import { Locator, Page } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly pageTitle: Locator;
    readonly cartBadge: Locator;
    readonly cartLink: Locator;

    constructor(page: Page) {
        this.page = page;
        this.pageTitle = page.getByTestId('title');
        this.cartBadge = page.getByTestId('shopping-cart-badge');
        this.cartLink = page.getByTestId('shopping-cart-link');
    }

    getTitle(): Locator {
        return this.pageTitle;
    }

    async addProductToCart(productName: string) {
        const productCard = this.page
            .getByTestId('inventory-item')
            .filter({ hasText: productName });
        await productCard.getByRole('button', { name: 'Add to cart' }).click();
    }

    getCartBadge(): Locator {
        return this.cartBadge;
    }

    async openCart() {
        await this.cartLink.click();
    }
}