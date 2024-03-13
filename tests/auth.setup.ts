import { test as setup } from "@playwright/test";

const authFile = ".auth/user.json";

setup("Authentication", async ({ page }) => {
  await page.goto("https://angular.realworld.how/");
  await page.getByText("Sign in").click();
  await page.getByRole("textbox", { name: "Email" }).fill("eldar@eldar.com");
  await page.getByRole("textbox", { name: "Password" }).fill("eldar");
  await page.getByRole("button").click();

  await page.waitForResponse("https://api.realworld.io/api/tags");

  await page.context().storageState({ path: authFile });
});
