import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';
import { CartPage } from '../pages/CartPage';
import { CheckoutPage } from '../pages/CheckoutPage';

test.describe('Робота з кошиком та оформлення замовлення', () => {
    let inventoryPage: InventoryPage;
    let cartPage: CartPage;
    let checkoutPage: CheckoutPage;

    test.beforeEach(async ({ page }) => {
        const loginPage = new LoginPage(page);
        inventoryPage = new InventoryPage(page);
        cartPage = new CartPage(page);
        checkoutPage = new CheckoutPage(page);

        await loginPage.open();
        await loginPage.login('standard_user', 'secret_sauce');
    });

    test('4. Додавання двох товарів у кошик', async () => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.addProductToCart('Sauce Labs Bike Light');

        await expect(inventoryPage.getCartBadge()).toHaveText('2');

        await inventoryPage.openCart();
        await expect(cartPage.getCartItems()).toHaveCount(2);
    });

    test('5. Повне оформлення замовлення', async () => {
        await inventoryPage.addProductToCart('Sauce Labs Backpack');
        await inventoryPage.openCart();
        await cartPage.goToCheckout();

        await checkoutPage.fillCustomerInfo('Andriy', 'Shvalov', '50000');
        await checkoutPage.finishOrder();

        await expect(checkoutPage.getCompleteHeader()).toHaveText(
            'Thank you for your order!'
        );
    });
});