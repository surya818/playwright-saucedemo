import { Page } from "@playwright/test";
import { PlayWrightActions } from "../../framework/playwright-actions.js";
const username = 'input[data-test="username"]'; 
const password = 'input[data-test="password"]';
const submit = 'input[type="submit"]';
const invalid_password_error = '//h3[@data-test=\'error\']';

export class LoginPageAlternate {
    page: Page
    actions: PlayWrightActions;
    constructor(page: Page) {
        this.page = page;
        this.actions = new PlayWrightActions(page);
    }
    async load() {
        await this.actions.load("https://www.saucedemo.com/");
    }   
    async enterUsername(uname: string) {
        await this.actions.typeText(username, uname);
    }   
    async enterPassword(pwd: string) {
        await this.actions.typeText(password, pwd);
    }       
    async clickSubmit() {
        await this.actions.clickOnElement(submit);
    }  
    async login(username: string, password: string): Promise<Page> {     
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickSubmit();
        return this.page;
    }  
             
}