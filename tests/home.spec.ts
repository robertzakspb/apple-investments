import { expect, test } from "@playwright/test";

test("home page credits Jaah and nothing else", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle("I was made by Jaah");
  await expect(page.getByRole("heading", { level: 1, name: "I was made by Jaah" })).toBeVisible();
  await expect(page.locator("body")).toHaveText("I was made by Jaah", { useInnerText: true });
  await expect(page.getByRole("navigation")).toHaveCount(0);
  await expect(page.getByRole("link")).toHaveCount(0);
});

test("removed pages are gone", async ({ page }) => {
  for (const path of ["/accounts/", "/positions/", "/orders/", "/securities/", "/settings/"]) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(404);
  }
});
