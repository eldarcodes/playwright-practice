import { defineConfig } from "@playwright/test";
import type { TestOptions } from "./test-options";

require("dotenv").config();

export default defineConfig<TestOptions>({
  timeout: 10000,
  globalTimeout: 15000,
  expect: {
    timeout: 2000,
  },

  retries: 1,
  reporter: "html",

  use: {
    baseURL: "http://localhost:4200",
    globalsQaUrl: "https://www.globalsqa.com/demo-site/draganddrop",
    trace: "on-first-retry",
    extraHTTPHeaders: {
      Authorization: `Token ${process.env["ACCESS_TOKEN"]}`,
    },
  },

  projects: [
    {
      name: "chromium",
    },

    {
      name: "firefox",
      use: {
        browserName: "firefox",
      },
    },
  ],
});
