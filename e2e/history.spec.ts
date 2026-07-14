import { expect, test } from "@playwright/test";

test("copying a JSON result adds it to the history popover", async ({
  page,
}) => {
  await page.goto("/json-formatter");
  await page.getByRole("button", { name: /^Kopyala$/ }).click();

  await page.getByRole("button", { name: "Geçmiş" }).click();
  await expect(
    page.locator("span.text-primary", { hasText: "JSON Suite" }),
  ).toBeVisible();
  await expect(page.getByText("az önce")).toBeVisible();
});

test("history popover shows an empty state before anything is copied", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("button", { name: "Geçmiş" }).click();
  await expect(page.getByText("Henüz işlem yok.")).toBeVisible();
});
