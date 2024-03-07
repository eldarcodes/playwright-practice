import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layouts Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Input fields", async ({ page }) => {
    const usingGridBlock = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    const emailInput = usingGridBlock.getByRole("textbox", { name: "Email" });

    await emailInput.pressSequentially("me@acme.com", { delay: 300 });

    const inputValue = await emailInput.inputValue();

    expect(inputValue).toEqual("me@acme.com");

    await expect(emailInput).toHaveValue("me@acme.com");
  });

  test("Radio buttons", async ({ page }) => {
    const usingGridBlock = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    await usingGridBlock
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });

    const radioStatus = await usingGridBlock
      .getByRole("radio", { name: "Option 1" })
      .isChecked();

    expect(radioStatus).toBeTruthy();

    await usingGridBlock
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    expect(
      await usingGridBlock.getByRole("radio", { name: "Option 1" }).isChecked()
    ).toBeFalsy();

    expect(
      await usingGridBlock.getByRole("radio", { name: "Option 2" }).isChecked()
    ).toBeTruthy();
  });
});

test("Checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  const allBoxes = page.getByRole("checkbox");

  for (const box of await allBoxes.all()) {
    await box.check({ force: true });
    expect(await box.isChecked()).toBeTruthy();
  }

  for (const box of await allBoxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});
