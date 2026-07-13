import { expect, test } from "@playwright/test";

const UUID_TEXT_PATTERN =
  /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

test("UUID generator regenerates the list and copies a single row", async ({
  page,
}) => {
  await page.goto("/generators");

  const firstUuid = page.getByText(UUID_TEXT_PATTERN).first();
  await expect(firstUuid).toBeVisible();

  const firstRow = page.getByRole("button", { name: "Satırı kopyala" }).first();
  await firstRow.click();
  await expect(
    page.getByRole("button", { name: "Kopyalandı" }).first(),
  ).toBeVisible();

  const uuidBefore = await firstUuid.textContent();
  await page.getByRole("button", { name: "Yeniden Üret" }).first().click();
  await expect(page.getByText(UUID_TEXT_PATTERN).first()).not.toHaveText(
    uuidBefore ?? "",
  );
});

test("QR generator renders an SVG preview for the default input", async ({
  page,
}) => {
  await page.goto("/generators");

  await expect(page.locator("svg[viewBox]").first()).toBeVisible();
});

test("Lorem Ipsum switches between paragraph, word, and list output", async ({
  page,
}) => {
  await page.goto("/generators");

  await expect(page.locator("p").first()).toBeVisible();

  await page.getByRole("button", { name: "Liste" }).click();
  await expect(page.locator("ul li").first()).toBeVisible();

  await page.getByRole("button", { name: "Kelime" }).click();
  await expect(page.locator("ul li")).toHaveCount(0);
});
