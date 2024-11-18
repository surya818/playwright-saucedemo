import {test, chromium, Page, expect} from '@playwright/test';

test.describe('New Test', () => {
   
test("Launch sauce page", async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();
    page.goto("https://www.saucedemo.com/");
    await page.locator('input[data-test="username"]').fill("standard_user");
    await page.locator('input[data-test="password"]').fill("secret_sauce");
    await page.locator('input[type="submit"]').click();
    expect(page.locator('tag=span').getByText('Products'));
    const sel = page.locator('select.product_sort_container[data-test="product-sort-container"]');
    let size = sel.count();
    expect(page.url()).toBe("https://www.saucedemo.com/inventory.html");
    expect(await page.locator('span.title[data-test="title"]').innerText()).toBe("Products");

}
    )
})