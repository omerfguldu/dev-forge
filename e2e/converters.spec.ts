import { expect, test } from "@playwright/test";

test("converts the sample JSON to YAML end-to-end and copies it", async ({
  page,
}) => {
  await page.goto("/converters");

  const outputLines = page.locator(".monaco-editor .view-lines").nth(1);
  await expect(outputLines).toContainText("name: FnStack");

  await page.getByRole("button", { name: /^Kopyala$/ }).click();
  await expect(page.getByRole("button", { name: /Kopyalandı/ })).toBeVisible();
});

test("swapping direction moves JSON to the target side and converts back", async ({
  page,
}) => {
  await page.goto("/converters");

  await page.getByRole("button", { name: "Kaynak ve hedefi değiştir" }).click();

  await expect(page.getByText("KAYNAK").locator("..")).toContainText("YAML");
  const outputLines = page.locator(".monaco-editor .view-lines").nth(1);
  await expect(outputLines).toContainText('"FnStack"');
});
