import { test, expect } from "@playwright/test";

test("mobile", async ({ page }, testInfo) => {
  await page.goto("/");
  await page.locator(".sidebar-toggle").click();
  await page.getByText("Forms").click();
  await page.getByText("Form Layouts").click();
  await page.locator(".sidebar-toggle").click();

  const usingGridBlock = page.locator("nb-card", {
    hasText: "Using the Grid",
  });
  const emailInput = usingGridBlock.getByRole("textbox", { name: "Email" });
  await emailInput.fill("me@acme.com");
});
