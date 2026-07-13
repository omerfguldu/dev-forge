import { expect, test } from "@playwright/test";

test("home page lists all tool groups and links to them", async ({ page }) => {
  await page.goto("/");

  await expect(
    page.getByRole("heading", { name: "DevForge", level: 1 }),
  ).toBeVisible();

  const jsonSuiteLink = page.getByRole("link", { name: /JSON Suite/ });
  await expect(jsonSuiteLink).toBeVisible();

  await jsonSuiteLink.click();
  await expect(
    page.getByRole("heading", { name: "JSON Suite", level: 1 }),
  ).toBeVisible();
});
