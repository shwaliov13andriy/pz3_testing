import { Locator, Page } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly cartItems: Locator;
    readonly checkoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.cartItems = page.getByTestId('inventory-item');
        this.checkoutButton = page.getByTestId('checkout');
    }

    getCartItems(): Locator {
        return this.cartItems;
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}