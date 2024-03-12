import { Page } from "@playwright/test";

import { HelperBase } from "./helper-base";

export class NavigationPage extends HelperBase {
  constructor(page: Page) {
    super(page);
  }

  private async selectGroupMenuItem(groupItemTitle: string) {
    const groupMenuItem = this.page.getByTitle(groupItemTitle);
    const expandedState = await groupMenuItem.getAttribute("aria-expanded");

    if (expandedState === "false") {
      await groupMenuItem.click();
    }
  }

  async navigateToFormLayoutsPage() {
    await this.selectGroupMenuItem("Forms");
    await this.waitFor(5);
    await this.page.getByText("Form Layouts").click();
  }

  async navigateToDatePickerPage() {
    await this.selectGroupMenuItem("Forms");
    await this.page.getByText("Datepicker").click();
  }

  async navigateToSmartTablePage() {
    await this.selectGroupMenuItem("Tables & Data");
    await this.page.getByText("Smart Table").click();
  }

  async navigateToToastrPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Toastr").click();
  }

  async navigateToTooltipPage() {
    await this.selectGroupMenuItem("Modal & Overlays");
    await this.page.getByText("Tooltip").click();
  }
}
