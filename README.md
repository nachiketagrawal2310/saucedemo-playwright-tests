<h1>🧪 SauceDemo E2E Tests (Playwright)</h1>

<p>
This repository contains a suite of end-to-end (E2E) tests for the demo e-commerce website <strong>SauceDemo</strong>.  
The tests are written using <strong>Playwright</strong> in <strong>JavaScript</strong>.
</p>

<hr>

<h2>🎯 Target Application</h2>

<p><strong>URL:</strong> <a href="https://www.saucedemo.com/" target="_blank">https://www.saucedemo.com/</a></p>

<p><strong>About SauceDemo:</strong></p>
<p>
SauceDemo is a demo e-commerce web application designed for testing purposes. It features a catalog of products, a shopping cart, and a login system with various types of users, including standard, locked-out, and problem users.  
It is widely used for learning and practicing automated testing with tools like Playwright, Selenium, and Cypress.
</p>

<p><strong>Test Users:</strong></p>
<ul>
  <li><strong>standard_user</strong> – Successful login</li>
  <li><strong>locked_out_user</strong> – Failed login</li>
  <li><strong>Password (all users):</strong> <code>secret_sauce</code></li>
</ul>

<hr>

<h2>🧪 Tests Covered</h2>

<p>This test suite covers the following scenarios:</p>

<h3>1. Login & Authentication</h3>
<ul>
  <li><strong>Successful Login:</strong> Validates login for <code>standard_user</code> and navigation to inventory page.</li>
  <li><strong>Failed Login:</strong> Ensures <code>locked_out_user</code> cannot log in and receives proper error message.</li>
</ul>

<h3>2. Inventory & Cart</h3>
<ul>
  <li><strong>Product List:</strong> Confirms the product list is visible and contains 6 items.</li>
  <li><strong>Add to Cart:</strong> Adds an item, verifies button state changes, and cart badge updates.</li>
  <li><strong>Remove from Cart:</strong> Ensures item removal updates cart UI correctly.</li>
  <li><strong>Sort Products:</strong> Validates sorting by “Price (low to high)” and correct ordering.</li>
  <li><strong>Navigate to Cart:</strong> Ensures clicking the cart icon loads the correct page and shows added items.</li>
</ul>

<hr>

<h2>🚀 Getting Started</h2>

<h3>Prerequisites</h3>
<ul>
  <li>Node.js (v16+ recommended)</li>
  <li>npm (comes with Node.js)</li>
  <li>Playwright installed globally or locally via npm</li>
  <li>Playwright browser binaries installed</li>
</ul>

<hr>

<h3>Installation</h3>

<p><strong>1. Clone the repository:</strong></p>
<pre><code>git clone https://github.com/nachiketagrawal2310/saucedemo-playwright-tests.git
</code></pre>

<p><strong>2. Navigate to project directory:</strong></p>
<pre><code>cd saucedemo-playwright-tests
</code></pre>

<p><strong>3. Install dependencies:</strong></p>
<pre><code>npm install
</code></pre>

<p><strong>4. Install Playwright browsers:</strong></p>
<pre><code>npx playwright install
</code></pre>

<hr>

<h2>⚡ Running the Tests</h2>

<h3>Run all tests (headless)</h3>
<pre><code>npx playwright test
</code></pre>

<h3>Run all tests (headed mode)</h3>
<pre><code>npx playwright test --headed
</code></pre>

<h3>Run tests in UI mode</h3>
<pre><code>npx playwright test --ui
</code></pre>

<h3>Run a specific test file</h3>
<pre><code>npx playwright test tests/example.spec.js
</code></pre>

<hr>

<h2>📊 Viewing the Test Report</h2>

<p>After the test run, open the HTML report:</p>

<pre><code>npx playwright show-report
</code></pre>

<p>This command launches the test report in your default browser.</p>

<hr>
