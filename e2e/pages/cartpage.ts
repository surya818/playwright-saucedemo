import { Locator, Page, expect } from "@playwright/test";
import {Item} from '../models/item';
const cart_list = '//*[@id="cart_contents_container"]/div/div[1]'
const cart_item = '//*[@class="cart_item"]';
const cart_item_description = '//div[@class="cart_item_label"]';
const burgrMenu = '//*[@id="react-burger-menu-btn"]'
const checkoutButton = '//*[@id="checkout"]'


export class CartPage {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

   
    async getCartItems(): Promise<Locator> {
        const cartItems = await this.page.locator(cart_item);        
        const cartItemsCount = await cartItems.count();
        console.log('Number of cart items: ' + cartItemsCount);
        return cartItems;
    } 

    async getNthCartItem(n: number, cartItemsList: Locator): Promise<Item> {
        const cartItem = await  cartItemsList.locator(cart_item_description);
        const cartItemText = await cartItem.nth(n).innerText();
        const lines = cartItemText.split(/\r?\n/);
        let item: Item = new Item(lines[0],lines[1],lines[2]);
        item.logItem();
        return item;
    }

    async navigateToProductsPage() {
        await this.page.locator(burgrMenu).click();
        await this.page.locator('a:has-text("All Items")').click();
    }

    async clickOnCheckout() {
        await this.page.locator(checkoutButton).click();
    }   

}