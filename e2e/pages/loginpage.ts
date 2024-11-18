import { Page } from "@playwright/test";
const username = 'input[data-test="username"]'; 
const password = 'input[data-test="password"]';
const submit = 'input[type="submit"]';
const invalid_password_error = '//h3[@data-test=\'error\']';

export class LoginPage {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }
    async load() {
        await this.page.goto("https://www.saucedemo.com/");
    }   
    async enterUsername(uname: string) {
        await this.page.locator(username).fill(uname);
    }   
    async enterPassword(pwd: string) {
        await this.page.locator(password).fill(pwd);
    }       
    async clickSubmit() {
        await this.page.locator(submit).click();
    }  
    async login(username: string, password: string): Promise<Page> {     
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSubmit();
        return this.page;
    }  
    async getInvalidPasswordError(): Promise<string> {
        return await this.page.locator(invalid_password_error).innerText();
    }          
}