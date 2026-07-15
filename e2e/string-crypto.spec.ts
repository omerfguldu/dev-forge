import { expect, type Page } from "@playwright/test";
import { test } from "@playwright/test";

async function pasteIntoEditor(page: Page, ariaLabel: string, text: string) {
  await page.evaluate(
    async (value) => navigator.clipboard.writeText(value),
    text,
  );
  const editor = page.locator(".monaco-editor", {
    has: page.locator(`[aria-label="${ariaLabel}"]`),
  });
  await editor.locator(".view-lines").click();
  await page.keyboard.press("ControlOrMeta+a");
  await page.keyboard.press("ControlOrMeta+v");
}

test("JWT decoder shows header, payload, and signature cards for the sample token", async ({
  page,
}) => {
  await page.goto("/string-crypto");

  await expect(page.getByText("HEADER")).toBeVisible();
  await expect(page.getByText(/"alg": "HS256"/)).toBeVisible();
  await expect(page.getByText("PAYLOAD")).toBeVisible();
  await expect(page.getByText(/"name": "John Doe"/)).toBeVisible();
  await expect(page.getByText("SIGNATURE")).toBeVisible();
});

test("Base64 tool encodes by default and decodes back after switching mode", async ({
  page,
}) => {
  await page.goto("/string-crypto");

  const output = page.locator(".monaco-editor", {
    has: page.locator('[aria-label="Base64 çıktısı"]'),
  });
  await expect(output.locator(".view-lines")).toContainText(
    "Rm5TdGFjaw", // base64 for "FnStack..." sample prefix
  );

  // Base64Tool renders before UrlEncoderTool, so its "Çöz" button is first.
  await page.getByRole("button", { name: "Çöz" }).first().click();
  await pasteIntoEditor(page, "Base64 girişi", "aGVsbG8=");

  await expect(output.locator(".view-lines")).toContainText("hello");
});

test("URL encoder tool encodes special characters", async ({ page }) => {
  await page.goto("/string-crypto");

  const output = page.locator(".monaco-editor", {
    has: page.locator('[aria-label="URL kodlama çıktısı"]'),
  });
  await expect(output.locator(".view-lines")).toContainText("%20");
});

test("hash generator produces the SHA-256 digest of the default input", async ({
  page,
}) => {
  await page.goto("/string-crypto");

  await expect(
    page.getByText(
      "bc2b71dbec29f9e8641880b43c26f6106ac4971896f62c24d3390867fc8e44ce",
    ),
  ).toBeVisible();
});
