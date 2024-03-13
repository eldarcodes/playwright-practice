import { test, expect } from "@playwright/test";
import tags from "../test-data/tags.json";

test.beforeEach(async ({ page }) => {
  await page.route("*/**/api/tags", async (route) => {
    await route.fulfill({
      body: JSON.stringify(tags),
    });
  });

  await page.goto("https://angular.realworld.how/");

  await page.getByText("Sign in").click();
  await page.getByRole("textbox", { name: "Email" }).fill("eldar@eldar.com");
  await page.getByRole("textbox", { name: "Password" }).fill("eldar");
  await page.getByRole("button").click();
});

test("Has title", async ({ page }) => {
  await page.route("*/**/api/articles*", async (route) => {
    const response = await route.fetch();
    const responseBody = await response.json();
    responseBody.articles[0].title = "This is updated MOCK title";
    responseBody.articles[0].description = "This is updated MOCK description";

    await route.fulfill({
      body: JSON.stringify(responseBody),
    });
  });

  await page.getByText("Global Feed").click();

  await expect(page.locator(".navbar-brand")).toHaveText("conduit");
  await expect(page.locator("app-article-list h1").first()).toContainText(
    "This is updated MOCK title"
  );
  await expect(page.locator("app-article-list p").first()).toContainText(
    "This is updated MOCK description"
  );
});

test("Delete article", async ({ page, request }) => {
  const response = await request.post(
    "https://api.realworld.io/api/users/login",
    {
      data: {
        user: {
          email: "eldar@eldar.com",
          password: "eldar",
        },
      },
    }
  );

  const responseBody = await response.json();
  const accessToken = responseBody.user.token;

  const responseArticle = await request.post(
    "https://api.realworld.io/api/articles",
    {
      data: {
        article: {
          title: "Eldar test article title",
          description: "Eldar test article description",
          body: "Eldar test article body",
          tagList: ["Eldar test article tag"],
        },
      },
      headers: {
        Authorization: `Token ${accessToken}`,
      },
    }
  );

  expect(responseArticle.status()).toBe(201);

  await page.getByText("Global Feed").click();
  await page.getByText("Eldar test article title").click();
  await page.getByRole("button", { name: "Delete Article" }).first().click();

  await expect(page.locator("app-article-list h1").first()).toContainText(
    "Eldar test article title"
  );
});
