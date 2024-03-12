import { Page } from "@playwright/test";

import { HelperBase } from "./helper-base";

export class FormLayoutsPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  async submitUsingTheGridFormWithCredentials(
    email: string,
    password: string,
    optionText: string
  ) {
    const usingGridBlock = this.page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    await usingGridBlock.getByRole("textbox", { name: "Email" }).fill(email);
    await usingGridBlock
      .getByRole("textbox", { name: "Password" })
      .fill(password);
    await usingGridBlock
      .getByRole("radio", { name: optionText })
      .check({ force: true });

    await usingGridBlock.getByRole("button").click();
  }

  /**
   * This method fill out the inline form and submit it
   * @param name
   * @param email
   * @param rememberMe
   */
  async submitInlineFormWithCredentials(
    name: string,
    email: string,
    rememberMe: boolean
  ) {
    const inlineForm = this.page.locator("nb-card", {
      hasText: "Inline form",
    });

    await inlineForm.getByRole("textbox", { name: "Jane Doe" }).fill(name);
    await inlineForm.getByRole("textbox", { name: "Email" }).fill(email);

    if (rememberMe) {
      await inlineForm.getByRole("checkbox").check({ force: true });
    }

    await inlineForm.getByRole("button").click();
  }
}
