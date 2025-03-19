import { Given, When, Then } from '@cucumber/cucumber';
import { Browser, Page, chromium } from 'playwright';
import { LoginPage } from '../pages/LoginPage';
import { PostPage } from '../pages/PostsPage';
import { expect } from '@playwright/test';

let browser: Browser;
let page: Page;
let loginPage: LoginPage;
let postPage: PostPage;

// 🚀 Ouverture du navigateur avant les tests
Given("I am logged in as {string}", async (username: string) => {
    browser = await chromium.launch({ headless: false });
    page = await browser.newPage();
    loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(username, "testeur_qa");
    postPage = new PostPage(page);
});

// 🚀 Navigation vers la section "Posts"
Given("I navigate to the {string} section", async (section: string) => {
    await postPage.goToPostsSection();
});

// 🚀 Création d'un nouveau post
When("I click on {string} to create a new post", async (buttonText: string) => {
    await postPage.clickAddNewPost();
});

// 🚀 Remplissage des champs "Title" et "Content"
When("I enter {string} in the {string} field", async (value: string, field: string) => {
    await postPage.fillField(field, value);
});

// 🚀 Laisser un champ vide
When("I leave the {string} field empty", async (field: string) => {
    await postPage.clearField(field);
});

// 🚀 Soumission du formulaire
When("I click the {string} button", async (buttonText: string) => {
    await postPage.clickButton(buttonText);
});

// 🚀 Vérification du message de confirmation
Then("I should see a confirmation message", async () => {
    const confirmationText = await postPage.getConfirmationMessage();
    expect(confirmationText).toContain("successfully.");
    await browser.close();
});


// 🚀 Vérification de l'erreur lorsque le titre est vide
Then("I should see an error message {string}", async (errorMessage: string) => {
    const errorText = await postPage.getErrorMessage();
    expect(errorText).toContain(errorMessage);
    await browser.close();
});

// 🚀 Fermeture du navigateur après les tests
Then("I close the browser", async () => {
    await browser.close();
});
