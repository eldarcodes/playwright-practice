import { Page, expect } from "@playwright/test";

export class DatepickerPage {
  private readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private async selectDateInCalendar(days: number) {
    let date = new Date();

    date.setDate(date.getDate() + days);

    const expectedDate = date.getDate().toString();
    const expectedMonthShort = date.toLocaleString("en-US", { month: "short" });
    const expectedMonthLong = date.toLocaleString("en-US", { month: "long" });
    const expectedYear = date.getFullYear().toString();

    let calendarMonthAndYear = await this.page
      .locator("nb-calendar-view-mode")
      .textContent();

    const expectedMonthAndYear = ` ${expectedMonthLong} ${expectedYear} `;

    while (calendarMonthAndYear !== expectedMonthAndYear) {
      await this.page
        .locator('nb-calendar-pageable-navigation [data-name="chevron-right"]')
        .click();

      calendarMonthAndYear = await this.page
        .locator("nb-calendar-view-mode")
        .textContent();
    }

    await this.page
      .locator(".day-cell.ng-star-inserted")
      .getByText(expectedDate, { exact: true })
      .click();

    const dateToAssert = `${expectedMonthShort} ${expectedDate}, ${expectedYear}`;

    return dateToAssert;
  }

  /**
   * This method selects a date from the range picker
   * @param startDate Start date in number of days from today
   * @param endDate End date in number of days from today
   */
  async selectRangepicker(startDate: number, endDate: number) {
    const calendarInput = this.page.getByPlaceholder("Range Picker");
    await calendarInput.click();

    const dateToAssertStart = await this.selectDateInCalendar(startDate);
    const dateToAssertEnd = await this.selectDateInCalendar(endDate);

    const dateToAssert = `${dateToAssertStart} - ${dateToAssertEnd}`;

    await expect(calendarInput).toHaveValue(dateToAssert);
  }

  /**
   * This method selects a date from the common datepicker
   * @param days Number of days from today
   */
  async selectCommonDatepickerDateFromToday(days: number) {
    const calendarInput = this.page.getByPlaceholder("Form Picker");
    await calendarInput.click();

    const dateToAssert = await this.selectDateInCalendar(days);

    await expect(calendarInput).toHaveValue(dateToAssert);
  }
}
