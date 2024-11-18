import { Locator, Page, expect } from "@playwright/test";
import { faker } from '@faker-js/faker';

import {Item} from '../models/item';
const firstname = '//*[@id="first-name"]'
const lastname = '//*[@id="last-name"]'
const postalcode = '//*[@id="postal-code"]'
const continueButton = '//*[@id="continue"]'


export class CheckoutInfo {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

    async fillCheckoutForm() {
        await this.page.fill(firstname, faker.person.firstName());
        await this.page.fill(lastname, faker.person.lastName());
        await this.page.fill(postalcode, faker.address.zipCode());
    }   
    async clickOnContinue() {
        await this.page.locator(continueButton).click();        
    }
   
    
}