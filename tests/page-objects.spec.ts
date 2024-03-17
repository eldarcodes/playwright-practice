import { PageManager } from "../page-objects/page-manager";
import { test } from "@playwright/test";
import { faker } from "@faker-js/faker";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});

test("Navigate to form page", async ({ page }) => {
  const pm = new PageManager(page);

  await pm.navigateTo().navigateToFormLayoutsPage();
  await pm.navigateTo().navigateToDatePickerPage();
  await pm.navigateTo().navigateToSmartTablePage();
  await pm.navigateTo().navigateToToastrPage();
  await pm.navigateTo().navigateToTooltipPage();
});

test("Parametrized methods", async ({ page }) => {
  const pm = new PageManager(page);
  const randomFullName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  // Form Layouts
  await pm.navigateTo().navigateToFormLayoutsPage();
  await pm
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentials(
      "eldar@eldarcodes.com",
      "eldar123",
      "Option 1"
    );

  await pm
    .onFormLayoutsPage()
    .submitInlineFormWithCredentials(randomFullName, randomEmail, true);

  await page
    .locator("nb-card", { hasText: "Inline form" })
    .screenshot({ path: "screenshots/inline-form.png" });

  // Datepicker
  await pm.navigateTo().navigateToDatePickerPage();
  await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(5);
  await pm.onDatepickerPage().selectRangepicker(2, 6);
});
