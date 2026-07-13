import { expect, type Page } from "@playwright/test";
import { test } from "@playwright/test";

async function replaceInputContent(page: Page, text: string) {
  // Monaco's auto-closing-bracket feature only recognizes real typing
  // patterns; Playwright's synthetic .type() doesn't trigger its
  // type-over detection and ends up duplicating closing brackets/quotes.
  // A clipboard paste goes through Monaco's paste path instead, which
  // inserts the text verbatim — exactly what a snippet-replace needs.
  await page.evaluate(
    async (value) => navigator.clipboard.writeText(value),
    text,
  );
  await page.locator(".monaco-editor .view-lines").first().click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.press("ControlOrMeta+v");
}

test("shows a JSON validation error with the exact line and column", async ({
  page,
}) => {
  await page.goto("/json-formatter");

  await replaceInputContent(page, '{\n  "a": 1,\n  b: 2\n}');

  await expect(page.getByText("Geçersiz JSON")).toBeVisible();
  await expect(page.getByText(/Satır 3, Sütun/)).toBeVisible();
});

test("minifies valid JSON and gives copy feedback", async ({ page }) => {
  await page.goto("/json-formatter");

  await replaceInputContent(page, '{"a":1,"b":2}');

  await expect(page.getByText("Geçerli JSON")).toBeVisible();

  await page.getByRole("button", { name: "Sıkıştır" }).click();
  const outputLines = page.locator(".monaco-editor .view-lines").nth(1);
  await expect(outputLines).toContainText('{"a":1,"b":2}');

  await page.getByRole("button", { name: /^Kopyala$/ }).click();
  await expect(page.getByRole("button", { name: /Kopyalandı/ })).toBeVisible();
});
