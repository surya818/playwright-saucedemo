import { Locator, Page, expect } from "@playwright/test";
import {Item} from '../models/item';
const tex = '//*[@id="header_container"]/div[1]/div[2]'
const header = '//*[@id="header_container"]/div[1]/div[2]'
const footer = '//div[@data-test="footer-copy"]'
const shoopingCart = '//*[@id="shopping_cart_container"]'
const burgrMenu = '//*[@id="react-burger-menu-btn"]'
const headerText = 'Swag Labs';
const footerText = 'Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy';
const footerSocialMedia = '//*[@class="social"]'
const footer_linkedIn = '[data-test="social-linkedin"]';
const footer_twitter = '[data-test="social-twitter"]';
const footer_facebook = '[data-test="social-facebook"]';
const saucedemo_linkedin = 'https://www.linkedin.com/company/sauce-labs/';
const saucedemo_facebook = 'https://www.facebook.com/saucelabs';
const saucedemo_twitter = 'https://twitter.com/saucelabs';
const shoppingCartLink = '//*[@id="shopping_cart_container"]/a';
const addToCartButton = 'button:has-text("Add to cart")';

export class ProductsPage {
    page: Page
    constructor(page: Page) {
        this.page = page;
    }
    async verifyHeader() {
        await this.verifyHeaderText();
        await this.verifyShoppingCart();
        await this.verifyBurgerMenuEnabled();

    }

    async verifyFooter() {

        await this.verifyFooterText();
        await this.verifyFooterSocialMediaVisibility();
        await this.verifySocialMediaLinks();

    }

    async sortByPrice_LowToHigh() {
        const sortLocator = this.page.locator('select.product_sort_container');
        await sortLocator.selectOption({ value: 'lohi' });
    
    }

    async sortContainerLabel() {
        const sortLocator = this.page.locator('select.product_sort_container');
        return await sortLocator.inputValue();
    
    }

    

    async getAllProducts(): Promise<Locator> {
        const inventoryList = await this.page.locator('//div[@data-test="inventory-list"]');
        const inventoryItems = inventoryList.locator('//div[@data-test="inventory-item"]');        
        const inventoryItemsCount = await inventoryItems.count();
        console.log('Number of inventory items: ' + inventoryItemsCount);
        return inventoryItems;
    }   
    async addItemToCart(inventoryList: Locator, n: number) {
        const inventoryItems = await inventoryList.locator(addToCartButton);
        await inventoryItems.nth(n).click();
    }

    async nthItem(inventoryList: Locator, n: number): Promise<Item> {
        
        const priceLocator = await inventoryList.nth(n).locator('//div[@class="inventory_item_price"]'); 
        const price = await priceLocator.innerText();
        const descriptionLocator = await inventoryList.nth(n).locator('//div[@class="inventory_item_description"]'); 
        const description = await descriptionLocator.innerText();
        const lines = description.split(/\r?\n/);
        let item: Item = new Item(lines[0],lines[1],lines[2]);
        return item;
    }   

    async clickOnCartIcon() {
        const cartIconLocator = this.page.locator(shoppingCartLink);
        await cartIconLocator.click();
    }   
    private async verifyBurgerMenuEnabled() {
        const burgerMenuLocator = this.page.locator(burgrMenu);
        expect(await burgerMenuLocator.isEnabled()).toBeTruthy();
    }

    private async verifyShoppingCart() {
        const shoppingCartLocator = this.page.locator(shoopingCart);
        expect(await shoppingCartLocator.isEnabled()).toBeTruthy();
    }

    private async verifyHeaderText() {
        const headerLocator = this.page.locator(header);
        expect(await headerLocator.innerText()).toBe(headerText);
    }
    private async verifyFooterSocialMediaVisibility() {
        const footerSocialMediaLocator = this.page.locator(footerSocialMedia);
        expect(await footerSocialMediaLocator.isVisible()).toBeTruthy();
    }

    private async verifyFooterText() {
        const footerLocator = this.page.locator(footer);
        expect(await footerLocator.innerText()).toContain(footerText);
    }
    private async verifySocialMediaLinks() {
        const socialMediaList = await this.page.locator('ul.social'); // Adjust the selector
        //verify 3 social media links are present
        const items = await socialMediaList.locator('li');
        expect(await items.count()).toBe(3);

        //verify Twitter link
        await this.validateTwitterLink(socialMediaList);

        // Validate Facebook link
        await this.validateFacebookLink(socialMediaList);

        // Validate LinkedIn link
        await this.validateLinkedInLink(socialMediaList);
    }


    private async validateLinkedInLink(socialMediaList: any) {
        const linkedinLocator = socialMediaList.locator(footer_linkedIn);
        await expect(linkedinLocator).toHaveAttribute('href', saucedemo_linkedin);
    }

    private async validateFacebookLink(socialMediaList: any) {
        const facebookLocator = socialMediaList.locator(footer_facebook);
        await expect(facebookLocator).toHaveAttribute('href', saucedemo_facebook);
    }

    private async validateTwitterLink(socialMediaList: any) {
        const twitterLocator = socialMediaList.locator(footer_twitter);
        await expect(twitterLocator).toHaveAttribute('href', saucedemo_twitter);
    }
}
