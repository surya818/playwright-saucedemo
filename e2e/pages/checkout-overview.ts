import { Locator, Page, expect } from "@playwright/test";

const cart_item = '(//div[@class="cart_item"])'
const item_cost = '//*[@class="summary_subtotal_label"]';
const tax = '//*[@class="summary_tax_label"]';
const total_price = '//*[@class="summary_total_label"]';
const finish_btn = '//*[@id="finish"]';





export class CheckoutOverView {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

    async getCartItemsCount() {
        const cartItems = await this.page.locator(cart_item);        
        const cartItemsCount = await cartItems.count();
        console.log('Number of items on the checkout page: ' + cartItemsCount);
        return cartItemsCount;
    }

    async getItemsTotalPrice() {
     const itemTotalPrice = await this.page.locator(item_cost).innerText();
     const price = parseFloat(itemTotalPrice.split('$')[1]);
     console.log('Total Price of Items added: ' + price);
     return price;                 
    }

    async getTax() {
        const taxValue = await this.page.locator(tax).innerText();
        const price = parseFloat(taxValue.split('$')[1]);
        console.log('Total Tax: ' + price);
        return price;   
        }   

    async getTotalPrice() {
        const totalPrice = await this.page.locator(total_price).innerText();
        const grandPrice = parseFloat(totalPrice.split('$')[1]);
        console.log('Grand Total Price: ' + grandPrice);
        return grandPrice;
    }
    async clickOnFinish() {
        await this.page.locator(finish_btn).click();
    }      
    
}