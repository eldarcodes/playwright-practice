import { PageManager } from "../page-objects/page-manager";
import { test } from "../test-options";
import { faker } from "@faker-js/faker";

test("Parametrized methods", async ({ page, pageManager }) => {
  const randomFullName = faker.person.fullName();
  const randomEmail = faker.internet.email();

  await pageManager
    .onFormLayoutsPage()
    .submitUsingTheGridFormWithCredentials(
      "eldar@eldarcodes.com",
      "eldar123",
      "Option 1"
    );
  await pageManager
    .onFormLayoutsPage()
    .submitInlineFormWithCredentials(randomFullName, randomEmail, true);
});
