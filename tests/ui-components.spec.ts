import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("http://localhost:4200/");
});

test.describe("Form Layouts Page", () => {
  test.beforeEach(async ({ page }) => {
    await page.getByText("Forms").click();
    await page.getByText("Form Layouts").click();
  });

  test("Input fields", async ({ page }) => {
    const usingGridBlock = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    const emailInput = usingGridBlock.getByRole("textbox", { name: "Email" });

    await emailInput.pressSequentially("me@acme.com", { delay: 300 });

    const inputValue = await emailInput.inputValue();

    expect(inputValue).toEqual("me@acme.com");

    await expect(emailInput).toHaveValue("me@acme.com");
  });

  test("Radio buttons", async ({ page }) => {
    const usingGridBlock = page.locator("nb-card", {
      hasText: "Using the Grid",
    });

    await usingGridBlock
      .getByRole("radio", { name: "Option 1" })
      .check({ force: true });

    const radioStatus = await usingGridBlock
      .getByRole("radio", { name: "Option 1" })
      .isChecked();

    expect(radioStatus).toBeTruthy();

    await usingGridBlock
      .getByRole("radio", { name: "Option 2" })
      .check({ force: true });

    expect(
      await usingGridBlock.getByRole("radio", { name: "Option 1" }).isChecked()
    ).toBeFalsy();

    expect(
      await usingGridBlock.getByRole("radio", { name: "Option 2" }).isChecked()
    ).toBeTruthy();
  });
});

test("Checkboxes", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Toastr").click();

  const allBoxes = page.getByRole("checkbox");

  for (const box of await allBoxes.all()) {
    await box.check({ force: true });
    expect(await box.isChecked()).toBeTruthy();
  }

  for (const box of await allBoxes.all()) {
    await box.uncheck({ force: true });
    expect(await box.isChecked()).toBeFalsy();
  }
});

test("Lists", async ({ page }) => {
  const dropdownMenu = page.locator("ngx-header nb-select");
  await dropdownMenu.click();

  page.getByRole("list");
  page.getByRole("listitem");

  const optionList = page.locator("nb-option-list nb-option");
  await expect(optionList).toHaveText(["Light", "Dark", "Cosmic", "Corporate"]);

  await optionList.filter({ hasText: "Cosmic" }).click();
  const header = page.locator("nb-layout-header");
  await expect(header).toHaveCSS("background-color", "rgb(50, 50, 89)");

  const colors = {
    Light: "rgb(255, 255, 255)",
    Dark: "rgb(34, 43, 69)",
    Cosmic: "rgb(50, 50, 89)",
    Corporate: "rgb(255, 255, 255)",
  };

  for (const [theme, backgroundColor] of Object.entries(colors)) {
    await optionList.filter({ hasText: theme }).click();
    if (theme !== "Corporate") {
      await dropdownMenu.click();
    }
    await expect(header).toHaveCSS("background-color", backgroundColor);
  }
});

test("Tooltip", async ({ page }) => {
  await page.getByText("Modal & Overlays").click();
  await page.getByText("Tooltip").click();

  const tooltipCard = page.locator("nb-card", {
    hasText: "Tooltip Placements",
  });

  const tooltipButton = tooltipCard.getByRole("button", { name: "Top" });
  await tooltipButton.hover();

  const tooltip = page.locator("nb-tooltip");
  await expect(tooltip).toHaveText("This is a tooltip");
});

test("Dialog box", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  page.on("dialog", (dialog) => {
    expect(dialog.message()).toEqual("Are you sure you want to delete?");

    dialog.accept();
  });

  const initialEmail = await page
    .locator("tbody tr")
    .first()
    .locator("td")
    .nth(5)
    .textContent();

  await page
    .getByRole("table")
    .locator("tr", { hasText: initialEmail })
    .locator(".nb-trash")
    .click();

  const resultEmail = await page
    .locator("tbody tr")
    .first()
    .locator("td")
    .nth(5)
    .textContent();

  await expect(resultEmail).toEqual("fat@yandex.ru");
});

test("Table", async ({ page }) => {
  await page.getByText("Tables & Data").click();
  await page.getByText("Smart Table").click();

  const targetRow = page.getByRole("row", { name: "twitter@outlook.com" });
  await targetRow.locator(".nb-edit").click();

  await page.locator("input-editor").getByPlaceholder("Age").clear();
  await page.locator("input-editor").getByPlaceholder("Age").fill("35");

  await page.locator(".nb-checkmark").click();

  // update on the second page
  await page.locator(".ng2-smart-pagination-nav").getByText("2").click();
  const targetRowById = page
    .getByRole("row", { name: "11" })
    .filter({ has: page.locator("td").nth(1).getByText("11") });
  await targetRowById.locator(".nb-edit").click();

  await page.locator("input-editor").getByPlaceholder("E-mail").clear();
  await page
    .locator("input-editor")
    .getByPlaceholder("E-mail")
    .fill("test@test.com");
  await page.locator(".nb-checkmark").click();

  await expect(targetRowById.locator("td").nth(5)).toHaveText("test@test.com");

  // test filter of the table

  const ages = ["20", "30", "40", "150"];

  for (let age of ages) {
    await page.locator("input-filter").getByPlaceholder("Age").clear();
    await page.locator("input-filter").getByPlaceholder("Age").fill(age);
    await page.waitForTimeout(500);

    const ageRows = page.locator("tbody tr");

    for (let row of await ageRows.all()) {
      const cellValue = await row.locator("td").last().textContent();
      if (age === "150") {
        expect(cellValue).toEqual(" No data found ");
        continue;
      }
      expect(cellValue).toEqual(age);
    }
  }
});

test("Datepicker", async ({ page }) => {
  await page.getByText("Forms").click();
  await page.getByText("Datepicker").click();

  const calendarInput = page.getByPlaceholder("Form Picker");
  await calendarInput.click();

  let date = new Date();

  date.setDate(date.getDate() + 20);

  const expectedDate = date.getDate().toString();
  const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
  const expectedMonthLong = date.toLocaleString("en-US", { month: "long" });
  const expectedYear = date.getFullYear().toString();

  let calendarMonthAndYear = await page
    .locator("nb-calendar-view-mode")
    .textContent();

  const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `;

  while (calendarMonthAndYear !== expectedMonthAndYear) {
    await page
      .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
      .click();

    calendarMonthAndYear = await page
      .locator("nb-calendar-view-mode")
      .textContent();
  }

  await page
    .locator('[class="day-cell ng-star-inserted"]')
    .getByText(expectedDate, { exact: true })
    .click();

  await expect(calendarInput).toHaveValue(
    `${expectedMonthShort} ${expectedDate}, ${expectedYear}`
  );
});

test("Sliders", async ({ page }) => {
  // Update attribute value
  // const tempGauge = page.locator(
  //   '[tabtitle="Temperature"] ngx-temperature-dragger circle'
  // );

  // await tempGauge.evaluate((node) => {
  //   node.setAttribute("cx", "232.630");
  //   node.setAttribute("cy", "232.630");
  // });

  // await tempGauge.click();

  // Mouse movement
  const tempBox = page.locator(
    '[tabtitle="Temperature"] ngx-temperature-dragger'
  );

  await tempBox.scrollIntoViewIfNeeded();

  const box = await tempBox.boundingBox();

  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  await page.mouse.move(x, y);
  await page.mouse.down();
  await page.mouse.move(x + 100, y);
  await page.mouse.move(x + 100, y + 100);
  await page.mouse.up();

  await expect(tempBox).toContainText("30");
});
