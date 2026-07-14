import { expect, test } from "@playwright/test";

test("serves a sitemap listing every tool route", async ({ request }) => {
  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);

  const body = await response.text();
  for (const route of [
    "/json-formatter",
    "/converters",
    "/string-crypto",
    "/diff-checker",
    "/generators",
  ]) {
    expect(body).toContain(route);
  }
});

test("serves robots.txt pointing at the sitemap", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.ok()).toBe(true);

  const body = await response.text();
  expect(body).toContain("Allow: /");
  expect(body).toContain("Sitemap:");
  expect(body).toContain("/sitemap.xml");
});

test("sidebar links to the project's GitHub repo", async ({ page }) => {
  await page.goto("/");
  const link = page.getByRole("link", { name: /GitHub'da Yıldızla/ });
  await expect(link).toHaveAttribute("target", "_blank");
  await expect(link).toHaveAttribute(
    "href",
    "https://github.com/omerfguldu/dev-forge",
  );
});
