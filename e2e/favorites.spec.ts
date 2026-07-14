import { expect, test } from "@playwright/test";

test("visiting a tool repeatedly adds it to the Sidebar favorites section", async ({
  page,
}) => {
  // Sequential, full-page navigations — each one must complete before the
  // next so the Sidebar's per-visit usage counter has settled.
  await page.goto("/json-formatter");
  await page.goto("/converters");
  await page.goto("/json-formatter");
  await page.goto("/converters");

  await page.goto("/");
  await expect(page.getByText("SIK KULLANILANLAR")).toBeVisible();
  await expect(
    page.getByRole("navigation").getByRole("link", { name: /JSON Suite/ }),
  ).toHaveCount(2); // once under favorites, once under its normal group
});
