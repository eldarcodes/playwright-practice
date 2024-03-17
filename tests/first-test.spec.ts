import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
});

test("Locator syntax rules", async ({ page }) => {
  await page.locator("input").first().click();
});

test("User facing locators", async ({ page }) => {
  await page.getByLabel("Email").first().click();
  await page.getByPlaceholder("Jane Doe").click();
});

test("Locating child elements", async ({ page }) => {
  await page.locator("nb-card nb-radio").getByText("Option 1").click();
});

test("Locating parent elements", async ({ page }) => {
  await page
    .locator("nb-card", { hasText: "Using the Grid" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card", { has: page.locator("#inputEmail1") })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" })
    .getByRole("textbox", { name: "Email" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator(".status-danger") })
    .getByRole("textbox", { name: "Password" })
    .click();

  await page
    .locator("nb-card")
    .filter({ has: page.locator("nb-checkbox") })
    .filter({ hasText: "Sign in" })
    .getByRole("textbox", { name: "Password" })
    .click();
});

test("Reusing locators", async ({ page }) => {
  const basicForm = await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" });

  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("me@acme.com");
  await basicForm.getByRole("textbox", { name: "Password" }).fill("123");
  await basicForm.locator("nb-checkbox").click();
  await basicForm.getByRole("button").click();

  await expect(emailField).toHaveValue("me@acme.com");
});

test("Extracting Values", async ({ page }) => {
  const basicForm = await page
    .locator("nb-card")
    .filter({ hasText: "Basic form" });

  const emailField = basicForm.getByRole("textbox", { name: "Email" });

  await emailField.fill("me@acme.com");

  const emailValue = await emailField.inputValue();
  const emailPlaceholder = await emailField.getAttribute("placeholder");

  await expect(emailPlaceholder).toEqual("Email");
  await expect(emailValue).toEqual("me@acme.com");
});
