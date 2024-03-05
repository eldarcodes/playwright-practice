import { test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
  await page.getByText("Forms").click();
});

test("navigate to form layouts page", async ({ page }) => {
  await page.getByText("Form Layouts").click();
});

test("navigate to datepicker page", async ({ page }) => {
  await page.getByText("Datepicker").click();
});
