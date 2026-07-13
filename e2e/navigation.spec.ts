import { expect, test } from "@playwright/test";

test("command palette opens with Ctrl+K and navigates to a tool", async ({
  page,
}) => {
  await page.goto("/");

  await page.keyboard.press("Control+k");

  const dialog = page.getByRole("dialog", { name: "Komut Paleti" });
  await expect(dialog).toBeVisible();

  await dialog.getByRole("option", { name: /JSON Suite/ }).click();

  await expect(dialog).toBeHidden();
  await expect(
    page.getByRole("heading", { name: "JSON Suite", level: 1 }),
  ).toBeVisible();
});

test("sidebar collapse button shrinks the sidebar width", async ({ page }) => {
  await page.goto("/");

  const sidebar = page.locator("aside");
  const expandedWidth = (await sidebar.boundingBox())?.width ?? 0;
  expect(expandedWidth).toBeGreaterThan(200);

  await page.getByRole("button", { name: "Kenar çubuğunu daralt" }).click();

  await expect(async () => {
    const collapsedWidth = (await sidebar.boundingBox())?.width ?? 0;
    expect(collapsedWidth).toBeLessThan(100);
  }).toPass();
});

test("theme toggle switches out of the dark-mode default", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveClass(/dark/);

  await page.getByRole("button", { name: "Aydınlık temaya geç" }).click();

  await expect(page.locator("html")).not.toHaveClass(/dark/);
});
