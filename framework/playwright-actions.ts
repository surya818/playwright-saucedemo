import {Page} from '@playwright/test';
import { UIActions } from './actions';
export class PlayWrightActions implements UIActions {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }

    async load(url: string) {
        await this.page.goto(url);
    }

    async clickOnElement(locator: string) {
        await this.page.locator(locator).click();
    }
    async typeText(locator: string, text: string) {       
        await this.page.locator(locator).type(text);
    }
    async getText(locator: string): Promise<string> {
        return await this.page.locator(locator).innerText();
    }   
    async getElementsCount(locator: string): Promise<number> {
        const elements = await this.page.locator(locator);        
        return await elements.count();
    }   
    async getNthElementText(locator: string, n: number): Promise<string> {
        const elements = await this.page.locator(locator);
        return await elements.nth(n).innerText();
    }   
    async clickOnNthElement(locator: string, n: number) {
        const elements = await this.page.locator(locator);
        await elements.nth(n).click();
    }   
    async waitForElement(locator: string) {
        await this.page.waitForSelector(locator);
    }  
    async findElement(locator: string) {
        return await this.page.locator(locator);
    }   

}