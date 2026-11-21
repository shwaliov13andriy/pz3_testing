import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { InventoryPage } from '../pages/InventoryPage';

test.describe('Авторизація на сайті Swag Labs', () => {
    let loginPage: LoginPage;

    test.beforeEach(async ({ page }) => {
        loginPage = new LoginPage(page);
        await loginPage.open();
    });

    test('1. Успішний вхід під standard_user', async ({ page }) => {
        const inventoryPage = new InventoryPage(page);

        await loginPage.login('standard_user', 'secret_sauce');

        await expect(inventoryPage.getTitle()).toHaveText('Products');
    });

    test('2. Помилка при вході заблокованого користувача locked_out_user', async () => {
        await loginPage.login('locked_out_user', 'secret_sauce');

        await expect(loginPage.getErrorMessage()).toContainText(
            'Sorry, this user has been locked out.'
        );
    });

    test('3. Помилка при натисканні Login з порожніми полями', async () => {
        await loginPage.login('', '');

        await expect(loginPage.getErrorMessage()).toContainText(
            'Username is required'
        );
    });
});