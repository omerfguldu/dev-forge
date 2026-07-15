import { expect, test } from "@playwright/test";

test("shows added and removed line counts for the default sample texts", async ({
  page,
}) => {
  await page.goto("/diff-checker");

  await expect(page.getByText(/^\+\d+ eklendi$/)).toBeVisible();
  await expect(page.getByText(/^-\d+ silindi$/)).toBeVisible();

  const original = page.locator(".monaco-editor", {
    has: page.locator('[aria-label="Orijinal metin"]'),
  });
  await expect(original.locator(".view-lines")).toContainText(
    "FnStack geliştirici araçları",
  );
});

test("updating the modified text changes the diff result", async ({ page }) => {
  await page.goto("/diff-checker");

  await page.evaluate(
    async (value) => navigator.clipboard.writeText(value),
    "tamamen farklı bir metin",
  );
  const modifiedEditor = page.locator(".monaco-editor", {
    has: page.locator('[aria-label="Değiştirilmiş metin"]'),
  });
  await modifiedEditor.locator(".view-lines").click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.press("ControlOrMeta+v");

  await expect(page.getByText("+ tamamen farklı bir metin")).toBeVisible();
});
