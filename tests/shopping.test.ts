import { test, chromium, expect, Page } from '@playwright/test';
import { LoginPage } from '../e2e/pages/loginpage';
import { ProductsPage } from '../e2e/pages/productspage';
import { testData } from '../data/testdata';
import { CartPage } from '../e2e/pages/cartpage';
import { CheckoutInfo } from '../e2e/pages/checkout-info';
import { Item } from '../e2e/models/item';
import { CheckoutOverView } from '../e2e/pages/checkout-overview';
import { Confirmation } from '../e2e/pages/confirmationpage';
const atoZSortLabel = 'az';
import exp from 'constants';

let baseUrl: string;
let loginPage: LoginPage;
const username = testData.staging.username;
const password = testData.staging.password;

test.describe('Successful Login', () => {
    test.beforeEach(async ({ page }) => {

        baseUrl = testData.staging.baseURL;
        loginPage = new LoginPage(page);
        await loginPage.load();
        await loginPage.login(username, password);

    }
    )
    test("Purchase Product", async ({ page }) => {

        let productsPage: ProductsPage = new ProductsPage(page);
        //Sort the products by price low to high
        await productsPage.sortByPrice_LowToHigh();

        //Get the list of products and assert count
        let inventoryList = await productsPage.getAllProducts();
        let size = await inventoryList.count();
        expect(size).toBe(6);

        const lastElement = size - 1;
        let cumulativeItemPriceTotal = 0.0;
        let cartCount = 0;

        //Get Item details of the last product
        const lastProductItem = await productsPage.nthItem(inventoryList, lastElement);
        lastProductItem.logItem();
        cumulativeItemPriceTotal += parseFloat(lastProductItem.price.replace('$', ''));
        console.log('Total Price of Items added: ' + cumulativeItemPriceTotal);

        //Add the last product to the cart
        await productsPage.addItemToCart(inventoryList, lastElement);
        cartCount++;
        await productsPage.clickOnCartIcon();

        //Verify Cart and assert the cart item count to be 1
        let cartPage: CartPage = await verifyCartWithAddedItem(lastProductItem);
        await cartPage.navigateToProductsPage();

        //Sort the products by price low to high
        let current_sort_label = await productsPage.sortContainerLabel();
        expect(current_sort_label).toBe(atoZSortLabel);

        //Get the list of products and assert count
        inventoryList = await productsPage.getAllProducts();
        size = await inventoryList.count();
        const topRightProduct = 1;

        //Get Item details of the last product
        const topRightProductItem = await productsPage.nthItem(inventoryList, topRightProduct);
        topRightProductItem.logItem();
        cumulativeItemPriceTotal += parseFloat(topRightProductItem.price.replace('$', ''));
        console.log('Total Price of Items added: ' + cumulativeItemPriceTotal);

        //Add the last product to the cart
        await productsPage.addItemToCart(inventoryList, topRightProduct);
        cartCount++;
        await productsPage.clickOnCartIcon();

        //Verify Cart and assert the cart item count to be 2
        await verifyCartWithAddedItem(topRightProductItem);

        //Click on Checkout and fill the information
        await proceedToCheckout(cartPage, page);

        //Verify the checkout overview page
        await verifyCheckoutOverview(page, cartCount, cumulativeItemPriceTotal);

        //Verify the Order confirmation page
        await orderConfirmation(page);








        async function verifyCartWithAddedItem(item: Item) {
            let cartPage: CartPage = new CartPage(page);
            const cartList = await cartPage.getCartItems();
            let cartSize = await cartList.count();
            expect(cartSize).toBe(cartCount);
            const cartItem = await cartPage.getNthCartItem(cartCount - 1, cartList);
            expect(cartItem.name).toBe(item.name);
            expect(cartItem.price).toBe(item.price);
            expect(cartItem.description).toBe(item.description);
            return cartPage;
        }
    })
})

async function proceedToCheckout(cartPage: CartPage, page: Page) {
    await cartPage.clickOnCheckout();
    let checkoutInfoPage = new CheckoutInfo(page);
    await checkoutInfoPage.fillCheckoutForm();
    await checkoutInfoPage.clickOnContinue();
}

async function verifyCheckoutOverview(page: Page, cartCount: number, cumulativeItemPriceTotal: number) {
    let checkoutOverViewPage = new CheckoutOverView(page);
    let cartItemsCount = await checkoutOverViewPage.getCartItemsCount();
    let itemsTotalPrice = await checkoutOverViewPage.getItemsTotalPrice();
    expect(cartItemsCount).toBe(cartCount);
    expect(itemsTotalPrice).toBe(cumulativeItemPriceTotal);
    let tax = await checkoutOverViewPage.getTax();
    let grandTotal = await checkoutOverViewPage.getTotalPrice();
    expect(grandTotal).toBe(cumulativeItemPriceTotal + tax);
    checkoutOverViewPage.clickOnFinish();
}

async function orderConfirmation(page: Page) {
    let confirmationPage = new Confirmation(page);
    expect(await confirmationPage.getConfirmationHeader()).toBe('Thank you for your order!');
    expect(await confirmationPage.getConfirmationMessage()).toBe('Your order has been dispatched, and will arrive just as fast as the pony can get there!');
}
