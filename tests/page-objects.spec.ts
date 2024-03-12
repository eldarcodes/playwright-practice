import { PageManager } from "../page-objects/page-manager";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
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
    .submitInlineFormWithCredentials("Eldar", "eldar2@eldarcodes.com", true);

  // Datepicker
  await pm.navigateTo().navigateToDatePickerPage();
  await pm.onDatepickerPage().selectCommonDatepickerDateFromToday(5);
  await pm.onDatepickerPage().selectRangepicker(2, 6);
});
