const { test, expect } = require('@playwright/test');

// Test suite for Login functionality
test.describe('Login / Authentication', () => {

  test('should allow a standard user to log in successfully', async ({ page }) => {
    // Navigate to the base URL
    await page.goto('https://www.saucedemo.com/');
    
    // Fill in credentials
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Click login
    await page.locator('[data-test="login-button"]').click();
    
    // Assert navigation to the inventory page
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    
    // Assert the "Products" title is visible
    await expect(page.locator('.title')).toBeVisible();
    await expect(page.locator('.title')).toHaveText('Products');
  });

  test('should show an error message for a locked out user', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    
    // Fill in credentials for a locked-out user
    await page.locator('[data-test="username"]').fill('locked_out_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    
    // Click login
    await page.locator('[data-test="login-button"]').click();
    
    // Assert the error message is visible
    const errorLocator = page.locator('[data-test="error"]');
    await expect(errorLocator).toBeVisible();
    
    // Assert the error message text
    await expect(errorLocator).toHaveText('Epic sadface: Sorry, this user has been locked out.');
    
    // Assert the URL has not changed
    await expect(page).not.toHaveURL('https://www.saucedemo.com/inventory.html');
  });
});

// Test suite for Inventory and Cart functionality
// We use test.beforeEach to log in as a standard user before every test in this suite.
test.describe('Inventory and Cart', () => {
  
  // Log in as a standard user before each test in this describe block
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    
    // Wait for the inventory page to load
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
  });

  test('should display the products list', async ({ page }) => {
    // Assert the "Products" title is visible
    await expect(page.locator('.title')).toBeVisible();
    
    // Assert the inventory list is visible
    await expect(page.locator('.inventory_list')).toBeVisible();
    
    // Assert that there are 6 inventory items
    const items = await page.locator('.inventory_item').all();
    expect(items.length).toBe(6);
  });

  test('should add an item to the cart', async ({ page }) => {
    // Locate the "Add to cart" button for the Sauce Labs Backpack
    const addButton = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
    
    // Assert initial state
    await expect(addButton).toHaveText('Add to cart');
    
    // Click the button
    await addButton.click();
    
    // Assert the button text changes to "Remove"
    await expect(page.locator('[data-test="remove-sauce-labs-backpack"]')).toHaveText('Remove');
    
    // Assert the shopping cart badge shows "1"
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');
  });

  test('should remove an item from the cart', async ({ page }) => {
    // First, add the item
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    
    // Verify it was added
    const cartBadge = page.locator('.shopping_cart_badge');
    await expect(cartBadge).toBeVisible();
    await expect(cartBadge).toHaveText('1');

    // Now, remove the item
    const removeButton = page.locator('[data-test="remove-sauce-labs-backpack"]');
    await removeButton.click();

    // Assert the cart badge is no longer visible
    await expect(cartBadge).not.toBeVisible();

    // Assert the button text changes back to "Add to cart"
    await expect(page.locator('[data-test="add-to-cart-sauce-labs-backpack"]')).toBeVisible();
  });

  test('should sort items by Price (low to high)', async ({ page }) => {
    // Select the "Price (low to high)" option
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
    // Add the Sauce Labs Backpack to the cart
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
    // await page.close();
  });
});