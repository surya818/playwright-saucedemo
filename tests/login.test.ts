import {test, chromium, expect, Page } from '@playwright/test';
import {LoginPage} from '../e2e/pages/loginpage';
import {ProductsPage} from '../e2e/pages/productspage';
import { testData } from '../data/testdata';

let baseUrl: string;
let loginPage: LoginPage;
const username = testData.staging.username;
const password = testData.staging.password;

test.describe('Successful Login', () => {
    test.beforeEach(async ({page}) => {

        baseUrl = testData.staging.baseURL;
        loginPage = new LoginPage(page);
        await loginPage.load();

    }
    );
    test("Verify successful login", async ({page}) => {
        await loginPage.login(username, password);
        let products: ProductsPage = new ProductsPage(page);
        await products.verifyHeader();  
        await products.verifyFooter();
    })

})

test.describe('Invalid Login', () => {
    const invalidPassword_errorText = 'Username and password do not match any user in this service';
    const lockedOutUser_errorText = 'Sorry, this user has been locked out.';
    test.beforeEach(async ({page}) => {

        baseUrl = testData.staging.baseURL;
        loginPage = new LoginPage(page);
        await loginPage.load();

    }
    );
    test("Verify login failure with Invalid Password", async ({page}) => {
        await loginPage.login("standard_user", "invalid_password");
        let errorText = await loginPage.getInvalidPasswordError();
        expect(errorText).toContain(invalidPassword_errorText);
    })

    test("Verify Locked out user cannot login", async ({page}) => {
        await loginPage.login("locked_out_user", "secret_sauce");
        let errorText = await loginPage.getInvalidPasswordError();
        expect(errorText).toContain(lockedOutUser_errorText);
    })

})


