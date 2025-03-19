import { Page } from 'playwright';

export class PostPage {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goToPostsSection() {
        await this.page.click("text=Posts");
    }

    async clickAddNewPost() {
        await this.page.click("text=Add");
    }

    async fillField(fieldName: string, value: string) {
        const fieldSelector = fieldName.toLowerCase() === "title" ? "#id_title" : "#id_content";
        await this.page.fill(fieldSelector, value);
    }

    async clearField(fieldName: string) {
        const fieldSelector = fieldName.toLowerCase() === "title" ? "#id_title" : "#id_content";
        await this.page.fill(fieldSelector, "");
    }

    async clickButton(buttonText: string) {
        await this.page.click(`text=${buttonText}`);
    }

    async getConfirmationMessage(): Promise<string> {
        const message = await this.page.textContent(".success");
        return message ?? ""; 
    }

    async getErrorMessage(): Promise<string> {
        const error = await this.page.textContent(".errorlist");
        return error ?? "";
    }

    async isPostInList(postTitle: string): Promise<boolean> {
        return await this.page.isVisible(`text=${postTitle}`);
    }
}
