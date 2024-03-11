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

test("Lists", async ({ page }) => {
  const dropdownMenu = page.locator("ngx-header nb-select");
  await dropdownMenu.click();

  page.getByRole("list");
  page.getByRole("listitem");

  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

  await optionList.filter({ hasText: "Cosmic" }).click();
  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  for (const [theme, backgroundColor] of Object.entries(colors)) {
    await optionList.filter({ hasText: theme }).click();
    if (theme !== "Corporate") {
      await dropdownMenu.click();
    }
    await expect(header).toHaveCSS("background-color", backgroundColor);
  }
});

test("Tooltip", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const tooltipCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });

  const tooltipButton = tooltipCard.getByRole("button", { name: "Top" });
  await tooltipButton.hover();

  const tooltip = page.locator("nb-tooltip");
  await expect(tooltip).toHaveText("This is a tooltip");
});
