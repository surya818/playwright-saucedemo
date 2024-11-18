import {test, chromium, expect, Page } from '@playwright/test';
import {LoginPage} from '../e2e/pages/loginpage';
import {ProductsPage} from '../e2e/pages/productspage';
import { testData } from '../data/testdata';
import { LoginPageAlternate } from '../e2e/pages/loginpage-alternate';

let baseUrl: string;
let loginPage: LoginPageAlternate;
const username = testData.staging.username;
const password = testData.staging.password;

test.describe('Successful Login Framework', () => {
    test.beforeEach(async ({page}) => {

        baseUrl = testData.staging.baseURL;
        loginPage = new LoginPageAlternate(page);
        await loginPage.load();

    }
    );
    test("Verify successful login framework", async ({}) => {
        await loginPage.login(username, password);
    })

})




