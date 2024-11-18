import { Locator, Page, expect } from "@playwright/test";

const thankyou_header = '//*[@class="complete-header"]';

const confirmation_message = '//*[@class="complete-text"]';





export class Confirmation {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

    async getConfirmationHeader() {
        const header = await this.page.locator(thankyou_header).innerText();
        console.log('Confirmation Header: ' + header);
        return header;
    }   
    async getConfirmationMessage() {
        const message = await this.page.locator(confirmation_message).innerText();
        console.log('Confirmation Message: ' + message);
        return message;
    }       
    
}