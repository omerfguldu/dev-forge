import { expect, test } from "@playwright/test";

test("serves a valid web app manifest", async ({ request }) => {
  const response = await request.get("/manifest.json");
  expect(response.ok()).toBe(true);

  const manifest = await response.json();
  expect(manifest.name).toContain("FnStack");
  expect(manifest.display).toBe("standalone");
  expect(manifest.icons.length).toBeGreaterThan(0);
});

test("serves the service worker script", async ({ request }) => {
  const response = await request.get("/sw.js");
  expect(response.ok()).toBe(true);
  expect(await response.text()).toContain("CACHE_NAME");
});

test("home page links to the manifest", async ({ page }) => {
  await page.goto("/");
  const manifestHref = await page
    .locator('link[rel="manifest"]')
    .getAttribute("href");
  expect(manifestHref).toBe("/manifest.json");
});
