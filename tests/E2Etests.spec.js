import { test, expect } from '@playwright/test';

// Test suite for Login functionality
test.describe('Login / Authentication', () => {

  test('should allow a standard user to log in successfully', async ({ page }) => {

    await page.goto('https://www.saucedemo.com/');
    
    // Fill in credentials
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    

    await page.locator('[data-test="login-button"]').click();
    

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    

    await expect(page.locator('.title')).toBeVisible();
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should show an error message for a locked out user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    

    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    

    await page.locator('[data-test="login-button"]').click();
    

    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    
    // Assert the error message text
    await expect(errorLocator).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    
    // Assert the URL has not changed
    await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});


test.describe('Inventory and Cart', () => {
  
  // Log in as a standard user before each test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    

    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('should display the products list', async ({ page }) => {

    await expect(page.locator('.title')).toBeVisible();
    

    await expect(page.locator('.inventory_list')).toBeVisible();
    

    const items = await page.locator('.inventory_item').all();
    expect(items.length).toBe(6);
  });

  test('should add an item to the cart', async ({ page }) => {

    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    

    await expect(addButton).toHaveText('Add to cart');
    

    await addButton.click();
    

    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');
    

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
  });

  test('should remove an item from the cart', async ({ page }) => {

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    

    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');


    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await removeButton.click();


    await expect(cartBadge).not.toBeVisible();


    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
  });

  test('should sort items by Price (low to high)', async ({ page }) => {

    await page.locator("//select[@class='product_sort_container']").selectOption('Price (low to high)');

    // Get all item prices
    const prices = await page.locator('.inventory_item_price').allTextContents();
    
    // Convert text prices to numbers (e.g., "$7.99" -> 7.99)
    const numericPrices = prices.map(p => parseFloat(p.replace('$', '')));

    // Create a sorted version of the array to compare against
    const sortedPrices = [...numericPrices].sort((a, b) => a - b);
    
    // Assert that the displayed prices are equal to the sorted prices
    expect(numericPrices).toEqual(sortedPrices);

    // Optional: Check the first item to be sure
    const firstItemName = page.locator('.inventory_item_name').first();
    await expect(firstItemName).toHaveText('Sauce Labs Onesie');
  });

  test('should navigate to the cart and see the added item', async ({ page }) => {

    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();

    // Click the shopping cart icon
    await page.locator('.shopping_cart_link').click();

    // Assert navigation to the cart page
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');

    // Assert the item is visible in the cart
    const cartItemName = page.locator('.inventory_item_name');
    await expect(cartItemName).toBeVisible();
    await expect(cartItemName).toHaveText('Sauce Labs Backpack');

    await page.waitForTimeout(3000);
    await page.close();
  });
});