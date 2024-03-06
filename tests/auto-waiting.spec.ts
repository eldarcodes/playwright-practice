import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://uitestingplayground.com/ajax");
  await page.getByText("Button Triggering AJAX Request").click();
});

test("Auto-waiting example", async ({ page }) => {
  const successText = page.locator(".bg-success");
  await successText.click();

  await successText.waitFor({ state: "attached" });
  const text = await successText.allTextContents();

  expect(text).toContain("Data loaded with AJAX get request.");
});

test("Auto-waiting alternative ways", async ({ page }) => {
  const successText = page.locator(".bg-success");

  await page.waitForSelector(".bg-success");

  //   await page.waitForResponse("http://uitestingplayground.com/ajaxdata");
  //   await page.waitForLoadState("networkidle");

  const text = await successText.allTextContents();

  expect(text).toContain("Data loaded with AJAX get request.");
});
