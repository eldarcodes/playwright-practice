import { NavigationPage } from "../page-objects/navigation-page";
import { FormLayoutsPage } from "../page-objects/form-layouts-page";
import { DatepickerPage } from "../page-objects/datepicker-page";
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test("Navigate to form page", async ({ page }) => {
  const navigationPage = new NavigationPage(page);

  await navigationPage.navigateToFormLayoutsPage();
  await navigationPage.navigateToDatePickerPage();
  await navigationPage.navigateToSmartTablePage();
  await navigationPage.navigateToToastrPage();
  await navigationPage.navigateToTooltipPage();
});

test("Parametrized methods", async ({ page }) => {
  const navigationPage = new NavigationPage(page);
  const formLayoutsPage = new FormLayoutsPage(page);
  const datepickerPage = new DatepickerPage(page);

  // Form Layouts
  await navigationPage.navigateToFormLayoutsPage();
  await formLayoutsPage.submitUsingTheGridFormWithCredentials(
    "eldar@eldarcodes.com",
    "eldar123",
    "Option 1"
  );

  await formLayoutsPage.submitInlineFormWithCredentials(
    "Eldar",
    "eldar2@eldarcodes.com",
    true
  );

  // Datepicker
  await navigationPage.navigateToDatePickerPage();
  await datepickerPage.selectCommonDatepickerDateFromToday(5);
  await datepickerPage.selectRangepicker(2, 6);
});
