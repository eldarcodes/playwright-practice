import { test } from "../test-options";
import { expect } from "@playwright/test";

test("Input fields", async ({ page, globalsQaUrl }) => {
  await page.goto(globalsQaUrl);

  const frame = page.frameLocator('[rel-title="Photo Manager"] iframe');

  await frame
    .locator("li", { hasText: "High Tatras 2" })
    .dragTo(frame.locator("#trash"));

  // more precise way
  await frame.locator("li", { hasText: "High Tatras 4" }).hover();
  await page.mouse.down();
  await frame.locator("#trash").hover();
  await page.mouse.up();

  await expect(frame.locator("#trash li h5")).toHaveText([
    "High Tatras 2",
    "High Tatras 4",
  ]);
});
